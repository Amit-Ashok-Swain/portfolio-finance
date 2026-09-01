import { useEffect, useState } from "react";
import { audio } from "../utils/audio";

const SECTIONS = [
  { id: "hero", label: "HERO" },
  { id: "work-section", label: "PRODUCTS" },
  { id: "system-section", label: "ARCHITECTURE" },
  { id: "spatial-section", label: "3D TUNNEL" },
  { id: "metrics-section", label: "METRICS" },
  { id: "expertise-section", label: "EXPERTISE" },
  { id: "certifications-section", label: "CERTS" },
  { id: "trajectory-section", label: "TRAJECTORY" },
  { id: "endorsements-section", label: "ENDORSEMENTS" },
  { id: "contact-section", label: "COMMLINK" },
];

export default function HUDNavigation() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight;
      if (window.scrollY < 250) {
        setActiveSection("hero");
        return;
      }

      for (const section of SECTIONS) {
        if (section.id === "hero") continue;
        const el = document.getElementById(section.id);
        if (el) {
          const wrapper = el.closest(".pin-spacer") || el;
          const rect = wrapper.getBoundingClientRect();
          if (rect.top <= vh * 0.45 && rect.bottom >= vh * 0.2) {
            setActiveSection(section.id);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    audio.playClick();
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const wrapper = el.closest(".pin-spacer") || el;
      wrapper.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden 2xl:flex flex-col items-end gap-3 pointer-events-auto select-none"
      aria-label="Section HUD navigation"
    >
      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 rounded-full p-2.5 flex flex-col items-center gap-3.5 shadow-lg">
        {SECTIONS.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              onMouseEnter={() => audio.playHover()}
              className="group relative flex items-center justify-center cursor-pointer"
              title={`Jump to ${section.label}`}
              aria-label={`Jump to ${section.label}`}
            >
              {/* Tooltip */}
              <span className="absolute right-7 px-2.5 py-1 rounded-md bg-slate-900 dark:bg-slate-800 text-white font-mono text-[9px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-md -translate-x-1 group-hover:translate-x-0">
                {section.label}
              </span>

              {/* Dot */}
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? "w-2.5 h-6 bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.8)]"
                    : "w-2 h-2 bg-slate-400 dark:bg-slate-700 hover:bg-orange-400 dark:hover:bg-orange-400"
                }`}
              ></div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
