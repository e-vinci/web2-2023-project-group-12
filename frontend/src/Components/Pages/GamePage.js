import Phaser from 'phaser';
import GameScene from '../Game/GameScene';
import EndGameScene from '../Game/EndGameScene';

let game;

const GamePage = () => {
  const phaserGame = `
  <div class="d-flex justify-content-center">
    <div id="gameDiv" class="d-flex justify-content-center">
    </div>
  </div>
`;

  const main = document.querySelector('main');
  main.innerHTML = phaserGame;

  const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 500,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 1000 },
        debug: false,
      },
    },
    canvasStyle: 'border: 7px solid #ffc107; box-sizing: border-box; border-radius: 10px;', // Add any other styles as needed

    scene: [GameScene, EndGameScene],
    //  parent DOM element into which the canvas created by the renderer will be injected.
    parent: 'gameDiv',
  };

  // there could be issues when a game was quit (events no longer working)
  // therefore destroy any started game prior to recreate it
  if (game) game.destroy(true);
  game = new Phaser.Game(config);
};

export default GamePage;
