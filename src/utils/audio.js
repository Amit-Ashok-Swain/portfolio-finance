class AudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isMuted = false;
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("amitOS_audio_muted");
        if (saved !== null) {
          this.isMuted = JSON.parse(saved);
        }
      } catch {
        this.isMuted = false;
      }
    }
  }

  init() {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = this.isMuted ? 0 : 0.12;
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("amitOS_audio_muted", JSON.stringify(this.isMuted));
      } catch {
        // ignore
      }
      window.dispatchEvent(
        new CustomEvent("audio-toggled", { detail: { isMuted: this.isMuted } })
      );
    }
    if (this.masterGain && this.ctx) {
      const t = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(t);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, t);
      this.masterGain.gain.linearRampToValueAtTime(this.isMuted ? 0 : 0.12, t + 0.05);
    }
    return this.isMuted;
  }

  playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.type = "sine";
      osc.frequency.setValueAtTime(1400, t);
      osc.frequency.exponentialRampToValueAtTime(320, t + 0.08);

      gain.gain.setValueAtTime(0.7, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

      osc.start(t);
      osc.stop(t + 0.08);
    } catch {
      // ignore
    }
  }

  playHover() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.type = "sine";
      osc.frequency.setValueAtTime(2200, t);
      osc.frequency.exponentialRampToValueAtTime(1800, t + 0.03);

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

      osc.start(t);
      osc.stop(t + 0.03);
    } catch {
      // ignore
    }
  }

  playToggle() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.type = "triangle";
      osc.frequency.setValueAtTime(400, t);
      osc.frequency.exponentialRampToValueAtTime(800, t + 0.06);

      gain.gain.setValueAtTime(0.5, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

      osc.start(t);
      osc.stop(t + 0.06);
    } catch {
      // ignore
    }
  }

  playMilestone() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.type = "triangle";
      osc.frequency.setValueAtTime(160, t);
      osc.frequency.exponentialRampToValueAtTime(45, t + 0.6);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.9, t + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

      osc.start(t);
      osc.stop(t + 0.6);
    } catch {
      // ignore
    }
  }

  playSuccess() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const t = this.ctx.currentTime + idx * 0.07;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.4, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

        osc.start(t);
        osc.stop(t + 0.35);
      });
    } catch {
      // ignore
    }
  }

  playCommand() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    try {
      const t = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.masterGain);

      osc1.type = "sine";
      osc2.type = "square";

      osc1.frequency.setValueAtTime(880, t);
      osc1.frequency.exponentialRampToValueAtTime(1760, t + 0.1);

      osc2.frequency.setValueAtTime(440, t);
      osc2.frequency.exponentialRampToValueAtTime(880, t + 0.1);

      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + 0.1);
      osc2.stop(t + 0.1);
    } catch {
      // ignore
    }
  }

  playGlitch() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    try {
      for (let i = 0; i < 4; i++) {
        const t = this.ctx.currentTime + i * 0.03;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.type = i % 2 === 0 ? "sawtooth" : "square";
        osc.frequency.setValueAtTime(200 + Math.random() * 2000, t);

        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

        osc.start(t);
        osc.stop(t + 0.04);
      }
    } catch {
      // ignore
    }
  }

  playWarp() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.type = "sine";
      osc.frequency.setValueAtTime(80, t);
      osc.frequency.exponentialRampToValueAtTime(600, t + 0.25);
      osc.frequency.exponentialRampToValueAtTime(100, t + 0.5);

      gain.gain.setValueAtTime(0.01, t);
      gain.gain.linearRampToValueAtTime(0.4, t + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

      osc.start(t);
      osc.stop(t + 0.5);
    } catch {
      // ignore
    }
  }
}

export const audio = new AudioEngine();
