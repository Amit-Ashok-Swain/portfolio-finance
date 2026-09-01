import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { audio } from "../utils/audio";
import { getSkillIcon } from "../utils/techIcons";
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Layers,
  TrendingUp,
  Terminal,
  Share2,
  Check,
} from "lucide-react";

export default function CaseStudyPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const projects = useSelector((state) => state.portfolio.projects);

  const [copiedLink, setCopiedLink] = useState(false);

  const projectIndex = projects.findIndex((p) => p.slug === slug || String(p.id) === slug);
  const project = projects[projectIndex] || projects[0];

  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (project) {
      document.title = `${project.title} — Case Study // Amit Ashok Swain`;
    }
  }, [project, slug]);

  useGSAP(
    () => {
      gsap.from(".cs-animate", {
        y: 35,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });
    },
    { scope: containerRef, dependencies: [slug] }
  );

  const handleCopyShare = () => {
    audio.playClick();
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  if (!project) return null;

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-500 selection:bg-orange-500 selection:text-white pb-32"
    >
      {/* Top Floating Navigation Header */}
      <header className="sticky top-4 z-50 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 rounded-full px-5 py-3 flex items-center justify-between shadow-xl">
          <button
            onClick={() => {
              audio.playClick();
              navigate("/");
            }}
            className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO PORTFOLIO</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyShare}
              className="px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 hover:border-orange-500 text-slate-600 dark:text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy Case Study URL"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedLink ? "COPIED" : "SHARE"}</span>
            </button>

            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              onClick={() => audio.playClick()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs font-bold transition-all shadow-md"
            >
              <span>LAUNCH LIVE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Hero Header */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 pt-12 pb-14">
        <div className="cs-animate mb-4 inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-600 dark:text-orange-400 font-mono text-xs font-bold uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          <span>{project.tagline}</span>
        </div>

        <h1 className="cs-animate text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
          {project.title}
        </h1>

        <p className="cs-animate text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mb-8">
          {project.description}
        </p>

        {/* Project Meta Bar */}
        <div className="cs-animate grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-md">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">ROLE</span>
            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-0.5">{project.role}</p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">TIMELINE</span>
            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-0.5">{project.timeline}</p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">DELIVERY</span>
            <p className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">Production Live</p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">ARCHITECTURE</span>
            <p className="text-xs sm:text-sm font-bold text-orange-600 dark:text-orange-400 mt-0.5">Microservices</p>
          </div>
        </div>
      </section>

      {/* Featured Banner Image */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 mb-16">
        <div className="cs-animate rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-100 dark:bg-black relative h-[320px] sm:h-[480px]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </section>

      {/* Key Impact Metrics Grid */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 mb-20">
        <div className="cs-animate mb-8 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-orange-500" />
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Key Impact Metrics
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {project.metrics?.map((metric, i) => (
            <div
              key={i}
              className="cs-animate bg-white dark:bg-slate-900/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-center shadow-md hover:border-orange-500/40 transition-all duration-300"
            >
              <span className="text-3xl sm:text-4xl font-black text-orange-600 dark:text-orange-500 mb-1">
                {metric.value}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Problem vs Solution Split */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Challenge Box */}
          <div className="cs-animate bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-mono text-xs font-bold tracking-widest uppercase mb-3">
                <AlertCircle className="w-4 h-4" />
                <span>The Challenge & Friction</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Identified Problem
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {project.challenge}
              </p>
            </div>
          </div>

          {/* Solution Box */}
          <div className="cs-animate bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold tracking-widest uppercase mb-3">
                <CheckCircle2 className="w-4 h-4" />
                <span>Strategic Solution</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Engineered Delivery
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive System Architecture Topology */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 mb-20">
        <div className="cs-animate mb-6 flex items-center gap-2">
          <Layers className="w-5 h-5 text-orange-500" />
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Architecture Highlights & Topology
          </h2>
        </div>

        <div className="cs-animate bg-white dark:bg-slate-900/70 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          {project.architectureHighlights?.map((point, index) => (
            <div key={index} className="flex items-start gap-3.5">
              <span className="w-6 h-6 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/30 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                {index + 1}
              </span>
              <p className="text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
                {point}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Breakdown With Icons */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 mb-20">
        <div className="cs-animate mb-6 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-orange-500" />
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Technologies & Tools Employed
          </h2>
        </div>

        <div className="cs-animate flex flex-wrap gap-3">
          {project.techStack?.map((t, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-mono font-medium shadow-sm hover:border-orange-500 transition-colors"
            >
              <span className="text-orange-500">{getSkillIcon(t, "w-4 h-4")}</span>
              <span>{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Code Snippet & Terminal Section */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 mb-24">
        <div className="cs-animate mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-emerald-500" />
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Interface Extract & Code Logic
            </h2>
          </div>
          <span className="font-mono text-xs text-slate-400">READONLY PROTOCOL</span>
        </div>

        <div className="cs-animate rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-950">
          <div className="bg-slate-900 px-6 py-3.5 border-b border-slate-800 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <span className="ml-3 font-mono text-xs text-slate-400">
              {project.slug}-core.spec
            </span>
          </div>
          <pre className="p-6 text-emerald-400 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
            {project.codeSnippet}
          </pre>
        </div>
      </section>

      {/* Next / Previous Project Navigation */}
      <footer className="max-w-5xl mx-auto px-6 sm:px-8 border-t border-slate-200 dark:border-slate-800 pt-12 flex flex-col sm:flex-row justify-between items-center gap-6">
        <Link
          to={`/project/${prevProject.slug}`}
          onClick={() => audio.playClick()}
          className="flex flex-col items-start p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-500 transition-all duration-300 w-full sm:w-1/2 cursor-pointer group"
        >
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">← PREVIOUS CASE STUDY</span>
          <span className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors mt-1">
            {prevProject.title}
          </span>
        </Link>

        <Link
          to={`/project/${nextProject.slug}`}
          onClick={() => audio.playClick()}
          className="flex flex-col items-end p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-500 transition-all duration-300 w-full sm:w-1/2 text-right cursor-pointer group"
        >
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">NEXT CASE STUDY →</span>
          <span className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors mt-1">
            {nextProject.title}
          </span>
        </Link>
      </footer>
    </div>
  );
}
