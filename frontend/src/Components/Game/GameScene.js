import Phaser from 'phaser';
import Navigate from '../Router/Navigate';

import skyAsset from '../../assets/arena.jpg';
import platformAsset from '../../assets/arena-platform.jpg';
import blueRobotAsset from '../../assets/blue-robot.png';
import roseRobotAsset from '../../assets/rose-robot.png';
import blueHug from '../../assets/blue-hug.png';
import roseHug from '../../assets/rose-hug.png';
import heart from '../../assets/heart-rotation.png';
import blueKiss from '../../assets/blue-smack.png';
import roseKiss from '../../assets/rose-smack.png';

import kissSFX from '../../sounds/kiss2-sfx.mp3';
import buttonSFX from '../../sounds/button-sfx.mp3';

import homeIcon from '../../assets/home-icon.png';
import replayIcon from '../../assets/replay-icon.png'

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
    this.hearts = undefined;
    this.kissPlayer1 = false;
    this.kissPlayer2 = false;
    this.user1Updated = false;
    this.user2Updated = false;
  }



  preload() {
    // icons
    this.load.image('home', homeIcon);
    this.load.image('replay', replayIcon);

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
      this.endGamePopup();
      return;
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

    // kiss SFX 
    const kissySound = new Audio(kissSFX);
    kissySound.volume = 0.3;

    // Player 1 kiss attack
    if(this.cursors.right.isDown && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey('P')) && !this.kissPlayer1){
      this.createHeart(this.player1, 600);
      this.kissPlayer1 = true;
      kissySound.play();
    }
    else if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey('P')) && !this.kissPlayer1){
      this.createHeart(this.player1, -600);
      this.kissPlayer1 = true;
      kissySound.play();
    }

    // Player 2 kiss attack
    if(this.input.keyboard.addKey('Q').isDown && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey('B')) && !this.kissPlayer2){
      this.createHeart(this.player2, -600);
      this.kissPlayer2 = true;
      kissySound.play();
    }
    else if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey('B')) && !this.kissPlayer2){
      this.createHeart(this.player2, 600);
      this.kissPlayer2 = true;
      kissySound.play();
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
      this.physics.pause();
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
      this.physics.pause();
      this.gameOver = true;
    }
  }

  updateBars() {
    // Mise à jour de la largeur des barres de vie en fonction de la vie actuelle des joueurs
    this.player1Bar = this.add.rectangle(this.game.config.width - 10, 10, this.player1Love*8, 50, 0xD038AC);
    this.player2Bar = this.add.rectangle(10, 10, this.player2Love*8, 50, 0xD038AC);
  }

  endGamePopup() {
    const {centerX} = this.cameras.main;
    const {centerY} = this.cameras.main;
    const popupWidth = 350;
    const popupHeight = 250;

    const popupBackground = this.add.graphics();
    popupBackground.fillStyle(0xe1dbf7);
    popupBackground.fillRoundedRect(centerX - popupWidth / 2, centerY - popupHeight / 2, popupWidth, popupHeight);

    const popupTextStyle = { fontFamily: 'Bauhaus', fontSize: '50px', fill: '#341f8b', resolution: 2};
    let endGameText;

    const user1 = getAuthenticatedUser()?.user;
    const user2 = getAuthenticatedUser2()?.user;

    if(isAuthenticated()) { // player 1 won
      if (this.player2Love === 100) {

        if (!this.user1Updated) {
          handleWinner(user1?.username);
          this.user1Updated = true;
        }

        if (isAuthenticated2() && !this.user2Updated) {
          handleLoser(user2?.username);
          this.user2Updated = true;
        }

        endGameText = this.add.text(centerX, centerY - 50, `${user1?.username} WON`  , popupTextStyle);
      } 
      else if (isAuthenticated2()) { // player 2 won

        if (!this.user1Updated) {
          handleLoser(user1?.username);
          this.user1Updated = true;
        }

        if (!this.user2Updated) {
          handleWinner(user2?.username);
          this.user2Updated = true;
        }

        endGameText = this.add.text(centerX, centerY - 50, `${user2?.username} WON`, popupTextStyle);
      }
      else { // player 2 won
        if (this.player2Love === 100 && !this.user1Updated) {
          handleWinner(user1?.username);
          this.user1Updated = true;
        }
        if (!this.user1Updated) {
          handleLoser(user1?.username);
          this.user1Updated = true;
        }
        endGameText = this.add.text(centerX, centerY - 50, `${user1?.username} LOST`, popupTextStyle);
      }
    }
    else if (this.player2Love === 100)
        endGameText = this.add.text(centerX, centerY - 50, 'PLAYER 1 WON', popupTextStyle);
      else 
        endGameText = this.add.text(centerX, centerY - 50, 'PLAYER 2 WON', popupTextStyle);
    endGameText.setOrigin(0.5);


    const homeButton = this.add.image(centerX +70, centerY + 40, 'home').setScale(0.2);
    homeButton.setOrigin(0.5);
    homeButton.setInteractive();
    const replayButton = this.add.image(centerX -70, centerY + 40, 'replay').setScale(0.2);
    replayButton.setOrigin(0.5);
    replayButton.setInteractive();

    // btn SFX
    const btnSFX = new Audio(buttonSFX);
    
    homeButton.on('pointerdown', () => {
      btnSFX.volume = 0.1;
      btnSFX.play();
      Navigate('/');
    });

    replayButton.on('pointerdown', () => {
      btnSFX.volume = 0.
      btnSFX.play();
      window.location.reload();
    });
  }

}

async function updateUserScore(username, gamesPlayed, gamesWon = 0, gamesLost = 0) {
  const user = await getUser(username);

  const options = {
    method: 'PATCH',
    body: JSON.stringify({
      gamesPlayed: user.gamesPlayed + gamesPlayed,
      gamesWon: user.gamesWon + gamesWon,
      gamesLost: user.gamesLost + gamesLost,
    }),
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`/api/users/${user?.id}`, options);
  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
  const update = await response.json();

  return update;
}

async function handleWinner(username) {
  await updateUserScore(username, 1, 1); // GamesPlayed +1, GamesWon +1
}

async function handleLoser(username) {
  await updateUserScore(username, 1, 0, 1); // GamesPlayed +1, GamesLost +1
}

async function getUser(username){

  const options = {

    method: 'GET',
    mode:'cors',
    credentials :'include',
  };

  const response = await fetch(`/api/users/${username}`, options);
  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
  const update = await response.json();

  return update;
}

export default GameScene;
