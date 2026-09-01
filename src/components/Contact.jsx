import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import gsap from "gsap";
import confetti from "canvas-confetti";
import { audio } from "../utils/audio";

const getSavedDraft = () => {
  if (typeof window === "undefined") return { email: "", message: "" };
  try {
    const draft = localStorage.getItem("amitOS_contact_draft");
    return draft ? JSON.parse(draft) : { email: "", message: "" };
  } catch {
    return { email: "", message: "" };
  }
};

export default function Contact() {
  const profile = useSelector((state) => state.portfolio.profile);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const [status, setStatus] = useState("IDLE");
  const [copied, setCopied] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: getSavedDraft(),
  });

  const handleInputChange = (field, value) => {
    try {
      const current = getSavedDraft();
      current[field] = value;
      localStorage.setItem("amitOS_contact_draft", JSON.stringify(current));
      setDraftSaved(Boolean(current.email || current.message));
    } catch {
      // ignore
    }
  };

  const onSubmit = () => {
    audio.playCommand();
    setStatus("SENDING");

    setTimeout(() => {
      setStatus("SENT");
      audio.playSuccess();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#f97316", "#10b981", "#3b82f6", "#ffffff"],
      });

      reset({ email: "", message: "" });
      localStorage.removeItem("amitOS_contact_draft");
      setDraftSaved(false);

      setTimeout(() => setStatus("IDLE"), 5000);
    }, 1200);
  };

  const handleMouseMove = (e) => {
    if (!buttonRef.current || status === "SENT") return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.35;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.35;

    gsap.to(buttonRef.current, {
      x: x,
      y: y,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1.2, 0.3)",
    });
  };

  const copyEmail = () => {
    audio.playClick();
    navigator.clipboard?.writeText("amitashokswain@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer
      id="contact-section"
      ref={containerRef}
      className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col justify-between p-6 sm:p-16 relative overflow-hidden transition-colors duration-500"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600/5 rounded-full blur-[140px] pointer-events-none transition-colors duration-500"></div>

      {/* Top Bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-4">
        <div>
          <div className="flex items-center gap-2.5 text-orange-600 dark:text-orange-500 font-mono text-xs tracking-[0.3em] uppercase mb-1">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
            System Ready
          </div>
          <p className="text-slate-600 dark:text-slate-400 font-medium text-sm">
            Open for 0→1 builds, advisory, and Senior Engineering PM leadership.
          </p>
        </div>

        <button
          onClick={copyEmail}
          className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs flex items-center gap-2 hover:border-orange-500 transition-colors cursor-pointer"
        >
          <span>{copied ? "✔ COPIED TO CLIPBOARD" : "📋 amitashokswain@gmail.com"}</span>
        </button>
      </div>

      {/* Main Initiation Area */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto flex-1 py-16 gap-12">
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
          <h2 className="text-[14vw] lg:text-[7.5vw] font-black leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-slate-300 to-slate-100 dark:from-white dark:to-slate-600 hover:to-orange-500 dark:hover:to-orange-500 transition-colors duration-500 cursor-default select-none">
            INITIATE.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-md mt-4 leading-relaxed">
            Ready to bring your ambitious vision to life? Connect with Amit for scalable architecture, AI product roadmaps, and technical excellence.
          </p>
        </div>

        <div className="w-full lg:w-1/2 max-w-md">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 bg-white dark:bg-slate-900/70 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl transition-colors duration-500"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono text-xs tracking-widest text-slate-500 dark:text-slate-400 font-bold">
                SECURE COMMLINK
              </span>
              {draftSaved && (
                <span className="font-mono text-[10px] text-orange-500 animate-pulse font-bold">
                  DRAFT SAVED
                </span>
              )}
            </div>

            <div className="relative">
              <input
                type="email"
                placeholder="YOUR_EMAIL@DOMAIN.COM"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                  onChange: (e) => handleInputChange("email", e.target.value),
                })}
                className={`w-full bg-slate-100 dark:bg-slate-950 border ${
                  errors.email ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                } rounded-2xl px-4 py-3.5 text-xs sm:text-sm font-mono text-slate-900 dark:text-white outline-none focus:border-orange-500 dark:focus:border-orange-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-600`}
              />
              {errors.email && (
                <span className="absolute -bottom-5 left-2 text-[10px] text-red-500 font-mono">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="relative mt-2">
              <textarea
                rows="4"
                placeholder="ENCRYPTED MESSAGE / PROJECT SPECS..."
                {...register("message", {
                  required: "Message payload cannot be empty",
                  onChange: (e) => handleInputChange("message", e.target.value),
                })}
                className={`w-full bg-slate-100 dark:bg-slate-950 border ${
                  errors.message ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                } rounded-2xl px-4 py-3.5 text-xs sm:text-sm font-mono text-slate-900 dark:text-white outline-none focus:border-orange-500 dark:focus:border-orange-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none`}
              />
              {errors.message && (
                <span className="absolute -bottom-5 left-2 text-[10px] text-red-500 font-mono">
                  {errors.message.message}
                </span>
              )}
            </div>

            <div
              className="mt-4"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <button
                ref={buttonRef}
                type="submit"
                disabled={status !== "IDLE"}
                className={`w-full py-4 rounded-2xl font-bold tracking-widest uppercase text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                  status === "SENT"
                    ? "bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                    : "bg-orange-500 hover:bg-orange-600 text-white shadow-[0_0_25px_rgba(249,115,22,0.3)] hover:shadow-[0_0_35px_rgba(249,115,22,0.6)]"
                }`}
              >
                {status === "IDLE"
                  ? "TRANSMIT SIGNAL →"
                  : status === "SENDING"
                  ? "ROUTING PACKET..."
                  : "✔ SIGNAL RECEIVED"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center sm:items-end border-t border-slate-200 dark:border-slate-800 pt-8 pb-16 sm:pb-8 gap-4 sm:gap-0 transition-colors duration-500">
        <div className="flex gap-5 sm:gap-6">
          {profile.socials.map((social, i) => (
            <a
              key={i}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => audio.playHover()}
              onClick={() => audio.playClick()}
              className="text-slate-500 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-500 font-mono text-xs uppercase tracking-widest transition-colors relative group"
            >
              {social.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-orange-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>

        <div className="text-slate-400 dark:text-slate-600 font-mono text-[10px] sm:text-xs tracking-widest text-center sm:text-right">
          © {new Date().getFullYear()} AMIT ASHOK SWAIN // ALL SYSTEMS NOMINAL
        </div>
      </div>
    </footer>
  );
}
