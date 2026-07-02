// ============================================================
// STAR DESTINY GAME - HOOK PRINCIPAL DE ESTADO
// ============================================================

import { useState, useCallback } from 'react';
import type { GameState, Player, Star, GameLogEntry } from '@/types/game';
import { GAME_CONFIG, PLAYER_COLORS } from '@/types/game';
import { EVOLUTION_PATHS, getPathById, findCollisionResult, getStarObjectType, generateStarName } from '@/data/starData';

function createInitialState(): GameState {
  return {
    players: [],
    currentPlayerIndex: 0,
    currentStarIndex: 0,
    evolutionPaths: EVOLUTION_PATHS,
    collisionResults: [],
    turn: 1,
    gamePhase: 'MENU',
    blackHolesOnBoard: 0,
    supernovasTriggered: 0,
    nurseryBonus: 0,
    diceValue: 1,
    diceRolling: false,
    selectedStarId: null,
    log: [{
      id: 'log-0',
      turn: 0,
      playerId: 'system',
      message: 'Bienvenido a Star Destiny. El universo espera.',
      type: 'INFO',
      timestamp: Date.now(),
    }],
    winner: null,
    showTutorial: false,
    soundEnabled: true,
  };
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(createInitialState);

  // ============================================================
  // ACCIONES DEL JUEGO
  // ============================================================

  const startSetup = useCallback(() => {
    setGameState(prev => ({ ...prev, gamePhase: 'SETUP' }));
  }, []);

  const addPlayer = useCallback((name: string) => {
    setGameState(prev => {
      if (prev.players.length >= GAME_CONFIG.MAX_PLAYERS) return prev;
      const newPlayer: Player = {
        id: generateId(),
        name,
        color: PLAYER_COLORS[prev.players.length % PLAYER_COLORS.length],
        stars: [],
        totalMetallicity: 0,
        cyclesCompleted: 0,
        isActive: true,
      };
      return {
        ...prev,
        players: [...prev.players, newPlayer],
      };
    });
  }, []);

  const removePlayer = useCallback((playerId: string) => {
    setGameState(prev => ({
      ...prev,
      players: prev.players.filter(p => p.id !== playerId),
    }));
  }, []);

  const startGame = useCallback(() => {
    setGameState(prev => {
      if (prev.players.length === 0) return prev;

      // Crear estrellas iniciales para cada jugador
      const updatedPlayers = prev.players.map(player => {
        const stars: Star[] = [];
        // Cada jugador comienza con 2 estrellas (sistema binario simplificado)
        for (let i = 0; i < 2; i++) {
          const pathId = rollDice(2, 12); // Tirada 2d6 para tipo
          stars.push({
            id: generateId(),
            playerId: player.id,
            playerColor: player.color,
            pathId,
            squareIndex: 0, // Empieza en Nebulosa
            mass: getPathById(pathId)?.mass || 1.0,
            spectralType: getPathById(pathId)?.spectralType || 'G2 V',
            metallicity: 0,
            isAlive: true,
            isInNursery: true,
            isThorneZytkow: false,
            name: generateStarName(i),
          });
        }
        return { ...player, stars };
      });

      const newLog: GameLogEntry = {
        id: generateId(),
        turn: 1,
        playerId: 'system',
        message: `¡El universo ha comenzado! ${updatedPlayers.length} jugadores compiten por la metalicidad cósmica.`,
        type: 'INFO',
        timestamp: Date.now(),
      };

      return {
        ...prev,
        players: updatedPlayers,
        gamePhase: 'PLAYING',
        currentPlayerIndex: 0,
        currentStarIndex: 0,
        log: [...prev.log, newLog],
      };
    });
  }, []);

  const rollDice = useCallback((min: number = 1, max: number = 6): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }, []);

  const rollDiceForGame = useCallback(() => {
    setGameState(prev => {
      if (prev.diceRolling || prev.gamePhase !== 'PLAYING') return prev;
      return { ...prev, diceRolling: true };
    });

    // Animación de dados
    setTimeout(() => {
      setGameState(prev => {
        if (prev.gamePhase !== 'PLAYING') return prev;

        const diceValue = rollDice();
        const currentPlayer = prev.players[prev.currentPlayerIndex];
        if (!currentPlayer) return prev;

        // Encontrar la primera estrella viva del jugador
        let starIndex = -1;
        for (let i = 0; i < currentPlayer.stars.length; i++) {
          if (currentPlayer.stars[i].isAlive) {
            starIndex = i;
            break;
          }
        }

        if (starIndex === -1) {
          // No hay estrellas vivas, pasar turno
          return advanceTurn(prev);
        }

        const star = currentPlayer.stars[starIndex];
        const path = getPathById(star.pathId);
        if (!path) return prev;

        // Calcular nueva posición
        let newSquareIndex = star.squareIndex + diceValue;
        const maxSquare = path.squares.length - 1;

        // Si excede el final, va a fase terminal
        if (newSquareIndex >= maxSquare) {
          newSquareIndex = maxSquare;
        }

        const newSquare = path.squares[newSquareIndex];

        // Crear log
        const logs: GameLogEntry[] = [];

        if (newSquare.isNursery) {
          logs.push({
            id: generateId(),
            turn: prev.turn,
            playerId: currentPlayer.id,
            message: `${currentPlayer.name}: ${star.name} (${star.spectralType}) regresa a la Nebulosa.`,
            type: 'INFO',
            timestamp: Date.now(),
          });
        } else {
          logs.push({
            id: generateId(),
            turn: prev.turn,
            playerId: currentPlayer.id,
            message: `${currentPlayer.name}: ${star.name} avanza ${diceValue} casillas → ${newSquare.name}`,
            type: 'INFO',
            timestamp: Date.now(),
          });
        }

        // Actualizar estrella
        const updatedStars = currentPlayer.stars.map((s, idx) => {
          if (idx !== starIndex) return s;
          return {
            ...s,
            squareIndex: newSquareIndex,
            isInNursery: newSquare.isNursery,
            metallicity: s.metallicity + newSquare.metallicityValue,
          };
        });

        // Recolectar metalicidad
        const metallicityGained = newSquare.metallicityValue;

        const updatedPlayers = prev.players.map((p, idx) => {
          if (idx !== prev.currentPlayerIndex) return p;
          return {
            ...p,
            stars: updatedStars,
            totalMetallicity: p.totalMetallicity + metallicityGained,
          };
        });

        // Verificar si es casilla terminal
        let gameEnded = false;
        let winner: Player | null = null;
        if (newSquare.isTerminal) {
          updatedStars[starIndex] = { ...updatedStars[starIndex], isAlive: false };
          logs.push({
            id: generateId(),
            turn: prev.turn,
            playerId: currentPlayer.id,
            message: `★ ${star.name} ha llegado a su destino final: ${newSquare.name}`,
            type: 'DEATH',
            timestamp: Date.now(),
          });

          // Verificar fin del juego
          const allStarsDead = updatedPlayers.every(player =>
            player.stars.every(s => !s.isAlive)
          );
          if (allStarsDead) {
            gameEnded = true;
            winner = updatedPlayers.reduce((best, p) =>
              p.totalMetallicity > best.totalMetallicity ? p : best
            );
            logs.push({
              id: generateId(),
              turn: prev.turn,
              playerId: 'system',
              message: `¡${winner.name} gana con ${winner.totalMetallicity} puntos de metalicidad!`,
              type: 'VICTORY',
              timestamp: Date.now(),
            });
            return {
              ...prev,
              players: updatedPlayers,
              diceValue,
              diceRolling: false,
              gamePhase: 'GAME_OVER' as const,
              winner,
              log: [...prev.log, ...logs],
            };
          }
        }

        // Verificar colisiones con otras estrellas
        let collisionDetected = false;
        for (const otherPlayer of updatedPlayers) {
          for (const otherStar of otherPlayer.stars) {
            if (otherStar.id === star.id) continue;
            if (!otherStar.isAlive) continue;
            if (otherStar.pathId === star.pathId && Math.abs(otherStar.squareIndex - newSquareIndex) <= 1) {
              // Posible colisión
              const typeA = getStarObjectType(star.pathId, newSquareIndex);
              const typeB = getStarObjectType(otherStar.pathId, otherStar.squareIndex);
              const collision = findCollisionResult(typeA, typeB);

              if (collision) {
                collisionDetected = true;
                logs.push({
                  id: generateId(),
                  turn: prev.turn,
                  playerId: currentPlayer.id,
                  message: `💥 ¡COLISIÓN! ${star.name} + ${otherStar.name} = ${collision.result}. ${collision.description}`,
                  type: 'COLLISION',
                  timestamp: Date.now(),
                });

                // Aplicar resultado de colisión
                if (collision.resultType === 'EXPLOSION') {
                  // Ambas estrellas van a nebulosa
                  updatedStars[starIndex] = {
                    ...updatedStars[starIndex],
                    squareIndex: 0,
                    isInNursery: true,
                    metallicity: updatedStars[starIndex].metallicity + collision.metallicityReward,
                  };
                  // La otra estrella también
                  const otherPlayerIdx = updatedPlayers.findIndex(p => p.id === otherPlayer.id);
                  const otherStarIdx = updatedPlayers[otherPlayerIdx].stars.findIndex(s => s.id === otherStar.id);
                  updatedPlayers[otherPlayerIdx].stars[otherStarIdx] = {
                    ...updatedPlayers[otherPlayerIdx].stars[otherStarIdx],
                    squareIndex: 0,
                    isInNursery: true,
                  };

                  if (collision.specialEvent === 'SUPERNOVA_IA') {
                    logs.push({
                      id: generateId(),
                      turn: prev.turn,
                      playerId: 'system',
                      message: '☀️ SUPERNOVA TIPO Ia: ¡Todas las estrellas en la Nebulosa pueden renacer!',
                      type: 'SUPERNOVA',
                      timestamp: Date.now(),
                    });
                  }
                } else if (collision.resultType === 'BLACK_HOLE') {
                  updatedStars[starIndex] = {
                    ...updatedStars[starIndex],
                    isAlive: false,
                    squareIndex: path.squares.length - 1,
                    metallicity: updatedStars[starIndex].metallicity + collision.metallicityReward,
                  };
                } else if (collision.resultType === 'EXOTIC' && collision.specialEvent === 'THORNE_ZYTKOW') {
                  updatedStars[starIndex] = {
                    ...updatedStars[starIndex],
                    isThorneZytkow: true,
                    metallicity: updatedStars[starIndex].metallicity + collision.metallicityReward,
                  };
                } else {
                  // Resultado normal: cambiar a nueva senda
                  if (collision.targetPathId) {
                    updatedStars[starIndex] = {
                      ...updatedStars[starIndex],
                      pathId: collision.targetPathId,
                      squareIndex: collision.targetSquareIndex || 4,
                      mass: getPathById(collision.targetPathId)?.mass || star.mass,
                      spectralType: getPathById(collision.targetPathId)?.spectralType || star.spectralType,
                      metallicity: updatedStars[starIndex].metallicity + collision.metallicityReward,
                    };
                  }
                }

                // Actualizar jugadores
                const finalPlayers = updatedPlayers.map((p, idx) => {
                  if (idx === prev.currentPlayerIndex) {
                    return { ...p, stars: updatedStars, totalMetallicity: p.totalMetallicity + collision.metallicityReward };
                  }
                  return p;
                });

                return {
                  ...prev,
                  players: finalPlayers,
                  diceValue,
                  diceRolling: false,
                  gamePhase: collision.specialEvent === 'GALACTIC_COLLAPSE' ? 'GAME_OVER' as const : prev.gamePhase,
                  blackHolesOnBoard: collision.resultType === 'BLACK_HOLE' ? prev.blackHolesOnBoard + 1 : prev.blackHolesOnBoard,
                  supernovasTriggered: collision.specialEvent === 'SUPERNOVA_IA' ? prev.supernovasTriggered + 1 : prev.supernovasTriggered,
                  log: [...prev.log, ...logs],
                };
              }
            }
          }
        }

        // Avanzar turno
        const nextState: GameState = {
          ...prev,
          players: updatedPlayers.map((p, idx) => {
            if (idx === prev.currentPlayerIndex) {
              return { ...p, stars: updatedStars, totalMetallicity: p.totalMetallicity + metallicityGained };
            }
            return p;
          }),
          diceValue,
          diceRolling: false,
          log: [...prev.log, ...logs],
        };

        if (!collisionDetected && !gameEnded) {
          return advanceTurn(nextState);
        }

        return nextState;
      });
    }, 600);
  }, [rollDice]);

  const advanceTurn = (state: GameState): GameState => {
    const nextPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
    const nextTurn = nextPlayerIndex === 0 ? state.turn + 1 : state.turn;

    // Verificar límite de turnos
    if (nextTurn > GAME_CONFIG.MAX_TURNS) {
      const winner = state.players.reduce((best, p) =>
        p.totalMetallicity > best.totalMetallicity ? p : best
      );
      return {
        ...state,
        gamePhase: 'GAME_OVER',
        winner,
        log: [...state.log, {
          id: generateId(),
          turn: nextTurn,
          playerId: 'system',
          message: `¡Tiempo cósmico agotado! ${winner.name} gana con ${winner.totalMetallicity} puntos.`,
          type: 'VICTORY',
          timestamp: Date.now(),
        }],
      };
    }

    return {
      ...state,
      currentPlayerIndex: nextPlayerIndex,
      turn: nextTurn,
    };
  };

  const selectStar = useCallback((starId: string) => {
    setGameState(prev => ({ ...prev, selectedStarId: starId }));
  }, []);

  const toggleTutorial = useCallback(() => {
    setGameState(prev => ({ ...prev, showTutorial: !prev.showTutorial }));
  }, []);

  const toggleSound = useCallback(() => {
    setGameState(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(createInitialState());
  }, []);

  return {
    gameState,
    startSetup,
    addPlayer,
    removePlayer,
    startGame,
    rollDiceForGame,
    selectStar,
    toggleTutorial,
    toggleSound,
    resetGame,
  };
}
