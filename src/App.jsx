import { useEffect, useRef, useState, useMemo } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { audio } from "./utils/audio";

import Preloader from "./components/Preloader";
import NeuralCursor from "./components/NeuralCursor";
import Navbar from "./components/Navbar";
import CommandPalette from "./components/CommandPalette";
import HUDNavigation from "./components/HUDNavigation";
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import SkillsMarquee from "./components/SkillsMarquee";
import ProjectGallery from "./components/ProjectGallery";
import SceneGenerator from "./components/SceneGenerator";
import SystemBlueprint from "./components/SystemBlueprint";
import SpatialTunnel from "./components/SpatialTunnel";
import BentoBox from "./components/BentoBox";
import TechMatrix from "./components/TechMatrix";
import Certifications from "./components/Certifications";
import Trajectory from "./components/Trajectory";
import Testimonials from "./components/Testimonials";
import TerminalOS from "./components/TerminalOS";
import Contact from "./components/Contact";
import CaseStudyPage from "./pages/CaseStudyPage";

gsap.registerPlugin(ScrollTrigger);

function MainPortfolioView({ isLightMode, setIsLightMode }) {
  return (
    <>
      <Navbar toggleTheme={() => setIsLightMode(!isLightMode)} />
      <HUDNavigation />
      <div className="relative z-10 bg-slate-50 dark:bg-slate-950 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-colors duration-500">
        <Hero />
        <Philosophy />
        <SkillsMarquee />
        <ProjectGallery />
        <SceneGenerator />
        <SystemBlueprint />
        <SpatialTunnel />
        <BentoBox />
        <TechMatrix />
        <Certifications />
        <Trajectory />
        <Testimonials />
        <Contact />
      </div>
    </>
  );
}

export default function App() {
  const location = useLocation();
  const isCaseStudy = location.pathname.startsWith("/project/");
  const [appReady, setAppReady] = useState(false);
  const [glitchMode, setGlitchMode] = useState(false);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const cursorRef = useRef(null);

  const fullPortfolioData = useSelector((state) => state.portfolio);
  const isEffectivelyReady = appReady || isCaseStudy;

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  // Listen to glitch mode custom event from Command Palette
  useEffect(() => {
    const handleToggleGlitch = () => {
      audio.playGlitch();
      setGlitchMode((prev) => !prev);
    };
    window.addEventListener("toggle-glitch-mode", handleToggleGlitch);
    return () => window.removeEventListener("toggle-glitch-mode", handleToggleGlitch);
  }, []);

  // Dynamic document title when tab is blurred/focused
  useEffect(() => {
    const originalTitle = "Amit Ashok Swain — Sr. Engineering Project Manager & AI Product Builder";
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "> System Standby... // AMIT_OS";
      } else {
        document.title = originalTitle;
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Day/Night dynamic theme hue
  const isNight = useMemo(() => {
    const d = new Date();
    const utc = d.getTime() + d.getTimezoneOffset() * 60000;
    const ist = new Date(utc + 3600000 * 5.5);
    const hour = ist.getHours();
    return hour >= 18 || hour < 6;
  }, []);

  // Theme Class Toggle
  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [isLightMode]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--theme-color",
      isNight ? "#0ea5e9" : "#f97316"
    );
  }, [isNight]);

  // Global Keyboard Shortcuts (T: theme, M: audio, amit/hack: glitch mode)
  useEffect(() => {
    let keyBuffer = "";
    const handleKeydown = (e) => {
      // Guard against firing shortcuts when modals/inputs/dialogs are open
      const isDialogActive = document.querySelector('[role="dialog"]') !== null;
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      const isInputting =
        activeTag === "input" ||
        activeTag === "textarea" ||
        isDialogActive ||
        isCmdOpen;

      if (e.key === "Escape") {
        setGlitchMode(false);
        return;
      }

      if (isInputting) return;

      if (e.key.toLowerCase() === "t") {
        setIsLightMode((prev) => !prev);
        audio.playToggle();
      } else if (e.key.toLowerCase() === "m") {
        audio.toggleMute();
      }

      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > 5) keyBuffer = keyBuffer.slice(-5);

      if (keyBuffer.includes("amit") || keyBuffer.includes("hack")) {
        audio.playGlitch();
        setGlitchMode((prev) => !prev);
        keyBuffer = "";
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [isCmdOpen]);

  // Lenis Smooth Scroll integrated seamlessly with GSAP Ticker & ScrollTrigger
  useEffect(() => {
    if (!isEffectivelyReady || glitchMode || isCaseStudy) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", (e) => {
      ScrollTrigger.update();
      if (e.limit > 0) {
        setScrollProgress(Math.min(100, Math.round((e.scroll / e.limit) * 100)));
      }
    });

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, [isEffectivelyReady, glitchMode, isCaseStudy]);

  // Smooth custom cursor follow with top-level z-index and pointer-events-none
  useGSAP(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    const xTo = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.18,
      ease: "power3",
    });
    const yTo = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.18,
      ease: "power3",
    });

    const moveCursor = (e) => {
      xTo(e.clientX - 8);
      yTo(e.clientY - 8);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  const grainStyle = {
    position: "fixed",
    inset: 0,
    zIndex: 9997,
    pointerEvents: "none",
    opacity: 0.035,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
  };

  return (
    <main
      className={`min-h-screen w-full overflow-x-hidden text-slate-900 bg-slate-50 dark:text-white dark:bg-slate-950 transition-colors duration-500 ${
        glitchMode ? "overflow-hidden h-screen" : ""
      }`}
    >
      {/* Scroll Progress Bar (on main view) */}
      {!isCaseStudy && (
        <div
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 z-[100001] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      )}

      {!isEffectivelyReady && (
        <Preloader
          onComplete={() => {
            setAppReady(true);
            setTimeout(() => ScrollTrigger.refresh(), 300);
          }}
        />
      )}

      <CommandPalette
        isOpen={isCmdOpen}
        setIsOpen={setIsCmdOpen}
        toggleTheme={() => setIsLightMode(!isLightMode)}
      />

      {/* Cyberpunk Glitch Mode Easter Egg */}
      {glitchMode && (
        <div className="fixed inset-0 z-[100000] bg-black/95 p-8 overflow-y-auto pointer-events-auto backdrop-blur-xl">
          <div className="text-emerald-400 font-mono text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
            <div className="flex items-center justify-between text-red-500 mb-6 border-b border-red-500/30 pb-4">
              <span>[SYSTEM OVERRIDE INITIATED] // GHOST_IN_MACHINE</span>
              <button
                onClick={() => setGlitchMode(false)}
                className="px-3 py-1 bg-red-500/20 border border-red-500 text-red-400 rounded hover:bg-red-500 hover:text-white cursor-pointer"
              >
                PRESS ESC TO EXIT
              </button>
            </div>
            <pre className="text-emerald-300 font-mono">
              {JSON.stringify(fullPortfolioData, null, 2)}
            </pre>
          </div>
        </div>
      )}

      <NeuralCursor isLightMode={isLightMode} />
      <div
        ref={cursorRef}
        className="custom-cursor fixed top-0 left-0 w-4 h-4 rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none z-[9999999] shadow-[0_0_15px_currentColor] hidden md:block bg-orange-600 dark:bg-orange-500 text-orange-600 dark:text-orange-500 transition-colors duration-500"
      ></div>

      <div style={grainStyle}></div>

      {/* Buy Me a Coffee Floating Pill */}
      {isEffectivelyReady && (
        <a
          href="https://www.buymeacoffee.com/amitashokswain7"
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => audio.playHover()}
          onClick={() => audio.playClick()}
          className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-3.5 py-3 sm:px-4 sm:py-3 bg-[#FFDD00] text-black font-bold font-sans text-xs sm:text-sm rounded-full sm:rounded-2xl shadow-[0_0_20px_rgba(255,221,0,0.3)] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,221,0,0.6)] transition-all duration-300"
        >
          <img
            src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
            alt="Buy me a coffee"
            className="w-5 h-5"
          />
          <span className="hidden sm:inline font-bold">Support / Coffee</span>
        </a>
      )}

      {/* Main App Routes */}
      <div
        className={`transition-opacity duration-1000 ${
          isEffectivelyReady && !glitchMode ? "opacity-100" : "opacity-0 h-screen overflow-hidden"
        }`}
      >
        <Routes>
          <Route
            path="/"
            element={
              <MainPortfolioView
                isLightMode={isLightMode}
                setIsLightMode={setIsLightMode}
              />
            }
          />
          <Route path="/project/:slug" element={<CaseStudyPage />} />
          <Route
            path="*"
            element={
              <MainPortfolioView
                isLightMode={isLightMode}
                setIsLightMode={setIsLightMode}
              />
            }
          />
        </Routes>

        <div className="relative z-50 pointer-events-none">
          <div className="pointer-events-auto">
            <TerminalOS />
          </div>
        </div>
      </div>
    </main>
  );
}
