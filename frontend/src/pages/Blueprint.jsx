import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, ArrowUpRight, MapPin, Users, Banknote, Percent, AlertTriangle, Sparkles, Calendar } from "lucide-react";

export default function Blueprint() {
  const { niche, subCategory } = useParams();
  const nav = useNavigate();
  const [bp, setBp] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`${API}/blueprints/${niche}/${encodeURIComponent(subCategory)}`)
      .then((r) => setBp(r.data))
      .catch((e) => setError(e.response?.data?.detail || "Could not load blueprint"));
  }, [niche, subCategory]);

  if (error) return (
    <div className="min-h-screen bg-bone p-20 text-center">
      <p className="font-mono text-sm">{error}</p>
      <button onClick={() => nav("/start")} className="btn-primary mt-4">Start over</button>
    </div>
  );
  if (!bp) return <div className="min-h-screen bg-bone p-20 text-center font-mono text-sm">Building your blueprint…</div>;

  const goToRFQ = () => {
    sessionStorage.setItem("askwinn_funnel_complete", "1");
    nav(`/rfqs/new?category=${encodeURIComponent(bp.agent_category || "")}&niche=${niche}&sub=${encodeURIComponent(subCategory)}`);
  };

  return (
    <div className="min-h-screen bg-bone">
      <Navbar />
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-12">
        <div className="overline mb-3">§ STEP 04 / 04 — YOUR BLUEPRINT</div>
        <div className="grid lg:grid-cols-12 gap-6 mb-10">
          <div className="lg:col-span-8">
            <h1 className="font-serif text-5xl lg:text-7xl font-light leading-[0.95] tracking-tight mb-3" data-testid="blueprint-title">
              {bp.niche} · <em className="text-klein not-italic">{bp.sub_category}</em>
            </h1>
            <div className="flex items-center gap-3 text-xs font-mono text-[--muted-foreground] flex-wrap">
              <Calendar className="w-3 h-3" />
              <span>VERIFIED {bp.last_verified}</span>
              <span>·</span>
              <span>FIELD-DATA SOURCE</span>
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex items-end justify-end">
            <button onClick={goToRFQ} className="btn-primary" data-testid="blueprint-rfq-cta">
              Get quotes now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Section 1: Market size */}
        <section className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="editorial-card p-8">
            <div className="overline mb-2">§ 01 — MARKET SIZE INDIA</div>
            <div className="font-serif text-6xl tracking-tight leading-none">₹ {bp.market_size_india_inr_cr.toLocaleString()}<span className="text-2xl text-[--muted-foreground] ml-2">Cr</span></div>
            <p className="text-sm text-[--muted-foreground] mt-3">Annual addressable market in India.</p>
          </div>
          <div className="editorial-card p-8">
            <div className="overline mb-2">§ 02 — MARKET SIZE GLOBAL</div>
            <div className="font-serif text-6xl tracking-tight leading-none">$ {bp.market_size_global_usd_bn}<span className="text-2xl text-[--muted-foreground] ml-2">B</span></div>
            <p className="text-sm text-[--muted-foreground] mt-3">Global category size (USD, latest year).</p>
          </div>
        </section>

        {/* Section 3-5: Numbers */}
        <section className="grid md:grid-cols-3 gap-6 mb-10">
          <Stat icon={Users} title="MOQ RANGE" big={`${bp.moq_low.toLocaleString()} – ${bp.moq_high.toLocaleString()}`} sub="units, typical for first run" />
          <Stat icon={Banknote} title="LANDED COST" big={bp.landed_cost_inr_per_unit} sub="per unit, end-to-end" small />
          <Stat icon={Percent} title="GROSS MARGIN" big={`${bp.gross_margin_pct_low}% – ${bp.gross_margin_pct_high}%`} sub="benchmarks at scale" />
        </section>

        {/* Biggest players */}
        <section className="editorial-card p-8 mb-10">
          <div className="overline mb-5">§ 03 — BIGGEST PLAYERS</div>
          <div className="flex flex-wrap gap-2">
            {bp.biggest_players.map((p) => (
              <span key={p} className="tag" data-testid="player-tag">{p}</span>
            ))}
          </div>
          <p className="text-sm text-[--muted-foreground] mt-5">
            Don't compete head-on — find a wedge (price, niche audience, story, channel) where they're slow.
          </p>
        </section>

        {/* Hubs */}
        <section className="editorial-card p-8 mb-10">
          <div className="overline mb-5 flex items-center gap-2"><MapPin className="w-3 h-3" /> § 04 — TOP MANUFACTURING HUBS</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {bp.manufacturing_hubs.map((h, i) => (
              <div key={h} className="p-4 border border-[--border-soft] flex items-center gap-3">
                <div className="font-mono text-xs text-klein">{String(i + 1).padStart(2, "0")}</div>
                <div className="font-serif text-xl">{h}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Risks */}
        <section className="editorial-card p-8 mb-10 border-l-4 border-l-burn">
          <div className="overline mb-5 flex items-center gap-2 text-burn"><AlertTriangle className="w-3 h-3" /> § 05 — KEY RISKS TO AVOID</div>
          <ul className="space-y-3">
            {bp.key_risks.map((r, i) => (
              <li key={i} className="flex gap-3" data-testid="risk-item">
                <span className="font-mono text-xs text-burn flex-shrink-0 mt-1">·</span>
                <span className="text-sm leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Growth levers */}
        {bp.growth_levers && (
          <section className="editorial-card p-8 mb-10 border-l-4 border-l-klein">
            <div className="overline mb-5 flex items-center gap-2 text-klein"><Sparkles className="w-3 h-3" /> § 06 — GROWTH LEVERS</div>
            <ul className="space-y-3">
              {bp.growth_levers.map((g, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-mono text-xs text-klein flex-shrink-0 mt-1">↗</span>
                  <span className="text-sm leading-relaxed">{g}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* CTA */}
        <section className="bg-klein text-white p-10 lg:p-16 relative overflow-hidden">
          <div className="overline text-white/60 mb-5">READY TO FIND YOUR MANUFACTURER?</div>
          <h2 className="font-serif text-4xl lg:text-6xl font-light leading-[0.95] tracking-tight mb-8 max-w-2xl">
            Vendors will <em className="text-burn not-italic">bid</em> for your order.
          </h2>
          <div className="flex flex-wrap gap-3">
            <button onClick={goToRFQ} className="btn-accent" data-testid="blueprint-cta-btn">
              Get quotes now <ArrowUpRight className="w-4 h-4" />
            </button>
            <Link to={`/directory?category=${encodeURIComponent(bp.agent_category || "")}`} className="bg-transparent text-white border border-white/40 hover:border-white px-5 py-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em]">
              Or browse vendors first
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

const Stat = ({ icon: Icon, title, big, sub, small = false }) => (
  <div className="editorial-card p-7">
    <Icon className="w-4 h-4 text-klein mb-3" />
    <div className="overline mb-2 text-[10px]">{title}</div>
    <div className={`font-serif tracking-tight leading-none ${small ? "text-2xl" : "text-4xl"}`}>{big}</div>
    <p className="text-xs text-[--muted-foreground] mt-3">{sub}</p>
  </div>
);
