// ============================================================
// STAR DESTINY GAME - COMPONENTE PRINCIPAL
// ============================================================

import { useGameState } from '@/hooks/useGameState';
import GameMenu from '@/components/GameMenu';
import GameUI from '@/components/GameUI';
import Board from '@/components/Board';
import Tutorial from '@/components/Tutorial';
import GameOver from '@/components/GameOver';
import './App.css';

function App() {
  const {
    gameState,
    addPlayer,
    removePlayer,
    startGame,
    rollDiceForGame,
    selectStar,
    toggleTutorial,
    toggleSound,
    resetGame,
  } = useGameState();

  const { gamePhase, players, winner, turn, supernovasTriggered, showTutorial } = gameState;

  // Pantalla de menú
  if (gamePhase === 'MENU') {
    return (
      <GameMenu
        players={players}
        onAddPlayer={addPlayer}
        onRemovePlayer={removePlayer}
        onStartGame={startGame}
        onShowTutorial={toggleTutorial}
      />
    );
  }

  // Pantalla de configuración
  if (gamePhase === 'SETUP' || gamePhase === 'SETUP_ROLL') {
    return (
      <GameMenu
        players={players}
        onAddPlayer={addPlayer}
        onRemovePlayer={removePlayer}
        onStartGame={startGame}
        onShowTutorial={toggleTutorial}
      />
    );
  }

  // Pantalla de fin de juego
  if (gamePhase === 'GAME_OVER') {
    return (
      <GameOver
        players={players}
        winner={winner}
        turn={turn}
        supernovasTriggered={supernovasTriggered}
        onRestart={resetGame}
        onMainMenu={resetGame}
      />
    );
  }

  // Pantalla principal del juego
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950/20 to-gray-950">
      {/* Tutorial overlay */}
      {showTutorial && <Tutorial onClose={toggleTutorial} />}

      <div className="flex flex-col lg:flex-row h-screen">
        {/* Panel lateral - UI del juego */}
        <div className="w-full lg:w-80 lg:h-full flex-shrink-0">
          <GameUI
            gameState={gameState}
            onRollDice={rollDiceForGame}
            onToggleTutorial={toggleTutorial}
            onToggleSound={toggleSound}
            onResetGame={resetGame}
          />
        </div>

        {/* Área principal - Tablero */}
        <div className="flex-1 overflow-auto p-4">
          <div className="max-w-7xl mx-auto">
            {/* Info bar */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Star Destiny
                </h1>
                <span className="text-xs text-gray-500">
                  Era Estelar Activa
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-yellow-400" />
                  Metalicidad: Enriquecimiento del ISM
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  Terminal: Fin de evolución
                </span>
              </div>
            </div>

            {/* Tablero */}
            <Board
              gameState={gameState}
              onSelectStar={selectStar}
            />

            {/* Info del juego */}
            <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-sm font-bold text-gray-300 mb-2">Acerca de Star Destiny</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Este juego educativo está basado en modelos científicos de evolución estelar.
                Las sendas representan la vida de estrellas de diferentes masas, desde enanas rojas
                de 0.1 M☉ hasta estrellas O masivas de 25 M☉. Las colisiones siguen principios
                astrofísicos reales: el límite de Chandrasekhar (1.4 M☉) para supernovas Ia,
                el límite TOV (~2.5 M☉) para agujeros negros, y la nucleosíntesis estelar para
                la producción de metalicidad. Referencias: Kroupa (2001), Kobayashi et al. (2020),
                Karakas (2010), Woosley & Heger (2007).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
