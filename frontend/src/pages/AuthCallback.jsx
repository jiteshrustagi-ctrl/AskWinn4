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
      console.error("No session_id in URL hash:", hash);
      nav("/", { replace: true });
      return;
    }
    const sessionId = match[1];
    const desiredRole = localStorage.getItem("askwinn_desired_role");
    
    // Check if we have funnel data to resume the buyer journey
    const funnelComplete = sessionStorage.getItem("askwinn_funnel_complete");
    const funnelNiche = sessionStorage.getItem("askwinn_funnel_niche");
    
    console.log("Auth callback:", { sessionId, desiredRole, funnelComplete, funnelNiche });
    
    (async () => {
      try {
        const r = await axios.post(
          `${API}/auth/session`,
          { session_id: sessionId, desired_role: desiredRole || null },
          { withCredentials: true },
        );
        console.log("Auth session response:", r.data);
        localStorage.removeItem("askwinn_desired_role");
        setUser(r.data);
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Handle routing based on role and context
        if (r.data.role === "unassigned") {
          console.log("Redirecting to role selection");
          nav("/select-role", { replace: true, state: { user: r.data } });
        } else if (r.data.role === "buyer" && funnelComplete === "1" && funnelNiche) {
          // Resume buyer funnel - go to sub-category selection
          console.log("Resuming buyer funnel:", funnelNiche);
          sessionStorage.removeItem("askwinn_funnel_complete");
          nav(`/onboarding/sub-category?niche=${funnelNiche}`, { replace: true });
        } else if (r.data.role === "agent") {
          console.log("Redirecting agent to profile");
          nav("/profile/edit", { replace: true, state: { user: r.data } });
        } else {
          console.log("Redirecting to dashboard");
          nav("/dashboard", { replace: true, state: { user: r.data } });
        }
      } catch (err) {
        console.error("Auth callback error:", err.response?.data || err.message);
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
