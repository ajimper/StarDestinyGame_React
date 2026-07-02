// ============================================================
// STAR DESTINY GAME - PANTALLA DE FIN DE JUEGO
// ============================================================

import React from 'react';
import { Trophy, Star, RotateCcw, Home, Medal, Atom } from 'lucide-react';
import type { Player } from '@/types/game';

interface GameOverProps {
  players: Player[];
  winner: Player | null;
  turn: number;
  supernovasTriggered: number;
  onRestart: () => void;
  onMainMenu: () => void;
}

const GameOver: React.FC<GameOverProps> = ({
  players,
  winner,
  turn,
  supernovasTriggered,
  onRestart,
  onMainMenu,
}) => {
  // Ordenar jugadores por metalicidad
  const sortedPlayers = [...players].sort((a, b) => b.totalMetallicity - a.totalMetallicity);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/30 to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Trophy className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 mb-2">
            ¡Fin del Universo!
          </h1>
          <p className="text-gray-400">
            La era estelar ha concluido tras {turn} turnos cósmicos
          </p>
        </div>

        {/* Ganador */}
        {winner && (
          <div className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-yellow-900/30 via-orange-900/30 to-red-900/30 border border-yellow-700/50 text-center">
            <Medal className="w-10 h-10 text-yellow-400 mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-yellow-300 mb-1">
              {winner.name}
            </h2>
            <p className="text-gray-400 mb-3">Ganador de la Era de los Metales</p>
            <div className="text-4xl font-black text-yellow-400">
              {winner.totalMetallicity}
              <span className="text-lg text-yellow-600 ml-1">Fe</span>
            </div>
          </div>
        )}

        {/* Clasificación */}
        <div className="mb-6 bg-gray-900/80 rounded-2xl border border-white/10 overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Atom className="w-4 h-4 text-purple-400" />
              Clasificación Final
            </h3>
          </div>
          <div className="divide-y divide-white/5">
            {sortedPlayers.map((player, idx) => (
              <div
                key={player.id}
                className={`flex items-center gap-3 px-4 py-3 ${
                  winner?.id === player.id ? 'bg-yellow-900/10' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  idx === 0 ? 'bg-yellow-500 text-black' :
                  idx === 1 ? 'bg-gray-400 text-black' :
                  idx === 2 ? 'bg-orange-600 text-white' :
                  'bg-gray-800 text-gray-400'
                }`}>
                  {idx + 1}
                </div>
                <div
                  className="w-8 h-8 rounded-full border-2 flex-shrink-0"
                  style={{ backgroundColor: player.color, borderColor: '#fff' }}
                />
                <div className="flex-1">
                  <div className="font-bold text-white text-sm">{player.name}</div>
                  <div className="text-xs text-gray-500">
                    {player.stars.filter(s => s.isAlive).length} estrellas vivas |
                    {player.stars.filter(s => !s.isAlive).length} finalizadas
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-yellow-400">{player.totalMetallicity}</div>
                  <div className="text-[10px] text-gray-500">Fe</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estadísticas */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <StatCard
            icon={<Star className="w-5 h-5 text-blue-400" />}
            label="Supernovas"
            value={supernovasTriggered.toString()}
          />
          <StatCard
            icon={<Atom className="w-5 h-5 text-purple-400" />}
            label="Metalicidad Total"
            value={players.reduce((sum, p) => sum + p.totalMetallicity, 0).toString()}
          />
        </div>

        {/* Botones */}
        <div className="space-y-3">
          <button
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            onClick={onRestart}
          >
            <RotateCcw className="w-5 h-5" />
            Jugar de Nuevo
          </button>
          <button
            className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            onClick={onMainMenu}
          >
            <Home className="w-5 h-5" />
            Menú Principal
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({
  icon,
  label,
  value,
}) => (
  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
    <div className="flex justify-center mb-2">{icon}</div>
    <div className="text-2xl font-bold text-white">{value}</div>
    <div className="text-xs text-gray-500">{label}</div>
  </div>
);

export default GameOver;
