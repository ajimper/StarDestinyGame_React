// ============================================================
// STAR DESTINY GAME - INTERFAZ DE USUARIO
// ============================================================

import React from 'react';
import { Dices, Users, Volume2, VolumeX, RotateCcw, HelpCircle, Zap, Skull, Star } from 'lucide-react';
import type { GameState, Player } from '@/types/game';
import { GAME_CONFIG } from '@/types/game';

interface GameUIProps {
  gameState: GameState;
  onRollDice: () => void;
  onToggleTutorial: () => void;
  onToggleSound: () => void;
  onResetGame: () => void;
}

const GameUI: React.FC<GameUIProps> = ({
  gameState,
  onRollDice,
  onToggleTutorial,
  onToggleSound,
  onResetGame,
}) => {
  const {
    players,
    currentPlayerIndex,
    turn,
    gamePhase,
    diceValue,
    diceRolling,
    log,
    blackHolesOnBoard,
    supernovasTriggered,
    soundEnabled,
  } = gameState;

  const currentPlayer = players[currentPlayerIndex];

  return (
    <div className="flex flex-col h-full bg-gray-900/80 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
      {/* Header */}
      <GameHeader
        turn={turn}
        blackHoles={blackHolesOnBoard}
        supernovas={supernovasTriggered}
      />

      {/* Panel del jugador actual */}
      {currentPlayer && gamePhase === 'PLAYING' && (
        <CurrentPlayerPanel player={currentPlayer} />
      )}

      {/* Dado */}
      {gamePhase === 'PLAYING' && (
        <DicePanel
          diceValue={diceValue}
          diceRolling={diceRolling}
          onRollDice={onRollDice}
        />
      )}

      {/* Lista de jugadores */}
      <PlayersList players={players} currentPlayerIndex={currentPlayerIndex} />

      {/* Log del juego */}
      <GameLog log={log} />

      {/* Controles */}
      <Controls
        soundEnabled={soundEnabled}
        onToggleSound={onToggleSound}
        onToggleTutorial={onToggleTutorial}
        onResetGame={onResetGame}
      />
    </div>
  );
};

// ============================================================
// HEADER
// ============================================================

const GameHeader: React.FC<{ turn: number; blackHoles: number; supernovas: number }> = ({
  turn,
  blackHoles,
  supernovas,
}) => (
  <div className="px-4 py-3 border-b border-white/10 bg-black/30">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Star className="w-5 h-5 text-yellow-400" />
        <h2 className="text-lg font-bold text-white">Star Destiny</h2>
      </div>
      <div className="flex items-center gap-3 text-xs">
        <span className="text-blue-400">Turno {turn}/{GAME_CONFIG.MAX_TURNS}</span>
        {blackHoles > 0 && (
          <span className="text-red-400 flex items-center gap-1">
            <Skull className="w-3 h-3" /> {blackHoles}
          </span>
        )}
        {supernovas > 0 && (
          <span className="text-orange-400 flex items-center gap-1">
            <Zap className="w-3 h-3" /> {supernovas}
          </span>
        )}
      </div>
    </div>
  </div>
);

// ============================================================
// PANEL DEL JUGADOR ACTUAL
// ============================================================

const CurrentPlayerPanel: React.FC<{ player: Player }> = ({ player }) => (
  <div className="px-4 py-3 border-b border-white/10"
    style={{ backgroundColor: `${player.color}15` }}
  >
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
        style={{ backgroundColor: player.color, borderColor: '#fff' }}
      >
        <span className="text-lg font-bold text-black">{player.name[0]}</span>
      </div>
      <div>
        <div className="font-bold text-white">{player.name}</div>
        <div className="text-xs text-gray-400">
          Metalicidad: <span className="text-yellow-400 font-bold">{player.totalMetallicity}</span> Fe |
          Estrellas: {player.stars.filter(s => s.isAlive).length}/{player.stars.length}
        </div>
      </div>
    </div>
  </div>
);

// ============================================================
// PANEL DE DADOS
// ============================================================

const DicePanel: React.FC<{
  diceValue: number;
  diceRolling: boolean;
  onRollDice: () => void;
}> = ({ diceValue, diceRolling, onRollDice }) => (
  <div className="px-4 py-4 border-b border-white/10 flex flex-col items-center gap-3">
    <div
      className={`
        w-20 h-20 rounded-2xl border-2 flex items-center justify-center text-4xl font-bold
        transition-all duration-300 cursor-pointer select-none
        ${diceRolling ? 'animate-pulse border-yellow-400 bg-yellow-400/10' : 'border-white/30 bg-white/5 hover:bg-white/10 hover:border-white/50'}
      `}
      onClick={!diceRolling ? onRollDice : undefined}
    >
      {diceRolling ? (
        <Dices className="w-8 h-8 text-yellow-400 animate-spin" />
      ) : (
        <span className="text-white">{diceValue}</span>
      )}
    </div>
    <button
      className={`
        px-6 py-2 rounded-lg font-bold text-sm transition-all duration-200
        ${diceRolling
          ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:shadow-purple-500/25 active:scale-95'
        }
      `}
      onClick={!diceRolling ? onRollDice : undefined}
      disabled={diceRolling}
    >
      {diceRolling ? 'Lanzando...' : 'Lanzar Dado'}
    </button>
  </div>
);

// ============================================================
// LISTA DE JUGADORES
// ============================================================

const PlayersList: React.FC<{ players: Player[]; currentPlayerIndex: number }> = ({
  players,
  currentPlayerIndex,
}) => (
  <div className="px-4 py-3 border-b border-white/10 max-h-40 overflow-y-auto">
    <h4 className="text-xs font-bold text-gray-400 mb-2 flex items-center gap-1">
      <Users className="w-3 h-3" /> Jugadores
    </h4>
    <div className="space-y-2">
      {players.map((player, idx) => (
        <div
          key={player.id}
          className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
            idx === currentPlayerIndex
              ? 'bg-white/10 border border-white/20'
              : 'bg-transparent'
          }`}
        >
          <div
            className="w-6 h-6 rounded-full border flex-shrink-0"
            style={{ backgroundColor: player.color, borderColor: idx === currentPlayerIndex ? '#fff' : 'transparent' }}
          />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-white truncate">{player.name}</div>
            <div className="text-[10px] text-gray-400">
              {player.stars.filter(s => s.isAlive).length}★ | {player.totalMetallicity} Fe
            </div>
          </div>
          {idx === currentPlayerIndex && (
            <div className="text-[10px] text-blue-400 font-bold">→</div>
          )}
        </div>
      ))}
    </div>
  </div>
);

// ============================================================
// LOG DEL JUEGO
// ============================================================

const GameLog: React.FC<{ log: GameState['log'] }> = ({ log }) => (
  <div className="flex-1 px-4 py-3 overflow-y-auto max-h-64 min-h-32">
    <h4 className="text-xs font-bold text-gray-400 mb-2">Log del Universo</h4>
    <div className="space-y-1.5">
      {[...log].reverse().slice(0, 30).map(entry => (
        <div
          key={entry.id}
          className={`text-[11px] leading-tight p-1.5 rounded ${
            entry.type === 'COLLISION' ? 'bg-red-900/30 text-red-300 border border-red-800/50' :
            entry.type === 'SUPERNOVA' ? 'bg-orange-900/30 text-orange-300 border border-orange-800/50' :
            entry.type === 'VICTORY' ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-800/50' :
            entry.type === 'DEATH' ? 'bg-gray-800/50 text-gray-400' :
            entry.type === 'BIRTH' ? 'bg-green-900/20 text-green-300' :
            'text-gray-400'
          }`}
        >
          <span className="text-gray-600 mr-1">T{entry.turn}</span>
          {entry.message}
        </div>
      ))}
    </div>
  </div>
);

// ============================================================
// CONTROLES
// ============================================================

const Controls: React.FC<{
  soundEnabled: boolean;
  onToggleSound: () => void;
  onToggleTutorial: () => void;
  onResetGame: () => void;
}> = ({ soundEnabled, onToggleSound, onToggleTutorial, onResetGame }) => (
  <div className="px-4 py-3 border-t border-white/10 bg-black/30 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <button
        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        onClick={onToggleSound}
        title={soundEnabled ? 'Silenciar' : 'Activar sonido'}
      >
        {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </button>
      <button
        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        onClick={onToggleTutorial}
        title="Tutorial"
      >
        <HelpCircle className="w-4 h-4" />
      </button>
    </div>
    <button
      className="p-2 rounded-lg bg-white/5 hover:bg-red-900/30 text-gray-400 hover:text-red-400 transition-colors"
      onClick={onResetGame}
      title="Reiniciar juego"
    >
      <RotateCcw className="w-4 h-4" />
    </button>
  </div>
);

export default GameUI;
