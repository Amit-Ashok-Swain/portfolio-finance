import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { audio } from "../utils/audio";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    name: "Engineering Leadership",
    role: "VP of Engineering // Persist Ventures",
    text: "Amit possesses that rare, lethal combination of technical depth and 0→1 product instincts. He steered complex AI pipelines for DeepVid.ai and SongGPT with ruthless execution, delivering on-time milestones and robust architectural scaling.",
    tag: "AI & Web3 Delivery",
  },
  {
    name: "Digital Transformation Lead",
    role: "Senior Director // GSK GlaxoSmithKline",
    text: "Amit transformed our digital delivery velocity at GSK. By introducing rigorous Agile frameworks and streamlining stakeholder approvals, he cut campaign execution times by 35% and doubled our sprint velocity on flagship pharmaceutical brands.",
    tag: "Enterprise Agile & Velocity",
  },
  {
    name: "Operations & Product Executive",
    role: "Operations Director // Teleperformance",
    text: "A master of systems optimization and team leadership. Amit drove a 57% operational efficiency gain while cutting systemic errors by 87%. His data-driven mindset and commitment to quality make him a standout engineering project manager.",
    tag: "Operational Scale (57% Gain)",
  },
];

export default function Testimonials() {
  const container = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useGSAP(
    () => {
      gsap.fromTo(
        ".testimonial-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 85%",
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { scope: container }
  );

  const prev = () => {
    audio.playClick();
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const next = () => {
    audio.playClick();
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const item = TESTIMONIALS[currentIndex];

  return (
    <section
      id="endorsements-section"
      ref={container}
      className="py-28 px-6 sm:px-16 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 relative z-10 transition-colors duration-500"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
            <span className="text-xs font-mono font-bold tracking-widest text-orange-600 dark:text-orange-400 uppercase">
              Stakeholder Feedback
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-3 transition-colors duration-500">
            Leadership{" "}
            <span className="text-orange-600 dark:text-orange-500">
              Endorsements.
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            What engineering executives, product leaders, and enterprise partners say about collaborating with Amit.
          </p>
        </div>

        <div className="testimonial-card relative bg-white dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[90px] rounded-full pointer-events-none"></div>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 font-mono text-[10px] font-bold uppercase tracking-wider border border-orange-500/20">
              {item.tag}
            </span>
          </div>

          <div className="relative mb-8">
            <Quote className="absolute -top-4 -left-4 w-12 h-12 text-orange-500/15 pointer-events-none" />
            <p className="text-lg sm:text-2xl font-medium text-slate-800 dark:text-slate-200 leading-relaxed relative z-10 italic">
              &quot;{item.text}&quot;
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800 gap-4">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {item.name}
              </h4>
              <p className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400">
                {item.role}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                onMouseEnter={() => audio.playHover()}
                className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-orange-500 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-all cursor-pointer"
                title="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-mono text-xs text-slate-400 px-2">
                0{currentIndex + 1} / 0{TESTIMONIALS.length}
              </span>
              <button
                onClick={next}
                onMouseEnter={() => audio.playHover()}
                className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-orange-500 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-all cursor-pointer"
                title="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
