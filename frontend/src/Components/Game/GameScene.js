import Phaser from 'phaser';
import ScoreLabel from './ScoreLabel';
import BombSpawner from './BombSpawner';
import skyAsset from '../../assets/arena.png';
import platformAsset from '../../assets/arena_platform.png';
import starAsset from '../../assets/star.png';
import bombAsset from '../../assets/bomb.png';
import blueRobotAsset from '../../assets/blue-rrobot.png';
import roseRobotAsset from '../../assets/rose-robot.png';


const GROUND_KEY = 'ground';
const BLUE_ROBOT_KEY = 'blue-robot';
const ROSE_ROBOT_KEY = 'rose-robot';
const STAR_KEY = 'star';
const BOMB_KEY = 'bomb';

class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
    this.player = undefined;
    this.player2 = undefined;
    this.cursors = undefined;
    this.scoreLabel = undefined;
    this.stars = undefined;
    this.bombSpawner = undefined;
    this.gameOver = false;
  }

  preload() {
    this.load.image('sky', skyAsset);
    this.load.image(GROUND_KEY, platformAsset);
    this.load.image(STAR_KEY, starAsset);
    this.load.image(BOMB_KEY, bombAsset);
    
    this.load.spritesheet(BLUE_ROBOT_KEY, blueRobotAsset, {
      frameWidth: 82,
      frameHeight: 80,
    });

    this.load.spritesheet(ROSE_ROBOT_KEY, roseRobotAsset, {
      frameWidth: 83,
      frameHeight: 80,
    });
  }

  create() {
    this.add.image(401, 350, 'sky').setScale(0.4).setY(330).setX(601);
    const platforms = this.createPlatforms();
    this.player = this.createPlayer(100, 450, BLUE_ROBOT_KEY);
    this.player2 = this.createPlayer(900, 450, ROSE_ROBOT_KEY);

    this.stars = this.createStars();
    this.scoreLabel = this.createScoreLabel(16, 16, 0);
    this.bombSpawner = new BombSpawner(this, BOMB_KEY);
    const bombsGroup = this.bombSpawner.group;
    this.physics.add.collider(this.stars, platforms);
    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(this.player2, platforms);

    this.physics.add.collider(bombsGroup, platforms);
    this.physics.add.collider(this.player, bombsGroup, this.hitBomb, null, this);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    this.physics.add.collider(this.player2, bombsGroup, this.hitBomb, null, this);
    this.physics.add.overlap(this.player2, this.stars, this.collectStar, null, this);
    this.cursors = this.input.keyboard.createCursorKeys();

    /* The Collider takes two objects and tests for collision and performs separation against them.
    Note that we could call a callback in case of collision... */
  }
  
  update() {  
    // player 1 controls
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left-blue-robot', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right-blue-robot', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn-blue-robot');
    }
  
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-300);
    }
  
    if (this.cursors.down.isDown){
      this.player.setVelocityY(300);
    }
  
    // player 2 controls
    if (this.input.keyboard.addKey('Q').isDown) {
      this.player2.setVelocityX(-160);
      this.player2.anims.play('left-rose-robot', true);
    } else if (this.input.keyboard.addKey('D').isDown) {
      this.player2.setVelocityX(160);
      this.player2.anims.play('right-rose-robot', true);
    } else {
      this.player2.setVelocityX(0);
      this.player2.anims.play('turn-rose-robot');
    }
  
    if (this.input.keyboard.addKey('Z').isDown && this.player2.body.touching.down) {
      this.player2.setVelocityY(-300);
    }
  
    if (this.input.keyboard.addKey('S').isDown){
      this.player2.setVelocityY(300);
    }
  }

  createPlatforms() {
    const platforms = this.physics.add.staticGroup();

    platforms
      .create(400, 568, GROUND_KEY)
      .setScale(0.4)
      .setX(600)
      .refreshBody();
    return platforms;
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
      frames: [{ key: key, frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'turn-rose-robot',
      frames: [{ key: ROSE_ROBOT_KEY, frame: 3 }],
      frameRate: 20,
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

  createStars() {
    const stars = this.physics.add.group({
      key: STAR_KEY,
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    return stars;
  }

  collectStar(player, star) {
    star.disableBody(true, true);
    this.scoreLabel.add(10);
    if (this.stars.countActive(true) === 0) {
      //  A new batch of stars to collect
      this.stars.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true);
      });
    }

    this.bombSpawner.spawn(player.x);
  }

  createScoreLabel(x, y, score) {
    const style = { fontSize: '32px', fill: '#000' };
    const label = new ScoreLabel(this, x, y, score, style);
    console.log('score:', label);
    this.add.existing(label);

    return label;
  }

  hitBomb(player) {
    this.scoreLabel.setText(`GAME OVER : ( \nYour Score = ${this.scoreLabel.score}`);
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    this.gameOver = true;
  }
}

export default GameScene;
