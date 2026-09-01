import { useRef } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { audio } from "../utils/audio";
import { getSkillIcon } from "../utils/techIcons";

gsap.registerPlugin(ScrollTrigger);

export default function SpatialTunnel() {
  const container = useRef(null);
  const skills = useSelector((state) => state.portfolio.skills);

  useGSAP(
    () => {
      if (!container.current) return;

      let mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          let { isMobile, isDesktop } = context.conditions;

          gsap.set(container.current, { perspective: isMobile ? 800 : 1200 });
          const items = gsap.utils.toArray(".spatial-item");

          // Compact, highly cinematic scroll distance for all 22 skills
          const scrollDistance = isMobile ? 1400 : 2000;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container.current,
              start: "top top",
              end: `+=${scrollDistance}`,
              pin: true,
              scrub: 1.2,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onEnter: () => audio.playWarp(),
            },
          });

          tl.to(
            ".center-title",
            { opacity: 0, scale: 0.8, filter: "blur(12px)", duration: 0.4 },
            0
          );

          // Group all 22 skills into 4 orbital depth clusters
          const itemsPerCluster = isMobile ? 3 : 5;

          items.forEach((item, i) => {
            const clusterIndex = Math.floor(i / itemsPerCluster);
            const indexInCluster = i % itemsPerCluster;
            const angle = (indexInCluster * Math.PI * 2) / itemsPerCluster + clusterIndex * 0.5;

            const radius = isMobile ? 120 + (i % 2) * 40 : 240 + (i % 2) * 90;
            const zInitial = -400 - clusterIndex * (isMobile ? 500 : 700);

            gsap.set(item, {
              x: Math.cos(angle) * radius,
              y: Math.sin(angle) * (radius * 0.65),
              z: zInitial,
              opacity: 0,
              filter: "blur(12px)",
              scale: 0.5,
            });

            const startTime = clusterIndex * 0.45 + (indexInCluster * 0.05);
            const duration = 2.2;

            tl.to(
              item,
              {
                z: isMobile ? 380 : 700,
                scale: isMobile ? 1.15 : 1.35,
                ease: "none",
                duration: duration,
              },
              startTime
            );

            tl.to(
              item,
              { opacity: 1, duration: 0.5, ease: "power2.out" },
              startTime
            );
            tl.to(
              item,
              { opacity: 0, duration: 0.4, ease: "power2.in" },
              startTime + duration - 0.4
            );

            tl.to(
              item,
              { filter: "blur(0px)", duration: 0.6, ease: "power2.out" },
              startTime + 0.3
            );
            tl.to(
              item,
              { filter: "blur(16px)", duration: 0.4, ease: "power2.in" },
              startTime + duration - 0.4
            );

            if (isDesktop) {
              const leftBracket = item.querySelector(".hud-bracket-left");
              const rightBracket = item.querySelector(".hud-bracket-right");
              if (leftBracket && rightBracket) {
                tl.to(
                  leftBracket,
                  { x: -12, opacity: 1, duration: 0.7, ease: "back.out(2)" },
                  startTime + 0.3
                );
                tl.to(
                  rightBracket,
                  { x: 12, opacity: 1, duration: 0.7, ease: "back.out(2)" },
                  startTime + 0.3
                );
              }
            }
          });
        }
      );

      return () => mm.revert();
    },
    { scope: container, dependencies: [skills] }
  );

  return (
    <section
      id="spatial-section"
      ref={container}
      className="h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden flex items-center justify-center relative border-t border-slate-200 dark:border-slate-900 transition-colors duration-500"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.1)_0%,transparent_65%)]"></div>

      <div className="center-title absolute z-50 text-center pointer-events-none px-6 transition-colors duration-500">
        <div className="flex items-center justify-center gap-4 mb-3 opacity-60">
          <div className="w-8 h-[1px] bg-orange-500"></div>
          <div className="w-2 h-2 border border-orange-500 rounded-full"></div>
          <div className="w-8 h-[1px] bg-orange-500"></div>
        </div>
        <h2 className="text-xl sm:text-3xl uppercase tracking-[0.35em] text-orange-600 dark:text-orange-500 font-black mb-2 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">
          Spatial Neural Tunnel
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-mono text-xs sm:text-sm tracking-widest uppercase">
          [ 3D TRAVERSAL ACROSS ALL {skills.length} CORE CAPABILITIES & TECH ICONS ]
        </p>
        <div className="w-2.5 h-2.5 bg-orange-500 rounded-full mx-auto mt-5 animate-ping"></div>
      </div>

      <div className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="spatial-item absolute flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-mono text-orange-600 dark:text-orange-400 mb-1 tracking-widest uppercase font-bold">
              <span>NODE_0{index + 1}</span>
              <span>//</span>
              <span>0x{(index * 12 + 10).toString(16).toUpperCase()}</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3.5 relative group">
              <span className="hud-bracket-left text-orange-600 dark:text-orange-500 font-light text-2xl sm:text-4xl opacity-0 hidden md:block">
                [
              </span>

              <div className="flex items-center gap-2 sm:gap-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg">
                <span className="text-orange-500 text-lg sm:text-2xl">
                  {getSkillIcon(skill, "w-5 h-5 sm:w-6 sm:h-6")}
                </span>
                <span className="text-sm sm:text-xl md:text-2xl font-black text-slate-900 dark:text-white whitespace-nowrap">
                  {skill}
                </span>
              </div>

              <span className="hud-bracket-right text-orange-600 dark:text-orange-500 font-light text-2xl sm:text-4xl opacity-0 hidden md:block">
                ]
              </span>
            </div>

            <div className="w-full max-w-[120px] h-[1.5px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent mt-2"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
