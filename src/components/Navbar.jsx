import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { audio } from "../utils/audio";
import { Sparkles, Command } from "lucide-react";
import AiAssistantModal from "./AiAssistantModal";

const NAV_ITEMS = [
  { label: "WORK", target: "work-section" },
  { label: "SYSTEM", target: "system-section" },
  { label: "3D TUNNEL", target: "spatial-section" },
  { label: "METRICS", target: "metrics-section" },
  { label: "EXPERTISE", target: "expertise-section" },
  { label: "CONTACT", target: "contact-section" },
];

export default function Navbar({ toggleTheme }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [time, setTime] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(() => !audio.isMuted);
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Listen to audio-toggled event from Command Palette, hotkeys, or anywhere
  useEffect(() => {
    const handleAudioToggle = (e) => {
      if (e.detail) {
        setIsAudioOn(!e.detail.isMuted);
      }
    };
    window.addEventListener("audio-toggled", handleAudioToggle);
    return () => window.removeEventListener("audio-toggled", handleAudioToggle);
  }, []);

  useEffect(() => {
    const handleOpenAi = () => {
      setIsAiModalOpen(true);
      audio.playCommand();
    };
    window.addEventListener("open-ai-modal", handleOpenAi);
    return () => window.removeEventListener("open-ai-modal", handleOpenAi);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  // Robust Pin-Spacer Aware Active Section Observer
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.target);

    const checkActive = () => {
      const vh = window.innerHeight;
      if (window.scrollY < 200) {
        setActiveSection("");
        return;
      }

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const wrapper = el.closest(".pin-spacer") || el;
          const rect = wrapper.getBoundingClientRect();
          if (rect.top <= vh * 0.45 && rect.bottom >= vh * 0.2) {
            setActiveSection(id);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", checkActive, { passive: true });
    checkActive();
    return () => window.removeEventListener("scroll", checkActive);
  }, []);

  const handleMagneticMove = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.3, ease: "power3.out" });
  };

  const handleMagneticLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  const scrollToSection = (targetId) => {
    audio.playClick();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const wrapper = targetEl.closest(".pin-spacer") || targetEl;
          wrapper.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
      return;
    }
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const wrapper = targetEl.closest(".pin-spacer") || targetEl;
      wrapper.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-2 sm:top-3 left-1/2 -translate-x-1/2 z-[9999] w-[95%] max-w-6xl flex items-center justify-between px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full border bg-white/85 dark:bg-slate-950/75 backdrop-blur-2xl border-slate-200/80 dark:border-slate-800/80 transition-colors duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
      >
        {/* Left Branding */}
        <Link
          to="/"
          className="flex font-mono tracking-widest items-center gap-2 sm:gap-3 shrink-0 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          onMouseEnter={() => audio.playHover()}
        >
          <div className="relative">
            <img
              src="/icon.svg"
              alt="Amit Ashok Swain"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-orange-500/50 shadow-[0_0_12px_rgba(249,115,22,0.4)] object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-950 animate-pulse"></span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white tracking-wider flex items-center gap-1">
              AMIT_OS
              <span className="text-[8px] px-1 py-0.2 rounded bg-orange-500/15 text-orange-600 dark:text-orange-400 font-bold hidden sm:inline">
                v3.4
              </span>
            </span>
            <span className="hidden sm:inline text-[9px] text-slate-500 dark:text-slate-400 font-mono">
              {time}
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation Pills with Active Highlight */}
        <div className="hidden xl:flex items-center gap-1 font-mono text-xs font-bold tracking-widest bg-slate-100/80 dark:bg-slate-900/60 px-2 py-1 rounded-full border border-slate-200/60 dark:border-slate-800/60">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.target;
            return (
              <button
                key={item.label}
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                onMouseEnter={() => audio.playHover()}
                onClick={() => scrollToSection(item.target)}
                className={`px-3.5 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-orange-500 text-white shadow-[0_0_12px_rgba(249,115,22,0.6)] font-black scale-105"
                    : "text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Tools & Audio & AI Agent */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* AI Neural Agent Trigger */}
          <button
            onClick={() => {
              audio.playCommand();
              setIsAiModalOpen(true);
            }}
            onMouseEnter={() => audio.playHover()}
            className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full border border-orange-500/40 bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 dark:text-orange-400 font-mono text-xs font-bold transition-all shadow-[0_0_12px_rgba(249,115,22,0.2)] active:scale-95 cursor-pointer"
            title="Ask AI Persona about Amit"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
            <span className="hidden md:inline">ASK AI</span>
          </button>

          {/* Audio Visualizer Wave / Button */}
          <button
            onClick={() => {
              const isNowMuted = audio.toggleMute();
              setIsAudioOn(!isNowMuted);
              audio.playToggle();
            }}
            onMouseEnter={() => audio.playHover()}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border transition-all duration-300 text-xs font-mono cursor-pointer ${
              isAudioOn
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                : "border-slate-300 dark:border-slate-700 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
            title={isAudioOn ? "Mute Audio (Press M)" : "Enable Audio (Press M)"}
            aria-label="Toggle Sound"
          >
            {isAudioOn ? (
              <div className="flex items-center gap-0.5 h-3">
                <span className="w-0.5 h-2 bg-emerald-500 animate-[bounce_1s_infinite_100ms] rounded-full"></span>
                <span className="w-0.5 h-3 bg-emerald-500 animate-[bounce_1s_infinite_300ms] rounded-full"></span>
                <span className="w-0.5 h-1.5 bg-emerald-500 animate-[bounce_1s_infinite_200ms] rounded-full"></span>
              </div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
            )}
            <span className="hidden lg:inline text-[10px] font-bold">
              {isAudioOn ? "AUDIO ON" : "MUTED"}
            </span>
          </button>

          {/* CMD Palette Trigger Button */}
          <button
            onClick={() => {
              audio.playCommand();
              window.dispatchEvent(new CustomEvent("open-command-palette"));
            }}
            onMouseEnter={() => audio.playHover()}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-mono text-xs font-bold transition-all hover:border-orange-500 active:scale-95 cursor-pointer"
            title="Open Command Palette (⌘K)"
          >
            <Command className="w-3 h-3 text-orange-500" />
            <span className="hidden sm:inline">CMD</span>
            <kbd className="hidden sm:inline text-[9px] bg-slate-200 dark:bg-slate-800 px-1 rounded text-slate-500">⌘K</kbd>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={() => {
              audio.playToggle();
              toggleTheme();
            }}
            onMouseEnter={() => audio.playHover()}
            className="w-8 h-8 flex items-center justify-center rounded-full border transition-all bg-orange-500 border-orange-600 text-white dark:bg-slate-900 dark:border-slate-700 dark:text-orange-500 dark:hover:bg-orange-500/20 active:scale-95 cursor-pointer"
            title="Toggle Light/Dark Theme (Press T)"
            aria-label="Toggle Theme"
          >
            <span className="block dark:hidden text-xs">☀</span>
            <span className="hidden dark:block text-xs">☾</span>
          </button>

          {/* Mobile / Tablet Menu Button */}
          <button
            className="xl:hidden relative w-8 h-8 flex justify-center items-center rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors duration-500 cursor-pointer"
            onClick={() => {
              audio.playClick();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            aria-label="Toggle Mobile Menu"
          >
            <span
              className={`absolute w-3.5 h-[1.5px] bg-slate-900 dark:bg-white transition-all duration-300 ease-out ${
                isMobileMenuOpen ? "rotate-45" : "-translate-y-1"
              }`}
            ></span>
            <span
              className={`absolute w-3.5 h-[1.5px] bg-slate-900 dark:bg-white transition-all duration-300 ease-out ${
                isMobileMenuOpen ? "-rotate-45" : "translate-y-1"
              }`}
            ></span>
          </button>
        </div>
      </nav>

      {/* AI Assistant Modal */}
      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[9998] xl:hidden bg-slate-50/98 dark:bg-slate-950/98 backdrop-blur-3xl flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto scale-100"
            : "opacity-0 pointer-events-none scale-105"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-orange-600 dark:text-orange-500 font-mono text-[10px] tracking-[0.4em] uppercase mb-1">
            AMIT_OS // NAVIGATION
          </span>

          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setIsMobileMenuOpen(false);
                setTimeout(() => scrollToSection(item.target), 300);
              }}
              className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-slate-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-500 transition-colors"
            >
              {item.label}
            </button>
          ))}

          {/* Quick Case Study Links on Mobile */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center gap-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              CASE STUDIES
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { name: "DeepVid.ai", slug: "deepvid-ai" },
                { name: "SongGPT", slug: "songgpt" },
                { name: "Sound Of Meme", slug: "sound-of-meme" },
                { name: "NeighborGood", slug: "neighborgood" },
              ].map((cs) => (
                <Link
                  key={cs.slug}
                  to={`/project/${cs.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-xs font-mono text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                >
                  {cs.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={() => {
                audio.playCommand();
                setIsMobileMenuOpen(false);
                setIsAiModalOpen(true);
              }}
              className="px-4 py-2 rounded-full border border-orange-500/40 bg-orange-500/10 text-orange-600 dark:text-orange-400 font-mono text-xs font-bold flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI Persona</span>
            </button>
          </div>

          <div className="mt-3 text-slate-400 dark:text-slate-600 font-mono text-xs tracking-widest">
            LOCAL TIME // {time}
          </div>
        </div>
      </div>
    </>
  );
}
