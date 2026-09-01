import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { audio } from "../utils/audio";

export default function Hero() {
  const container = useRef(null);
  const nameRef = useRef(null);
  const cursorRef = useRef(null);
  const imageRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const scannerRef = useRef(null);
  const rolesRef = useRef([]);

  const [vimMode, setVimMode] = useState("-- INSERT --");
  const profile = useSelector((state) => state.portfolio.profile);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        imageWrapperRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "power3.inOut" }
      );

      tl.fromTo(
        scannerRef.current,
        { top: "0%", opacity: 1 },
        { top: "100%", opacity: 0, duration: 1.8, ease: "power3.inOut" },
        "<"
      );

      tl.fromTo(
        ".hero-image",
        { scale: 1.2, filter: "grayscale(100%) blur(10px)" },
        {
          scale: 1,
          filter: "grayscale(0%) blur(0px)",
          duration: 2,
          ease: "power3.out",
        },
        "-=1.6"
      );

      gsap.fromTo(
        ".orbital-card",
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "back.out(1.5)",
        },
        "-=1"
      );

      gsap.to(".orbital-card", {
        y: "-=10",
        rotationZ: "random(-2, 2)",
        duration: "random(2.5, 4)",
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.3,
      });

      tl.add(() => {
        gsap.to(cursorRef.current, {
          opacity: 0,
          repeat: -1,
          yoyo: true,
          duration: 0.5,
          ease: "power2.inOut",
        });

        const nameStr = profile.name;
        let charObj = { count: 0 };
        gsap.to(charObj, {
          count: nameStr.length,
          duration: 1.4,
          ease: "none",
          onUpdate: () => {
            if (nameRef.current) {
              nameRef.current.innerText = nameStr.slice(
                0,
                Math.round(charObj.count)
              );
            }
          },
        });
      }, "-=0.8");

      tl.fromTo(
        ".hero-role-badge",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "back.out" },
        "-=0.5"
      );

      tl.add(() => {
        profile.roles.forEach((role, i) => {
          let roleObj = { count: 0 };
          gsap.to(roleObj, {
            count: role.length,
            duration: 0.8,
            delay: i * 0.25,
            ease: "none",
            onUpdate: () => {
              if (rolesRef.current[i]) {
                rolesRef.current[i].innerText = role.slice(
                  0,
                  Math.round(roleObj.count)
                );
              }
            },
          });
        });
      }, "-=0.2");

      tl.fromTo(
        [".hero-desc", ".hero-cta", ".social-link"],
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 },
        "-=0.4"
      );
    },
    { scope: container }
  );

  const handleAvatarHover = () => {
    audio.playHover();
    setVimMode((prev) =>
      prev === "-- INSERT --"
        ? "NORMAL"
        : prev === "NORMAL"
        ? "VISUAL"
        : "-- INSERT --"
    );
  };

  return (
    <section
      ref={container}
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-12 overflow-hidden px-6 sm:px-16"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Command Prompt & Typography */}
        <div className="lg:col-span-7 flex flex-col justify-center z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-300 text-xs font-mono mb-4 w-fit hero-role-badge shadow-sm transition-colors duration-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-orange-600 dark:text-orange-500">
              ● AVAILABILITY:
            </span>
            <span>OPEN FOR ROLES</span>
          </div>

          <div className="mb-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase font-mono leading-none transition-colors duration-500">
              <span ref={nameRef}></span>
              <span
                ref={cursorRef}
                className="inline-block w-2 sm:w-3.5 h-6 sm:h-10 lg:h-12 bg-orange-500 ml-1.5 align-middle shadow-[0_0_15px_rgba(249,115,22,0.8)]"
              ></span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-4 text-xs sm:text-base font-bold font-mono text-emerald-600 dark:text-emerald-400 transition-colors duration-500">
            {profile.roles.map((role, index) => (
              <div key={index} className="flex items-center">
                <span
                  ref={(el) => (rolesRef.current[index] = el)}
                  className="tracking-tight drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]"
                ></span>
                {index !== profile.roles.length - 1 && (
                  <span className="mx-2 text-slate-400 dark:text-slate-600 hidden sm:block">
                    /
                  </span>
                )}
              </div>
            ))}
          </div>

          <p className="hero-desc text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6 max-w-xl transition-colors duration-500">
            {profile.about}
          </p>

          {/* Interactive CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              onClick={() => {
                audio.playClick();
                document.getElementById("work-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              onMouseEnter={() => audio.playHover()}
              className="hero-cta px-6 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(249,115,22,0.35)] hover:shadow-[0_0_35px_rgba(249,115,22,0.6)] hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Shipped Work</span>
              <span>→</span>
            </button>

            <button
              onClick={() => {
                audio.playCommand();
                window.dispatchEvent(new CustomEvent("open-command-palette"));
              }}
              onMouseEnter={() => audio.playHover()}
              className="hero-cta px-5 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-orange-500 text-slate-800 dark:text-white font-mono text-xs font-bold tracking-wider uppercase hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <span className="text-orange-500 font-bold">&gt;_</span>
              <span>Command Palette</span>
            </button>

            <a
              href="/resume.pdf"
              download="Amit_Ashok_Swain_Final_CV_Accounts.pdf"
              onClick={() => audio.playClick()}
              onMouseEnter={() => audio.playHover()}
              className="hero-cta px-4 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 text-slate-700 dark:text-slate-300 font-mono text-xs font-bold tracking-wider hover:text-emerald-500 transition-all duration-300 flex items-center gap-1.5"
            >
              <span>↓</span>
              <span>Download CV (Accounts)</span>
            </a>
          </div>

          {/* Socials & Vim Status Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-4 gap-4 transition-colors duration-500">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {profile.socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => audio.playHover()}
                  onClick={() => audio.playClick()}
                  className="social-link text-slate-600 dark:text-slate-400 font-mono font-bold uppercase tracking-wider text-xs hover:text-orange-600 dark:hover:text-orange-400 transition-colors whitespace-nowrap"
                >
                  [{social.name}]
                </a>
              ))}
            </div>

            <div className="font-mono text-[11px] tracking-widest text-slate-500 flex items-center justify-between sm:justify-start gap-3 bg-slate-100 dark:bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors duration-500">
              <span className="font-bold whitespace-nowrap">
                <span
                  className={
                    vimMode === "-- INSERT --"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : vimMode === "NORMAL"
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-orange-600 dark:text-orange-400"
                  }
                >
                  {vimMode}
                </span>
              </span>
              <span className="opacity-60 hidden sm:inline">src/Hero.jsx</span>
              <span className="opacity-60">UTF-8</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Photo & Hologram Cards */}
        <div className="lg:col-span-5 relative z-20 [perspective:1500px] my-4 lg:my-0">
          <div className="orbital-card absolute -left-4 sm:-left-8 top-8 z-30 bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-emerald-500/30 p-3.5 rounded-2xl shadow-xl dark:shadow-[0_0_25px_rgba(16,185,129,0.2)] flex flex-col pointer-events-none transition-colors duration-500">
            <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[9px] font-bold mb-0.5 tracking-wider">
              01 // FINANCE & P&L
            </span>
            <span className="text-slate-900 dark:text-white font-bold text-xs">
              Full-Cycle Operations
            </span>
          </div>

          <div className="orbital-card absolute -right-3 sm:-right-6 top-1/2 z-30 bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 p-3.5 rounded-2xl shadow-xl dark:shadow-[0_0_25px_rgba(6,182,212,0.2)] flex flex-col pointer-events-none transition-colors duration-500">
            <span className="text-cyan-600 dark:text-cyan-400 font-mono text-[9px] font-bold mb-0.5 tracking-wider">
              02 // TECH & CLOUD
            </span>
            <span className="text-slate-900 dark:text-white font-bold text-xs">
              Java, Python & Cloud
            </span>
          </div>

          <div className="orbital-card absolute left-6 -bottom-4 z-30 bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-orange-500/30 p-3.5 rounded-2xl shadow-xl dark:shadow-[0_0_25px_rgba(249,115,22,0.2)] flex flex-col pointer-events-none transition-colors duration-500">
            <span className="text-orange-600 dark:text-orange-400 font-mono text-[9px] font-bold mb-0.5 tracking-wider">
              03 // DATA & PRODUCT
            </span>
            <span className="text-slate-900 dark:text-white font-bold text-xs">
              MFE & 40+ Scale Projects
            </span>
          </div>

          <div
            ref={imageWrapperRef}
            onMouseEnter={handleAvatarHover}
            className="overflow-hidden rounded-[2.5rem] border-2 border-slate-200 dark:border-slate-800 shadow-2xl dark:shadow-[0_0_60px_rgba(0,0,0,0.8)] h-[380px] sm:h-[480px] lg:h-[540px] w-full relative z-20 bg-slate-100 dark:bg-black cursor-crosshair [transform-style:preserve-3d] transition-colors duration-500"
          >
            <div
              ref={scannerRef}
              className="absolute left-0 right-0 h-1 bg-orange-500 shadow-[0_0_25px_rgba(249,115,22,1)] z-50 pointer-events-none"
            ></div>
            <img
              ref={imageRef}
              src={profile.avatar}
              alt={profile.name}
              className="hero-image h-full w-full object-cover object-center will-change-transform transition-transform"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
