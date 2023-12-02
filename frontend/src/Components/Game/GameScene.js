import Phaser from 'phaser';
import skyAsset from '../../assets/arena.png';
import platformAsset from '../../assets/arena_platform.png';
import blueRobotAsset from '../../assets/blue-robot.png';
import roseRobotAsset from '../../assets/rose-robot.png';


const BLUE_ROBOT_KEY = 'blue-robot';
const ROSE_ROBOT_KEY = 'rose-robot';

class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
    this.player2 = undefined;
    this.player1 = undefined;
    this.cursors = undefined;
    // this.scoreLabel = undefined;
    this.gameOver = false;
  }

  preload() {
    this.load.image('sky', skyAsset);
    this.load.image('ground', platformAsset);
    this.load.spritesheet(BLUE_ROBOT_KEY, blueRobotAsset, {
      frameWidth: 91.55,
      frameHeight: 90,
    });
    this.load.spritesheet(ROSE_ROBOT_KEY, roseRobotAsset, {
      frameWidth: 93.25,
      frameHeight: 90,
    });
  }

  create() {
    this.add.image(401, 350, 'sky').setScale(0.4).setY(225).setX(600);
    const platform = this.physics.add.staticGroup().create(600, 350, 'ground').setScale(0.4).setY(460).refreshBody();
    this.player1 = this.createPlayer(100, 200, BLUE_ROBOT_KEY);
    this.player2 = this.createPlayer(1100, 200, ROSE_ROBOT_KEY);
    this.physics.add.collider(this.player2, platform);
    this.physics.add.collider(this.player1, platform);
    this.physics.add.collider(this.player1, this.player2);
    this.cursors = this.input.keyboard.createCursorKeys();

    /* The Collider takes two objects and tests for collision and performs separation against them.
    Note that we could call a callback in case of collision... */
  }
  
  update() {  
    if (this.gameOver) {
      return;
    }

    if (this.physics.collide(this.player2, this.player1)) {
      this.player2.setVelocity(0);
    }
    // player 1 controls
    if (this.cursors.left.isDown) {
      this.player2.setVelocityX(-160);
      this.player2.anims.play('left-blue-robot', true);
    } else if (this.cursors.right.isDown) {
      this.player2.setVelocityX(160);
      this.player2.anims.play('right-blue-robot', true);
    } else {
      this.player2.setVelocityX(0);
      this.player2.anims.play('turn-blue-robot');
    }
  
    if (this.cursors.up.isDown && this.player2.body.touching.down) {
      this.player2.setVelocityY(-300);
    }
  
    if (this.cursors.down.isDown){
      this.player2.setVelocityY(300);
    }
  
    if (this.physics.collide(this.player2, this.player1)) {
      this.player1.setVelocity(0);
    }
    // player 2 controls
    if (this.input.keyboard.addKey('Q').isDown) {
      this.player1.setVelocityX(-160);
      this.player1.anims.play('left-rose-robot', true);
    } else if (this.input.keyboard.addKey('D').isDown) {
      this.player1.setVelocityX(160);
      this.player1.anims.play('right-rose-robot', true);
    } else {
      this.player1.setVelocityX(0);
      this.player1.anims.play('turn-rose-robot');
    }
  
    if (this.input.keyboard.addKey('Z').isDown && this.player1.body.touching.down) {
      this.player1.setVelocityY(-300);
    }
  
    if (this.input.keyboard.addKey('S').isDown){
      this.player1.setVelocityY(300);
    }
  }

  createPlayer(x, y, key) {
    const player = this.physics.add.sprite(x, y, key);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
  
    this.anims.create({
      // eslint-disable-next-line prefer-template
      key: 'left-' + key,
      frames: this.anims.generateFrameNumbers(key, { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
  
    this.anims.create({
      // eslint-disable-next-line prefer-template
      key: 'turn-' + key,
      // eslint-disable-next-line object-shorthand
      frames: [{ key: key, frame: 3 }],
    });

    this.anims.create({
      key: 'turn-rose-robot',
      frames: [{ key: ROSE_ROBOT_KEY, frame: 4 }],
    });
  
    this.anims.create({
      // eslint-disable-next-line prefer-template
      key: 'right-' + key,
      frames: this.anims.generateFrameNumbers(key, { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });
  
    return player;
  }
}

export default GameScene;
