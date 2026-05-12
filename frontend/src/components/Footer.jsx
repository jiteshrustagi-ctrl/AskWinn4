import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-[--border-soft] bg-bone">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="font-serif text-4xl tracking-tighter leading-none mb-4">Ask<span className="text-klein">Winn</span>.</div>
          <p className="text-sm text-[--muted-foreground] max-w-sm leading-relaxed">
            India's managed marketplace for brand founders. Post a brief. Get competing bids from verified manufacturers.
          </p>
        </div>
        <div>
          <div className="overline mb-4">Platform</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/directory" className="hover:text-klein transition-colors">Manufacturer Directory</Link></li>
            <li><Link to="/start" className="hover:text-klein transition-colors">Post an RFQ</Link></li>
            <li><Link to="/directory?verified=true" className="hover:text-klein transition-colors">Verified Partners</Link></li>
          </ul>
        </div>
        <div>
          <div className="overline mb-4">Company</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-klein transition-colors">About</Link></li>
            <li><Link to="/how-it-works" className="hover:text-klein transition-colors">How it works</Link></li>
            <li><Link to="/trust-safety" className="hover:text-klein transition-colors">Trust & safety</Link></li>
            <li><Link to="/contact" className="hover:text-klein transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[--border-soft]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6 flex items-center justify-between">
          <span className="font-mono text-xs text-[--muted-foreground]">© 2026 ASKWINN — EDITORIAL SOURCING</span>
          <span className="font-mono text-xs text-[--muted-foreground]">MADE FOR FOUNDERS</span>
        </div>
      </div>
    </footer>
  );
}
