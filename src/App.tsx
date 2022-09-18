import React, { useEffect } from 'react';
import CompPlatform from './components/comp_platform';
import Platform from './class/class_platform';
import Doodle from './class/class_doodle';
import GameFild from './class/class_gameFild';

import { IDoodle } from './interface';
import { IGameFild } from './interface';

const doodle: IDoodle = new Doodle();
const gameFild: IGameFild = new GameFild();

let isGameOver: boolean = false;
let record = (!localStorage.getItem('record')) ? 0 : localStorage.getItem('record');
let statistic: number = 0;

document.onkeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') doodle.jump();
  if (event.key === 'ArrowRight') doodle.move('right');
  if (event.key === 'ArrowLeft') doodle.move('left');
}

document.onkeyup = (event: KeyboardEvent) => {
  if (event.key === 'ArrowRight') doodle.isMove.right = false;
  if (event.key === 'ArrowLeft') doodle.isMove.left = false;
}

window.onresize = resizeHandl;

function resizeHandl(): void {

  if (window.innerWidth < gameFild.width + 30) gameFild.width = window.innerWidth - 30;

  doodle.resize();

  for (let i = 0; i < gameFild.platforms.length; i++) {
    gameFild.platforms[i].resize();
  }

}

function gameOver(): void {

  doodle.life--;

  doodle.lastPlatform = doodle.platform;
  doodle.isJupm.up = false;
  doodle.isJupm.down = false;
  doodle.isMove.right = false;
  doodle.isMove.left = false;
  doodle.platform = null;

  setTimeout( () => {

    if (doodle.life >= 1) {

      if (doodle.lastPlatform !== null) {

        if (gameFild.platforms[doodle.lastPlatform].opacity <= 0) {
          doodle.lastPlatform++;
          gameFild.nextStep( new Platform(gameFild.platforms[gameFild.platforms.length - 1].step + 1) );
        }

        doodle.positionOnPlatform = gameFild.platforms[doodle.lastPlatform].width / 2 - doodle.with / 2;
        doodle.positionX = gameFild.platforms[doodle.lastPlatform].marginLeft + doodle.positionOnPlatform;
        doodle.positionY = gameFild.platforms[doodle.lastPlatform].positionY;

        doodle.platform = doodle.lastPlatform;

      }

    } else {
      isGameOver = true;
      gameFild.remove();
    }

  }, 1000);

}

function isDoodleOnPlatform(): any {

  if (doodle.platform === null) return;

  let rightSidePlatform = gameFild.platforms[doodle.platform + 1].marginLeft + gameFild.platforms[doodle.platform + 1].width;

  if (doodle.positionY < gameFild.platforms[doodle.platform + 1].positionY &&
      doodle.positionY > gameFild.platforms[doodle.platform + 1].positionY - doodle.animationSpead * 2 &&
      doodle.positionX + doodle.with / 2 > gameFild.platforms[doodle.platform + 1].marginLeft && 
      doodle.positionX - doodle.with / 2 < rightSidePlatform
     ) return true;
  else return false;

}

function doodleGoUp(): void {

  if (doodle.platform === null) return;

  doodle.platform = gameFild.platforms[doodle.platform + 1].step;
  doodle.positionOnPlatform = doodle.positionX - gameFild.platforms[doodle.platform].marginLeft;
  doodle.isJupm.down = false;
  gameFild.nextStep( new Platform(gameFild.platforms[gameFild.platforms.length - 1].step + 1) );
  gameFild.newMarginTop = gameFild.marginTop;
  gameFild.marginTop += -(Platform.staticMarginTop + Platform.staticHeight);
  gameFild.isAnimation = true;
  statistic++;

  if (record && doodle.platform > record) {
    localStorage.setItem('record', doodle.platform + '');
    record = doodle.platform;
  }

}

function doodleJump(): void {

  if (doodle.platform === null) return;

  if (gameFild.platforms[doodle.platform].type !== 'static') {

    if (gameFild.platforms[doodle.platform].duration === 'left') doodle.positionOnPlatform += gameFild.platforms[doodle.platform].spead;
    else doodle.positionOnPlatform -= gameFild.platforms[doodle.platform].spead;

  }

  if (doodle.isJupm.up) {

    doodle.positionY += doodle.animationSpead;

    if (doodle.positionY + gameFild.marginTop > gameFild.marginTop + doodle.positionDown + doodle.heightJump) {
      doodle.positionY = gameFild.marginTop + doodle.positionDown + doodle.heightJump;
      doodle.isJupm.up = false;
      doodle.isJupm.down = true;
    }
    
  }

  if (doodle.isJupm.down) {

    doodle.positionY -= doodle.animationSpead;

    if ( isDoodleOnPlatform() ) {

      doodleGoUp();

    } else if (doodle.positionY < gameFild.platforms[doodle.platform].positionY) {
      doodle.isJupm.down = false;
    }

  }

}

function doodleMove(): void {

  if (doodle.isMove.left) {

    if (doodle.direction !== 'left') doodle.direction = 'left';

    doodle.positionX -= doodle.animationSpead;
    doodle.positionOnPlatform -= doodle.animationSpead;

    if (doodle.positionX < 0) {
      doodle.positionX = 0;
      doodle.positionOnPlatform = 0;
    }

  }

  if (doodle.isMove.right) {

    if (doodle.direction !== 'right') doodle.direction = 'right';

    doodle.positionX += doodle.animationSpead;
    doodle.positionOnPlatform += doodle.animationSpead;
    
    if (doodle.positionX > gameFild.width - doodle.with) {
      doodle.positionX = gameFild.width - doodle.with;
      doodle.positionOnPlatform = gameFild.width - doodle.with;
    }

  }

}

function isTakeLife(): void {

  if (doodle.platform === null) return;

  let life = gameFild.platforms[doodle.platform].isLife;
  if (life === null) return;
  let lifeLeftSide = life.positionX + gameFild.platforms[doodle.platform].marginLeft;
  let lifeRightSide = life.positionX + gameFild.platforms[doodle.platform].marginLeft + life.width;

  if (
    doodle.positionX + doodle.with > lifeLeftSide &&
    doodle.positionX < lifeRightSide
  ) {
    gameFild.platforms[doodle.platform].isLife = null;
    doodle.life++;
  }

}

function buttonsHandl(event: any): void {

  event.preventDefault();

  let target = event.target;

  if (event.target.nodeName === 'P') target = target.parentElement;

  let sw = false;

  if (event.type === 'pointerup' ) sw = true;

  if (target.dataset.type === 'up') {
    doodle.jump();
  } else if (target.dataset.type === 'right') {
    if (sw) doodle.isMove.right = false;
    else doodle.move('right');
  } else if (target.dataset.type === 'left') {
    if (sw) doodle.isMove.left = false;
    else doodle.move('left');
  }

}

function App() {

  useEffect( () => {
    resizeHandl();
  }, [] );

  if (doodle.platform !== null) {

    isTakeLife();

    if (doodle.isJupm.up || doodle.isJupm.down) {
      doodleJump();
    }

    if (doodle.isMove.left || doodle.isMove.right) {
      doodleMove();
    }
  
    if (
        gameFild.platforms[doodle.platform].type !== 'static' &&
        !doodle.isMove.left &&
        !doodle.isMove.right &&
        !doodle.isJupm.up &&
        !doodle.isJupm.down
    ) doodle.positionX = gameFild.platforms[doodle.platform].marginLeft + doodle.positionOnPlatform;
  
    if (gameFild.isAnimation) {

      gameFild.marginTop += doodle.animationSpead;

      if ( gameFild.marginTop >= gameFild.newMarginTop ) {
        gameFild.marginTop = gameFild.newMarginTop;
        gameFild.isAnimation = false;
      }

    }

    if (gameFild.platforms[doodle.platform].opacity <= 0) {
      gameOver();
    } else if (!doodle.isJupm.up && !doodle.isJupm.down) {

      if (doodle.positionX + doodle.with - 10 < gameFild.platforms[doodle.platform].marginLeft || 
        doodle.positionX + 10 > gameFild.platforms[doodle.platform].marginLeft + gameFild.platforms[doodle.platform].width) {
          gameOver();
        }

    }

  } else if (doodle.positionY > -100) {
    doodle.positionY -= doodle.animationSpead;
  }

  return (

    <div className='container' style={ {maxWidth: gameFild.width, height: gameFild.height} }>
      <div className='gameWrapp'>
        <div className="gameHeader">
          <div className='title_life'>
            <h2>Doodle Jump</h2> 
            {doodle && <div className='doodleLife'>{ new Array(doodle.life).fill(null).map( (item, i) => {
              return <svg key={i} version="1.1" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 32 32"> <path d="M23 2c-2.404 0-4.331 0.863-6.030 2.563-0.001 0.001-0.002 0.002-0.003 0.003h-0.001l-0.966 1.217-0.966-1.143c-0.001-0.001-0.002-0.002-0.003-0.003h-0.001c-1.7-1.701-3.626-2.637-6.030-2.637s-4.664 0.936-6.364 2.636c-1.699 1.7-2.636 3.96-2.636 6.364 0 2.402 0.935 4.662 2.633 6.361l11.947 12.047c0.375 0.379 0.887 0.592 1.42 0.592s1.045-0.213 1.42-0.592l11.946-12.047c1.698-1.699 2.634-3.958 2.634-6.361s-0.937-4.664-2.636-6.364c-1.7-1.7-3.96-2.636-6.364-2.636v0z"></path></svg>
              } )}
              </div>
            }</div>
            <div>
              <p>Statistic: {statistic}</p>
              <p>Best result: {record}</p>
            </div>

        </div>
        <div className={ isGameOver ? 'gameOver' : 'gameRun' } id='game' style={ {maxWidth: gameFild.width, height: gameFild.height} }>

          <div className='gameContent' style={ {marginTop: gameFild.marginTop + 'px'} }>
            {!isGameOver && <div className={['doodle', 'doodle_' + doodle.direction].join(' ')} style={ {
              left: doodle.positionX + 'px',
              bottom: doodle.positionY + 'px',
              height: doodle.height,
              width: doodle.with,
              } } ></div>}
            {gameFild.platforms.map( (item) => {return <CompPlatform currentPlatform={doodle.platform} gameWidth={gameFild.width} platformParams={item} key={item.step}/>} )}
          </div>

        </div>

        <div onPointerDown={buttonsHandl} onPointerUp={buttonsHandl} className='gameNav'>
          <button data-type="left"><p>{'\u2190'}</p></button>
          <button data-type="up"><p>{'\u2191'}</p></button>
          <button data-type="right"><p>{'\u2192'}</p></button>
        </div>

      </div>
    </div>

  );

}

export default App;
