import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-bone">
      <Navbar />
      <div className="max-w-[900px] mx-auto px-6 lg:px-10 py-20">
        <div className="overline mb-4">§ ABOUT ASKWINN</div>
        <h1 className="font-serif text-5xl lg:text-6xl font-light leading-tight tracking-tight mb-16">
          Built for the <em className="text-klein not-italic">builders</em>.
        </h1>

        <div className="space-y-16">
          <section>
            <h2 className="font-serif text-3xl tracking-tight mb-4">The Problem</h2>
            <p className="text-base leading-relaxed text-[--muted-foreground]">
              Sourcing shouldn't be a full-time job. Most D2C dreams die in the "Sourcing Gap" — the months wasted juggling six different vendors for one single product. We saw founders spending 80% of their time chasing bottle manufacturers and label printers instead of building their brand.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl tracking-tight mb-4">The Solution</h2>
            <p className="text-base leading-relaxed text-[--muted-foreground]">
              One Brief. Total Execution. We built AskWinn to change the power dynamic of procurement. We are not a directory — we are a high-fidelity bridge to India's best turnkey manufacturers. By focusing exclusively on end-to-end partners, we allow you to post a single requirement and receive ready-to-launch bids from factories that handle everything from formulation to final packaging.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl tracking-tight mb-4">Our Mission</h2>
            <p className="text-base leading-relaxed text-[--muted-foreground]">
              To turn 1,000 Ideas into 1,000 Retail-Ready Brands by 2027.
            </p>
          </section>

          <button onClick={() => nav("/start")} className="btn-primary mt-8">
            Post Your First Brief
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
