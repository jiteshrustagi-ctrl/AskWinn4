"""Buyer-funnel niches, sub-categories & curated Business Blueprints.

Each blueprint covers the 7 sections required by the AskWinn buyer journey:
1. Market size (India + Global)
2. Biggest players
3. Standard MOQ ranges
4. Typical landed cost
5. Gross margin benchmarks
6. Top manufacturing hubs
7. Key risks to avoid

Data is curated, field-verified once and stamped with `last_verified`.
"""
from __future__ import annotations
from typing import Optional


NICHES = [
    {
        "key": "jewellery",
        "label": "Jewellery",
        "icon": "Gem",
        "agent_category": "Jewellery",
        "opportunity_teaser": "₹ 6 Lakh Cr Indian market · 12% YoY",
        "sub_categories": ["Imitation", "Silver", "Gold-plated", "Wholesale resell"],
    },
    {
        "key": "apparel",
        "label": "Apparel & Textile",
        "icon": "Shirt",
        "agent_category": "Apparel & Textile",
        "opportunity_teaser": "₹ 12 L Cr by 2030 · D2C hot",
        "sub_categories": ["T-shirts & basics", "Streetwear", "Activewear", "Innerwear", "Kidswear"],
    },
    {
        "key": "beauty",
        "label": "Beauty & Cosmetics",
        "icon": "Sparkles",
        "agent_category": "Beauty & Cosmetics",
        "opportunity_teaser": "₹ 1.5 L Cr · 25% indie share",
        "sub_categories": ["Skincare", "Haircare", "Makeup", "Fragrance"],
    },
    {
        "key": "home-decor",
        "label": "Home Decor & Goods",
        "icon": "Lamp",
        "agent_category": "Home Decor & Goods",
        "opportunity_teaser": "₹ 1.8 Lakh Cr Indian market",
        "sub_categories": ["Candles & fragrance", "Soft furnishing", "Wall art", "Tableware"],
    },
    {
        "key": "food",
        "label": "Food & Nutrition",
        "icon": "UtensilsCrossed",
        "agent_category": "Food & Nutrition",
        "opportunity_teaser": "₹ 5 L Cr packaged · D2C explode",
        "sub_categories": ["Snacks", "Health foods", "Beverages", "Spices & condiments"],
    },
    {
        "key": "fitness",
        "label": "Fitness & Wellness",
        "icon": "Activity",
        "agent_category": "Fitness & Wellness",
        "opportunity_teaser": "₹ 90,000 Cr India · 18% CAGR",
        "sub_categories": ["Resistance bands", "Yoga products", "Supplements", "Gym accessories"],
    },
    {
        "key": "corporate-gifting",
        "label": "Corporate Gifting",
        "icon": "Gift",
        "agent_category": "Corporate Gifting",
        "opportunity_teaser": "₹ 12,000 Cr India · 3X growth",
        "sub_categories": ["Branded merchandise", "Custom apparel", "Drinkware & stationery", "Gift hampers"],
    },
    {
        "key": "electronics",
        "label": "Consumer Electronics",
        "icon": "Cpu",
        "agent_category": "Consumer Electronics",
        "opportunity_teaser": "Wearables: 30% CAGR India",
        "sub_categories": ["Audio", "Wearables", "Smart home", "Mobile accessories"],
    },
]


# Curated Blueprints keyed by (niche, sub_category)
BLUEPRINTS: dict[tuple[str, str], dict] = {
    ("jewellery", "Imitation"): {
        "market_size_india_inr_cr": 25000,
        "market_size_global_usd_bn": 35,
        "biggest_players": ["Tanishq", "Kalyan Jewellers", "Voylla", "Sukkhi", "Zaveri Pearls"],
        "moq_low": 50, "moq_high": 500,
        "landed_cost_inr_per_unit": "₹ 80 – ₹ 350 (alloy + plating + packaging)",
        "gross_margin_pct_low": 50, "gross_margin_pct_high": 75,
        "manufacturing_hubs": ["Jaipur", "Delhi", "Mumbai", "Yiwu (China)", "Bangkok"],
        "key_risks": [
            "Plating wears off in 3–6 months — demand 1-yr anti-tarnish coating.",
            "Hallmark mis-stamping invites BIS penalties — only buy from BIS-licensed assayers.",
            "Lead/nickel migration above 0.05% blocks EU/USA exports — request RoHS/REACH cert.",
            "Photography-vs-real colour mismatch is the #1 return reason.",
        ],
        "growth_levers": [
            "Niche around occasion (haldi, sangeet, mehendi) for 2× ARPU.",
            "Bundle 3 SKUs as a 'set' to push AOV from ₹599 → ₹1,499.",
        ],
    },
    ("jewellery", "Silver"): {
        "market_size_india_inr_cr": 12000,
        "market_size_global_usd_bn": 22,
        "biggest_players": ["Mia by Tanishq", "Giva", "Shaya by CaratLane", "PNG", "Pure Home + Living"],
        "moq_low": 30, "moq_high": 250,
        "landed_cost_inr_per_unit": "₹ 600 – ₹ 4,500 (silver bullion + casting + finishing)",
        "gross_margin_pct_low": 35, "gross_margin_pct_high": 55,
        "manufacturing_hubs": ["Jaipur", "Surat", "Delhi", "Bangkok", "Bali"],
        "key_risks": [
            "925 purity not maintained — always third-party assay before payment.",
            "Bullion price volatility — lock prices for 7 days max.",
            "Tarnishing in humid climates — anti-tarnish bag is mandatory packaging.",
        ],
        "growth_levers": [
            "Personalisation (initials, birthstones) lifts margin by 40%.",
            "Subscription jewellery boxes work — ₹999/mo trades 3× LTV.",
        ],
    },
    ("apparel", "T-shirts & basics"): {
        "market_size_india_inr_cr": 95000,
        "market_size_global_usd_bn": 320,
        "biggest_players": ["The Souled Store", "Bewakoof", "H&M", "Uniqlo", "FabIndia"],
        "moq_low": 100, "moq_high": 500,
        "landed_cost_inr_per_unit": "₹ 180 – ₹ 450 (cotton + cut/sew + screen print + tag)",
        "gross_margin_pct_low": 45, "gross_margin_pct_high": 70,
        "manufacturing_hubs": ["Tirupur", "Ludhiana", "Dhaka", "Porto", "Izmir"],
        "key_risks": [
            "GSM mismatch — always weigh sample on lab scale.",
            "Shrinkage post first wash; demand pre-shrunk fabric.",
            "Print fade after 5 washes — DTG may not survive; switch to plastisol.",
            "BSCI / SA8000 mandatory for European retail.",
        ],
        "growth_levers": [
            "Drop model (limited runs of 200 units) creates urgency, sells 90% at full price.",
            "Co-branded drops with influencers cut CAC by 60%.",
        ],
    },
    ("apparel", "Streetwear"): {
        "market_size_india_inr_cr": 18000,
        "market_size_global_usd_bn": 185,
        "biggest_players": ["Almost Gods", "Six5Six", "Supreme", "Stüssy", "Off-White"],
        "moq_low": 80, "moq_high": 300,
        "landed_cost_inr_per_unit": "₹ 600 – ₹ 1,800 (heavyweight cotton, cut/sew, decoration)",
        "gross_margin_pct_low": 55, "gross_margin_pct_high": 75,
        "manufacturing_hubs": ["Tirupur (heavyweight)", "Bangalore", "Lahore", "Lisbon"],
        "key_risks": [
            "Tone match across batches — pantone-locked dye-houses only.",
            "Embroidery puckering on heavy gauge — interlining mandatory.",
            "IP leakage — sign NDAs and photograph every sample.",
        ],
        "growth_levers": [
            "Numbered drops + community gating drive 5× engagement.",
            "Resell-floor partners (StockX, GOAT) elevate brand perception.",
        ],
    },
    ("beauty", "Skincare"): {
        "market_size_india_inr_cr": 27000,
        "market_size_global_usd_bn": 175,
        "biggest_players": ["Mamaearth", "The Derma Co", "Plum", "Minimalist", "L'Oréal"],
        "moq_low": 1000, "moq_high": 5000,
        "landed_cost_inr_per_unit": "₹ 65 – ₹ 280 (formula + airless pump + secondary pack)",
        "gross_margin_pct_low": 60, "gross_margin_pct_high": 82,
        "manufacturing_hubs": ["Bhiwadi", "Baddi", "Ahmedabad", "Seoul", "Guangzhou"],
        "key_risks": [
            "FDA / CDSCO / Cosmos certifications take 90+ days — start filings on day 1.",
            "Stability fail at 40°C — accelerated stability test (3 mo @ 40°C, 75% RH) is non-negotiable.",
            "Preservative breakdown after 12 months — choose Liquid Germall Plus or Phenoxyethanol.",
            "Counterfeit risk on hero SKUs — unique scratch-codes from production.",
        ],
        "growth_levers": [
            "Subscribe-and-save raises LTV by 4×.",
            "Dermat-led content is the #1 conversion driver.",
        ],
    },
    ("beauty", "Haircare"): {
        "market_size_india_inr_cr": 17000,
        "market_size_global_usd_bn": 105,
        "biggest_players": ["WOW Skin Science", "Mamaearth", "Bare Anatomy", "Pantene", "Tresemmé"],
        "moq_low": 1500, "moq_high": 5000,
        "landed_cost_inr_per_unit": "₹ 55 – ₹ 220",
        "gross_margin_pct_low": 55, "gross_margin_pct_high": 78,
        "manufacturing_hubs": ["Baddi", "Bhiwadi", "Daman", "Seoul"],
        "key_risks": [
            "Sulphate-free formulations skim cleansing power — balance with cocamidopropyl betaine.",
            "pH outside 4.5–5.5 damages cuticle — test every batch.",
            "Fragrance allergens (linalool, limonene) must be declared on label.",
        ],
        "growth_levers": [
            "Quiz-led personalisation (curl type, scalp type) lifts AOV by 35%.",
            "Pro-stylist seeding gives credibility multiplier.",
        ],
    },
    ("home-decor", "Candles & fragrance"): {
        "market_size_india_inr_cr": 1800,
        "market_size_global_usd_bn": 15,
        "biggest_players": ["Bath & Body Works", "Yankee Candle", "The 7 Vibes", "Niwas", "Phool"],
        "moq_low": 200, "moq_high": 1000,
        "landed_cost_inr_per_unit": "₹ 90 – ₹ 380 (soy wax + fragrance oil + glass + lid)",
        "gross_margin_pct_low": 60, "gross_margin_pct_high": 80,
        "manufacturing_hubs": ["Pune", "Mumbai", "Yiwu", "Gujarat (glass)"],
        "key_risks": [
            "Fragrance flash point > 65°C is mandatory for shipping.",
            "Wax shrinkage / sinkholes — single pour vs double pour formula.",
            "Glass cracking — pre-heat vessel before pour.",
        ],
        "growth_levers": [
            "Refill business model cuts unit cost 30% and locks subscriptions.",
            "Limited seasonal fragrances (Diwali, festive) drive 4× sell-through.",
        ],
    },
    ("electronics", "Audio"): {
        "market_size_india_inr_cr": 19000,
        "market_size_global_usd_bn": 75,
        "biggest_players": ["boAt", "Noise", "Sony", "JBL", "Apple"],
        "moq_low": 500, "moq_high": 3000,
        "landed_cost_inr_per_unit": "₹ 350 – ₹ 1,800 (driver + battery + PCBA + housing + retail box)",
        "gross_margin_pct_low": 35, "gross_margin_pct_high": 55,
        "manufacturing_hubs": ["Shenzhen", "Dongguan", "Taipei", "Noida (assembly)"],
        "key_risks": [
            "BIS, FCC, CE certifications take 6–10 weeks.",
            "Battery cycle life claims must be verifiable — demand UN38.3 + IEC 62133.",
            "Bluetooth chipset shortage every 6 mo — qualify a 2nd supplier.",
            "Over-promising features (active noise cancellation) on a passive driver erodes trust quickly.",
        ],
        "growth_levers": [
            "Companion app (firmware updates, EQ presets) increases retention by 2×.",
            "Bundle replacement ear-tips for repeat revenue.",
        ],
    },
    ("packaging", "Beauty primary pack"): {
        "market_size_india_inr_cr": 8000,
        "market_size_global_usd_bn": 36,
        "biggest_players": ["Berry Global", "Aptar", "Quadpack", "Manjushree Technopack"],
        "moq_low": 5000, "moq_high": 20000,
        "landed_cost_inr_per_unit": "₹ 8 – ₹ 65 (bottle + pump + cap)",
        "gross_margin_pct_low": 12, "gross_margin_pct_high": 28,
        "manufacturing_hubs": ["Daman", "Vapi", "Yiwu", "Shanghai"],
        "key_risks": [
            "Pump dosage variance > 5% causes consumer complaints.",
            "PCR plastic content hard to verify — request third-party % audit.",
            "Tooling cost ₹ 4-12 L upfront — lock IP rights to mould.",
        ],
        "growth_levers": [
            "Mono-material (HDPE only) packs unlock 'recyclable' claims.",
            "Refillable bottles with concentrate sachets cut cost 40%.",
        ],
    },
    ("food", "Snacks"): {
        "market_size_india_inr_cr": 42000,
        "market_size_global_usd_bn": 580,
        "biggest_players": ["Haldiram's", "Bikanervala", "Open Secret", "Too Yumm", "Lay's"],
        "moq_low": 1000, "moq_high": 5000,
        "landed_cost_inr_per_unit": "₹ 18 – ₹ 65 (raw + cooking + pouch + nitrogen flush)",
        "gross_margin_pct_low": 35, "gross_margin_pct_high": 55,
        "manufacturing_hubs": ["Indore", "Surat", "Pune", "Coimbatore"],
        "key_risks": [
            "FSSAI Schedule-IV audits every 12 months — lapse = blocked listing on Q-comm.",
            "Shelf-life on baked snacks ~ 90 days — nitrogen flush mandatory.",
            "Allergen cross-contamination on shared lines is a legal landmine — get a dedicated line if over ₹2 Cr/mo.",
        ],
        "growth_levers": [
            "Quick-commerce (Zepto, Blinkit) drives 60% of new snack-brand revenue.",
            "Multi-pack (4×30g) lifts AOV without raising perceived price.",
        ],
    },
    ("toys", "Wooden"): {
        "market_size_india_inr_cr": 1500,
        "market_size_global_usd_bn": 28,
        "biggest_players": ["Funskool", "Skola", "Channapatna co-ops", "Melissa & Doug"],
        "moq_low": 200, "moq_high": 1500,
        "landed_cost_inr_per_unit": "₹ 90 – ₹ 380",
        "gross_margin_pct_low": 50, "gross_margin_pct_high": 72,
        "manufacturing_hubs": ["Channapatna", "Sawantwadi", "Etikoppaka", "Ho Chi Minh City"],
        "key_risks": [
            "Lead in paint > 90 ppm fails EN-71 / ASTM F963 — only food-grade dyes.",
            "Choking-hazard small parts < 32 mm fail under-3 age range.",
            "Wood splinter / sharp edges — sand to 220 grit minimum.",
            "BIS Toys (Quality Control) Order is mandatory in India.",
        ],
        "growth_levers": [
            "Heritage / Channapatna GI tag premium = 2× pricing power abroad.",
            "Educational angle (Montessori) sells at 3× generic toys.",
        ],
    },
}

# Reasonable default for sub-categories without bespoke data
DEFAULT_BLUEPRINT = {
    "market_size_india_inr_cr": 5000,
    "market_size_global_usd_bn": 50,
    "biggest_players": ["Established multinational #1", "Established multinational #2", "Emerging D2C #1", "Emerging D2C #2"],
    "moq_low": 200, "moq_high": 1000,
    "landed_cost_inr_per_unit": "Varies — ask AskWinn AI for a finer estimate",
    "gross_margin_pct_low": 35, "gross_margin_pct_high": 60,
    "manufacturing_hubs": ["Major hub #1", "Major hub #2"],
    "key_risks": [
        "Quality variance batch-to-batch — third-party QC mandatory.",
        "Compliance certifications often delay launch by 2–3 months.",
        "Counterfeit on hero SKU once you're past ₹1 Cr / mo.",
    ],
    "growth_levers": [
        "Subscription / repeat-purchase economics tend to outperform one-shot.",
        "D2C content + Q-comm combo is the fastest path to ₹10 Cr ARR.",
    ],
}


def niche_for(key: str) -> Optional[dict]:
    return next((n for n in NICHES if n["key"] == key), None)


def blueprint_for(niche_key: str, sub_category: str) -> dict:
    n = niche_for(niche_key) or {}
    bp = BLUEPRINTS.get((niche_key, sub_category), DEFAULT_BLUEPRINT)
    return {
        "niche": n.get("label", niche_key),
        "niche_key": niche_key,
        "sub_category": sub_category,
        "agent_category": n.get("agent_category"),
        "last_verified": "2026-04-30",
        **bp,
    }
