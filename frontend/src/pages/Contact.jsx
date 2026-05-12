import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-bone">
      <Navbar />
      <div className="max-w-[700px] mx-auto px-6 lg:px-10 py-20">
        <div className="overline mb-4">§ GET IN TOUCH</div>
        <h1 className="font-serif text-5xl lg:text-6xl font-light leading-tight tracking-tight mb-6">
          We're here to <em className="text-klein not-italic">help</em>.
        </h1>
        <p className="text-lg text-[--muted-foreground] mb-16">
          Have a specific manufacturing requirement or need help building your technical brief? Our team is ready to assist.
        </p>

        <div className="editorial-card p-8 space-y-6">
          <div className="flex items-start gap-4">
            <Mail className="w-5 h-5 text-klein mt-1 flex-shrink-0" />
            <div>
              <div className="overline mb-2">EMAIL</div>
              <a href="mailto:askwinnb2b@gmail.com" className="text-lg hover:text-klein transition-colors">
                askwinnb2b@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="w-5 h-5 text-klein mt-1 flex-shrink-0" />
            <div>
              <div className="overline mb-2">PHONE / WHATSAPP</div>
              <a href="tel:+918796132668" className="text-lg hover:text-klein transition-colors">
                +91 8796132668
              </a>
            </div>
          </div>
        </div>

        <p className="text-sm text-[--muted-foreground] mt-8">
          We typically respond within 24 hours on business days.
        </p>
      </div>
      <Footer />
    </div>
  );
}
