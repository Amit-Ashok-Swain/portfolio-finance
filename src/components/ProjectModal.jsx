import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { audio } from "../utils/audio";
import { getSkillIcon } from "../utils/techIcons";

export default function ProjectModal({ project, isOpen, onClose }) {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (overlayRef.current) {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
      }
      if (modalRef.current) {
        gsap.fromTo(
          modalRef.current,
          { scale: 0.94, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.3)" }
        );
      }
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc, true);
    return () => window.removeEventListener("keydown", handleEsc, true);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      ref={overlayRef}
      data-lenis-prevent="true"
      onClick={onClose}
      className="fixed inset-0 z-[100000] bg-slate-900/60 dark:bg-black/85 backdrop-blur-lg flex items-start sm:items-center justify-center pt-6 sm:pt-0 p-2 sm:p-6 transition-colors duration-500 cursor-default overscroll-contain"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} Case Study`}
    >
      <div
        ref={modalRef}
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[92vh] sm:max-h-[85vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-y-auto overscroll-contain flex flex-col transition-colors duration-500 ring-1 ring-black/5 dark:ring-white/10"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* Modal Header */}
        <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
          <button
            onClick={() => {
              audio.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-orange-500 transition-colors border border-white/20 z-10 cursor-pointer shadow-lg"
            title="Close Preview (ESC)"
          >
            ✕
          </button>
          <div className="absolute bottom-4 left-6 z-10">
            <span className="px-3 py-1 rounded-full bg-orange-500/90 text-white font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-sm shadow-md">
              {project.category}
            </span>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {project.title}
              </h3>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                {project.metrics?.[0]?.value || "Production Live"}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Key Metrics Grid */}
          {project.metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-lg font-black text-orange-600 dark:text-orange-500">
                    {m.value}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack */}
          <div>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2.5">
              TECH STACK & ARCHITECTURE
            </span>
            <div className="flex flex-wrap gap-2">
              {project.techStack?.map((t, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-mono text-xs font-medium"
                >
                  <span className="text-orange-500">{getSkillIcon(t, "w-3.5 h-3.5")}</span>
                  <span>{t}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <Link
              to={`/project/${project.slug}`}
              onClick={() => {
                audio.playClick();
                onClose();
              }}
              className="px-5 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <span>Read Full Case Study</span>
              <span>→</span>
            </Link>

            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              onClick={() => audio.playClick()}
              className="px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-mono text-xs font-bold tracking-wider uppercase transition-all border border-slate-300 dark:border-slate-700 flex items-center gap-2 cursor-pointer"
            >
              <span>Launch Live System</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
