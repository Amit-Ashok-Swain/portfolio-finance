import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { audio } from "../utils/audio";
import { getSkillIcon } from "../utils/techIcons";

gsap.registerPlugin(ScrollTrigger);

export default function TechMatrix() {
  const container = useRef(null);
  const matrix = useSelector((state) => state.portfolio.techMatrix);
  const [selectedFilter, setSelectedFilter] = useState("ALL");

  useGSAP(
    () => {
      gsap.fromTo(
        ".matrix-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 85%",
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { scope: container, dependencies: [matrix] }
  );

  const categories = ["ALL", ...(matrix?.map((b) => b.category) || [])];

  const filteredMatrix =
    selectedFilter === "ALL"
      ? matrix
      : matrix?.filter((b) => b.category === selectedFilter);

  return (
    <section
      id="expertise-section"
      ref={container}
      className="py-28 px-6 sm:px-16 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 relative z-10 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
            <span className="text-xs font-mono font-bold tracking-widest text-orange-600 dark:text-orange-400 uppercase">
              Skills & Core Stack
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4 transition-colors duration-500">
            Domain{" "}
            <span className="text-orange-600 dark:text-orange-500">
              Expertise.
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Comprehensive breakdown of engineering competencies, frameworks, infrastructure, and leadership practices with tech icons.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  audio.playClick();
                  setSelectedFilter(cat);
                }}
                onMouseEnter={() => audio.playHover()}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all duration-300 cursor-pointer ${
                  selectedFilter === cat
                    ? "bg-orange-500 text-white font-bold shadow-[0_0_15px_rgba(249,115,22,0.4)] scale-105"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-orange-500/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatrix?.map((block, i) => (
            <div
              key={i}
              onMouseEnter={() => audio.playHover()}
              className="matrix-card bg-white dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl p-7 hover:border-orange-500/50 dark:hover:border-orange-500/50 shadow-md hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2.5 transition-colors duration-500">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 group-hover:scale-125 transition-transform duration-300"></span>
                {block.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {block.items.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 text-xs font-mono font-medium rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner group-hover:text-orange-600 dark:group-hover:text-orange-200 transition-colors duration-300"
                  >
                    <span className="text-orange-500">{getSkillIcon(item, "w-3.5 h-3.5")}</span>
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
