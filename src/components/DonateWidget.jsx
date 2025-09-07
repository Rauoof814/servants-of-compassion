import React from "react";
import { motion } from "framer-motion";
import { HandHeart, Settings, X } from "lucide-react";
import useSite from "../store/useSite";
import ProgressBar from "./ProgressBar";

function useCountUp(value, duration = 1200) {
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    let raf; const start = performance.now(); const to = Number(value) || 0;
    const step = (t) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    }; raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf);
  }, [value, duration]); return n;
}

export default function DonateWidget({ compact = false }) {
  const { state, setDonations } = useSite();
  const cfg = state.donations || {};
  const url = cfg.url || "https://givebutter.com/ZTvE7r";
  const goal = Number(cfg.goal || 0);
  const raised = Number(cfg.raised || 0);
  const pct = goal ? Math.min(100, (raised / goal) * 100) : 0;
  const [openModal, setOpenModal] = React.useState(false);
  const [showOptions, setShowOptions] = React.useState(false);

  const raisedAnim = useCountUp(raised);
  const pctAnim = useCountUp(Math.round(pct));

  const openDonate = () => {
    if (cfg.embed === "inline") {
      // Just scroll down to the iframe area
      document.getElementById("inline-donate")?.scrollIntoView({ behavior: "smooth" });
    } else if (cfg.embed === "modal") {
      setOpenModal(true);
    } else {
      window.open(url, "_blank", "noopener");
    }
  };

  const quick = (amt) => {
    window.open(`${url}${url.includes("?") ? "&" : "?"}amount=${amt}`, "_blank", "noopener");
  };

  return (
    <div className={`card ${compact ? "p-4" : "p-6"}`}>
      <div className="flex items-center justify-between gap-4">
        <div className="font-bold">Donation Progress</div>
        <div className="text-sm opacity-80">
          ${raisedAnim.toLocaleString()} / ${goal.toLocaleString()}
        </div>
      </div>
      <div className="mt-2">
        <ProgressBar value={pctAnim} />
        <div className="text-xs opacity-70 mt-1">{pctAnim}% toward goal</div>
      </div>

      {/* primary action — simple, one click */}
      <div className="mt-4 flex gap-2">
        <button onClick={openDonate} className="btn btn-yellow flex-1">
          <HandHeart className="w-4 h-4" />
          Donate
        </button>
        <button className="btn" onClick={() => setShowOptions((v) => !v)} aria-expanded={showOptions}>
          <Settings className="w-4 h-4" /> Options
        </button>
      </div>

      {/* quick amounts */}
      <div className="mt-3 flex flex-wrap gap-2">
        {[25, 50, 100, 250, 500].map((a) => (
          <button key={a} onClick={() => quick(a)} className="btn text-sm">
            ${a}
          </button>
        ))}
      </div>

      {/* optional controls (collapsed by default) */}
      {showOptions && (
        <div className="mt-4 grid gap-3">
          <div className="text-sm opacity-80">Choose how to display the form:</div>
          <div className="grid gap-2 md:grid-cols-3">
            {["link", "modal", "inline"].map((mode) => (
              <label key={mode} className="card p-3 cursor-pointer">
                <input
                  type="radio"
                  name="embed"
                  className="mr-2"
                  checked={cfg.embed === mode}
                  onChange={() => setDonations({ ...cfg, embed: mode })}
                />
                <b className="capitalize">{mode}</b>
                <div className="text-xs opacity-70">
                  {mode === "link" && "Open the provider page in a new tab."}
                  {mode === "modal" && "Open an overlay without leaving this page."}
                  {mode === "inline" && "Show the form embedded below."}
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* inline iframe */}
      {cfg.embed === "inline" && cfg.url && (
        <div id="inline-donate" className="mt-4 card p-2 bg-black/20">
          <iframe src={url} className="w-full h-[480px] rounded-xl border-0" />
        </div>
      )}

      {/* modal */}
      {cfg.embed === "modal" && openModal && (
        <div className="fixed inset-0 bg-black/70 p-6 flex items-center justify-center z-[6000]">
          <div className="bg-slate-900 rounded-2xl border border-white/10 w-[min(1000px,100%)] overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b border-white/10">
              <b>Complete your donation</b>
              <button className="btn" onClick={() => setOpenModal(false)}>
                <X className="w-4 h-4" /> Close
              </button>
            </div>
            <iframe src={url} className="w-full h-[75vh] border-0" />
          </div>
        </div>
      )}
    </div>
  );
}
