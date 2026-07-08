import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { chapters, poetryWords, profile, quizQuestions, references } from './data/content';
import './styles/global.css';

function useMouseGlow() {
  useEffect(() => {
    const root = document.documentElement;
    const move = (event) => {
      root.style.setProperty('--mouse-x', `${event.clientX}px`);
      root.style.setProperty('--mouse-y', `${event.clientY}px`);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);
}

function ParticleSky() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let animationFrame;
    let particles = [];
    const pointer = { x: 0, y: 0, active: false };

    function resize() {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
      const total = Math.min(95, Math.max(45, Math.floor(window.innerWidth / 18)));
      particles = Array.from({ length: total }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.9 + 0.4
      }));
    }

    function draw() {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < -20) particle.x = window.innerWidth + 20;
        if (particle.x > window.innerWidth + 20) particle.x = -20;
        if (particle.y < -20) particle.y = window.innerHeight + 20;
        if (particle.y > window.innerHeight + 20) particle.y = -20;

        const distance = pointer.active ? Math.hypot(pointer.x - particle.x, pointer.y - particle.y) : 999;
        const alpha = distance < 150 ? 0.85 : 0.32;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 231, 176, ${alpha})`;
        context.fill();

        for (let next = index + 1; next < particles.length; next += 1) {
          const other = particles[next];
          const linkDistance = Math.hypot(other.x - particle.x, other.y - particle.y);
          if (linkDistance < 90) {
            context.strokeStyle = `rgba(194, 169, 108, ${0.12 - linkDistance / 900})`;
            context.lineWidth = 0.6;
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(other.x, other.y);
            context.stroke();
          }
        }
      });
      animationFrame = requestAnimationFrame(draw);
    }

    function onPointerMove(event) {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return <canvas className="particle-sky" ref={canvasRef} aria-hidden="true" />;
}

function Header({ activeChapter, setActiveChapter }) {
  return (
    <header className="header">
      <a className="brand" href="#top" aria-label="Ir para o início">
        <span className="brand-mark">OZ</span>
        <span>
          <strong>{profile.name}</strong>
          <small>Jornada Viva</small>
        </span>
      </a>
      <nav aria-label="Capítulos do site">
        {chapters.map((chapter) => (
          <button
            key={chapter.id}
            className={activeChapter === chapter.id ? 'nav-link active' : 'nav-link'}
            onClick={() => {
              setActiveChapter(chapter.id);
              document.getElementById(chapter.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {chapter.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

function Hero({ onStart }) {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">{profile.handle} • arqueologia • poesia • fé evangélica</p>
        <h1>Um site em modo história, feito para o visitante explorar com o mouse.</h1>
        <p className="hero-text">
          Entre em uma experiência viva: luz interativa, capítulos narrados, fragmentos arqueológicos,
          versos criados pelo visitante e desafios de fé com clima de aventura.
        </p>
        <div className="hero-actions">
          <button className="primary-btn" onClick={onStart}>Começar jornada</button>
          <a className="ghost-btn" href="#referencias">Ver referências</a>
        </div>
        <p className="legal-note">{profile.notice}</p>
      </div>
      <div className="hero-orb" aria-hidden="true">
        <div className="orb-ring ring-one" />
        <div className="orb-ring ring-two" />
        <div className="orb-core">✦</div>
        <span className="floating-tag tag-one">ruínas</span>
        <span className="floating-tag tag-two">versos</span>
        <span className="floating-tag tag-three">fé</span>
      </div>
    </section>
  );
}

function StoryScene({ chapter, index, setActiveChapter }) {
  const sceneRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActiveChapter(chapter.id);
      },
      { threshold: 0.45 }
    );
    if (sceneRef.current) observer.observe(sceneRef.current);
    return () => observer.disconnect();
  }, [chapter.id, setActiveChapter]);

  return (
    <article className="scene-card" id={chapter.id} ref={sceneRef}>
      <div className="scene-media tilt-card">
        <img src={chapter.image} alt={`Arte placeholder do capítulo ${chapter.title}`} />
        <span className="chapter-number">0{index + 1}</span>
      </div>
      <div className="scene-content">
        <p className="eyebrow">{chapter.label} • {chapter.theme}</p>
        <h2>{chapter.title}</h2>
        <p>{chapter.narration}</p>
        <div className="action-card">
          <span>Interação</span>
          <strong>{chapter.action}</strong>
        </div>
      </div>
    </article>
  );
}

function FragmentGame() {
  const fragments = useMemo(
    () => [
      { id: 'mapa', label: 'Mapa', x: 14, y: 34 },
      { id: 'vaso', label: 'Vaso', x: 72, y: 28 },
      { id: 'pedra', label: 'Pedra', x: 50, y: 66 },
      { id: 'selo', label: 'Selo', x: 83, y: 72 }
    ],
    []
  );
  const [found, setFound] = useState([]);
  const completed = found.length === fragments.length;

  function collect(fragmentId) {
    setFound((current) => (current.includes(fragmentId) ? current : [...current, fragmentId]));
  }

  return (
    <section className="game-section" id="jogos">
      <div className="section-heading">
        <p className="eyebrow">Jogo criativo 1</p>
        <h2>Caça aos Fragmentos</h2>
        <p>Clique nos artefatos escondidos para reconstruir o mapa antigo.</p>
      </div>
      <div className="dig-site" role="group" aria-label="Jogo caça aos fragmentos arqueológicos">
        {fragments.map((fragment) => (
          <button
            key={fragment.id}
            className={found.includes(fragment.id) ? 'fragment found' : 'fragment'}
            style={{ left: `${fragment.x}%`, top: `${fragment.y}%` }}
            onClick={() => collect(fragment.id)}
            aria-label={`Coletar fragmento ${fragment.label}`}
          >
            {found.includes(fragment.id) ? '✓' : '◆'}
            <span>{fragment.label}</span>
          </button>
        ))}
        <div className="dig-progress">
          <strong>{found.length}/{fragments.length}</strong>
          <span>{completed ? 'Mapa reconstruído. A próxima porta foi aberta.' : 'fragmentos encontrados'}</span>
        </div>
      </div>
    </section>
  );
}

function PoetryForge() {
  const [opening, setOpening] = useState(poetryWords.openings[0]);
  const [verb, setVerb] = useState(poetryWords.verbs[0]);
  const [image, setImage] = useState(poetryWords.images[0]);

  return (
    <section className="poetry-forge">
      <div>
        <p className="eyebrow">Jogo criativo 2</p>
        <h2>Pergaminho Vivo</h2>
        <p>Escolha palavras e crie um verso. O texto pode ser salvo como legenda, abertura de capítulo ou tela do jogo.</p>
      </div>
      <div className="word-lab">
        <Selector label="Início" options={poetryWords.openings} value={opening} onChange={setOpening} />
        <Selector label="Verbo" options={poetryWords.verbs} value={verb} onChange={setVerb} />
        <Selector label="Imagem" options={poetryWords.images} value={image} onChange={setImage} />
        <blockquote>{opening}, {verb} {image}.</blockquote>
      </div>
    </section>
  );
}

function Selector({ label, options, value, onChange }) {
  return (
    <label className="selector">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

function FaithQuiz() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('Escolha uma resposta para acender a próxima lâmpada.');
  const current = quizQuestions[index];

  function answer(optionIndex) {
    const correct = optionIndex === current.answer;
    setScore((old) => old + (correct ? 1 : 0));
    setMessage(correct ? `Certo. ${current.note}` : `Quase. ${current.note}`);
    setTimeout(() => {
      setIndex((old) => (old + 1) % quizQuestions.length);
    }, 650);
  }

  return (
    <section className="faith-quiz">
      <div>
        <p className="eyebrow">Jogo criativo 3</p>
        <h2>Trilha da Fé</h2>
        <p>Um quiz simples para avançar pela narrativa e desbloquear reflexões.</p>
      </div>
      <div className="quiz-card">
        <div className="quiz-topline">
          <span>Pergunta {index + 1}/{quizQuestions.length}</span>
          <span>Pontos: {score}</span>
        </div>
        <h3>{current.question}</h3>
        <div className="quiz-options">
          {current.options.map((option, optionIndex) => (
            <button key={option} onClick={() => answer(optionIndex)}>{option}</button>
          ))}
        </div>
        <p>{message}</p>
      </div>
    </section>
  );
}

function ReferenceGrid() {
  return (
    <section className="references" id="referencias">
      <div className="section-heading">
        <p className="eyebrow">Banco de referências</p>
        <h2>Área para imagens, reels e posts autorizados</h2>
        <p>Troque os placeholders pelas imagens permitidas ou mantenha o link para o post original.</p>
      </div>
      <div className="reference-grid">
        {references.map((item) => (
          <article className="reference-card" key={item.title}>
            <img src={item.image} alt={`Placeholder: ${item.title}`} />
            <div>
              <span>{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.instagramUrl ? (
                <a href={item.instagramUrl} target="_blank" rel="noreferrer">Abrir referência oficial</a>
              ) : (
                <small>Adicione a URL oficial ou arquivo autorizado.</small>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SoundToggle() {
  const [enabled, setEnabled] = useState(false);
  const audioEngine = useRef(null);

  useEffect(() => {
    if (!enabled) {
      if (audioEngine.current) {
        audioEngine.current.oscillators.forEach((oscillator) => oscillator.stop());
        audioEngine.current.context.close();
        audioEngine.current = null;
      }
      return undefined;
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      setEnabled(false);
      return undefined;
    }

    const context = new AudioContext();
    const master = context.createGain();
    master.gain.value = 0.035;
    master.connect(context.destination);

    const tones = [110, 164.81, 220].map((frequency, toneIndex) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = toneIndex === 0 ? 'sine' : 'triangle';
      oscillator.frequency.value = frequency;
      gain.gain.value = toneIndex === 0 ? 0.34 : 0.13;
      oscillator.connect(gain);
      gain.connect(master);
      oscillator.start();
      return oscillator;
    });

    audioEngine.current = { context, oscillators: tones };

    return () => {
      tones.forEach((oscillator) => oscillator.stop());
      context.close();
      audioEngine.current = null;
    };
  }, [enabled]);

  return (
    <button className="sound-toggle" onClick={() => setEnabled((value) => !value)}>
      {enabled ? 'Som ambiente: ligado' : 'Som ambiente: desligado'}
    </button>
  );
}

function App() {
  const [activeChapter, setActiveChapter] = useState(chapters[0].id);
  useMouseGlow();

  function startStory() {
    document.getElementById('portal')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <ParticleSky />
      <div className="mouse-light" aria-hidden="true" />
      <Header activeChapter={activeChapter} setActiveChapter={setActiveChapter} />
      <main>
        <Hero onStart={startStory} />
        <section className="story-road" aria-label="Capítulos em modo história">
          {chapters.map((chapter, index) => (
            <StoryScene key={chapter.id} chapter={chapter} index={index} setActiveChapter={setActiveChapter} />
          ))}
        </section>
        <FragmentGame />
        <PoetryForge />
        <FaithQuiz />
        <ReferenceGrid />
      </main>
      <SoundToggle />
      <footer className="footer">
        <strong>{profile.name}</strong>
        <p>Projeto web responsivo para GitHub e Vercel. Substitua placeholders por arquivos com autorização.</p>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
