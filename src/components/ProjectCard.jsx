import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { audio } from "../utils/audio";
import { getSkillIcon } from "../utils/techIcons";
import { ArrowRight, ExternalLink } from "lucide-react";

export default function ProjectCard({ project, onQuickPreview }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !imageRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    cardRef.current.style.setProperty("--mouse-x", `${localX}px`);
    cardRef.current.style.setProperty("--mouse-y", `${localY}px`);

    gsap.to(cardRef.current, {
      rotateY: x * 8,
      rotateX: -y * 8,
      ease: "power3.out",
      duration: 0.4,
      transformPerspective: 1500,
      force3D: true,
    });

    gsap.to(imageRef.current, {
      x: -x * 12,
      y: -y * 12,
      scale: 1.08,
      ease: "power3.out",
      duration: 0.4,
      force3D: true,
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !imageRef.current) return;
    gsap.to([cardRef.current, imageRef.current], {
      rotateY: 0,
      rotateX: 0,
      x: 0,
      y: 0,
      scale: 1,
      ease: "elastic.out(1, 0.3)",
      duration: 1,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => audio.playHover()}
      className="group flex flex-col h-full w-[88vw] sm:w-[580px] rounded-[2.5rem] border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative [transform-style:preserve-3d] will-change-transform shrink-0 transition-colors duration-500 overflow-hidden hover:border-orange-500/50 dark:hover:border-orange-500/50"
    >
      {/* Top Image Section - Links directly to dedicated Case Study Page */}
      <Link
        to={`/project/${project.slug}`}
        onClick={() => audio.playClick()}
        className="h-[46%] w-full overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-black rounded-t-[2.5rem] relative transition-colors duration-500 cursor-pointer block"
      >
        <img
          ref={imageRef}
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover object-center will-change-transform transition-transform"
        />

        <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white font-mono text-[10px] uppercase tracking-wider font-bold shadow-lg">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          <span>View Full Case Study ↗</span>
        </div>

        {/* Interactive Code Reveal on Hover */}
        <div
          className="absolute inset-0 z-20 bg-slate-950/95 p-6 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            WebkitMaskImage:
              "radial-gradient(circle 140px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)",
            maskImage:
              "radial-gradient(circle 140px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)",
          }}
        >
          <div className="text-orange-500 font-mono text-[10px] font-bold mb-2 border-b border-slate-800 pb-1 w-max">
            SOURCE_SNIPPET // ARCHITECTURE_EXTRACT
          </div>
          <pre className="text-emerald-400 font-mono text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
            {project.codeSnippet}
          </pre>
        </div>
      </Link>

      {/* Bottom Content Section */}
      <div className="flex flex-col justify-between p-7 sm:p-8 flex-1 relative z-20 bg-white dark:bg-slate-900 rounded-b-[2.5rem] [transform:translateZ(30px)] transition-colors duration-500">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-orange-600 dark:text-orange-400 font-mono font-bold tracking-widest text-xs uppercase">
              {project.tagline}
            </span>
            <span className="text-slate-400 dark:text-slate-600 font-mono text-xs">
              0{project.id} // SYS
            </span>
          </div>

          <Link
            to={`/project/${project.slug}`}
            onClick={() => audio.playClick()}
            className="text-2xl sm:text-4xl font-black mb-3 text-slate-900 dark:text-white tracking-tight transition-colors duration-500 hover:text-orange-500 block"
          >
            {project.title}
          </Link>

          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3 transition-colors duration-500">
            {project.description}
          </p>

          {/* Tech Stack Chips With Icons */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack?.slice(0, 4).map((t, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              >
                <span className="text-orange-500">{getSkillIcon(t, "w-3 h-3")}</span>
                <span>{t}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <Link
            to={`/project/${project.slug}`}
            onClick={() => audio.playClick()}
            className="text-slate-900 dark:text-white font-bold uppercase tracking-wider text-xs sm:text-sm border-b-2 border-orange-500 pb-0.5 hover:text-orange-600 dark:hover:text-orange-400 transition-colors inline-flex items-center gap-1.5"
          >
            <span>Open Case Study</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                audio.playClick();
                if (onQuickPreview) onQuickPreview(project);
              }}
              className="text-[11px] font-mono text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              Quick Specs
            </button>

            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              onClick={() => audio.playClick()}
              className="text-[11px] font-mono text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
