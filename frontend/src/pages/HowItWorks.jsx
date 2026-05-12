import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Lightbulb, Users, Rocket } from "lucide-react";

export default function HowItWorks() {
  const nav = useNavigate();

  const steps = [
    {
      num: "01",
      icon: FileText,
      title: "Construct a High-Fidelity Brief",
      desc: "Go beyond basic ideas. Our guided interface helps you build a Technical RFQ by capturing precise details — from material grades and formulations to packaging specs. The more precise your brief, the more accurate and competitive your factory bids will be."
    },
    {
      num: "02",
      icon: Lightbulb,
      title: "Unlock the Blueprint",
      desc: "Receive a data-backed strategy report for your niche — including real-world MOQs, expected margins, and landed cost estimates — before you spend a single rupee."
    },
    {
      num: "03",
      icon: Users,
      title: "Factories Bid for You",
      desc: "Your brief is sent to our closed network of verified, turnkey manufacturers. Instead of you chasing factories, they compete to win your business with their best quotes."
    },
    {
      num: "04",
      icon: Rocket,
      title: "Deploy & Scale",
      desc: "Review bids, approve a sample, and initiate production. We stay in the loop to ensure your end-to-end delivery is seamless and secure."
    }
  ];

  return (
    <div className="min-h-screen bg-bone">
      <Navbar />
      <div className="max-w-[1100px] mx-auto px-6 lg:px-10 py-20">
        <div className="overline mb-4">§ THE ASKWINN PROCESS</div>
        <h1 className="font-serif text-5xl lg:text-6xl font-light leading-tight tracking-tight mb-6">
          How AskWinn Delivers<br />Your <em className="text-klein not-italic">Brand</em>
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {steps.map((step) => (
            <div key={step.num} className="editorial-card p-8">
              <div className="overline mb-6">STEP {step.num}</div>
              <step.icon className="w-6 h-6 text-klein mb-4" />
              <h3 className="font-serif text-2xl tracking-tight mb-3">{step.title}</h3>
              <p className="text-sm text-[--muted-foreground] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button onClick={() => nav("/start")} className="btn-primary">
            Start Your Brief
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
