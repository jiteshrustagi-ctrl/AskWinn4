import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowUpRight, Zap, ShieldCheck, MessageSquare, Sparkles, Briefcase, Factory } from "lucide-react";
import axios from "axios";
import { API } from "@/context/AuthContext";

const HERO_TEXTURE = "https://static.prod-images.emergentagent.com/jobs/cc07fdd8-74b2-4bb7-a874-33220127e764/images/9bb95dabd9ff5d0452db5805fbde0e07bd2d55b09c73129a50483f31a89641b0.png";
const ABSTRACT = "https://static.prod-images.emergentagent.com/jobs/cc07fdd8-74b2-4bb7-a874-33220127e764/images/7c7a0768dddc8939296fa181c0046def32f71a13720a185229cb718cd268aca9.png";
const FACTORY = "https://images.pexels.com/photos/34783124/pexels-photo-34783124.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const CATEGORIES = [
  "Textile & Apparel", "Consumer Electronics", "Packaging", "Home Goods",
  "Beauty & Cosmetics", "Food & Beverage", "Hardware", "Toys & Games",
];

export default function Landing() {
  const [featured, setFeatured] = useState([]);
  const [networkStats, setNetworkStats] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    axios.get(`${API}/agents?verified=true`).then((r) => setFeatured(r.data.slice(0, 3))).catch(() => {});
    axios.get(`${API}/network/stats`).then((r) => setNetworkStats(r.data)).catch(() => {});
  }, []);

  const startLogin = (role) => {
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    if (role) localStorage.setItem("askwinn_desired_role", role);
    else localStorage.removeItem("askwinn_desired_role");
    const redirectUrl = window.location.origin + "/dashboard";
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  const startBuyerFunnel = () => {
    nav("/start");
  };

  return (
    <div className="min-h-screen bg-bone text-ink">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-16 pb-24 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 flex flex-col justify-center reveal">
            <h1 className="font-serif text-[3.4rem] sm:text-[5rem] lg:text-[7rem] font-light leading-[0.92] tracking-[-0.04em]">
              Don't search for <em className="text-klein not-italic">manufacturers</em>.<br />
              Make them <span className="relative">bid<span className="absolute -bottom-1 left-0 right-0 h-1 bg-burn"></span></span> for your brand.
            </h1>
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-[--muted-foreground]">
              AskWinn is the closed bidding engine where verified Indian manufacturers compete for your order. You set the brief — they bring the bids.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <button onClick={startBuyerFunnel} className="btn-primary" data-testid="hero-buyer-btn">
                <Briefcase className="w-4 h-4" /> Start your brief
              </button>
              <button onClick={() => startLogin("agent")} className="btn-accent" data-testid="hero-agent-btn">
                <Factory className="w-4 h-4" /> Manufacturer sign in
              </button>
              <a href="mailto:askwinnb2b@gmail.com?subject=I'd%20like%20to%20talk%20to%20an%20AskWinn%20expert" className="btn-outline" data-testid="hero-expert-btn">
                <MessageSquare className="w-4 h-4" /> Talk to an expert
              </a>
            </div>
            <div className="mt-16">
              <p className="text-sm text-[--muted-foreground]">Currently onboarding verified manufacturers</p>
            </div>
          </div>
          <div className="lg:col-span-5 relative reveal-2">
            <div className="grid grid-cols-2 gap-3 auto-rows-min">
              <div className="bg-white rounded-xl p-4 shadow-sm row-span-2 flex flex-col items-center justify-center gap-3">
                <div className="text-4xl">👕</div>
                <span className="text-xs font-bold uppercase bg-burn text-white px-2 py-0.5 rounded-full">YOUR LABEL</span>
                <div className="text-xs text-[--muted-foreground]">Apparel</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center justify-center gap-2">
                <div className="text-3xl">🧴</div>
                <span className="text-[10px] font-bold uppercase bg-burn text-white px-2 py-0.5 rounded-full">YOUR BRAND</span>
                <div className="text-[11px] text-[--muted-foreground]">Beauty</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center justify-center gap-2">
                <div className="text-3xl">📦</div>
                <span className="text-[10px] font-bold uppercase bg-burn text-white px-2 py-0.5 rounded-full">CUSTOM PRINT</span>
                <div className="text-[11px] text-[--muted-foreground]">Packaging</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm col-span-2 flex flex-row items-center justify-center gap-4">
                <div className="text-3xl">🕯️</div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase bg-burn text-white px-2 py-0.5 rounded-full self-start">YOUR LABEL</span>
                  <div className="text-[11px] text-[--muted-foreground]">Home Goods</div>
                </div>
                <div className="text-3xl">🥜</div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase bg-burn text-white px-2 py-0.5 rounded-full self-start">YOUR BRAND</span>
                  <div className="text-[11px] text-[--muted-foreground]">Food & Snacks</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-28">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-4">
            <div className="overline mb-4">§ 01 — Method</div>
            <h2 className="font-serif text-5xl lg:text-6xl font-light leading-[0.95] tracking-tight">
              Three steps.<br />Zero chaos.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 text-lg text-[--muted-foreground] leading-relaxed">
            Sourcing a manufacturer is the part nobody tells you about. We made it the easiest part.
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { i: Zap, t: "Post an RFQ", d: "Drop your spec — quantity, timeline, budget. We keep it private by default.", tag: "STEP 01" },
            { i: Sparkles, t: "We match manufacturers", d: "Our team reviews your brief and surfaces the three best-fit verified manufacturers for your requirement.", tag: "STEP 02" },
            { i: MessageSquare, t: "Quote → chat → ship", d: "Manufacturers respond in-thread. Compare quotes, lead times, and start the build.", tag: "STEP 03" },
          ].map((s, i) => (
            <div key={i} className="editorial-card p-8" style={{ animation: `reveal 0.6s ease-out ${i * 100}ms both` }}>
              <div className="overline mb-6">{s.tag}</div>
              <s.i className="w-6 h-6 text-klein mb-6" />
              <h3 className="font-serif text-3xl mb-3 tracking-tight leading-tight">{s.t}</h3>
              <p className="text-sm text-[--muted-foreground] leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-ink text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-28">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
            <div>
              <div className="overline mb-4 text-burn">§ 02 — Industries we cover</div>
              <h2 className="font-serif text-5xl lg:text-6xl font-light leading-none tracking-tight">What do you<br /><em>actually</em> need to ship?</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
            {CATEGORIES.map((c, i) => (
              <button
                key={c}
                onClick={startBuyerFunnel}
                className="bg-ink hover:bg-klein p-8 transition-colors group text-left"
                data-testid={`cat-${c.replace(/\s+/g, "-").toLowerCase()}`}
              >
                <div className="font-mono text-xs opacity-50 mb-8">{String(i + 1).padStart(2, "0")}</div>
                <div className="font-serif text-2xl leading-tight group-hover:translate-x-1 transition-transform">{c}</div>
                <ArrowUpRight className="w-4 h-4 mt-6 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-28 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 relative aspect-[4/5] order-2 lg:order-1">
          <img src={FACTORY} alt="Factory" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute top-6 left-6 tag verified">VERIFIED PARTNER</div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8 order-1 lg:order-2">
          <div className="overline mb-4">§ 03 — Trust</div>
          <h2 className="font-serif text-5xl lg:text-6xl font-light leading-[0.95] tracking-tight mb-8">
            Every manufacturer, <em className="text-klein not-italic">verified</em>.
          </h2>
          <p className="text-lg text-[--muted-foreground] mb-8 leading-relaxed">
            Our ops team checks business licences, factory audits, and capacity against actual orders. You won't find drop-shippers wearing factory uniforms here.
          </p>
          <div className="space-y-4">
            {["Business licence & tax ID verified", "Factory walkthrough video on record", "Minimum 3 production references", "NDA + IP protection by default"].map((x) => (
              <div key={x} className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-klein mt-0.5 flex-shrink-0" />
                <span className="text-sm">{x}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20">
        <div className="bg-klein text-white p-12 lg:p-20 relative overflow-hidden">
          <img src={ABSTRACT} alt="" className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-30 mix-blend-screen" />
          <div className="relative max-w-3xl">
            <div className="overline text-white/70 mb-6">READY?</div>
            <h2 className="font-serif text-5xl lg:text-7xl font-light leading-[0.95] tracking-tight mb-10">
              Your next SKU is<br />one RFQ away.
            </h2>
            <button onClick={startBuyerFunnel} className="btn-accent" data-testid="cta-start-btn">
              Start as a buyer <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const Stat = ({ n, l }) => (
  <div>
    <div className="font-serif text-4xl lg:text-5xl tracking-tight leading-none">{n}</div>
    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[--muted-foreground] mt-2">{l}</div>
  </div>
);
