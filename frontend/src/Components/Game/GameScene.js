import Phaser from 'phaser';

import skyAsset from '../../assets/arena.jpg';
import platformAsset from '../../assets/arena-platform.jpg';
import blueRobotAsset from '../../assets/blue-robot.png';
import roseRobotAsset from '../../assets/rose-robot.png';
import blueHug from '../../assets/blue-hug.png';
import roseHug from '../../assets/rose-hug.png';
import heart from '../../assets/heart-rotation.png';
import blueKiss from '../../assets/blue-smack.png';
import roseKiss from '../../assets/rose-smack.png';

import { getAuthenticatedUser, isAuthenticated, getAuthenticatedUser2, isAuthenticated2 } from '../../utils/auths';

const BLUE_ROBOT_KEY = 'blue-robot';
const ROSE_ROBOT_KEY = 'rose-robot';
const BLUE_HUG_KEY = 'blue-hug';
const ROSE_HUG_KEY = 'rose-hug';
const HEART = 'heart';
const BLUE_KISS_KEY = 'blue-kiss';
const ROSE_KISS_KEY = 'rose-kiss';

class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
    this.player1 = undefined;
    this.player2 = undefined;
    this.cursors = undefined;
    this.player1Love = 0;
    this.player2Love = 0;
    this.player1Bar = null;
    this.player2Bar = null;
    this.gameOver = false;
    this.kissPlayer1 = false;
    this.kissPlayer2 = false;
  }

  preload() {
    this.load.image('sky', skyAsset);
    this.load.image('ground', platformAsset);

    this.load.spritesheet(BLUE_ROBOT_KEY, blueRobotAsset, {
      frameWidth: 100,
      frameHeight: 98,
    });
    this.load.spritesheet(ROSE_ROBOT_KEY, roseRobotAsset, {
      frameWidth: 100,
      frameHeight: 102,
    });

    // HUG attack
    this.load.spritesheet(BLUE_HUG_KEY, blueHug, {
      frameWidth: 100,
      frameHeight: 99,
    });
    this.load.spritesheet(ROSE_HUG_KEY, roseHug, {
      frameWidth: 100,
      frameHeight: 99,
    });

    // KISS attack
    this.load.spritesheet(HEART, heart, {
      frameWidth: 35.25,
      frameHeight: 30,
    });

    this.load.spritesheet(BLUE_KISS_KEY, blueKiss, {
      frameWidth: 96,
      frameHeight: 99,
    });
    this.load.spritesheet(ROSE_KISS_KEY, roseKiss, {
      frameWidth: 99,
      frameHeight: 99,
    });
  }

  create() {
    this.add.image(401, 350, 'sky').setScale(0.7).setY(225).setX(600);
    const platform = this.physics.add.staticGroup().create(600, 350, 'ground').setScale(0.7).setY(470).refreshBody();
    this.player1 = this.createPlayer(1100, 200, BLUE_ROBOT_KEY);
    this.player2 = this.createPlayer(100, 200, ROSE_ROBOT_KEY);
    this.physics.add.collider(this.player1, platform);
    this.physics.add.collider(this.player2, platform);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(this.player1, this.player2, this.hugAttack, null, this);

    /* The Collider takes two objects and tests for collision and performs separation against them.
    Note that we could call a callback in case of collision... */

    // Love bars
    this.add.rectangle(10, 10, 800, 50, 0xe1dbf7);
    this.add.rectangle(this.game.config.width - 10, 10, 800, 50, 0xe1dbf7);
    this.player1Bar = this.add.rectangle(this.game.config.width - 10, 10, this.player1Love*8, 50, 0xD038AC);
    this.player2Bar = this.add.rectangle(10, 10, this.player2Love*8, 50, 0xD038AC);

    // kiss
    this.heartsPlayer1 = this.physics.add.group();
    this.heartsPlayer2 = this.physics.add.group();
    
    this.physics.add.collider(this.player1,this.heartsPlayer2 ,this.handleKissCollision, null, this);
    this.physics.add.collider(this.player2,this.heartsPlayer1 ,this.handleKissCollision, null, this);

    // Player username display
      const user1 = getAuthenticatedUser()?.user?.username;
      const user2 = getAuthenticatedUser2()?.user?.username;
      this.add.rectangle(75, 70, 150, 40, 0xffc107);
      this.add.rectangle(this.game.config.width - 75, 70, 150, 40, 0xffc107);
      const style = { fontFamily: 'Bauhaus', fontSize: '20px', fill: '#000', resolution: 3};
      const username2 = this.add.text(70, 70, 'Player 2', style);
      const username1 = this.add.text(this.game.config.width - 70, 70, 'Player 1', style);
      if (isAuthenticated()) {
        if (isAuthenticated2()) username2.setText(user2).setStyle(style);
        else username2.setText('Player 2').setStyle(style);
        username1.setText(user1).setStyle(style);
      }
      username1.setOrigin(0.5);
      username2.setOrigin(0.5);
  }
  
  update() {

    this.updateBars();

    if (this.gameOver) {
      this.physics.pause();
      this.endGame();
      this.player1Love = 0;
      this.player2Love = 0;
      this.player1Bar = null;
      this.player2Bar = null;
      this.gameOver = false;
      this.kissPlayer1 = false;
      this.kissPlayer2 = false;
    }

    // player 1 controls
    if (this.cursors.left.isDown) {
      this.player1.setVelocityX(-250);
      this.player1.anims.play('left-blue-robot', true);
    } else if (this.cursors.right.isDown) {
      this.player1.setVelocityX(250);
      this.player1.anims.play('right-blue-robot', true);
    } else {
      this.player1.setVelocityX(0);
      this.player1.anims.play('turn-blue-robot');
    }
  
    if (this.cursors.up.isDown && this.player1.body.touching.down) {
      this.player1.setVelocityY(-500);
    }

    // HUG attack
    if (this.cursors.right.isDown && this.input.keyboard.addKey('O').isDown) {
      this.player1.anims.play('right-blue-hug', true);
    }
    else if (this.input.keyboard.addKey('O').isDown) {
      this.player1.anims.play('left-blue-hug', true);
    }

    // Smack animation
    if (this.cursors.right.isDown && this.input.keyboard.addKey('P').isDown) {
      this.player1.anims.play('right-blue-kiss', true);
    }
    else if (this.input.keyboard.addKey('P').isDown) {
      this.player1.anims.play('left-blue-kiss', true);
    }


    // player 2 controls
    if (this.input.keyboard.addKey('Q').isDown) {
      this.player2.setVelocityX(-250);
      this.player2.anims.play('left-rose-robot', true);
    } else if (this.input.keyboard.addKey('D').isDown) {
      this.player2.setVelocityX(250);
      this.player2.anims.play('right-rose-robot', true);
    } else {
      this.player2.setVelocityX(0);
      this.player2.anims.play('turn-rose-robot');
    }
  
    if (this.input.keyboard.addKey('Z').isDown && this.player2.body.touching.down) {
      this.player2.setVelocityY(-500);
    }

    // HUG attack
    if (this.input.keyboard.addKey('Q').isDown && this.input.keyboard.addKey('V').isDown) {
      this.player2.anims.play('left-rose-hug', true);
    }
    else if (this.input.keyboard.addKey('V').isDown) {
      this.player2.anims.play('right-rose-hug', true);
    }

    // Smack animation
    if (this.input.keyboard.addKey('Q').isDown && this.input.keyboard.addKey('B').isDown) {
      this.player2.anims.play('left-rose-kiss', true);
    }
    else if (this.input.keyboard.addKey('B').isDown) {   
      this.player2.anims.play('right-rose-kiss', true);
    }

    // Kiss attack
    this.heartsPlayer1.getChildren().forEach((h) => {
      h.update(); 
      if(h.x < 0 || h.x > this.game.config.width) {
        h.destroy();
        this.kissPlayer1 = false;
      }
    });

    this.heartsPlayer2.getChildren().forEach((h) => {
      h.update(); 
      if(h.x < 0 || h.x > this.game.config.width) {
        h.destroy();
        this.kissPlayer2 = false;
      }
    });

    // Player 1 kiss attack
    if(this.cursors.right.isDown && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey('P')) && !this.kissPlayer1){
      this.createHeart(this.player1, 600);
      this.kissPlayer1 = true;
    }
    else if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey('P')) && !this.kissPlayer1){
      this.createHeart(this.player1, -600);
      this.kissPlayer1 = true;
    }

    // Player 2 kiss attack
    if(this.input.keyboard.addKey('Q').isDown && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey('B')) && !this.kissPlayer2){
      this.createHeart(this.player2, -600);
      this.kissPlayer2 = true;
    }
    else if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey('B')) && !this.kissPlayer2){
      this.createHeart(this.player2, 600);
      this.kissPlayer2 = true;
    }
  }

  createPlayer(x, y, key) {
    const player = this.physics.add.sprite(x, y, key);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.setSize(80,80);
  
    this.anims.create({
      // eslint-disable-next-line prefer-template
      key: 'left-' + key,
      frames: this.anims.generateFrameNumbers(key, { start: 3, end: 0 }),
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

    let hugKey;
    let kissKey;
    if(key === ROSE_ROBOT_KEY) {
      hugKey = ROSE_HUG_KEY;
      kissKey = ROSE_KISS_KEY;
    }
    else {
      hugKey = BLUE_HUG_KEY;
      kissKey = BLUE_KISS_KEY;
    }
    
    // HUG attack
    this.anims.create({
      // eslint-disable-next-line prefer-template
      key: 'right-' + hugKey,
      frames: [{ key: hugKey, frame: 3 }],
    });

    this.anims.create({
      // eslint-disable-next-line prefer-template
      key: 'left-' + hugKey,
      frames: [{ key: hugKey, frame: 0 }],
    });

    // KISS attack
    this.anims.create({
      // eslint-disable-next-line prefer-template
      key: 'right-' + kissKey,
      frames: [{ key: kissKey, frame: 2 }],
    });

    this.anims.create({
      // eslint-disable-next-line prefer-template
      key: 'left-' + kissKey,
      frames: [{ key: kissKey, frame: 1 }],
    });

    return player;
  }

  hugAttack(player1, player2) {
    if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey('O'))) { // player1
      this.player2Love += 10;
      this.setTintEffect(player2, 50);
    } else if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey('V'))) { // player2
      this.player1Love += 10;
      this.setTintEffect(player1, 50);
    }
    if(this.player2Love === 100 || this.player1Love === 100) {
      this.gameOver = true;
    }
  }

  setTintEffect(player, time){
    player.setTint(0xD038AC);
    let key;
    if (player === this.player1)
      key = 'turn-blue-robot';
    else key = 'turn-rose-robot';
    player.anims.play(key);
    // clear tint after "time" milliseconds
    this.time.delayedCall(time, () => {
      player.clearTint();
    }, [], this);
  }

  createHeart(player, velocityX){
    const heartAttack = this.physics.add.sprite(player.x,player.y, HEART);

    heartAttack.anims.create({
      key: HEART,
      frames: this.anims.generateFrameNumbers(HEART, { start: 0, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });
    heartAttack.anims.play(HEART);

    if(player === this.player1){
      this.heartsPlayer1.add(heartAttack);
    }
    else {
      this.heartsPlayer2.add(heartAttack);
    }
    heartAttack.body.setVelocityX(velocityX);
    heartAttack.body.setAllowGravity(false);
  }

  handleKissCollision(player, kiss) {
    kiss.destroy();
    if (player === this.player1) {
      this.player1Love += 10;
      this.setTintEffect(this.player1,100);
      this.kissPlayer2 = false;
    } else if (player === this.player2) {
      this.player2Love += 10;
      this.setTintEffect(this.player2,100);
      this.kissPlayer1 = false;
    }
    if(this.player1Love === 100 || this.player2Love === 100){
      this.gameOver = true;
    }
  }

  updateBars() { // update players love bar
    this.player1Bar = this.add.rectangle(this.game.config.width - 10, 10, this.player1Love*8, 50, 0xD038AC);
    this.player2Bar = this.add.rectangle(10, 10, this.player2Love*8, 50, 0xD038AC);
  }

  endGame() {
    this.sys.game.global = {winner: this.player2Love === 100 ? 'player1' : 'player2', loser: this.player2Love === 100 ? 'player2' : 'player1'};
    this.scene.launch('end-game-scene');
    this.scene.pause();
    this.sound.pauseAll();
  }

}

export default GameScene;
