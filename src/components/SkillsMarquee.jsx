import { useRef } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { audio } from "../utils/audio";
import { getSkillIcon } from "../utils/techIcons";

const SkillsMarquee = () => {
  const container = useRef(null);
  const marqueeRef = useRef(null);

  const skills = useSelector((state) => state.portfolio.skills);
  const duplicatedSkills = [...skills, ...skills, ...skills];

  useGSAP(
    () => {
      const tween = gsap.to(marqueeRef.current, {
        xPercent: -33.333,
        repeat: -1,
        duration: 28,
        ease: "none",
      });

      const el = container.current;
      if (el) {
        const handleEnter = () => gsap.to(tween, { timeScale: 0.35, duration: 0.5 });
        const handleLeave = () => gsap.to(tween, { timeScale: 1, duration: 0.5 });
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
        return () => {
          el.removeEventListener("mouseenter", handleEnter);
          el.removeEventListener("mouseleave", handleLeave);
        };
      }
    },
    { scope: container, dependencies: [skills] }
  );

  return (
    <section
      ref={container}
      className="relative flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 py-20 border-y border-slate-200 dark:border-slate-900 transition-colors duration-500 select-none"
    >
      <div className="absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent pointer-events-none transition-colors duration-500"></div>
      <div className="absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent pointer-events-none transition-colors duration-500"></div>

      <div ref={marqueeRef} className="flex w-max items-center">
        {duplicatedSkills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-4 px-6 sm:px-8 group cursor-pointer"
            onMouseEnter={() => audio.playHover()}
          >
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm group-hover:border-orange-500 group-hover:scale-105 transition-all duration-300">
              <span className="text-orange-500 text-xl sm:text-2xl group-hover:scale-110 transition-transform">
                {getSkillIcon(skill, "w-6 h-6 sm:w-7 sm:h-7")}
              </span>
              <span className="text-lg sm:text-2xl font-black uppercase text-slate-800 dark:text-slate-200 group-hover:text-orange-500 transition-colors whitespace-nowrap">
                {skill}
              </span>
            </div>
            <span className="text-orange-500/50 text-xl">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsMarquee;
