// ============================================================
// STAR DESTINY GAME - TIPOS DE DATOS
// ============================================================

export interface Star {
  id: string;
  playerId: string;
  playerColor: string;
  pathId: number;        // 2-13 (senda evolutiva)
  squareIndex: number;   // Posicion en la senda (-1 = nebulosa)
  mass: number;          // Masa en M☉
  spectralType: string;  // Tipo espectral
  metallicity: number;   // Puntos de metalicidad acumulados
  isAlive: boolean;
  isInNursery: boolean;
  mergedWith?: string;   // ID de estrella fusionada (Thorne-Zytkow)
  isThorneZytkow: boolean;
  name: string;
}

export interface Player {
  id: string;
  name: string;
  color: string;
  stars: Star[];
  totalMetallicity: number;
  cyclesCompleted: number;
  isActive: boolean;
}

export interface Square {
  id: string;
  name: string;
  phase: string;
  description: string;
  timeSpan: number;      // En años reales (para información)
  metallicityValue: number;
  isCollisionNode: boolean;
  isTerminal: boolean;
  isNursery: boolean;
  color: string;         // Color para el tablero
}

export interface EvolutionPath {
  id: number;
  mass: number;
  spectralType: string;
  starName: string;
  description: string;
  squares: Square[];
  color: string;
}

export interface CollisionResult {
  objectA: string;
  objectB: string;
  result: string;
  resultType: 'STAR' | 'COMPACT' | 'EXPLOSION' | 'EXOTIC' | 'BLACK_HOLE';
  description: string;
  metallicityReward: number;
  targetPathId?: number;
  targetSquareIndex?: number;
  isTerminal: boolean;
  specialEvent?: string;
}

export type GamePhase = 'MENU' | 'SETUP' | 'SETUP_ROLL' | 'PLAYING' | 'COLLISION' | 'SUPERNOVA' | 'GAME_OVER';

export interface GameLogEntry {
  id: string;
  turn: number;
  playerId: string;
  message: string;
  type: 'INFO' | 'COLLISION' | 'SUPERNOVA' | 'PHASE' | 'METALLICITY' | 'VICTORY' | 'BIRTH' | 'DEATH';
  timestamp: number;
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  currentStarIndex: number;
  evolutionPaths: EvolutionPath[];
  collisionResults: CollisionResult[];
  turn: number;
  gamePhase: GamePhase;
  blackHolesOnBoard: number;
  supernovasTriggered: number;
  nurseryBonus: number;
  diceValue: number;
  diceRolling: boolean;
  selectedStarId: string | null;
  log: GameLogEntry[];
  winner: Player | null;
  showTutorial: boolean;
  soundEnabled: boolean;
}

export const PLAYER_COLORS = [
  '#FFD700', // Oro
  '#00BFFF', // Azul cielo
  '#FF6347', // Tomate
  '#32CD32', // Verde lima
  '#FF69B4', // Rosa
  '#9370DB', // Púrpura
];

export const GAME_CONFIG = {
  MAX_PLAYERS: 4,
  MIN_PLAYERS: 1,
  DICE_SIDES: 6,
  SUPERNOVA_IA_THRESHOLD: 1.4, // Chandrasekhar limit
  TOV_LIMIT: 2.5, // Tolman-Oppenheimer-Volkoff limit
  BLACK_HOLE_COLLAPSE_THRESHOLD: 3,
  WINNING_METALLICITY_TARGET: 200,
  MAX_TURNS: 100,
  NURSERY_EXIT_ROLL_NEEDED: 6, // Roll 6 to exit nursery
};
