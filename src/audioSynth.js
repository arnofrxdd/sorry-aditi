// Web Audio API based melodic synth for "Kabhi Kabhi Aditi" vibe
class SoundSystem {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.musicTimer = null;
    this.step = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, duration = 0.5, type = 'sine', gainVal = 0.15) {
    this.init();
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Warm bell-like envelope
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(gainVal, ctx.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  }

  playChime() {
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.8, 'sine', 0.12);
      }, idx * 90);
    });
  }

  playForgiveFanfare() {
    this.init();
    const fanfare = [
      { f: 523.25, t: 0 },
      { f: 659.25, t: 120 },
      { f: 783.99, t: 240 },
      { f: 987.77, t: 360 },
      { f: 1046.50, t: 480 },
      { f: 1318.51, t: 620 }
    ];
    fanfare.forEach(({ f, t }) => {
      setTimeout(() => {
        this.playTone(f, 1.2, 'triangle', 0.2);
        this.playTone(f * 0.5, 1.0, 'sine', 0.15);
      }, t);
    });
  }

  playSadSqueak() {
    this.init();
    const notes = [440, 415.3, 392, 349.2];
    notes.forEach((f, idx) => {
      setTimeout(() => {
        this.playTone(f, 0.25, 'sawtooth', 0.05);
      }, idx * 80);
    });
  }

  toggleBgMusic(onStateChange) {
    this.init();
    if (this.isPlayingMusic) {
      this.stopBgMusic();
      if (onStateChange) onStateChange(false);
      return false;
    } else {
      this.startBgMusic();
      if (onStateChange) onStateChange(true);
      return true;
    }
  }

  startBgMusic() {
    if (this.isPlayingMusic) return;
    this.isPlayingMusic = true;

    // Melody sequence inspired by Kabhi Kabhi Aditi in D/G (pleasant warm notes)
    // D4, E4, F#4, G4, A4, B4, C#5, D5
    const melody = [
      { f: 587.33, d: 0.4 }, // D5 (Ka-bhi)
      { f: 659.25, d: 0.4 }, // E5 (ka-bhi)
      { f: 739.99, d: 0.5 }, // F#5 (A-di-ti)
      { f: 659.25, d: 0.4 }, 
      { f: 587.33, d: 0.6 },
      { f: 493.88, d: 0.4 }, // B4
      { f: 587.33, d: 0.5 },
      { f: 440.00, d: 0.7 }, // A4
      // Hey Aditi muskura de
      { f: 739.99, d: 0.35 },
      { f: 880.00, d: 0.35 },
      { f: 987.77, d: 0.45 },
      { f: 880.00, d: 0.35 },
      { f: 739.99, d: 0.35 },
      { f: 659.25, d: 0.5 },
      { f: 587.33, d: 0.8 }
    ];

    let noteIdx = 0;
    const tick = () => {
      if (!this.isPlayingMusic) return;
      const note = melody[noteIdx % melody.length];
      this.playTone(note.f * 0.75, note.d * 1.5, 'sine', 0.12);
      // Soft bass accompaniment every 4 notes
      if (noteIdx % 4 === 0) {
        this.playTone(note.f * 0.375, 1.2, 'triangle', 0.15);
      }
      noteIdx++;
      const nextDelay = note.d * 900;
      this.musicTimer = setTimeout(tick, nextDelay);
    };

    tick();
  }

  stopBgMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }
}

export const sound = new SoundSystem();
