import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { audio } from "../utils/audio";

export default function CommandPalette({ isOpen, setIsOpen, toggleTheme }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands = useMemo(
    () => [
      {
        id: "ai-modal",
        label: "Ask AI Persona (AMIT_OS Neural Agent)",
        shortcut: "AI",
        action: () => window.dispatchEvent(new CustomEvent("open-ai-modal")),
        icon: "✨",
        category: "Intelligence",
      },
      {
        id: "cs-deepvid",
        label: "Case Study: DeepVid.ai (Viral AI Video Engine)",
        shortcut: "D",
        action: () => navigate("/project/deepvid-ai"),
        icon: "🎬",
        category: "Case Studies",
      },
      {
        id: "cs-songgpt",
        label: "Case Study: SongGPT (AI Music Synthesizer)",
        shortcut: "S",
        action: () => navigate("/project/songgpt"),
        icon: "🎵",
        category: "Case Studies",
      },
      {
        id: "cs-soundofmeme",
        label: "Case Study: Sound Of Meme (Web3 AI Audio)",
        shortcut: "M",
        action: () => navigate("/project/sound-of-meme"),
        icon: "⚡",
        category: "Case Studies",
      },
      {
        id: "cs-neighborgood",
        label: "Case Study: NeighborGood (Geofenced Logistics)",
        shortcut: "N",
        action: () => navigate("/project/neighborgood"),
        icon: "📍",
        category: "Case Studies",
      },
      {
        id: "terminal-os",
        label: "Open Interactive Terminal OS (AMIT_CLI)",
        shortcut: ">_",
        action: () => window.dispatchEvent(new CustomEvent("open-terminal")),
        icon: "💻",
        category: "System",
      },
      {
        id: "theme",
        label: "Toggle Light / Dark Mode",
        shortcut: "T",
        action: toggleTheme,
        icon: "◑",
        category: "Preferences",
      },
      {
        id: "audio",
        label: "Toggle Sound Audio FX",
        shortcut: "A",
        action: () => audio.toggleMute(),
        icon: "🔊",
        category: "Preferences",
      },
      {
        id: "glitch",
        label: "Toggle Cyberpunk Glitch Mode (Easter Egg)",
        shortcut: "G",
        action: () => window.dispatchEvent(new CustomEvent("toggle-glitch-mode")),
        icon: "👾",
        category: "System",
      },
      {
        id: "hero",
        label: "Jump to: Hero Section & Mission Statement",
        shortcut: "0",
        action: () => {
          navigate("/");
          setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
        },
        icon: "⚡",
        category: "Navigation",
      },
      {
        id: "work",
        label: "Jump to: Shipped Products & Gallery",
        shortcut: "1",
        action: () => {
          navigate("/");
          setTimeout(() => {
            const el = document.getElementById("work-section");
            const target = el?.closest(".pin-spacer") || el;
            target?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        },
        icon: "🚀",
        category: "Navigation",
      },
      {
        id: "system",
        label: "Jump to: System Architecture & CLI Sandbox",
        shortcut: "2",
        action: () => {
          navigate("/");
          setTimeout(() => {
            const el = document.getElementById("system-section");
            const target = el?.closest(".pin-spacer") || el;
            target?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        },
        icon: "⚙️",
        category: "Navigation",
      },
      {
        id: "spatial",
        label: "Jump to: 3D Spatial Neural Tunnel (All Skills)",
        shortcut: "3",
        action: () => {
          navigate("/");
          setTimeout(() => {
            const el = document.getElementById("spatial-section");
            const target = el?.closest(".pin-spacer") || el;
            target?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        },
        icon: "🌌",
        category: "Navigation",
      },
      {
        id: "metrics",
        label: "Jump to: Impact Metrics & Bento Box",
        shortcut: "4",
        action: () => {
          navigate("/");
          setTimeout(() => {
            document.getElementById("metrics-section")?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        },
        icon: "📊",
        category: "Navigation",
      },
      {
        id: "expertise",
        label: "Jump to: Domain Expertise & Tech Matrix",
        shortcut: "5",
        action: () => {
          navigate("/");
          setTimeout(() => {
            document.getElementById("expertise-section")?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        },
        icon: "🧠",
        category: "Navigation",
      },
      {
        id: "endorsements",
        label: "Jump to: Leadership Feedback & Endorsements",
        shortcut: "6",
        action: () => {
          navigate("/");
          setTimeout(() => {
            document.getElementById("endorsements-section")?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        },
        icon: "⭐",
        category: "Navigation",
      },
      {
        id: "contact",
        label: "Jump to: Secure Commlink / Contact Form",
        shortcut: "7",
        action: () => {
          navigate("/");
          setTimeout(() => {
            document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        },
        icon: "✉️",
        category: "Navigation",
      },
      {
        id: "resume",
        label: "Download Resume (Amit_Ashok_Swain_Final_CV_Accounts.pdf)",
        shortcut: "↓",
        action: () => {
          const link = document.createElement("a");
          link.href = "/resume.pdf";
          link.download = "Amit_Ashok_Swain_Final_CV_Accounts.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
        icon: "📄",
        category: "Downloads",
      },
      {
        id: "email",
        label: "Email: amitashokswain@gmail.com",
        shortcut: "E",
        action: () => {
          navigator.clipboard?.writeText("amitashokswain@gmail.com");
          window.location.href = "mailto:amitashokswain@gmail.com";
        },
        icon: "✉",
        category: "Contact",
      },
      {
        id: "github",
        label: "Visit GitHub: @Amit-Ashok-Swain",
        shortcut: "GH",
        action: () => window.open("https://github.com/Amit-Ashok-Swain", "_blank"),
        icon: "⌨",
        category: "External",
      },
      {
        id: "linkedin",
        label: "Visit LinkedIn: Amit Ashok Swain",
        shortcut: "LI",
        action: () => window.open("https://www.linkedin.com/in/amit-ashok-s-a510b9b9/", "_blank"),
        icon: "💼",
        category: "External",
      },
      {
        id: "coffee",
        label: "Support Amit (Buy Me A Coffee)",
        shortcut: "☕",
        action: () => window.open("https://www.buymeacoffee.com/amitashokswain7", "_blank"),
        icon: "☕",
        category: "External",
      },
    ],
    [navigate, toggleTheme]
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return commands;
    const s = search.toLowerCase();
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(s) ||
        c.category.toLowerCase().includes(s) ||
        c.id.toLowerCase().includes(s)
    );
  }, [commands, search]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setSearch("");
    setSelectedIndex(0);
  }, [setIsOpen]);

  // Auto-scroll selected command into view in the list with block: nearest
  useEffect(() => {
    if (listRef.current && filtered.length > 0) {
      const activeEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({
          block: "nearest",
          behavior: "auto",
        });
      }
    }
  }, [selectedIndex, filtered]);

  // Global listener for Cmd+K / Ctrl+K and open-command-palette event
  useEffect(() => {
    const handleOpenCustomEvent = () => {
      setIsOpen(true);
      audio.playCommand();
    };
    window.addEventListener("open-command-palette", handleOpenCustomEvent);

    const handleGlobalOpen = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) audio.playCommand();
          return !prev;
        });
      }
    };

    window.addEventListener("keydown", handleGlobalOpen);
    return () => {
      window.removeEventListener("keydown", handleGlobalOpen);
      window.removeEventListener("open-command-palette", handleOpenCustomEvent);
    };
  }, [setIsOpen]);

  // Capture-phase key navigation when Command Palette is OPEN
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDownCapture = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        e.stopPropagation();
        audio.playHover();
        setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        e.stopPropagation();
        audio.playHover();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        if (filtered.length > 0 && filtered[selectedIndex]) {
          filtered[selectedIndex].action();
          handleClose();
          audio.playSuccess();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDownCapture, true);
    return () => window.removeEventListener("keydown", handleKeyDownCapture, true);
  }, [isOpen, filtered, selectedIndex, handleClose]);

  // Modal open/close animation & focus
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (overlayRef.current) {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
      }
      if (modalRef.current) {
        gsap.fromTo(
          modalRef.current,
          { scale: 0.94, y: 15, opacity: 0 },
          { scale: 1, y: 0, opacity: 1, duration: 0.3, ease: "back.out(1.4)" }
        );
      }
      setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      data-lenis-prevent="true"
      className="fixed inset-0 z-[100000] bg-slate-900/50 dark:bg-black/85 backdrop-blur-md flex items-start justify-center pt-[6vh] sm:pt-[12vh] p-2 sm:px-4 transition-colors duration-500 cursor-default overscroll-contain"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div
        ref={modalRef}
        data-lenis-prevent="true"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-colors duration-500 ring-1 ring-black/5 dark:ring-white/10 max-h-[85vh] sm:max-h-[82vh]"
      >
        {/* Search Bar Header */}
        <div className="flex items-center px-5 py-3.5 sm:py-4 border-b border-slate-200 dark:border-slate-800 transition-colors duration-500 bg-slate-50/80 dark:bg-slate-950/80">
          <span className="text-orange-500 font-mono text-xl mr-3 font-black">
            &gt;
          </span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command, case study name, jump to section..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            className="flex-1 bg-transparent text-slate-900 dark:text-white font-mono text-base sm:text-sm outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors cursor-text"
          />
          {search && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedIndex(0);
                inputRef.current?.focus();
              }}
              className="mr-2 px-2 py-0.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-mono cursor-pointer"
            >
              clear
            </button>
          )}
          <button
            onClick={handleClose}
            className="px-2 py-1 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-400 font-mono text-[10px] font-bold transition-colors cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Scrollable Command List with Smooth Native Wheel & Touch Scroll */}
        <div
          ref={listRef}
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          className="max-h-[50vh] sm:max-h-[56vh] overflow-y-auto overscroll-contain p-2 divide-y divide-slate-100 dark:divide-slate-800/40 select-none"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {filtered.length === 0 && (
            <div className="p-8 text-center text-slate-400 dark:text-slate-500 font-mono text-xs">
              No matching commands found for &ldquo;{search}&rdquo;.
            </div>
          )}
          {filtered.map((cmd, i) => {
            const isSelected = i === selectedIndex;
            return (
              <button
                key={cmd.id}
                data-index={i}
                onClick={() => {
                  cmd.action();
                  handleClose();
                  audio.playSuccess();
                }}
                onMouseEnter={() => {
                  setSelectedIndex(i);
                  audio.playHover();
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-left transition-all duration-150 group cursor-pointer ${
                  isSelected
                    ? "bg-orange-500/15 dark:bg-orange-500/20 text-slate-900 dark:text-white translate-x-1 ring-1 ring-orange-500/30"
                    : "hover:bg-orange-500/5 text-slate-700 dark:text-slate-300"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0 ${
                      isSelected
                        ? "bg-orange-500 text-white shadow-[0_0_12px_rgba(249,115,22,0.6)]"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    } transition-colors`}
                  >
                    {cmd.icon}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-semibold text-xs sm:text-sm transition-colors">
                      {cmd.label}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                      {cmd.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {cmd.shortcut && (
                    <kbd className="hidden sm:inline font-mono text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500">
                      {cmd.shortcut}
                    </kbd>
                  )}
                  <span
                    className={`font-mono text-[10px] transition-opacity ${
                      isSelected
                        ? "opacity-100 text-orange-600 dark:text-orange-400 font-bold"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    ↵
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-500">
          <div className="flex items-center gap-3">
            <span>Navigate <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-[9px]">↑↓</kbd></span>
            <span>Execute <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-[9px]">↵</kbd></span>
            <span>Close <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-[9px]">ESC</kbd></span>
          </div>
          <span className="font-bold text-orange-500">AMIT_OS v3.4</span>
        </div>
      </div>
    </div>
  );
}
