import Phaser from 'phaser';
import Navigate from '../Router/Navigate';
import {
  getAuthenticatedUser,
  getAuthenticatedUser2,
  isAuthenticated,
  isAuthenticated2,
} from '../../utils/auths';

import homeIcon from '../../assets/home-icon.png';
import replayIcon from '../../assets/replay-icon.png'
import buttonSFX from '../../sounds/button-sfx.mp3';

class EndGameScene extends Phaser.Scene {
  constructor() {
    super('end-game-scene');
  }

  preload() {
    // icons
    this.load.image('home', homeIcon);
    this.load.image('restart', replayIcon);

    // sound effet
    this.load.audio('button', buttonSFX);
  }

  create() {
    // button sfx
    this.sfx = this.sound.add('button', {
        volume: 0.1,
    });

    this.add.rectangle(0, 0, 3000, 1000, 0x000, 0.7);

    const { centerX } = this.cameras.main;
    const { centerY } = this.cameras.main;
    const popupWidth = 350;
    const popupHeight = 250;

    const popupBackground = this.add.graphics();
    popupBackground.fillStyle(0xe1dbf7);
    popupBackground.fillRoundedRect(
      centerX - popupWidth / 2,
      centerY - popupHeight / 2,
      popupWidth,
      popupHeight,
    );

    const popupTextStyle = {
      fontFamily: 'Bauhaus',
      fontSize: '50px',
      fill: '#341f8b',
      resolution: 2,
    };

    const user1 = getAuthenticatedUser()?.user;
    const user2 = getAuthenticatedUser2()?.user;
    const loser = this.sys.game.global.loser === 'player1'  ? user1?.username : user2?.username;
    let winner;
    if (this.sys.game.global.winner === 'player1') {
        winner = user1?.username;

        if (!winner) winner = 'PLAYER 1';
    } else {
        winner = user2?.username;

        if (!winner) winner = 'PLAYER 2';
    }

    if (isAuthenticated() && isAuthenticated2()) {
        handleWinner(winner);
        handleLoser(loser);
    } else if (isAuthenticated()) {
        if (this.sys.game.global.winner === 'player1') handleWinner(winner);
        else handleLoser(loser);
    }
    
    const endGameText = this.add.text(centerX, centerY - 50, `${winner} WON`, popupTextStyle);
    endGameText.setOrigin(0.5);

    // home button
    const homeButton = this.add.image(centerX + 70, centerY + 40, 'home').setScale(0.2);
    homeButton.setOrigin(0.5);
    homeButton.setInteractive();
    homeButton.input.useHandCursor = true;

    homeButton.on('pointerover', () => {
        homeButton.setScale(0.25);
    });
    homeButton.on('pointerout', () => {
        homeButton.setScale(0.2);
    });
    homeButton.on('pointerdown', () => {
        this.sound.stopAll();
        this.scene.stop('end-game-scene');
        this.scene.stop('game-scene');
        this.sfx.play(); // sound effect
        Navigate('/');
    });

    // Play again button
    const restartButton = this.add.image(centerX - 70, centerY + 40, 'restart').setScale(0.2);
    restartButton.setOrigin(0.5);
    restartButton.setInteractive();
    restartButton.input.useHandCursor = true;

    restartButton.on('pointerover', () => {
        restartButton.setScale(0.25);
    });
    restartButton.on('pointerout', () => {
        restartButton.setScale(0.2);
    });
    restartButton.on('pointerdown', () => {
        this.sound.stopAll();
        this.scene.stop('end-game-scene');
        this.sfx.play(); // sound effect
        this.scene.start('game-scene');
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
  await updateUserScore(username, 1, 1); // gamesPlayed +1, gamesWon +1
}

async function handleLoser(username) {
  await updateUserScore(username, 1, 0, 1); // gamesPlayed +1, gamesLost +1
}

async function getUser(username) {
  const options = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  };

  const response = await fetch(`/api/users/${username}`, options);
  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
  const update = await response.json();

  return update;
}

export default EndGameScene;
