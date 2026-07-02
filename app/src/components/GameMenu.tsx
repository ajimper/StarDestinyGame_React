// ============================================================
// STAR DESTINY GAME - MENÚ Y CONFIGURACIÓN
// ============================================================

import React, { useState } from 'react';
import { Users, Play, Plus, Minus, Atom, BookOpen, Sparkles, Orbit } from 'lucide-react';
import type { Player } from '@/types/game';

interface GameMenuProps {
  players: Player[];
  onAddPlayer: (name: string) => void;
  onRemovePlayer: (playerId: string) => void;
  onStartGame: () => void;
  onShowTutorial: () => void;
}

const GameMenu: React.FC<GameMenuProps> = ({
  players,
  onAddPlayer,
  onRemovePlayer,
  onStartGame,
  onShowTutorial,
}) => {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [showSetup, setShowSetup] = useState(false);

  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      onAddPlayer(newPlayerName.trim());
      setNewPlayerName('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPlayer();
    }
  };

  if (showSetup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950/30 to-gray-950 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Botón volver */}
          <button
            className="mb-4 text-gray-400 hover:text-white flex items-center gap-1 text-sm transition-colors"
            onClick={() => setShowSetup(false)}
          >
            ← Volver al menú
          </button>

          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-400" />
              Configurar Jugadores
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Añade de 1 a 4 jugadores para comenzar la partida
            </p>

            {/* Lista de jugadores */}
            <div className="space-y-2 mb-6">
              {players.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: player.color }}
                  >
                    <span className="font-bold text-black text-lg">{player.name[0]}</span>
                  </div>
                  <span className="flex-1 font-bold text-white">{player.name}</span>
                  <button
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                    onClick={() => onRemovePlayer(player.id)}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Añadir jugador */}
            {players.length < 4 && (
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nombre del jugador..."
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                  maxLength={15}
                />
                <button
                  className="px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all active:scale-95 flex items-center gap-1"
                  onClick={handleAddPlayer}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Iniciar juego */}
            <button
              className={`
                w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2
                ${players.length > 0
                  ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/25 active:scale-[0.98]'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }
              `}
              onClick={players.length > 0 ? onStartGame : undefined}
              disabled={players.length === 0}
            >
              <Play className="w-6 h-6" />
              {players.length > 0 ? '¡Iniciar Partida!' : 'Añade al menos 1 jugador'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950/30 to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="w-32 h-32 mx-auto mb-4 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-20 animate-pulse" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Atom className="w-16 h-16 text-white drop-shadow-lg" />
              </div>
              {/* Órbita decorativa */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '10s' }}>
                <Orbit className="w-8 h-8 text-yellow-400/60 absolute -top-1 left-1/2 -translate-x-1/2" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-2">
            STAR DESTINY
          </h1>
          <p className="text-gray-400 text-lg">El destino de las estrellas</p>
        </div>

        {/* Descripción */}
        <div className="mb-8 p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="text-gray-300 text-sm leading-relaxed">
            Un juego educativo de astrofísica donde guías estrellas a través de su evolución.
            Recolecta metalicidad, experimenta colisiones estelares y descubre el destino final
            de cada estrella en el universo.
          </p>
        </div>

        {/* Botones */}
        <div className="space-y-3">
          <button
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            onClick={() => setShowSetup(true)}
          >
            <Sparkles className="w-5 h-5" />
            Nueva Partida
          </button>

          <button
            className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            onClick={onShowTutorial}
          >
            <BookOpen className="w-5 h-5" />
            Tutorial
          </button>
        </div>

        {/* Créditos */}
        <div className="mt-8 text-xs text-gray-600">
          <p>Basado en modelos de evolución estelar y nucleosíntesis</p>
          <p className="mt-1">Kroupa IMF • Chandrasekhar limit • r-process</p>
        </div>
      </div>
    </div>
  );
};

export default GameMenu;
