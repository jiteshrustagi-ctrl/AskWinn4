import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { ArrowRight } from "lucide-react";

export default function SubCategorySelect() {
  const [params] = useSearchParams();
  const niche = params.get("niche");
  const nav = useNavigate();
  const [niches, setNiche] = useState(null);
  const [picked, setPicked] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!niche) return;
    axios.get(`${API}/niches/${niche}`).then((r) => setNiche(r.data));
  }, [niche]);

  const next = async () => {
    if (!picked) return;
    setBusy(true);
    let answers = {};
    try { answers = JSON.parse(sessionStorage.getItem("askwinn_funnel_answers") || "{}"); } catch {}
    try {
      await axios.put(`${API}/users/me/profile`, {
        niche,
        sub_category: picked,
        business_model: answers.business_model || "",
        chat_answers: answers,
      });
    } catch {}
    nav(`/blueprint/${niche}/${encodeURIComponent(picked)}`);
  };

  if (!niches) return <div className="min-h-screen bg-bone p-20 text-center font-mono text-sm">Loading…</div>;

  return (
    <div className="min-h-screen bg-bone">
      <Navbar />
      <div className="max-w-[1100px] mx-auto px-6 lg:px-10 py-16">
        <div className="overline mb-3">§ STEP 03 / 04 — NARROW IT DOWN</div>
        <h1 className="font-serif text-4xl lg:text-6xl font-light leading-tight tracking-tight mb-4">
          Which slice of <em className="text-klein not-italic">{niches.label.toLowerCase()}</em>?
        </h1>
        <p className="text-base text-[--muted-foreground] mb-12 max-w-xl">
          Different sub-categories have wildly different MOQs, margins, and risks — pick the closest fit.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10" data-testid="sub-category-grid">
          {niches.sub_categories.map((s) => (
            <button
              key={s}
              onClick={() => setPicked(s)}
              className={`editorial-card p-7 text-left transition-all ${picked === s ? "border-klein border-2 bg-klein/5" : "hover:border-ink"}`}
              data-testid={`sub-cat-${s.replace(/\s+/g, "-").toLowerCase()}`}
            >
              <div className="font-mono text-[10px] text-[--muted-foreground] mb-3">SUB-CATEGORY</div>
              <div className="font-serif text-2xl tracking-tight">{s}</div>
              {picked === s && <div className="overline text-[10px] text-klein mt-3">SELECTED ✓</div>}
            </button>
          ))}
        </div>

        <button
          onClick={next}
          disabled={!picked || busy}
          className="btn-primary"
          data-testid="sub-cat-next-btn"
        >
          {busy ? "Loading…" : "See my Blueprint"} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
