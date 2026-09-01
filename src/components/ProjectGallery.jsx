import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectGallery() {
  const sectionRef = useRef(null);
  const galleryRef = useRef(null);
  const projects = useSelector((state) => state.portfolio.projects);
  const [selectedProject, setSelectedProject] = useState(null);

  useGSAP(
    () => {
      if (!galleryRef.current || !sectionRef.current) return;

      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const getScrollAmount = () => {
          const galleryWidth = galleryRef.current?.scrollWidth || 0;
          return Math.max(
            0,
            galleryWidth - window.innerWidth + window.innerWidth * 0.15
          );
        };

        const tween = gsap.to(galleryRef.current, {
          x: () => -getScrollAmount(),
          ease: "none",
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          animation: tween,
          invalidateOnRefresh: true,
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [projects] }
  );

  return (
    <>
      <section
        id="work-section"
        ref={sectionRef}
        className="h-auto md:h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden flex flex-col justify-center relative border-t border-slate-200 dark:border-slate-900 py-24 md:py-0 transition-colors duration-500"
      >
        <div className="w-full px-6 sm:px-16 md:absolute md:top-12 md:left-0 z-10 mb-8 md:mb-0 flex flex-col sm:flex-row sm:items-end justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
              <span className="text-xs font-mono font-bold tracking-widest text-orange-600 dark:text-orange-400 uppercase">
                Portfolio Matrix
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-slate-900 dark:text-white transition-colors duration-500">
              Shipped <span className="text-orange-500">Products.</span>
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-2 sm:mt-0">
            [ CLICK ANY CARD TO OPEN FULL CASE STUDY PAGE • SCROLL HORIZONTALLY ]
          </p>
        </div>

        <div
          ref={galleryRef}
          className="flex flex-col md:flex-row h-auto md:h-[75vh] w-full md:w-max items-center gap-10 md:gap-16 px-6 sm:px-16 md:pr-[15vw] md:mt-20 [perspective:2000px]"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onQuickPreview={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
