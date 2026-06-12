import React, { useState, useEffect } from "react";
import { 
  Compass, 
  ClipboardList, 
  HelpCircle, 
  Sparkles, 
  MapPin, 
  BookOpen, 
  ChevronRight, 
  ChevronLeft, 
  RefreshCw, 
  Award, 
  CheckCircle,
  AlertCircle,
  Clock,
  Briefcase,
  Info,
  Activity,
  Filter,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { questions, cycles, profilesData } from "./data";
import { RIASECScores, RIASECType, Cycle } from "./types";

// --- Definiciones de Arquetipos (El corazón de la orientación) ---
const ARCHETYPES = {
  RI: { 
    title: "El Ingeniero de Campo 🛠️🔍", 
    desc: "Equilibras el pensamiento lógico con la ejecución física. Entiendes el 'porqué' de las cosas y también su 'cómo' técnico, sin problemas para trabajar sobre el terreno o mancharte las manos." 
  },
  RA: { 
    title: "El Artífice de lo Práctico 🛠️🎨", 
    desc: "Tienes el don innato para dar forma física y materializar ideas creativas. Te importa la estética y el diseño, pero la funcionalidad real es tu guía principal." 
  },
  RS: { 
    title: "El Guía Técnico 🛠️🤝", 
    desc: "Tu destreza práctica con herramientas se combina perfectamente con tu facilidad para conectar con los demás. Eres el soporte técnico, práctico y humano ideal." 
  },
  RE: { 
    title: "El Emprendedor Operativo 🛠️🚀", 
    desc: "Ves oportunidades para cambiar cosas reales y tomas las riendas inmediatamente. Eres un líder proactivo que sabe cómo se hacen las cosas sobre el terreno desde la base." 
  },
  RC: { 
    title: "El Técnico Preciso 🛠️📊", 
    desc: "La precisión y el detalle minucioso son tu filosofía de vida. Aplicas un rigor extraordinario a tareas físicas y procesos de montaje para asegurar que nada falle." 
  },
  IA: { 
    title: "El Analista Creativo 🔍🎨", 
    desc: "Desmontas problemas lógicos complejos y les das una solución totalmente original. Tu mente funciona como un laboratorio de ideas y diseño avanzado." 
  },
  IS: { 
    title: "El Consultor de Apoyo 🔍🤝", 
    desc: "Entiendes los problemas a fondo (tanto técnicos como de personas) y disfrutas ayudando a resolverlos con paciencia, empatía y base metodológica." 
  },
  IE: { 
    title: "El Estratega Analítico 🔍🚀", 
    desc: "Analizas el panorama técnico completo, interpretas métricas y tomas decisiones inteligentes basadas en datos para impulsar lanzamientos de proyectos." 
  },
  IC: { 
    title: "El Investigador Riguroso 🔍📊", 
    desc: "Tu mente brilla buscando la verdad organizada en los datos. El orden sistemático y la lógica estructurada son tus mejores aliados." 
  },
  AS: { 
    title: "El Creador Social 🎨🤝", 
    desc: "Tu increíble creatividad tiene un fin muy claro: impactar de forma positiva y sensible en los demás. El arte y la comunicación son tus formas de conectar." 
  },
  AE: { 
    title: "El Visionario del Mercado 🎨🚀", 
    desc: "Tienes un olfato innato para captar nuevas tendencias estéticas u oportunidades, y la audacia de convertirlas en propuestas de negocio creativas reales." 
  },
  AC: { 
    title: "El Diseñador Metódico 🎨📊", 
    desc: "Consigues un balance espectacular combinando una profunda sensibilidad artística con una estructura y orden organizativos impecables." 
  },
  SE: { 
    title: "El Líder Empático 🤝🚀", 
    desc: "Logras mover y motivar a grupos de personas porque entiendes a la perfección qué necesitan, cómo escucharlos y qué les impulsa a avanzar." 
  },
  SC: { 
    title: "El Gestor de Cuidados 🤝📊", 
    desc: "Organización de recursos al servicio del bienestar de las personas. Eres el pilar organizativo que sostiene proyectos dedicados a la salud o la atención." 
  },
  EC: { 
    title: "El Estratega Organizado 🚀📊", 
    desc: "Lideras basándote en la estructura del orden. Tienes una visión comercial muy proactiva que se sustenta sobre una planificación y coordinación impecables." 
  },
};

// Custom SVG Radar Chart Component styled elegantly
function RadarChart({ scores }: { scores: RIASECScores }) {
  const keys: RIASECType[] = ['R', 'I', 'A', 'S', 'E', 'C'];
  const labels: Record<RIASECType, string> = {
    R: '🛠️ Realista',
    I: '🔍 Investigador',
    A: '🎨 Artístico',
    S: '🤝 Social',
    E: '🚀 Emprendedor',
    C: '📊 Convencional',
  };
  
  const size = 300;
  const center = size / 2;
  const radius = center - 45; 
  
  // Calculate vertex coordinates based on score (1 to 5)
  const getAnglePoint = (index: number, value: number) => {
    // 6 segments: 360 / 6 = 60 degrees (in radians)
    const angle = (Math.PI * 2 / 6) * index - Math.PI / 2;
    // Map score scale (1-5) to length (0-radius)
    const length = (radius * value) / 5;
    const x = center + length * Math.cos(angle);
    const y = center + length * Math.sin(angle);
    return { x, y };
  };

  const points = keys.map((key, i) => getAnglePoint(i, scores[key]));
  const pointsString = points.map(p => `${p.x},${p.y}`).join(' ');

  // Radial grid levels (1 to 5 scores)
  const gridLevels = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col items-center">
      <svg width="100%" height={size} viewBox={`0 0 ${size} ${size}`} className="max-w-xs mx-auto">
        <defs>
          <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(107, 33, 168, 0.05)" />
            <stop offset="100%" stopColor="rgba(107, 33, 168, 0.25)" />
          </radialGradient>
        </defs>

        {/* Concentric grid lines (Hexagons) */}
        {gridLevels.map(lvl => {
          const lvlPoints = keys.map((_, i) => getAnglePoint(i, lvl));
          const lvlPointsStr = lvlPoints.map(p => `${p.x},${p.y}`).join(' ');
          return (
            <polygon
              key={lvl}
              points={lvlPointsStr}
              fill="none"
              stroke="#FFE8CC"
              strokeWidth="1"
              strokeDasharray={lvl === 5 ? "none" : "3,3"}
            />
          );
        })}

        {/* Grid axes (Spokes) */}
        {keys.map((_, i) => {
          const outerPt = getAnglePoint(i, 5);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={outerPt.x}
              y2={outerPt.y}
              stroke="#FFD8A8"
              strokeWidth="1.2"
            />
          );
        })}

        {/* Concentric grid text indices */}
        {gridLevels.map(lvl => {
          const pt = getAnglePoint(0, lvl);
          return (
            <text
              key={lvl}
              x={pt.x + 5}
              y={pt.y + 12}
              className="text-[9px] fill-[#7C6652] opacity-70 font-medium font-mono"
            >
              {lvl}
            </text>
          );
        })}

        {/* The Result Polygon Filled Area list */}
        <polygon
          points={pointsString}
          fill="url(#radarGrad)"
          stroke="#6B21A8"
          strokeWidth="2.5"
          className="transition-all duration-500 ease-in-out"
        />

        {/* Data point circles on vertices */}
        {points.map((pt, i) => (
          <circle
            key={i}
            cx={pt.x}
            cy={pt.y}
            r="5"
            className="fill-[#FF9A3E] stroke-white stroke-2 shadow-sm transition-all duration-500 ease-in-out"
          />
        ))}

        {/* Dynamic Labels */}
        {keys.map((key, i) => {
          const labelPt = getAnglePoint(i, 5.75);
          let textAnchor: 'inherit' | 'end' | 'middle' | 'start' | undefined = 'middle';
          if (labelPt.x < center - 20) textAnchor = 'end';
          else if (labelPt.x > center + 20) textAnchor = 'start';
          
          return (
            <text
              key={key}
              x={labelPt.x}
              y={labelPt.y + 4}
              textAnchor={textAnchor}
              className="text-[11px] font-bold fill-[#4A3728] tracking-tight font-display"
            >
              {labels[key]}
            </text>
          );
        })}
      </svg>
      <div className="text-[11px] text-[#7C6652]/70 font-mono mt-1">Escala de Aptitudes (1 = Interés Bajo, 5 = Interés Máximo)</div>
    </div>
  );
}

export default function App() {
  // Navigation tabs config: 'test' is default
  const [activeTab, setActiveTab] = useState<'test' | 'results' | 'catalog' | 'eoi'>('test');
  
  // Test/RIASEC States
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<RIASECScores | null>(null);
  const [isTestResetting, setIsTestResetting] = useState(false);

  // Filters for cycle catalog
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize and load saved info from LocalStorage
  useEffect(() => {
    const savedAnswers = localStorage.getItem("orientacion_answers");
    if (savedAnswers) {
      const parsedAnswers = JSON.parse(savedAnswers);
      setAnswers(parsedAnswers);
      updateScores(parsedAnswers);
    }

    const savedScores = localStorage.getItem("orientacion_scores");
    if (savedScores) {
      setScores(JSON.parse(savedScores));
    }
  }, []);

  // Recalculate RIASEC scores when answers mutate
  const updateScores = (currentAnswers: Record<number, number>) => {
    const categories: Record<RIASECType, { total: number; count: number }> = {
      R: { total: 0, count: 0 },
      I: { total: 0, count: 0 },
      A: { total: 0, count: 0 },
      S: { total: 0, count: 0 },
      E: { total: 0, count: 0 },
      C: { total: 0, count: 0 },
    };

    questions.forEach(q => {
      const selectedScore = currentAnswers[q.id];
      if (selectedScore !== undefined) {
        categories[q.type].total += selectedScore;
        categories[q.type].count += 1;
      }
    });

    const computed: RIASECScores = { R: 1, I: 1, A: 1, S: 1, E: 1, C: 1 };
    (Object.keys(categories) as RIASECType[]).forEach(key => {
      const avg = categories[key].count > 0 ? categories[key].total / categories[key].count : 1;
      // Round to 1 decimal place
      computed[key] = parseFloat(avg.toFixed(1));
    });

    setScores(computed);
    localStorage.setItem("orientacion_scores", JSON.stringify(computed));

    // If completed, automatically open the results tab to let them see their report!
    const testCompleted = Object.keys(currentAnswers).length === questions.length;
    if (testCompleted) {
      setActiveTab('results');
    }
  };

  // Check if "Lienzo en Blanco" / "Ni fu ni fa" condition is met
  // Defined as: completed the test but no individual category average is > 3.2
  const getIsLienzoEnBlanco = () => {
    if (!scores) return false;
    const isCompleted = Object.keys(answers).length === questions.length;
    if (!isCompleted) return false;
    
    const highestVal = Math.max(scores.R, scores.I, scores.A, scores.S, scores.E, scores.C);
    return highestVal <= 3.2;
  };

  const handleSelectAnswer = (qId: number, score: number) => {
    const updatedAnswers = { ...answers, [qId]: score };
    setAnswers(updatedAnswers);
    localStorage.setItem("orientacion_answers", JSON.stringify(updatedAnswers));
    
    // Auto-update live scores
    updateScores(updatedAnswers);

    // Progression: automatically go to next question after selecting an answer with slight delay
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 350);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleResetTest = () => {
    setIsTestResetting(true);
    setTimeout(() => {
      setAnswers({});
      setScores(null);
      setCurrentQuestionIndex(0);
      localStorage.removeItem("orientacion_answers");
      localStorage.removeItem("orientacion_scores");
      setIsTestResetting(false);
      setActiveTab('test');
    }, 400);
  };

  // Lógica de Sinergia (El Ranking Inteligente)
  const getMatchedCycles = () => {
    if (!scores) return [];
    
    // Identificar top 2 de forma ordenada
    const sorted = (Object.keys(scores) as RIASECType[])
      .map(k => ({ key: k, val: scores[k] }))
      .sort((a,b) => b.val - a.val);
      
    const topKeys = [sorted[0].key, sorted[1].key];

    return [...cycles].map(c => {
      let affinity = 0;
      c.tags.forEach(t => {
        affinity += (scores[t] || 1);
      });
      const baseScore = parseFloat((affinity / c.tags.length).toFixed(1));

      // Bonus de Sinergia: Si el ciclo pide las dos fortalezas del alumno
      const achievesSynergy = c.tags.includes(topKeys[0]) && c.tags.includes(topKeys[1]);
      const matchScore = achievesSynergy 
        ? parseFloat((baseScore + 0.8).toFixed(1)) 
        : baseScore;

      return { ...c, matchScore, achievesSynergy };
    }).sort((a, b) => b.matchScore - a.matchScore);
  };

  const getArchetype = () => {
    if (!scores) return null;
    const sorted = (Object.keys(scores) as RIASECType[]).map(k => ({ key: k, val: scores[k] })).sort((a,b) => b.val - a.val);
    const riasecOrder = ['R', 'I', 'A', 'S', 'E', 'C'];
    const pair = [sorted[0].key, sorted[1].key].sort((a, b) => riasecOrder.indexOf(a) - riasecOrder.indexOf(b)).join('') as keyof typeof ARCHETYPES;
    return ARCHETYPES[pair] || { title: "Perfil Equilibrado 🧭💎", desc: "Tienes una visión polifacética y adaptativa de tus capacidades. ¡Eres un perfil versátil capaz de destacar en múltiples áreas!" };
  };

  // Filter cycles for the search catalogue
  const filteredCycles = cycles.filter(c => {
    const matchesCategory = selectedCategory === 'todos' || c.category === selectedCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.center.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.gives.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.for.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate top vocational personality profile
  const getPrimaryVocationalProfile = () => {
    if (!scores) return null;
    const sorted = (Object.keys(scores) as RIASECType[]).map(key => ({
      key,
      val: scores[key],
    })).sort((a, b) => b.val - a.val);
    return sorted[0];
  };

  const getSecondaryVocationalProfile = () => {
    if (!scores) return null;
    const sorted = (Object.keys(scores) as RIASECType[]).map(key => ({
      key,
      val: scores[key],
    })).sort((a, b) => b.val - a.val);
    return sorted[1];
  };

  const primaryProfile = getPrimaryVocationalProfile();
  const secondaryProfile = getSecondaryVocationalProfile();
  const archetype = getArchetype();

  // Test status helpers
  const totalAnswered = Object.keys(answers).length;
  const testCompleted = totalAnswered === questions.length;
  const isLienzoEnBlanco = getIsLienzoEnBlanco();

  // Helper helper to format affinity percentage & quality text (capped at 100%)
  const getAffinityStatus = (score: number) => {
    const pct = Math.min(100, Math.round(score * 20)); // Scale from 1-5 to 100%, capped safely
    if (score >= 4.4) return { pct, color: "text-emerald-700 bg-emerald-50 border-emerald-200", text: "🥇 Sinergia Excelente" };
    if (score >= 3.7) return { pct, color: "text-[#D97706] bg-[#FFF4E0] border-[#FFD8A8]", text: "🥈 Sinergia Alta" };
    if (score >= 3.0) return { pct, color: "text-[#6B21A8] bg-[#FAF5FF] border-[#F3E8FF]", text: "🥉 Sinergia Media" };
    return { pct, color: "text-slate-600 bg-slate-50 border-slate-200", text: "✓ Sinergia Complementaria" };
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] text-[#4A3728] flex flex-col font-sans p-4 sm:p-6 animate-fade-in" id="vocacional-app">
      
      {/* Top Header Section */}
      <header className="bg-white rounded-3xl p-6 shadow-sm border-2 border-[#FFE8CC] mb-6 max-w-5xl w-full mx-auto shrink-0 font-sans animate-fade-in" id="header-section">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-[#FF9A3E] flex items-center justify-center text-3xl shadow-inner relative shrink-0 select-none">
              🧭
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-[#4A3728] font-display">
                ¿Qué elijo tras terminar la ESO?<span className="text-[#6B21A8]">¡Descúbrelo!</span>
              </h1>
              <p className="text-[#7C6652] text-xs md:text-sm mt-0.5 max-w-2xl font-medium">
                Test interactivo de intereses basado en el modelo RIASEC y buscador de ciclos formativos públicos de Grado Medio y Escuelas de Arte en Córdoba Capital.
              </p>
            </div>
          </div>
          
          <div className="bg-[#FFF4E0] px-4 py-2 rounded-full border border-[#FFD8A8] text-[#D97706] font-bold text-xs flex items-center gap-2 self-stretch md:self-auto justify-center shrink-0">
            <Clock className="w-4 h-4 text-[#FF9A3E]" />
            <span className="uppercase tracking-wider text-[10px]">Orientación Vocacional Tras la ESO</span>
          </div>
        </div>
      </header>

      {/* Tabs Menu Area */}
      <nav className="bg-white rounded-2xl border-2 border-[#FFE8CC] sticky top-4 z-40 shadow-sm shrink-0 max-w-5xl w-full mx-auto mb-6" id="nav-tabs">
        <div className="px-2 flex overflow-x-auto scrollbar-none items-center">
          <button
            id="tab-btn-test"
            onClick={() => setActiveTab('test')}
            className={`flex items-center gap-2 py-4 px-5 text-sm font-bold border-b-2 font-display transition-all whitespace-nowrap relative cursor-pointer ${
              activeTab === 'test' 
                ? 'border-[#6B21A8] text-[#6B21A8] bg-[#FAF5FF]/50' 
                : 'border-transparent text-[#7C6652] hover:text-[#4A3728] hover:bg-[#FFFBF5]/30'
            }`}
          >
            <ClipboardList className="w-4 h-4 text-[#6B21A8]" />
            1. Hacer el Test (RIASEC)
            {totalAnswered > 0 && !testCompleted && (
              <span className="ml-1.5 bg-[#FF9A3E] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                {totalAnswered}/24
              </span>
            )}
            {testCompleted && (
              <span className="ml-1.5 bg-[#E7F3EF] text-[#2D6A4F] text-[10px] px-1.5 py-0.5 rounded font-bold">¡Hecho!</span>
            )}
          </button>

          <button
            id="tab-btn-results"
            onClick={() => setActiveTab('results')}
            className={`flex items-center gap-2 py-4 px-5 text-sm font-bold border-b-2 font-display transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'results' 
                ? 'border-[#FF9A3E] text-[#FF9A3E] bg-[#FFF4E0]/30' 
                : 'border-transparent text-[#7C6652] hover:text-[#4A3728] hover:bg-[#FFFBF5]/30'
            }`}
          >
            <Award className="w-4 h-4 text-[#FF9A3E]" />
            2. Mi Firma y Ranking 10
          </button>
          
          <button
            id="tab-btn-catalog"
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-2 py-4 px-5 text-sm font-bold border-b-2 font-display transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'catalog' 
                ? 'border-[#0369A1] text-[#0369A1] bg-[#E0F2FE]/40' 
                : 'border-transparent text-[#7C6652] hover:text-[#4A3728] hover:bg-[#FFFBF5]/40'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#0369A1]" />
            Buscador de Ciclos de Córdoba
          </button>

          <button
            id="tab-btn-eoi"
            onClick={() => setActiveTab('eoi')}
            className={`flex items-center gap-2 py-4 px-5 text-sm font-bold border-b-2 font-display transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'eoi' 
                ? 'border-[#D97706] text-[#D97706] bg-[#FFF4E0]/40' 
                : 'border-transparent text-[#7C6652] hover:text-[#4A3728] hover:bg-[#FFFBF5]/40'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#D97706]" />
            El Comodín EOI (Escuela Oficial de Idiomas)
          </button>
        </div>
      </nav>

      {/* Main Workspace Frame container */}
      <main className="flex-1 max-w-5xl w-full mx-auto flex flex-col min-h-0 bg-transparent" id="main-content">
        
        <AnimatePresence mode="wait">
          
          {/* TAB 1: El Test Vocacional (RIASEC Questions) */}
          {activeTab === 'test' && (
            <motion.div 
              key="test_tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6 animate-fade-in"
              id="test-module"
            >
              <div className="bg-white rounded-3xl shadow-sm border-2 border-[#FFE8CC] p-6" id="test-card">
                
                {/* Header explaining test */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#FFE8CC]/40 pb-4 mb-6">
                  <div>
                    <h2 className="text-xl font-bold font-display text-[#6B21A8] flex items-center gap-2">
                      <ClipboardList className="w-6 h-6 text-[#6B21A8]" />
                      Tu Test de Intereses y Aptitudes
                    </h2>
                    <p className="text-xs text-[#7C6652] mt-1 pr-4">
                      Responde de forma sincera según cómo te sientas en estos escenarios prácticos e ideas. No pienses en las notas, ¡solo en lo que te gusta trastear!
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-xs text-[#7C6652] lowercase block font-semibold">Progreso</span>
                      <span className="text-sm font-bold text-[#4A3728] font-mono">
                        {totalAnswered} / {questions.length} respondidas
                      </span>
                    </div>
                    
                    <button 
                      id="reset-test-btn"
                      onClick={handleResetTest}
                      className="p-2 text-[#7C6652] hover:text-[#4A3728] hover:bg-[#FFF4E0]/20 rounded-xl border border-transparent hover:border-[#FFE8CC] transition-all cursor-pointer"
                      title="Reiniciar test completo"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-3 bg-[#FFF4E0] rounded-full mb-8 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#FF9A3E] to-[#6B21A8] transition-all duration-300 rounded-full"
                    style={{ width: `${(totalAnswered / questions.length) * 100}%` }}
                  />
                </div>

                {/* Question Focus Card */}
                <div className="bg-[#FFFAF0] border-2 border-[#FEEBC8] rounded-3xl p-6 md:p-8 min-h-[220px] flex flex-col justify-between mb-6 shadow-sm relative overflow-hidden" id="current-question-card">
                  
                  {/* Watermark quote symbol */}
                  <div className="absolute right-4 top-4 text-8xl font-black text-[#FFE8CC]/40 font-display select-none pointer-events-none">
                    {questions[currentQuestionIndex].type}
                  </div>

                  <div>
                    <span className="bg-[#FFF4E0] text-[#D97706] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-[#FFD8A8]">
                      Pregunta {currentQuestionIndex + 1} de {questions.length}
                    </span>
                    
                    <motion.h3 
                      key={currentQuestionIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-lg md:text-xl font-bold text-[#4A3728] mt-5 leading-normal max-w-xl font-display"
                    >
                      {questions[currentQuestionIndex].text}
                    </motion.h3>
                  </div>

                  {/* Likert Buttons controls */}
                  <div className="mt-8">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#7C6652] mb-3 block">¿Cómo te suena esta idea o actividad?:</p>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {[
                        { val: 5, label: "😍 ¡Me encanta!", color: "hover:bg-[#F0FDF4] hover:text-[#166534] hover:border-[#DCFCE7]" },
                        { val: 4, label: "🙂 Me interesa", color: "hover:bg-[#E0F2FE] hover:text-[#0369A1] hover:border-[#BAE6FD]" },
                        { val: 3, label: "🤷 Ni fu ni fa", color: "hover:bg-[#FFF4E0] hover:text-[#D97706] hover:border-[#FFD8A8]" },
                        { val: 2, label: "😕 Poco", color: "hover:bg-[#FAF5FF] hover:text-[#6B21A8] hover:border-[#F3E8FF]" },
                        { val: 1, label: "🤢 Lo odiaría", color: "hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300" }
                      ].map((btn) => {
                        const isSelected = answers[questions[currentQuestionIndex].id] === btn.val;
                        return (
                          <button
                            key={btn.val}
                            onClick={() => handleSelectAnswer(questions[currentQuestionIndex].id, btn.val)}
                            className={`py-3 px-2 border-2 text-xs md:text-sm rounded-xl font-bold text-center transition-all cursor-pointer ${
                              isSelected 
                                ? "bg-[#6B21A8] text-white border-[#6B21A8] scale-[1.03] shadow-md animate-pulse" 
                                : `bg-white border-[#FFE8CC] text-[#7C6652] ${btn.color}`
                            }`}
                          >
                            {btn.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Question Nav controls */}
                <div className="flex items-center justify-between pt-4 border-t-2 border-[#FFE8CC]/40" id="question-controls">
                  <button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center gap-1.5 py-2.5 px-3.5 border-2 border-[#FFE8CC] hover:bg-[#FFF4E0]/30 text-[#7C6652] hover:text-[#4A3728] font-bold rounded-xl text-xs transition-all disabled:opacity-40 disabled:hover:bg-white cursor-pointer active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Anterior
                  </button>

                  <div className="flex gap-1.5 overflow-x-auto max-w-[50%] scrollbar-none py-1">
                    {questions.map((_, idx) => (
                      <span 
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full transition-all shrink-0 ${
                          idx === currentQuestionIndex 
                            ? "bg-[#6B21A8] w-3" 
                            : answers[questions[idx].id] !== undefined
                              ? "bg-[#FF9A3E]"
                              : "bg-[#FFE8CC]"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    disabled={currentQuestionIndex === questions.length - 1}
                    className="flex items-center gap-1.5 py-2.5 px-3.5 border-2 border-[#FFE8CC] hover:bg-[#FFF4E0]/30 text-[#7C6652] hover:text-[#4A3728] font-bold rounded-xl text-xs transition-all disabled:opacity-40 disabled:hover:bg-white cursor-pointer active:scale-95"
                  >
                    Siguiente
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Informative Help Guide for teenagers */}
              <div className="bg-white rounded-3xl p-6 border-2 border-[#FFE8CC] shadow-sm leading-relaxed" id="riasec-legend">
                <h3 className="text-sm font-bold text-[#4A3728] mb-3 font-display uppercase tracking-wider flex items-center gap-1.5 text-[#FF9A3E]">
                  <HelpCircle className="w-4 h-4" />
                  ¿Qué significan las siglas del Perfil RIASEC?
                </h3>
                <p className="text-xs text-[#7C6652] mb-4">
                  El psicólogo John Holland descubrió que las personas encajamos en distintas combinaciones de 6 grandes "vibras" o inteligencias profesionales:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                  {[
                    { char: "R", key: "Realista", emoji: "🛠️", label: "Cacharrear, reparar, reparar físico" },
                    { char: "I", key: "Investigador", emoji: "🔍", label: "Analizar, saber el porqué" },
                    { char: "A", key: "Artístico", emoji: "🎨", label: "Estética, originalidad" },
                    { char: "S", key: "Social", emoji: "🤝", label: "Empatía, ayudar, curar" },
                    { char: "E", key: "Emprendedor", emoji: "🚀", label: "Organizar, liderar equipo" },
                    { char: "C", key: "Convencional", emoji: "📊", label: "Ordenar, archivar, datos" }
                  ].map((p) => (
                    <div key={p.char} className="bg-[#FFFBF5] rounded-xl p-2.5 border border-[#FFE8CC] text-center">
                      <span className="text-lg block mb-0.5">{p.emoji}</span>
                      <strong className="text-xs text-[#4A3728] block font-display">{p.char} · {p.key}</strong>
                      <p className="text-[10px] text-[#7C6652] mt-1 leading-tight">{p.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: RADIOGRAFÍA VOCACIONAL Y RANKING (ENRIQUECIDO CON SINERGIAS) */}
          {activeTab === 'results' && (
            <motion.div 
              key="results_tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6 animate-fade-in"
              id="results-module"
            >
              
              {!testCompleted ? (
                /* Non completed placeholder */
                <div className="bg-white rounded-3xl shadow-sm border-2 border-[#FFE8CC] p-8 text-center animate-fade-in max-w-xl mx-auto" id="results-skeleton">
                  <span className="text-5xl text-[#FF9A3E] block mb-3">📋</span>
                  <h3 className="text-xl font-bold text-[#4A3728] font-display">Aún no has hecho el test</h3>
                  <p className="text-xs text-[#7C6652] mt-2 leading-relaxed">
                    Responde a las 24 preguntas rápidas del test vocacional para que podamos dibujar tu radiografía personal de intereses y ofrecerte una guía para encontrar tu vocación con el ranking inteligente de ciclos públicos en Córdoba capital para ti.
                  </p>
                  <button 
                    onClick={() => setActiveTab('test')}
                    className="mt-5 bg-[#6B21A8] hover:bg-[#521782] text-white font-bold text-xs py-3 px-6 rounded-xl cursor-pointer shadow-md inline-flex items-center gap-1.5 transition-all"
                  >
                    Empezar el Test ahora
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                /* Completed diagnostic results dashboard */
                <div className="space-y-6">
                  
                  {isLienzoEnBlanco ? (
                    /* Blank Slate Warning (Ni fu ni fa results) handled carefully as requested */
                    <div className="bg-white rounded-3xl shadow-sm border-2 border-[#FFE8CC] p-6 md:p-8 animate-fade-in" id="lienzo-blanco-card">
                      <div className="flex items-center gap-3 bg-[#E0F2FE] border-2 border-[#BAE6FD] text-[#0369A1] rounded-2xl p-4 mb-6">
                        <div className="text-4xl shrink-0">🧭</div>
                        <div>
                          <h3 className="font-bold text-sm text-[#0369A1] font-display">Fase de Exploración en Lienzo en Blanco</h3>
                          <p className="text-xs text-[#0369A1]/95 font-medium">No arrastras prejuicios y eso es una ventaja hermosa. Significa que necesitas probar cosas directamente en el taller.</p>
                        </div>
                      </div>

                      <div className="text-center md:text-left">
                        <h2 className="text-2xl font-black font-display text-[#4A3728]">"¿Te sale todo neutro? ¡Vaya suerte tienes!"</h2>
                        <div className="text-[#7C6652] text-sm leading-relaxed mt-2 space-y-3">
                          <p>
                            Al revés de lo que muchos piensan, no decantarte firmemente por nada a los 16 años es estupendo. No estás viciado/a por asignaturas teóricas aburridas del instituto. Tu cuerpo te está pidiendo a gritos que pruebes talleres reales para poder elegir.
                          </p>
                          <p>
                            Te sugerimos de forma independiente 3 grandes caminos de prueba directos para romper el hielo en Córdoba Capital:
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                        <div className="bg-white border-2 border-[#FFE8CC] p-4 rounded-2xl">
                          <span className="bg-[#FFF4E0] text-[#D97706] font-bold px-2 py-0.5 rounded text-[10px] uppercase border border-[#FFD8A8]">Sistemas e Informática (SMR)</span>
                          <h4 className="font-bold text-xs text-[#4A3728] mt-2">¿Te va arreglar ordenadores?</h4>
                          <p className="text-[11px] text-[#7C6652] mt-1 text-justify">En el **IES Gran Capitán** o **IES Trassierra**. Toca piezas físicas de memoria RAM y cables de red para ver si te mola el cacharreo técnico (R/I).</p>
                        </div>

                        <div className="bg-[#F0FDF4] border-2 border-[#DCFCE7] p-4 rounded-2xl">
                          <span className="bg-[#E7F3EF] text-[#2D6A4F] font-bold px-2 py-0.5 rounded text-[10px] uppercase border border-[#A7D1C1]">Guía de Naturaleza (TECO)</span>
                          <h4 className="font-bold text-xs text-[#2D6A4F] mt-2">¿Prefieres no estar encerrado/a?</h4>
                          <p className="text-[11px] text-[#2D6A4F] mt-1 text-justify">En el **IES López Neyra**. Prueba a llevar equipos a caballo o bicicleta de montaña por nuestra sierra cordobesa (R/S).</p>
                        </div>

                        <div className="bg-[#FAF5FF] border-2 border-[#F3E8FF] p-4 rounded-2xl">
                          <span className="bg-[#FAF5FF] text-[#6B21A8] font-bold px-2 py-0.5 rounded text-[10px] uppercase border border-[#F3E8FF]">Orfebrería en Dionisio Ortiz</span>
                          <h4 className="font-bold text-xs text-[#6B21A8] mt-2">¿Te gusta moldear objetos?</h4>
                          <p className="text-[11px] text-[#6B21A8] mt-1 text-justify">Prueba la orfebrería de herencia platera cordobesa. Moldea metales tradicionales con herramientas de soplete y troqueles (A/R).</p>
                        </div>
                      </div>

                      <div className="flex justify-center mt-4">
                        <button 
                          onClick={handleResetTest} 
                          className="text-xs text-[#6B21A8] hover:text-[#521782] font-bold flex items-center gap-1.5 bg-[#FAF5FF] px-4 py-2.5 rounded-xl border border-[#F3E8FF] transition-all cursor-pointer shadow-sm"
                        >
                          <RefreshCw className="w-3.5 h-3.5 animate-spin-hover" />
                          Repetir el Test e intentar definir más tus respuestas
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* STANDARD RESULTS DASHBOARD */
                    <div className="space-y-6 animate-fade-in" id="results-dashboard">
                      
                      {/* Firma vocacional y arquetipo panel */}
                      <div className="bg-white rounded-3xl p-8 border-2 border-[#FFE8CC] shadow-sm space-y-6" id="archetype-card">
                        <div className="flex flex-col md:flex-row items-start justify-between gap-4 border-b-2 border-[#FFE8CC]/40 pb-4">
                          <div>
                            <span className="text-[10px] bg-[#FAF5FF] text-[#6B21A8] border border-[#F3E8FF] font-bold tracking-widest uppercase px-3 py-1 rounded-full">Firma de Vocación</span>
                            <h2 className="text-2xl font-black text-[#4A3728] mt-1.5">Tu Identidad Vocacional</h2>
                          </div>
                          <button 
                            onClick={handleResetTest}
                            className="bg-[#FFF4E0] hover:bg-[#FF9A3E] hover:text-white border border-[#FFD8A8] text-[#D97706] text-xs font-bold py-2.5 px-4 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            Repetir Test
                          </button>
                        </div>

                        <div className="bg-purple-50/40 border-2 border-[#F3E8FF] p-6 rounded-3xl" id="archetype-description">
                          <h3 className="text-xl font-bold text-[#6B21A8] font-display flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-[#FF9A3E] animate-pulse" />
                            Tu Arquetipo: {archetype?.title}
                          </h3>
                          <p className="text-sm text-[#4A3728] mt-3 leading-relaxed text-justify">
                            {archetype?.desc}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
                          
                          {/* Radial radar (5 cols) */}
                          <div className="lg:col-span-5 bg-[#FFFBF5] rounded-3xl p-4 border-2 border-[#FFE8CC] shadow-inner">
                            {scores && <RadarChart scores={scores} />}
                          </div>

                          {/* Technical attributes (7 cols) */}
                          <div className="lg:col-span-7 space-y-4">
                            {primaryProfile && (
                              <div className="bg-[#FFFAF0] border-2 border-[#FEEBC8] p-4 rounded-2xl leading-relaxed">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-2xl">{profilesData[primaryProfile.key].emoji}</span>
                                  <div>
                                    <h4 className="text-sm font-bold text-[#854D0E] font-display">Tus Inclinaciones Principales</h4>
                                    <span className="text-xs font-bold text-[#B45309]">{profilesData[primaryProfile.key].name} ({primaryProfile.val}/5)</span>
                                  </div>
                                </div>
                                <p className="text-xs text-[#92400E]">
                                  {profilesData[primaryProfile.key].desc} Tienes gran destreza para **{profilesData[primaryProfile.key].destrezas.toLowerCase()}**.
                                </p>
                              </div>
                            )}

                            {secondaryProfile && (
                              <div className="bg-emerald-50/70 border-2 border-emerald-100 p-4 rounded-2xl leading-relaxed">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-2xl">{profilesData[secondaryProfile.key].emoji}</span>
                                  <div>
                                    <h4 className="text-sm font-bold text-emerald-800 font-display font-semibold">Tus Aptitudes Complementarias</h4>
                                    <span className="text-xs font-bold text-emerald-700">{profilesData[secondaryProfile.key].name} ({secondaryProfile.val}/5)</span>
                                  </div>
                                </div>
                                <p className="text-xs text-[#2D6A4F]">
                                  {profilesData[secondaryProfile.key].desc} Esta combinación te capacita plenamente para **{profilesData[secondaryProfile.key].destrezas.toLowerCase()}**.
                                </p>
                              </div>
                            )}
                          </div>

                        </div>
                      </div>

                      {/* RANKING PERSONAL: CALCULADO BAJO EL MOTOR DE SINERGIAS CON EL BONUS +0.8 EN CORRESPONDECIA */}
                      <div className="bg-white rounded-3xl shadow-sm border-2 border-[#FFE8CC] p-6 md:p-8" id="ranking-list-card">
                        <div className="border-b-2 border-[#FFE8CC]/40 pb-4 mb-6">
                          <h2 className="text-xl font-bold font-display text-[#4A3728] flex items-center gap-2">
                            <Award className="w-6 h-6 text-[#FF9A3E] animate-bounce" />
                            Tu Ranking Inteligente: Los 10 Ciclos Recomendados en Córdoba Capital
                          </h2>
                          <p className="text-xs text-[#7C6652] mt-1 pl-1 text-justify">
                            Calculado según la afinidad promedio de tus puntuaciones RIASEC con las necesidades técnicas y destrezas de cada ciclo formativo. Los ciclos que combinan simultáneamente tus dos fuerzas principales reciben un <strong className="text-[#6B21A8]">Bonus extra de Sinergias (+0.8 ptos)</strong>:
                          </p>
                        </div>

                        {/* Top 10 Cycles Grid/List */}
                        <div className="space-y-4">
                          {getMatchedCycles().slice(0, 10).map((cycle, index) => {
                            const rank = index + 1;
                            const status = getAffinityStatus(cycle.matchScore);
                            
                            return (
                              <div 
                                key={cycle.id}
                                className={`bg-white rounded-2xl border-2 p-5 transition-all flex flex-col md:flex-row gap-5 justify-between relative overflow-hidden group hover:shadow-md ${
                                  rank === 1 
                                    ? "border-[#FFD8A8] bg-[#FFFBF5]/20 ring-4 ring-[#FFF8E7]/30" 
                                    : rank <= 3 
                                      ? "border-[#FFE8CC]" 
                                      : "border-slate-100"
                                }`}
                              >
                                {/* Floating Badge with position */}
                                <div className={`absolute top-0 left-0 text-[10px] font-black uppercase px-3 py-1.5 rounded-br-2xl tracking-wider text-white shadow-sm font-mono ${
                                  rank === 1 ? "bg-[#FF9A3E]" : rank <= 3 ? "bg-[#D97706]" : "bg-[#6B21A8]"
                                }`}>
                                  Opción #{rank}
                                </div>

                                <div className="flex-1 space-y-3 mt-2 md:mt-0">
                                  {/* Badges row */}
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-slate-200 text-slate-500">
                                      {cycle.category}
                                    </span>
                                    
                                    <span className="text-[10px] text-[#7C6652] font-semibold uppercase flex items-center gap-1">
                                      Requisitos: {cycle.tags.join(' + ')}
                                    </span>

                                    {cycle.achievesSynergy && (
                                      <span className="bg-[#FAF5FF] text-[#6B21A8] font-bold px-2.5 py-0.5 rounded-full text-[9px] uppercase border-2 border-purple-200 shadow-sm animate-pulse flex items-center gap-1">
                                        ⚡ Coincidencia de Sinergia Dual (+0.8)
                                      </span>
                                    )}

                                    {cycle.isArtSchool && (
                                      <span className="bg-[#FAF5FF] text-[#6B21A8] font-bold px-2 py-0.5 rounded text-[8px] uppercase border border-[#F3E8FF]">
                                        Requiere prueba artística de acceso
                                      </span>
                                    )}
                                  </div>

                                  {/* Title & institute */}
                                  <div>
                                    <h3 className="font-bold text-base text-[#4A3728] leading-snug group-hover:text-[#6B21A8] transition-colors">
                                      {cycle.title}
                                    </h3>
                                    
                                    <div className="text-[11px] font-semibold text-[#7C6652] mt-0.5 flex items-center gap-1">
                                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                                      {cycle.center}
                                    </div>
                                  </div>

                                  {/* Split details of cycle info */}
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-[#FFE8CC]/40 text-xs text-justify">
                                    <div>
                                      <span className="font-bold text-[10px] text-[#7C6652]/80 uppercase tracking-wide block mb-0.5">📚 ¿Qué aprenderás?</span>
                                      <p className="text-[#7C6652] text-[11.5px] leading-relaxed line-clamp-3">{cycle.gives}</p>
                                    </div>
                                    <div>
                                      <span className="font-bold text-[10px] text-[#D97706] uppercase tracking-wide block mb-0.5">🎯 ¿De qué trata?</span>
                                      <p className="text-[#D97706]/90 text-[11.5px] leading-relaxed line-clamp-3 font-semibold">{cycle.for}</p>
                                    </div>
                                    <div>
                                      <span className="font-bold text-[10px] text-[#6B21A8] uppercase tracking-wide block mb-0.5">🚀 Salidas Reales en Córdoba</span>
                                      <p className="text-[#6B21A8]/90 text-[11.5px] leading-relaxed line-clamp-3">{cycle.exits}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Right: Affinity Percentage Gauger Column (shrink-0) */}
                                <div className="border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-5 flex flex-col justify-center items-center md:items-end w-full md:w-44 shrink-0 text-center md:text-right">
                                  <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${status.color}`}>
                                    {status.text}
                                  </span>
                                  
                                  <div className="mt-3 flex items-baseline gap-1">
                                    <span className="text-3xl font-extrabold tracking-tight text-[#4A3728] font-mono">
                                      {status.pct}%
                                    </span>
                                    <span className="text-xs text-[#7C6652]/70 font-bold">afinidad</span>
                                  </div>

                                  {/* Progress bar visual */}
                                  <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                                    <div 
                                      className="h-full bg-gradient-to-r from-[#FF9A3E] to-[#6B21A8] rounded-full"
                                      style={{ width: `${status.pct}%` }}
                                    />
                                  </div>
                                </div>

                              </div>
                            );
                          })}
                        </div>

                        {/* Prompt Catalog navigation */}
                        <div className="mt-8 pt-6 border-t border-[#FFE8CC]/40 text-center">
                          <button
                            id="view-all-cycles-btn"
                            onClick={() => {
                              setActiveTab('catalog');
                              setSelectedCategory('todos');
                            }}
                            className="bg-[#FFF4E0] hover:bg-[#FF9A3E] border-2 border-[#FFD8A8] hover:border-[#FF9A3E] text-[#D97706] hover:text-white font-bold px-6 py-3.5 rounded-xl text-xs font-display tracking-wider uppercase transition-all inline-flex items-center gap-2 cursor-pointer shadow-sm"
                          >
                            <BookOpen className="w-4 h-4" />
                            Explorar el Catálogo Completo sin Filtros
                          </button>
                        </div>

                      </div>

                    </div>
                  )}

                </div>
              )}

            </motion.div>
          )}

          {/* TAB 3: Catálogo General de Córdoba Capital (Buscador completo) */}
          {activeTab === 'catalog' && (
            <motion.div 
              key="catalog_tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6 animate-fade-in"
              id="catalog-module"
            >
              
              {/* Header explaining database specificity */}
              <div className="bg-white rounded-3xl shadow-sm border-2 border-[#FFE8CC] p-6 animate-fade-in">
                <div>
                  <h2 className="text-xl font-bold font-display text-[#4A3728] flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-[#FF9A3E]" />
                    Oferta de Grado Medio y Escuelas de Arte de Córdoba Capital
                  </h2>
                  <p className="text-xs text-[#7C6652] mt-1 pl-1 text-justify">
                    Esta base de datos oficial recoge de forma exclusiva los ciclos formativos de Grado Medio que se dictan de forma gratuita en centros y escuelas públicas del municipio de Córdoba Capital.
                  </p>
                </div>

                {/* Search & Filters block */}
                <div className="mt-6 flex flex-col md:flex-row gap-3 items-center">
                  
                  {/* Search input */}
                  <div className="w-full md:flex-1 relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Busca asignaturas (motores, redes...), institutos (Zoco, Gran Capitán, Maimónides)..."
                      className="w-full bg-[#FFFBF5] border-2 border-[#FFE8CC] text-sm px-4 py-3.5 pl-10 rounded-xl outline-none focus:bg-white focus:border-[#FF9A3E] focus:ring-2 focus:ring-[#FF9A3E]/20 text-[#4A3728] transition-all font-medium font-sans"
                    />
                    <Filter className="w-4 h-4 text-[#7C6652] absolute left-3.5 top-4.5" />
                  </div>

                  {/* Category filter pills */}
                  <div className="flex overflow-x-auto gap-1.5 w-full md:w-auto scrollbar-none py-1">
                    {[
                      { id: 'todos', label: "Todos", color: "bg-[#FFFBF5] text-[#7C6652] border border-[#FFE8CC] hover:bg-[#FFF4E0]/30" },
                      { id: 'Arte', label: "🎨 Arte y Diseño", color: "bg-[#FAF5FF] text-[#6B21A8] hover:bg-[#F3E8FF] border border-[#F3E8FF]" },
                      { id: 'Salud', label: "🏥 Salud y Social", color: "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200" },
                      { id: 'Tecnología', label: "💻 Tecnología", color: "bg-[#E0F2FE]/40 text-[#0369A1] hover:bg-[#BAE6FD]/40 border border-[#BAE6FD]/40" },
                      { id: 'Empresa', label: "💼 Empresa y Servicios", color: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200" },
                      { id: 'Industria', label: "gear: Industria y Motor", color: "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200" },
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => setSelectedCategory(btn.id === 'gear: Industria y Motor' ? 'Industria' : btn.id)}
                        className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                          ((btn.id === 'gear: Industria y Motor' && selectedCategory === 'Industria') || selectedCategory === btn.id)
                            ? "bg-[#6B21A8] text-white shadow-md border-transparent animate-pulse-subtle" 
                            : btn.color
                        }`}
                      >
                        {btn.label === 'gear: Industria y Motor' ? "⚙️ Industria y Motor" : btn.label}
                      </button>
                    ))}
                  </div>

                </div>
              </div>

              {/* Grid of full cycle cards */}
              {filteredCycles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCycles.map((cycle) => (
                    <div 
                      key={cycle.id}
                      className="bg-white rounded-3xl shadow-sm border-2 border-[#FFE8CC] hover:border-[#FF9A3E]/45 p-5 hover:shadow-md transition-all flex flex-col justify-between group leading-relaxed"
                    >
                      <div>
                        {/* Header details with Category Tag */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className={`text-[9px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full border ${
                            cycle.category === 'Arte' ? 'bg-[#FAF5FF] text-[#6B21A8] border-[#F3E8FF]' :
                            cycle.category === 'Salud' ? 'bg-rose-100 text-rose-800 border-rose-200' :
                            cycle.category === 'Tecnología' ? 'bg-[#E0F2FE]/40 text-[#0369A1] border-[#BAE6FD]/40' :
                            cycle.category === 'Empresa' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                            'bg-amber-100 text-amber-800 border-amber-200'
                          }`}>
                            {cycle.category}
                          </span>

                          <span className="text-[10px] text-[#7C6652]/70 font-semibold uppercase flex items-center gap-1">
                            Aptitudes: {cycle.tags.join(' + ')}
                          </span>
                        </div>

                        {/* Title & institute */}
                        <h3 className="font-bold text-sm text-[#4A3728] group-hover:text-[#6B21A8] transition-colors leading-snug">
                          {cycle.title}
                        </h3>

                        <div className="bg-[#FFFBF5] border-2 border-[#FFE8CC] rounded-xl p-2.5 mt-2 flex items-start gap-1.5 shrink-0">
                          <MapPin className="w-3.5 h-3.5 text-rose-500 mt-0.5 shrink-0" />
                          <div className="text-[11px] font-semibold text-[#7C6652] leading-tight">
                            {cycle.center}
                          </div>
                        </div>

                        {/* Content parts explained */}
                        <div className="mt-4 pt-3 border-t-2 border-[#FFE8CC]/40 space-y-3">
                          <div>
                            <span className="font-display font-bold text-[10px] text-[#7C6652] uppercase block tracking-wider mb-0.5">📚 ¿Qué se da en clase?</span>
                            <p className="text-[#7C6652]/90 text-xs text-justify line-clamp-3 leading-normal">{cycle.gives}</p>
                          </div>
                          
                          <div>
                            <span className="font-display font-bold text-[10px] text-[#D97706] uppercase block tracking-wider mb-0.5">🎯 ¿Para qué sirve?</span>
                            <p className="text-[#D97706]/95 text-xs text-justify line-clamp-3 font-semibold leading-normal">{cycle.for}</p>
                          </div>

                          <div>
                            <span className="font-display font-bold text-[10px] text-[#6B21A8] uppercase block tracking-wider mb-0.5">🚀 Tus salidas reales</span>
                            <p className="text-[#6B21A8] text-xs line-clamp-2 leading-normal">{cycle.exits}</p>
                          </div>
                        </div>
                      </div>

                      {/* Footer Badge indicating artwork spec if needed */}
                      {cycle.isArtSchool && (
                        <div className="mt-4 pt-3 border-t border-slate-100 text-right">
                          <span className="bg-[#FAF5FF] text-[#6B21A8] font-bold px-2 py-0.5 rounded text-[8px] uppercase border border-[#F3E8FF]">
                            Prueba artística
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl shadow-sm border-2 border-[#FFE8CC] p-8 text-center animate-fade-in" id="catalog-empty-states">
                  <span className="text-4xl text-[#7C6652] block mb-2">🔍</span>
                  <p className="font-bold text-[#4A3728]">No encontramos ningún ciclo con esos filtros.</p>
                  <p className="text-xs text-[#7C6652] mt-1">Prueba a escribir otra palabra o limpia el buscador.</p>
                  <button 
                    onClick={() => { setSearchQuery(''); setSelectedCategory('todos'); }}
                    className="mt-4 bg-[#FFF4E0] text-[#D97706] border border-[#FFD8A8] font-bold text-xs py-2.5 px-4 rounded-xl cursor-pointer hover:bg-[#FF9A3E] hover:text-white transition-colors animate-pulse"
                  >
                    Mostrar todos los ciclos
                  </button>
                </div>
              )}

            </motion.div>
          )}

          {/* TAB 4: El Comodín Formativo (Escuela Oficial de Idiomas) */}
          {activeTab === 'eoi' && (
            <motion.div 
              key="eoi_tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white rounded-3xl shadow-sm border-2 border-[#FFE8CC] p-6 md:p-8 animate-fade-in max-w-2xl mx-auto"
              id="eoi-module"
            >
              <div className="flex items-center gap-2.5 border-b-2 border-[#FFE8CC]/40 pb-4 mb-6" id="eoi-header">
                <span className="text-4xl bg-[#FFF4E0] p-2.5 rounded-2xl shadow-inner select-none">🌐</span>
                <div>
                  <h2 className="text-xl font-bold font-display text-[#4A3728]">El Comodín de Idiomas en Córdoba Capital</h2>
                  <p className="text-xs text-[#7C6652]">Un truco estratégico para complementar cualquier Grado Medio.</p>
                </div>
              </div>

              <div className="space-y-4 text-justify leading-relaxed text-sm text-[#4A3728]" id="eoi-text-content">
                <p>
                  Una gran ventaja que la mayoría de estudiantes pasa de largo tras la ESO es complementar su titulación oficial de FP con idiomas de forma barata, prestigiosa y oficial. No hace falta acudir a academias caras para conseguirlo.
                </p>

                <div className="bg-[#FFF4E0]/40 border-l-4 border-[#FF9A3E] rounded-r-2xl p-4 my-4" id="eoi-location-box">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D97706] mb-1">
                    <Info className="w-4 h-4 text-[#FF9A3E] inline shrink-0" />
                    La Escuela Oficial de Idiomas (EOI) de Córdoba
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#7C6652] mt-2 list-disc pl-4 font-semibold">
                    <li><strong className="text-[#4A3728]">📍 Ubicación:</strong> Calle Doce de Octubre (Cerca de los Jardines de la Agricultura, conocidos popularmente como "Los Patos").</li>
                    <li><strong className="text-[#4A3728]">💶 Coste matrícula:</strong> Unos 80€ en total <strong>¡para todo el año académico!</strong>. Si estás cursando un ciclo de Grado Medio, tienes descuentos adicionales acumulables por familia numerosa, discapacidades o becas.</li>
                    <li><strong className="text-[#4A3728]">🎓 Idiomas recomendados:</strong> Inglés (para software, orfebrería internacional), Francés o Alemán.</li>
                  </ul>
                </div>

                <p className="text-[#7C6652]">
                  Cualquier empresa que busque un técnico de redes (SMR), o que quiera incorporar a un platero en los talleres creativos del Parque Joyero de Córdoba, valorará exponencialmente si en tu expediente figura que posees un nivel B1/B2 certificado por la Escuela Oficial de Idiomas pública.
                </p>
                <p className="text-[#7C6652]">
                  Se cursa generalmente de tarde de forma paralela a tu ciclo, en sesiones de solo dos días a la semana. ¡Un as bajo la manga para acceder a cotizadas becas Erasmus+ de prácticas profesionales por Europa!
                </p>
              </div>

              <div className="mt-8 pt-6 border-t-2 border-[#FFE8CC]/40 flex flex-col sm:flex-row gap-3 items-center justify-between" id="eoi-website-link">
                <div className="text-xs text-[#7C6652]/70 font-mono">
                  📍 Calle Doce de Octubre, Córdoba Capital, España.
                </div>
                
                <a
                  href="https://www.eoicordoba.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#6B21A8] hover:bg-[#521782] text-white font-bold px-5 py-3 rounded-xl text-xs font-display flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer active:scale-95 text-center"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visitar web oficial de la EOI Córdoba
                </a>
              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* App Footer */}
      <footer className="bg-white rounded-3xl border-2 border-[#FFE8CC] mt-8 py-5 px-6 text-center text-xs text-[#7C6652] shrink-0 font-sans max-w-5xl w-full mx-auto shadow-sm animate-fade-in" id="app-footer">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>Test RIASEC Ciclos Medios Córdoba © Inma Aranda Muñoz 2026. <br> Todos los derechos reservados. </p>
          <p className="flex items-center gap-1 text-[10px] font-mono justify-center text-[#7C6652]/70">
            Este TEST no garantiza resultados infalibles. Para una asesoría personalizada, <br> consulta con un orientador profesional.
          </p>
        </div>
      </footer>
    </div>
  );
}
