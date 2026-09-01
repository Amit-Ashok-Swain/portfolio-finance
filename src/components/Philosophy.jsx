import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { audio } from "../utils/audio";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const container = useRef(null);

  const text =
    "The future of enterprise leadership isn't just about recording accounts or writing code. It's about converging strategic finance, software engineering, quantitative data, and product execution to build systems that scale from zero to one.";
  const words = text.split(" ");

  useGSAP(
    () => {
      const wordElements = gsap.utils.toArray(".reveal-word");

      gsap.fromTo(
        wordElements,
        { opacity: 0.12, y: 15 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top 75%",
            end: "bottom 55%",
            scrub: 1,
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-6 sm:px-16 border-t border-slate-200 dark:border-slate-800 relative z-10 transition-colors duration-500"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400 mb-8">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          OPERATING PHILOSOPHY // MANIFESTO
        </div>

        <p className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight font-mono tracking-tight transition-colors duration-500">
          {words.map((word, i) => (
            <span
              key={i}
              className="reveal-word inline-block mr-2 sm:mr-3 mb-1"
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
