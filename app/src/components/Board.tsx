// ============================================================
// STAR DESTINY GAME - TABLERO ESTELAR
// ============================================================

import React from 'react';
import type { GameState, Star, EvolutionPath } from '@/types/game';

interface BoardProps {
  gameState: GameState;
  onSelectStar: (starId: string) => void;
}

const Board: React.FC<BoardProps> = ({ gameState, onSelectStar }) => {
  const { evolutionPaths, players, selectedStarId } = gameState;

  // Obtener todas las estrellas activas
  const allStars: (Star & { playerName: string })[] = [];
  players.forEach(player => {
    player.stars.forEach(star => {
      if (star.isAlive) {
        allStars.push({ ...star, playerName: player.name });
      }
    });
  });

  return (
    <div className="w-full overflow-auto">
      <div className="min-w-[900px] p-4">
        {/* Nebulosa Guardería (centro superior) */}
        <NurseryArea
          stars={allStars.filter(s => s.isInNursery)}
          onSelectStar={onSelectStar}
          selectedStarId={selectedStarId}
        />

        {/* Sendas Evolutivas */}
        <div className="mt-8 space-y-3">
          <h3 className="text-lg font-bold text-center text-white mb-4" style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>
            Sendas Evolutivas Estelares
          </h3>
          {evolutionPaths.map((path, index) => (
            <EvolutionPathRow
              key={path.id}
              path={path}
              pathIndex={index}
              stars={allStars.filter(s => s.pathId === path.id && !s.isInNursery)}
              onSelectStar={onSelectStar}
              selectedStarId={selectedStarId}
            />
          ))}
        </div>

        {/* Leyenda */}
        <BoardLegend />
      </div>
    </div>
  );
};

// ============================================================
// NEBULOSA GUARDERÍA
// ============================================================

interface NurseryAreaProps {
  stars: (Star & { playerName: string })[];
  onSelectStar: (starId: string) => void;
  selectedStarId: string | null;
}

const NurseryArea: React.FC<NurseryAreaProps> = ({ stars, onSelectStar, selectedStarId }) => (
  <div className="relative rounded-2xl p-6 mb-4 border-2 border-purple-500/50"
    style={{
      background: 'radial-gradient(ellipse at center, #1a1a3e 0%, #0a0a1a 100%)',
      boxShadow: '0 0 30px rgba(147, 51, 234, 0.3), inset 0 0 30px rgba(147, 51, 234, 0.1)',
    }}
  >
    <h3 className="text-center text-lg font-bold text-purple-300 mb-3" style={{ textShadow: '0 0 10px rgba(168,85,247,0.5)' }}>
      🌌 NEBULOSA GUARDERÍA ESTELAR
    </h3>
    <p className="text-center text-xs text-purple-400 mb-4">
      Las estrellas esperan aquí para renacer tras un evento cataclísmico
    </p>
    <div className="flex flex-wrap justify-center gap-3 min-h-[60px]">
      {stars.length === 0 ? (
        <span className="text-gray-500 text-sm italic">Vacía...</span>
      ) : (
        stars.map(star => (
          <StarPiece
            key={star.id}
            star={star}
            isSelected={selectedStarId === star.id}
            onClick={() => onSelectStar(star.id)}
            showName
          />
        ))
      )}
    </div>
    {stars.length > 0 && (
      <div className="text-center mt-2 text-xs text-purple-400">
        {stars.length} estrella{stars.length > 1 ? 's' : ''} esperando renacimiento
      </div>
    )}
  </div>
);

// ============================================================
// FILA DE SENDA EVOLUTIVA
// ============================================================

interface EvolutionPathRowProps {
  path: EvolutionPath;
  pathIndex: number;
  stars: (Star & { playerName: string })[];
  onSelectStar: (starId: string) => void;
  selectedStarId: string | null;
}

const EvolutionPathRow: React.FC<EvolutionPathRowProps> = ({
  path,
  stars,
  onSelectStar,
  selectedStarId,
}) => {
  return (
    <div className="relative">
      {/* Etiqueta de la senda */}
      <div
        className="flex items-center gap-2 mb-1 px-2 py-1 rounded"
        style={{ backgroundColor: `${path.color}20` }}
      >
        <div
          className="w-4 h-4 rounded-full border-2"
          style={{ backgroundColor: path.color, borderColor: path.color }}
        />
        <span className="text-xs font-bold" style={{ color: path.color }}>
          {path.starName}
        </span>
        <span className="text-xs text-gray-400">
          ({path.spectralType} | {path.mass} M☉ | {path.squares.length} casillas)
        </span>
      </div>

      {/* Casillas de la senda */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {path.squares.map((square, squareIdx) => {
          const starHere = stars.filter(s => s.squareIndex === squareIdx);
          const isTerminal = square.isTerminal;
          const isCollision = square.isCollisionNode;
          const isNursery = square.isNursery;

          return (
            <div
              key={square.id}
              className={`
                relative flex-shrink-0 w-20 h-24 rounded-lg border transition-all duration-200 cursor-pointer
                ${isTerminal ? 'border-red-500/70' : isCollision ? 'border-yellow-400/70' : 'border-white/20'}
                ${isNursery ? 'border-purple-500/70' : ''}
                hover:border-white/60 hover:scale-105
              `}
              style={{
                background: isTerminal
                  ? 'linear-gradient(135deg, #1a0000 0%, #2d0000 100%)'
                  : isCollision
                    ? 'linear-gradient(135deg, #1a1a00 0%, #2d2d00 100%)'
                    : isNursery
                      ? 'linear-gradient(135deg, #1a0033 0%, #2d0066 100%)'
                      : `linear-gradient(135deg, ${square.color}15 0%, ${square.color}08 100%)`,
              }}
              title={`${square.name}: ${square.description}`}
            >
              {/* Indicador de casilla */}
              <div className="text-center">
                <div
                  className="text-[9px] font-bold leading-tight px-1 pt-1 truncate"
                  style={{ color: square.color }}
                >
                  {square.name.length > 12 ? square.name.substring(0, 12) + '...' : square.name}
                </div>
                <div className="text-[8px] text-gray-500 mt-0.5">
                  {square.phase}
                </div>
                {square.metallicityValue > 0 && (
                  <div className="text-[8px] text-yellow-400 mt-0.5">
                    +{square.metallicityValue} Fe
                  </div>
                )}
              </div>

              {/* Estrellas en esta casilla */}
              {starHere.length > 0 && (
                <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-0.5 flex-wrap px-0.5">
                  {starHere.map(star => (
                    <StarPiece
                      key={star.id}
                      star={star}
                      isSelected={selectedStarId === star.id}
                      onClick={() => onSelectStar(star.id)}
                      small
                    />
                  ))}
                </div>
              )}

              {/* Iconos especiales */}
              {isTerminal && (
                <div className="absolute top-0.5 right-0.5 text-red-400 text-xs">💀</div>
              )}
              {isCollision && !isTerminal && (
                <div className="absolute top-0.5 right-0.5 text-yellow-400 text-xs">⚡</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================
// FICHA DE ESTRELLA
// ============================================================

interface StarPieceProps {
  star: Star & { playerName?: string };
  isSelected: boolean;
  onClick: () => void;
  small?: boolean;
  showName?: boolean;
}

const StarPiece: React.FC<StarPieceProps> = ({
  star,
  isSelected,
  onClick,
  small = false,
  showName = false,
}) => {
  const size = small ? 'w-5 h-5' : 'w-8 h-8';
  const glowColor = star.playerColor;

  return (
    <div
      className={`relative flex flex-col items-center cursor-pointer transition-transform hover:scale-110 ${isSelected ? 'scale-110' : ''}`}
      onClick={onClick}
    >
      {/* Representación de estrella */}
      <div
        className={`${size} rounded-full border-2 flex items-center justify-center transition-all duration-200`}
        style={{
          backgroundColor: star.playerColor,
          borderColor: isSelected ? '#fff' : star.playerColor,
          boxShadow: isSelected
            ? `0 0 15px ${glowColor}, 0 0 30px ${glowColor}40`
            : `0 0 5px ${glowColor}80`,
        }}
        title={`${star.name} (${star.spectralType}) - Masa: ${star.mass} M☉ - Metalicidad: ${star.metallicity}`}
      >
        {!small && (
          <span className="text-[8px] font-bold text-black">
            {star.spectralType.split(' ')[0]}
          </span>
        )}
      </div>

      {/* Indicador Thorne-Żytkow */}
      {star.isThorneZytkow && (
        <div className="absolute -top-1 -right-1 text-xs" title="Objeto Thorne-Żytkow">🔮</div>
      )}

      {/* Nombre */}
      {showName && (
        <span className="text-[9px] mt-1 text-gray-300 max-w-[60px] truncate">
          {star.name}
        </span>
      )}
    </div>
  );
};

// ============================================================
// LEYENDA DEL TABLERO
// ============================================================

const BoardLegend: React.FC = () => (
  <div className="mt-6 p-4 rounded-xl border border-white/10 bg-black/40">
    <h4 className="text-sm font-bold text-gray-300 mb-2">Leyenda</h4>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
      <LegendItem color="#ff0000" text="Casilla Terminal" icon="💀" />
      <LegendItem color="#fbbf24" text="Nodo de Colisión" icon="⚡" />
      <LegendItem color="#a855f7" text="Nebulosa" icon="🌌" />
      <LegendItem color="#f9c74f" text="Secuencia Principal" icon="☀️" />
    </div>
  </div>
);

const LegendItem: React.FC<{ color: string; text: string; icon: string }> = ({ color, text, icon }) => (
  <div className="flex items-center gap-2">
    <span>{icon}</span>
    <div className="w-3 h-3 rounded border" style={{ backgroundColor: `${color}30`, borderColor: color }} />
    <span className="text-gray-400">{text}</span>
  </div>
);

export default Board;
