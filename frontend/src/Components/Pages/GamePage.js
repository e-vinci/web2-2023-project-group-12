import Phaser from 'phaser';
import GameScene from '../Game/GameScene';

let game;

const GamePage = () => {
  const phaserGame = `
<div id="gameDiv" class="d-flex justify-content-center my-3">
</div>`;

  const main = document.querySelector('main');
  main.innerHTML = phaserGame;

  const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 500 },
        debug: false,
      },
    },
    canvasStyle: 'border: 4px solid #DAA520; box-sizing: border-box;', // Add any other styles as needed

    scene: [GameScene],
    //  parent DOM element into which the canvas created by the renderer will be injected.
    parent: 'gameDiv',
  };

  // there could be issues when a game was quit (events no longer working)
  // therefore destroy any started game prior to recreate it
  if (game) game.destroy(true);
  game = new Phaser.Game(config);
};

export default GamePage;
