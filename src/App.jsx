import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Music, VolumeX, Sparkles } from 'lucide-react';
import { sound } from './audioSynth';
import aditiPhoto from './assets/aditi.jpg';

export default function App() {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isForgiven, setIsForgiven] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [pleaText, setPleaText] = useState("");

  const lyrics = [
    {
      title: "Verse 1",
      lines: [
        "Kabhi-kabhi Aditi, zindagi mein yuhi koi galti ho jaati hai...",
        "Kabhi-kabhi Aditi, lagta hai saari samajh meri so jaati hai...",
        "Kabhi-kabhi Aditi jab tu rooth jaaye, toh dil mera ghabraata hai...",
        "Soch ke dekho toh, tere bina mera din kahan kat'ta hai..."
      ]
    },
    {
      title: "Chorus",
      isChorus: true,
      lines: [
        "Hey Aditi muskura de, muskura de, muskura de zara! ✨",
        "Bhool ja na meri khata, ek baar toh maaf kar de na zara!",
        "Tu muskura de toh saari fizaayein khil jaayein yahan,",
        "Tu jo rooth jaaye toh soona lage yeh saara jahan...",
        "Hey Aditi muskura de zara... please maaf kar de na zara! 🥺"
      ]
    },
    {
      title: "Verse 2",
      lines: [
        "Kabhi-kabhi Aditi, baat meri galat thi, main dil se maanta hoon,",
        "Dukhaya dil tera maine, yeh sach ab achhe se jaanta hoon...",
        "Teri hasi ke bina sab kuch kitna adhoora lagta hai,",
        "Tu naraz ho jaaye toh pura din kitna bhaari lagta hai..."
      ]
    },
    {
      title: "Outro",
      lines: [
        "Bas ek pyaari si smile de de aur keh de 'it's okay',",
        "Pakka promise, aisi bewakoofi dobara kabhi nahi hogi.",
        "Hey Aditi maan ja na zara... I am really, really sorry! ❤️"
      ]
    }
  ];

  const pleas = [
    "I know I messed up, but please don't stay mad for too long 🥺",
    "I truly miss your smile and talking to you...",
    "I promise to listen to you better and be more thoughtful.",
    "Give me just one chance to make it up to you?",
    "I'm truly, genuinely sorry, Aditi. Please? ❤️"
  ];

  const toggleMusic = () => {
    const newState = sound.toggleBgMusic((playing) => {
      setIsPlayingMusic(playing);
    });
    setIsPlayingMusic(newState);
  };

  const handleForgive = () => {
    setIsForgiven(true);
    sound.playForgiveFanfare();
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#fb7185', '#f43f5e', '#ffffff']
    });
  };

  const handleNo = () => {
    sound.playSadSqueak();
    const nextCount = noCount + 1;
    setNoCount(nextCount);
    setPleaText(pleas[(nextCount - 1) % pleas.length]);
  };

  useEffect(() => {
    return () => {
      sound.stopBgMusic();
    };
  }, []);

  return (
    <div className="mobile-shell">
      {/* Top Header */}
      <header className="site-header">
        <div className="header-brand">
          <Heart size={18} className="heart-pulse" fill="#e11d48" color="#fb7185" />
          <span>For Aditi</span>
        </div>
        <button 
          className={`melody-toggle ${isPlayingMusic ? 'active' : ''}`}
          onClick={toggleMusic}
          aria-label="Toggle Melody"
        >
          {isPlayingMusic ? <Music size={15} /> : <VolumeX size={15} />}
          <span>{isPlayingMusic ? "Melody Playing" : "Play Melody 🎵"}</span>
        </button>
      </header>

      <main className="content-stack">
        {/* Photo & Greeting */}
        <section className="hero-card">
          <div className="photo-container">
            <img 
              src={aditiPhoto} 
              alt="Aditi" 
              className="aditi-photo" 
            />
          </div>

          <div className="hero-text">
            <span className="hero-tag">A Heartfelt Note</span>
            <h1 className="hero-title">Hey Aditi, I am really sorry.</h1>
            <p className="hero-subtext">
              I hate knowing that I caused you hurt or upset you. Seeing you distant or sad is the worst feeling, 
              so I put this together because you mean a lot to me and I wanted to say sorry from the bottom of my heart.
            </p>
          </div>
        </section>

        {/* Melody Banner */}
        <section className="melody-card">
          <div className="melody-info">
            <div className={`disc ${isPlayingMusic ? 'disc-spin' : ''}`}>
              <Heart size={16} fill="#fff" color="#fff" />
            </div>
            <div>
              <div className="melody-name">Kabhi Kabhi Aditi</div>
              <div className="melody-artist">Soft acoustic melody</div>
            </div>
          </div>
          <button 
            className={`btn-play-small ${isPlayingMusic ? 'btn-playing' : ''}`}
            onClick={toggleMusic}
          >
            {isPlayingMusic ? "Pause" : "Play Tune"}
          </button>
        </section>

        {/* Apology Lyrics */}
        <section className="lyrics-card">
          <div className="card-heading">
            <span className="card-kicker">Apology Lyrics</span>
            <h2>Kabhi Kabhi Aditi (Sorry Edition)</h2>
          </div>

          <div className="lyrics-list">
            {lyrics.map((section, idx) => (
              <div 
                key={idx} 
                className={`lyric-block ${section.isChorus ? 'chorus-block' : ''}`}
              >
                <div className="lyric-title">{section.title}</div>
                {section.lines.map((line, lIdx) => (
                  <p key={lIdx} className="lyric-line">{line}</p>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Letter */}
        <section className="letter-card">
          <h3 className="letter-title">Just between us...</h3>
          <p className="letter-body">
            Dear Aditi,
            <br /><br />
            I know words can't undo a mistake, but I wanted you to know how deeply I regret what happened. 
            You bring so much warmth, laughter, and light wherever you go, and making you feel hurt was never my intention.
            <br /><br />
            I value you too much to ever take you for granted. I promise to be more patient, more mindful, and more considerate. 
            Whenever you're ready, I'd really love to see you smile again.
          </p>
          <div className="letter-foot">— I'm so sorry, Aditi 🥺❤️</div>
        </section>

        {/* Forgiveness Section */}
        <section className="forgive-card">
          {!isForgiven ? (
            <>
              <h3>Will you forgive me?</h3>
              <p className="forgive-hint">I promise to make it up to you, genuinely.</p>

              <div className="decision-actions">
                <button className="btn-yes" onClick={handleForgive}>
                  <Heart size={18} fill="#fff" />
                  <span>Yes, I forgive you ❤️</span>
                </button>

                <button className="btn-no" onClick={handleNo}>
                  <span>Still angry 🥺</span>
                </button>
              </div>

              {pleaText && (
                <div className="plea-box">
                  "{pleaText}"
                </div>
              )}
            </>
          ) : (
            <div className="forgiven-box">
              <Sparkles size={28} color="#34d399" />
              <h3>Thank you, Aditi! ❤️</h3>
              <p>Your smile means everything. I promise to always treat you with care and respect.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
