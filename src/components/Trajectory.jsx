import { useRef } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { audio } from "../utils/audio";

gsap.registerPlugin(ScrollTrigger);

export default function Trajectory() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const trajectory = useSelector((state) => state.portfolio.trajectory);

  useGSAP(
    () => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
              end: "bottom 80%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      const nodes = gsap.utils.toArray(".trajectory-node");
      nodes.forEach((node) => {
        gsap.fromTo(
          node,
          { opacity: 0, x: node.classList.contains("left-node") ? -30 : 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: node,
              start: "top 80%",
              toggleActions: "play none none none",
              invalidateOnRefresh: true,
              onEnter: () => audio.playMilestone(),
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="trajectory-section"
      ref={containerRef}
      className="py-32 px-6 sm:px-16 bg-slate-50 dark:bg-slate-950 relative overflow-hidden border-t border-slate-200 dark:border-slate-900 transition-colors duration-500"
    >
      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
            <span className="text-xs font-mono font-bold tracking-widest text-orange-600 dark:text-orange-400 uppercase">
              Career Timeline
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white transition-colors duration-500">
            Operational{" "}
            <span className="text-orange-600 dark:text-orange-500">
              Trajectory.
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm sm:text-base font-medium">
            Academic foundations, management consulting & high-impact field execution.
          </p>
        </div>

        {/* Vertical Guide Line */}
        <div className="absolute left-4 md:left-1/2 top-48 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-800 -translate-x-1/2 rounded-full transition-colors duration-500"></div>

        {/* Animated Glow Fill Line */}
        <div
          ref={lineRef}
          className="absolute left-4 md:left-1/2 top-48 bottom-0 w-[4px] bg-gradient-to-b from-orange-500 via-orange-600 to-amber-500 -translate-x-1/2 origin-top rounded-full shadow-[0_0_15px_rgba(249,115,22,0.6)]"
        ></div>

        <div className="space-y-14 relative z-10">
          {trajectory.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={`trajectory-node flex flex-col md:flex-row items-start md:items-center w-full ${
                  isEven ? "md:justify-start left-node" : "md:justify-end right-node"
                } relative pl-10 md:pl-0`}
              >
                {/* Milestone Node Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-orange-600 dark:bg-orange-500 -translate-x-1/2 border-4 border-slate-50 dark:border-slate-950 shadow-[0_0_12px_rgba(249,115,22,1)] mt-1.5 md:mt-0 group-hover:scale-150 transition-all duration-300"></div>

                <div
                  className={`w-full md:w-[45%] bg-white dark:bg-slate-900/80 backdrop-blur-md border ${
                    item.type === "education"
                      ? "border-slate-200 dark:border-slate-700"
                      : "border-orange-500/30 dark:border-orange-500/40"
                  } p-7 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer`}
                  onMouseEnter={() => audio.playHover()}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-orange-600 dark:text-orange-500 font-mono font-bold tracking-widest text-xs uppercase">
                      {item.year}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {item.type === "education" ? "ACADEMICS" : "EXPERIENCE"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 transition-colors duration-500">
                    {item.title}
                  </h3>
                  <h4 className="text-slate-700 dark:text-slate-300 font-medium text-sm mb-3">
                    {item.institution}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
