"""Iter 7 — Buyer Funnel: Niches, Blueprints, Buyer Profile, Multi-dim Reviews.

Tests the new endpoints added per AskWinn buyer journey:
  GET    /api/niches
  GET    /api/niches/{key}
  GET    /api/blueprints/{niche}/{sub_category}
  PUT    /api/users/me/profile
  POST   /api/agents/{agent_id}/reviews  (multi-dim)

Plus quick regression on /api/auth/me and a few existing endpoints to confirm
the iter7 changes did not break anything.
"""
import os
import uuid
import time
import requests
import pytest
from pymongo import MongoClient
from datetime import datetime, timezone, timedelta

BASE = os.environ.get("REACT_APP_BACKEND_URL").rstrip("/")
API = f"{BASE}/api"
mongo = MongoClient(os.environ.get("MONGO_URL", "mongodb://localhost:27017"))
db = mongo[os.environ.get("DB_NAME", "test_database")]

STAMP = int(time.time())

REQUIRED_BLUEPRINT_FIELDS = {
    "niche", "niche_key", "sub_category", "agent_category", "last_verified",
    "market_size_india_inr_cr", "market_size_global_usd_bn", "biggest_players",
    "moq_low", "moq_high", "landed_cost_inr_per_unit",
    "gross_margin_pct_low", "gross_margin_pct_high",
    "manufacturing_hubs", "key_risks", "growth_levers",
}


def _seed_user(role: str):
    uid = f"test-iter7-{role}-{STAMP}-{uuid.uuid4().hex[:6]}"
    tok = f"tok_{uuid.uuid4().hex}"
    db.users.insert_one({
        "user_id": uid,
        "email": f"TEST_iter7_{role}_{uid}@example.com",
        "name": f"Test {role}",
        "picture": None,
        "role": role,
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    db.user_sessions.insert_one({
        "user_id": uid,
        "session_token": tok,
        "expires_at": (datetime.now(timezone.utc) + timedelta(days=7)).isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    return uid, tok


@pytest.fixture(scope="module")
def buyer():
    uid, tok = _seed_user("buyer")
    yield {"user_id": uid, "token": tok, "h": {"Authorization": f"Bearer {tok}"}}
    db.users.delete_one({"user_id": uid})
    db.user_sessions.delete_one({"session_token": tok})


@pytest.fixture(scope="module")
def agent_user():
    uid, tok = _seed_user("agent")
    aid = f"agent_iter7_{uuid.uuid4().hex[:10]}"
    db.agent_profiles.insert_one({
        "agent_id": aid, "user_id": uid, "company_name": "TEST Iter7 Agent",
        "tagline": "", "bio": "", "categories": ["Hardware"], "regions": ["IN"],
        "services": [], "min_order_qty": 0, "certifications": [],
        "portfolio_images": [], "verified": False, "rating": 0.0,
        "reviews_count": 0,
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    yield {"user_id": uid, "token": tok, "agent_id": aid,
           "h": {"Authorization": f"Bearer {tok}"}}
    db.agent_profiles.delete_one({"agent_id": aid})
    db.reviews.delete_many({"agent_id": aid})
    db.users.delete_one({"user_id": uid})
    db.user_sessions.delete_one({"session_token": tok})


# ---------- Niches ----------
class TestNiches:
    def test_list_niches_returns_all_eight(self):
        r = requests.get(f"{API}/niches")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) == 8
        keys = {n["key"] for n in data}
        assert keys == {
            "jewellery", "apparel", "beauty", "home-decor",
            "electronics", "packaging", "food", "toys",
        }
        # Every niche has the required fields
        for n in data:
            for f in ("key", "label", "icon", "agent_category",
                      "opportunity_teaser", "sub_categories"):
                assert f in n, f"missing field {f} in niche {n.get('key')}"
            assert isinstance(n["sub_categories"], list) and n["sub_categories"]

    def test_get_niche_valid_key(self):
        r = requests.get(f"{API}/niches/jewellery")
        assert r.status_code == 200
        d = r.json()
        assert d["key"] == "jewellery"
        assert d["label"] == "Jewellery"
        assert d["agent_category"] == "Hardware"
        assert "Imitation" in d["sub_categories"]

    def test_get_niche_invalid_key_404(self):
        r = requests.get(f"{API}/niches/NOT_A_NICHE")
        assert r.status_code == 404


# ---------- Blueprints ----------
class TestBlueprints:
    def test_curated_blueprint_has_all_required_fields(self):
        r = requests.get(f"{API}/blueprints/jewellery/Imitation")
        assert r.status_code == 200
        d = r.json()
        missing = REQUIRED_BLUEPRINT_FIELDS - set(d.keys())
        assert not missing, f"Missing blueprint fields: {missing}"
        assert d["niche"] == "Jewellery"
        assert d["niche_key"] == "jewellery"
        assert d["sub_category"] == "Imitation"
        assert d["agent_category"] == "Hardware"
        assert isinstance(d["biggest_players"], list) and len(d["biggest_players"]) >= 2
        assert isinstance(d["key_risks"], list) and len(d["key_risks"]) >= 2
        assert isinstance(d["growth_levers"], list) and len(d["growth_levers"]) >= 1
        assert isinstance(d["manufacturing_hubs"], list) and d["manufacturing_hubs"]
        assert isinstance(d["moq_low"], int) and isinstance(d["moq_high"], int)
        assert d["moq_low"] <= d["moq_high"]
        assert d["gross_margin_pct_low"] <= d["gross_margin_pct_high"]

    def test_blueprint_invalid_niche_404(self):
        r = requests.get(f"{API}/blueprints/INVALID/anything")
        assert r.status_code == 404

    def test_blueprint_unknown_subcategory_returns_default(self):
        r = requests.get(f"{API}/blueprints/jewellery/UnknownSub-XYZ")
        assert r.status_code == 200
        d = r.json()
        # Falls back to DEFAULT_BLUEPRINT but still wraps niche metadata.
        assert d["niche_key"] == "jewellery"
        assert d["sub_category"] == "UnknownSub-XYZ"
        assert d["agent_category"] == "Hardware"
        # Default blueprint has these signature fields
        assert d["moq_low"] == 200 and d["moq_high"] == 1000
        assert "Established multinational #1" in d["biggest_players"]
        # All required fields still present
        missing = REQUIRED_BLUEPRINT_FIELDS - set(d.keys())
        assert not missing

    @pytest.mark.parametrize("niche,sub", [
        ("apparel", "T-shirts & basics"),
        ("beauty", "Skincare"),
        ("home-decor", "Candles & fragrance"),
        ("electronics", "Audio"),
        ("packaging", "Beauty primary pack"),
        ("food", "Snacks"),
        ("toys", "Wooden"),
    ])
    def test_curated_blueprints_across_niches(self, niche, sub):
        r = requests.get(f"{API}/blueprints/{niche}/{sub}")
        assert r.status_code == 200
        d = r.json()
        assert d["niche_key"] == niche
        assert d["sub_category"] == sub
        missing = REQUIRED_BLUEPRINT_FIELDS - set(d.keys())
        assert not missing
        assert len(d["key_risks"]) >= 2


# ---------- Buyer profile ----------
class TestBuyerProfile:
    def test_update_profile_persists(self, buyer):
        payload = {
            "niche": "jewellery",
            "sub_category": "Imitation",
            "business_model": "D2C",
            "chat_answers": {"q1": "yes", "budget_inr": 500000},
        }
        r = requests.put(f"{API}/users/me/profile",
                         json=payload, headers=buyer["h"])
        assert r.status_code == 200
        d = r.json()
        assert d["user_id"] == buyer["user_id"]
        assert d["niche_preference"] == "jewellery"
        assert d["sub_category_preference"] == "Imitation"
        assert d["business_model"] == "D2C"
        assert d["chat_answers"] == payload["chat_answers"]
        # No mongo _id leak
        assert "_id" not in d
        # Verify persisted by reading via /auth/me
        me = requests.get(f"{API}/auth/me", headers=buyer["h"])
        assert me.status_code == 200
        m = me.json()
        assert m.get("niche_preference") == "jewellery"
        assert m.get("sub_category_preference") == "Imitation"

    def test_update_profile_unauthenticated_401(self):
        r = requests.put(f"{API}/users/me/profile",
                         json={"niche": "x", "sub_category": "y",
                               "business_model": "", "chat_answers": {}})
        assert r.status_code == 401


# ---------- Multi-dim Reviews ----------
class TestMultiDimReviews:
    def test_review_with_all_dimensions(self, buyer, agent_user):
        payload = {
            "rating": 5,
            "timeliness": 5,
            "quality": 4,
            "communication": 5,
            "value": 4,
            "comment": "TEST iter7 multi-dim review",
        }
        r = requests.post(f"{API}/agents/{agent_user['agent_id']}/reviews",
                          json=payload, headers=buyer["h"])
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["rating"] == 5
        assert d["timeliness"] == 5
        assert d["quality"] == 4
        assert d["communication"] == 5
        assert d["value"] == 4
        assert d["comment"] == payload["comment"]
        assert d["agent_id"] == agent_user["agent_id"]
        assert d["buyer_id"] == buyer["user_id"]
        assert "_id" not in d
        # Agent rating recomputed
        ag = requests.get(f"{API}/agents/{agent_user['agent_id']}").json()
        assert ag["agent"]["rating"] > 0
        assert ag["agent"]["reviews_count"] >= 1

    def test_review_legacy_minimal_payload(self, buyer, agent_user):
        # Only rating + comment — dim fields default to 0
        payload = {"rating": 3, "comment": "TEST iter7 legacy payload"}
        r = requests.post(f"{API}/agents/{agent_user['agent_id']}/reviews",
                          json=payload, headers=buyer["h"])
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["rating"] == 3
        assert d["timeliness"] == 0
        assert d["quality"] == 0
        assert d["communication"] == 0
        assert d["value"] == 0

    def test_agent_detail_returns_dim_fields(self, buyer, agent_user):
        # Make sure at least one review exists
        requests.post(f"{API}/agents/{agent_user['agent_id']}/reviews",
                      json={"rating": 4, "timeliness": 4, "quality": 4,
                            "communication": 3, "value": 4,
                            "comment": "TEST iter7 dim verify"},
                      headers=buyer["h"])
        r = requests.get(f"{API}/agents/{agent_user['agent_id']}")
        assert r.status_code == 200
        d = r.json()
        assert "reviews" in d
        assert len(d["reviews"]) >= 1
        rev = d["reviews"][0]
        for f in ("rating", "timeliness", "quality", "communication", "value", "comment"):
            assert f in rev, f"review missing {f}"
        assert "_id" not in rev

    def test_rating_recomputation_average(self, agent_user):
        # Compute expected avg of all reviews currently in DB for this agent
        revs = list(db.reviews.find({"agent_id": agent_user["agent_id"]}))
        assert revs, "expected reviews from prior tests"
        expected = round(sum(r["rating"] for r in revs) / len(revs), 2)
        ag = requests.get(f"{API}/agents/{agent_user['agent_id']}").json()
        assert ag["agent"]["rating"] == expected
        assert ag["agent"]["reviews_count"] == len(revs)


# ---------- Quick regression ----------
class TestRegression:
    def test_auth_me_works(self, buyer):
        r = requests.get(f"{API}/auth/me", headers=buyer["h"])
        assert r.status_code == 200
        assert r.json()["user_id"] == buyer["user_id"]

    def test_auth_me_unauth_401(self):
        r = requests.get(f"{API}/auth/me")
        assert r.status_code == 401

    def test_root_ok(self):
        r = requests.get(f"{API}/")
        assert r.status_code == 200
        assert r.json().get("ok") is True

    def test_favourite_ids_endpoint(self, buyer):
        # iter6 endpoint must still respond
        r = requests.get(f"{API}/favourites/ids", headers=buyer["h"])
        assert r.status_code == 200
        assert "agent_ids" in r.json()

    def test_agents_listing_works(self):
        r = requests.get(f"{API}/agents")
        assert r.status_code == 200
        assert isinstance(r.json(), list)
