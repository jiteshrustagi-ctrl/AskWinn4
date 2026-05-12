import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth, API } from "@/context/AuthContext";

export default function AuthCallback() {
  const nav = useNavigate();
  const { setUser } = useAuth();
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;
    processed.current = true;
    const hash = window.location.hash || "";
    const match = hash.match(/session_id=([^&]+)/);
    if (!match) {
      nav("/", { replace: true });
      return;
    }
    const sessionId = match[1];
    const desiredRole = localStorage.getItem("askwinn_desired_role");
    
    // Check if we have funnel data to resume the buyer journey
    const funnelComplete = sessionStorage.getItem("askwinn_funnel_complete");
    const funnelNiche = sessionStorage.getItem("askwinn_funnel_niche");
    
    (async () => {
      try {
        const r = await axios.post(
          `${API}/auth/session`,
          { session_id: sessionId, desired_role: desiredRole || null },
          { withCredentials: true },
        );
        localStorage.removeItem("askwinn_desired_role");
        setUser(r.data);
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Handle routing based on role and context
        if (r.data.role === "unassigned") {
          nav("/select-role", { replace: true, state: { user: r.data } });
        } else if (r.data.role === "buyer" && funnelComplete === "1" && funnelNiche) {
          // Resume buyer funnel - go to sub-category selection
          sessionStorage.removeItem("askwinn_funnel_complete");
          nav(`/onboarding/sub-category?niche=${funnelNiche}`, { replace: true });
        } else if (r.data.role === "agent") {
          nav("/profile/edit", { replace: true, state: { user: r.data } });
        } else {
          nav("/dashboard", { replace: true, state: { user: r.data } });
        }
      } catch {
        nav("/", { replace: true });
      }
    })();
  }, [nav, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bone">
      <div className="text-center">
        <div className="overline mb-4">AUTHENTICATING</div>
        <div className="font-serif text-4xl">Setting up your workspace…</div>
      </div>
    </div>
  );
}
