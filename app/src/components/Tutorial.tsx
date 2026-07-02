// ============================================================
// STAR DESTINY GAME - TUTORIAL
// ============================================================

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Star, Zap, Skull, Trophy, Orbit, HelpCircle } from 'lucide-react';

interface TutorialProps {
  onClose: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({ onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: 'Bienvenido al Universo',
      icon: <Star className="w-8 h-8 text-yellow-400" />,
      content: (
        <div className="space-y-3">
          <p className="text-gray-300">
            Star Destiny es un juego educativo donde controlas estrellas y las guías
            a través de su evolución cósmica. Cada estrella tiene un destino único
            determinado por su masa inicial.
          </p>
          <div className="p-3 rounded-lg bg-blue-900/20 border border-blue-800/50">
            <p className="text-blue-300 text-sm font-bold">Objetivo del Juego</p>
            <p className="text-gray-400 text-sm mt-1">
              Acumula la mayor cantidad de <span className="text-yellow-400">Metalicidad Cósmica</span> (Fe).
              La metalicidad representa elementos pesados producidos por tu estrella
              y liberados al universo.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Fases de la Evolución',
      icon: <Orbit className="w-8 h-8 text-blue-400" />,
      content: (
        <div className="space-y-3">
          <p className="text-gray-300 text-sm">
            Cada estrella evoluciona por una <strong>senda</strong> con múltiples casillas:
          </p>
          <div className="grid grid-cols-1 gap-2">
            <PhaseItem color="#a855f7" name="Nebulosa" desc="Inicio - gas molecular" />
            <PhaseItem color="#4a3b89" name="Protostar" desc="Colapso gravitacional" />
            <PhaseItem color="#f9c74f" name="Secuencia Principal" desc="90% de la vida - quemado de H" />
            <PhaseItem color="#dc143c" name="Gigante Roja" desc="Expansión, dredge-up" />
            <PhaseItem color="#ff4500" name="AGB" desc="Producción intensa de C, N, O" />
            <PhaseItem color="#00ced1" name="Nebulosa Planetaria" desc="Eyección de metales al ISM" />
            <PhaseItem color="#e0e0ff" name="Enana Blanca" desc="Remanente degenerado" />
            <PhaseItem color="#ff0000" name="Supernova" desc="Explosión masiva - muchos metales!" />
          </div>
        </div>
      ),
    },
    {
      title: 'Colisiones Estelares',
      icon: <Zap className="w-8 h-8 text-orange-400" />,
      content: (
        <div className="space-y-3">
          <p className="text-gray-300 text-sm">
            Cuando dos estrellas caen en la misma casilla (o adyacente), pueden <strong>colisionar</strong>.
            El resultado depende del tipo de objetos que choquen:
          </p>
          <div className="space-y-2">
            <CollisionItem
              result="Fusión Estelar"
              desc="MS + MS → Estrella más masiva"
              points="+2-8 Fe"
            />
            <CollisionItem
              result="Supernova Tipo Ia"
              desc="WD-CO + MS o WD-CO + WD-CO"
              points="+40-80 Fe"
            />
            <CollisionItem
              result="Thorne-Żytkow"
              desc="NS + Gigante → Objeto exótico"
              points="+50-60 Fe"
            />
            <CollisionItem
              result="Kilonova"
              desc="NS + NS → Agujero Negro"
              points="+100 Fe"
            />
            <CollisionItem
              result="Agujero Negro"
              desc="BH + cualquier cosa"
              points="+10-200 Fe"
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Cómo Jugar',
      icon: <HelpCircle className="w-8 h-8 text-green-400" />,
      content: (
        <div className="space-y-3">
          <div className="space-y-2">
            <StepItem number={1} text="Cada jugador comienza con 2 estrellas aleatorias" />
            <StepItem number={2} text="En tu turno, lanza el dado para mover tu estrella" />
            <StepItem number={3} text="Recoge metalicidad al pasar por cada casilla" />
            <StepItem number={4} text="¡Cuidado con las colisiones! Pueden cambiar tu destino" />
            <StepItem number={5} text="Las estrellas muertas van a la Nebulosa Guardería" />
            <StepItem number={6} text="Una Supernova Ia permite renacer estrellas de la Nebulosa" />
          </div>
          <div className="p-3 rounded-lg bg-yellow-900/20 border border-yellow-800/50">
            <p className="text-yellow-300 text-sm font-bold">Consejo Estratégico</p>
            <p className="text-gray-400 text-sm mt-1">
              Las estrellas masivas viven poco pero producen ENORMES cantidades de metales
              en supernovas. Las enanas rojas viven mucho pero producen poco.
              ¡Equilibra tu estrategia!
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Victoria',
      icon: <Trophy className="w-8 h-8 text-yellow-400" />,
      content: (
        <div className="space-y-3">
          <p className="text-gray-300 text-sm">
            El juego termina cuando:
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <Skull className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span>Todas las estrellas han llegado a su destino final</span>
            </li>
            <li className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
              <span>Se alcanza el límite de 100 turnos cósmicos</span>
            </li>
            <li className="flex items-start gap-2">
              <Skull className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
              <span>3+ Agujeros Negros causan colapso galáctico</span>
            </li>
          </ul>
          <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-700/50 text-center">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-yellow-300 font-bold">
              Gana quien tenga más Metalicidad Cósmica
            </p>
          </div>
        </div>
      ),
    },
  ];

  const page = pages[currentPage];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {page.icon}
            <h2 className="text-xl font-bold text-white">{page.title}</h2>
          </div>
          <button
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 min-h-[300px]">
          {page.content}
        </div>

        {/* Navigation */}
        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
          <button
            className={`p-2 rounded-lg transition-colors ${
              currentPage > 0
                ? 'bg-white/5 hover:bg-white/10 text-white'
                : 'bg-transparent text-gray-600 cursor-not-allowed'
            }`}
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1.5">
            {pages.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentPage ? 'bg-blue-400 w-4' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>

          <button
            className={`p-2 rounded-lg transition-colors ${
              currentPage < pages.length - 1
                ? 'bg-white/5 hover:bg-white/10 text-white'
                : 'bg-transparent text-gray-600 cursor-not-allowed'
            }`}
            onClick={() => setCurrentPage(p => Math.min(pages.length - 1, p + 1))}
            disabled={currentPage === pages.length - 1}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// SUB-COMPONENTES
// ============================================================

const PhaseItem: React.FC<{ color: string; name: string; desc: string }> = ({ color, name, desc }) => (
  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
    <span className="text-sm text-white font-bold">{name}</span>
    <span className="text-xs text-gray-500">- {desc}</span>
  </div>
);

const CollisionItem: React.FC<{ result: string; desc: string; points: string }> = ({ result, desc, points }) => (
  <div className="p-2 rounded-lg bg-white/5 border border-white/5">
    <div className="flex items-center justify-between">
      <span className="text-sm text-white font-bold">{result}</span>
      <span className="text-xs text-yellow-400 font-bold">{points}</span>
    </div>
    <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
  </div>
);

const StepItem: React.FC<{ number: number; text: string }> = ({ number, text }) => (
  <div className="flex items-start gap-3">
    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
      <span className="text-xs font-bold text-white">{number}</span>
    </div>
    <p className="text-sm text-gray-300">{text}</p>
  </div>
);

export default Tutorial;
