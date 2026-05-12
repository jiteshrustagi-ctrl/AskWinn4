import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, Lock, Award } from "lucide-react";

export default function TrustSafety() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-bone">
      <Navbar />
      <div className="max-w-[900px] mx-auto px-6 lg:px-10 py-20">
        <div className="overline mb-4">§ TRUST & SAFETY</div>
        <h1 className="font-serif text-5xl lg:text-6xl font-light leading-tight tracking-tight mb-4">
          The AskWinn <em className="text-klein not-italic">Standard</em>
        </h1>
        <p className="text-lg text-[--muted-foreground] mb-16">Built on transparency. Backed by verification.</p>

        <div className="space-y-16">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="w-6 h-6 text-klein" />
              <h2 className="font-serif text-3xl tracking-tight">01. Verified Turnkey Network</h2>
            </div>
            <ul className="space-y-4 text-base text-[--muted-foreground]">
              <li className="flex items-start gap-3">
                <span className="text-klein mt-1">•</span>
                <div>
                  <strong className="text-ink">Physical Audits:</strong> Every manufacturer in the AskWinn network undergoes a physical site verification to ensure they have the machinery, labour standards, and turnkey capabilities they claim.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-klein mt-1">•</span>
                <div>
                  <strong className="text-ink">Document Verification:</strong> We verify GST, PAN, and industry-specific certifications (ISO, GMP, etc.) for every factory before they can bid on your RFQ.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-klein mt-1">•</span>
                <div>
                  <strong className="text-ink">Zero Middlemen:</strong> You only interact with actual factory owners or authorised production heads — never third-party commission agents.
                </div>
              </li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-klein" />
              <h2 className="font-serif text-3xl tracking-tight">02. Intellectual Property Protection</h2>
            </div>
            <ul className="space-y-4 text-base text-[--muted-foreground]">
              <li className="flex items-start gap-3">
                <span className="text-klein mt-1">•</span>
                <div>
                  <strong className="text-ink">Anonymous Bidding:</strong> Your brand identity remains hidden during the initial bidding phase. Only after you accept a bid and choose to proceed is your identity revealed to the manufacturer.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-klein mt-1">•</span>
                <div>
                  <strong className="text-ink">Secure Data Vault:</strong> All uploaded designs and technical specifications are encrypted and accessible only to the vendors you explicitly authorise.
                </div>
              </li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-klein" />
              <h2 className="font-serif text-3xl tracking-tight">03. Transaction Security & Quality Gates</h2>
            </div>
            <ul className="space-y-4 text-base text-[--muted-foreground]">
              <li className="flex items-start gap-3">
                <span className="text-klein mt-1">•</span>
                <div>
                  <strong className="text-ink">Dispute Resolution:</strong> In the rare event of a specification mismatch, AskWinn provides a neutral mediation layer to review the original RFQ against the delivered batch.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-klein mt-1">•</span>
                <div>
                  <strong className="text-ink">Factory Ratings:</strong> Our community-driven rating system ensures that only the most reliable and high-quality manufacturers stay in the top tier of our network.
                </div>
              </li>
            </ul>
          </section>

          <button onClick={() => nav("/directory?verified=true")} className="btn-primary mt-8">
            View Verified Manufacturers
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
