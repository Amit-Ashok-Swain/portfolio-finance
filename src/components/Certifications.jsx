import { useRef } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { audio } from "../utils/audio";

gsap.registerPlugin(ScrollTrigger);

export default function Certifications() {
  const container = useRef(null);
  const certifications = useSelector((state) => state.portfolio.certifications);

  useGSAP(
    () => {
      gsap.fromTo(
        ".cert-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 88%",
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <section
      id="certifications-section"
      ref={container}
      className="py-24 px-6 sm:px-16 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 relative z-10 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
            <span className="text-xs font-mono font-bold tracking-widest text-orange-600 dark:text-orange-400 uppercase">
              Accreditations
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-3 transition-colors duration-500">
            Professional <span className="text-orange-500">Authority.</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Industry-recognized credentials in AI Product Management, Consulting, Agile, and Software Engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <div
              key={i}
              onMouseEnter={() => audio.playHover()}
              className="cert-card group relative bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 overflow-hidden flex items-center gap-4 hover:border-orange-500/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-orange-500/20 transition-all duration-300">
                <svg
                  className="w-6 h-6 text-orange-600 dark:text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  ></path>
                </svg>
              </div>

              <div className="relative z-10">
                <h4 className="text-slate-900 dark:text-white font-bold text-sm leading-snug mb-1 transition-colors duration-500 group-hover:text-orange-500">
                  {cert.title}
                </h4>
                <p className="text-orange-600 dark:text-orange-400 font-mono text-[11px] font-bold tracking-wider uppercase">
                  {cert.issuer} // VERIFIED
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
