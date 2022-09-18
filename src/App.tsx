import React, {useState, useEffect} from 'react';
import CompPlatform from './components/comp_platform';
import Platform from './class/class_platform';
import { gameData } from './data/data';
import Doodle from './class/class_doodle';
import GameFild from './class/class_gameFild';

const doodle = new Doodle();
const gameFild = new GameFild();
let isGameOver = false;

document.onkeydown = (event) => {
  if (event.key === 'ArrowUp') doodle.jump();
  if (event.key === 'ArrowRight') doodle.move('right');
  if (event.key === 'ArrowLeft') doodle.move('left');
}

document.onkeyup = (event) => {
  if (event.key === 'ArrowRight') doodle.isMove.right = false;
  if (event.key === 'ArrowLeft') doodle.isMove.left = false;
}

window.onresize = resizeHandl;

function resizeHandl() {

  if (window.innerWidth < gameData.fildWith + 30) gameData.fildWith = window.innerWidth - 30;

  doodle.resize();

  for (let i = 0; i < gameFild.platforms.length; i++) {
    gameFild.platforms[i].resize();
  }

}

function gameOver() {

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

        doodle.positionOnPlatform = gameFild.platforms[doodle.lastPlatform].width / 2 - gameData.doodleSize.with / 2;
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

function buttonsHandl(event: any) {

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

  const [statistic, setStatistic] = useState(0);

  if (doodle.platform !== null && doodle.isJupm.up || doodle.isJupm.down) {

    if (doodle.platform !== null && gameFild.platforms[doodle.platform].type !== 'static') {
      if (gameFild.platforms[doodle.platform].duration === 'left') doodle.positionOnPlatform += gameFild.platforms[doodle.platform].spead;
      else doodle.positionOnPlatform -= gameFild.platforms[doodle.platform].spead;
    }

    if (doodle.isJupm.up) {
      doodle.positionY += gameData.animationSpead;
      if (doodle.positionY + gameFild.marginTop > gameFild.marginTop + doodle.positionDown + gameData.doodleHeightJump) {
        doodle.positionY = gameFild.marginTop + doodle.positionDown + gameData.doodleHeightJump;
        doodle.isJupm.up = false;
        doodle.isJupm.down = true;
      }
    }
    if (doodle.isJupm.down) {
      doodle.positionY -= gameData.animationSpead;

        if (doodle.platform !== null) {

          if (doodle.positionY < gameFild.platforms[doodle.platform + 1].positionY &&
              doodle.positionY > gameFild.platforms[doodle.platform + 1].positionY - gameData.animationSpead * 2 &&
              doodle.positionX + gameData.doodleSize.with / 2 > gameFild.platforms[doodle.platform + 1].marginLeft && 
              doodle.positionX - gameData.doodleSize.with / 2 < gameFild.platforms[doodle.platform + 1].marginLeft + gameFild.platforms[doodle.platform + 1].width) {

              doodle.platform = gameFild.platforms[doodle.platform + 1].step;
              doodle.positionOnPlatform = doodle.positionX - gameFild.platforms[doodle.platform].marginLeft;
              doodle.isJupm.down = false;
              gameFild.nextStep( new Platform(gameFild.platforms[gameFild.platforms.length - 1].step + 1) );
              gameFild.newMarginTop = gameFild.marginTop;
              gameFild.marginTop += -(gameData.platform.margin + gameData.platform.height);
              gameFild.isAnimation = true;
              setStatistic(statistic + 1);

          } else if (doodle.positionY < gameFild.platforms[doodle.platform].positionY) {
            doodle.isJupm.down = false;
          }
          
        }

    }
  }

  if (doodle.platform === null && doodle.positionY > -100) doodle.positionY -= gameData.animationSpead;
  
  if (doodle.platform !== null && doodle.isMove.left) {
    if (doodle.direction !== 'left') doodle.direction = 'left';
    doodle.positionX -= gameData.animationSpead;
    doodle.positionOnPlatform -= gameData.animationSpead;
    if (doodle.positionX < 0) {
      doodle.positionX = 0;
      doodle.positionOnPlatform = 0;
    }
  }

  if (doodle.platform !== null && doodle.isMove.right) {
    if (doodle.direction !== 'right') doodle.direction = 'right';
    doodle.positionX += gameData.animationSpead;
    doodle.positionOnPlatform += gameData.animationSpead;
    if (doodle.positionX > gameData.fildWith - gameData.doodleSize.with) {
      doodle.positionX = gameData.fildWith - gameData.doodleSize.with;
      doodle.positionOnPlatform = gameData.fildWith - gameData.doodleSize.with;
    }

  }

  if (doodle.platform !== null && !doodle.isJupm.up && !doodle.isJupm.down) {
    if (doodle.positionX + gameData.doodleSize.with - 10 < gameFild.platforms[doodle.platform].marginLeft || 
      doodle.positionX + 10 > gameFild.platforms[doodle.platform].marginLeft + gameFild.platforms[doodle.platform].width) {
        gameOver();
    }
  }

  if (
      doodle.platform !== null &&
      gameFild.platforms[doodle.platform].type !== 'static' &&
      !doodle.isMove.left &&
      !doodle.isMove.right &&
      !doodle.isJupm.up &&
      !doodle.isJupm.down
    ) {
      doodle.positionX = gameFild.platforms[doodle.platform].marginLeft + doodle.positionOnPlatform;
  }

  if (doodle.platform !== null && gameFild.isAnimation) {
    gameFild.marginTop += gameData.animationSpead;
    if ( gameFild.marginTop >= gameFild.newMarginTop ) {
      gameFild.marginTop = gameFild.newMarginTop;
      gameFild.isAnimation = false;
    }
  }

  if (doodle.platform && gameFild.platforms[doodle.platform].opacity <= 0) {
    gameOver();
  }

  return (

    <div className='container' style={ {maxWidth: gameData.fildWith, height: gameData.fildHeight} }>
      <div className='gameWrapp'>
        <div className="gameHeader">
          <div className='title_life'>
            <h2>Doodle Jump</h2> 
            {doodle && <div className='doodleLife'>{ new Array(doodle.life).fill(null).map( (item, i) => {
              return <svg key={i} version="1.1" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 32 32"> <path d="M23 2c-2.404 0-4.331 0.863-6.030 2.563-0.001 0.001-0.002 0.002-0.003 0.003h-0.001l-0.966 1.217-0.966-1.143c-0.001-0.001-0.002-0.002-0.003-0.003h-0.001c-1.7-1.701-3.626-2.637-6.030-2.637s-4.664 0.936-6.364 2.636c-1.699 1.7-2.636 3.96-2.636 6.364 0 2.402 0.935 4.662 2.633 6.361l11.947 12.047c0.375 0.379 0.887 0.592 1.42 0.592s1.045-0.213 1.42-0.592l11.946-12.047c1.698-1.699 2.634-3.958 2.634-6.361s-0.937-4.664-2.636-6.364c-1.7-1.7-3.96-2.636-6.364-2.636v0z"></path></svg>
              } )}
              </div>
            }</div>
          <p>Statistic: {statistic}</p>
        </div>
        <div className={ isGameOver ? 'gameOver' : 'gameRun' } id='game' style={ {maxWidth: gameData.fildWith, height: gameData.fildHeight} }>

          <div className='gameContent' style={ {marginTop: gameFild.marginTop + 'px'} }>
            {!isGameOver && <div className={['doodle', 'doodle_' + doodle.direction].join(' ')} style={ {
              left: doodle.positionX + 'px',
              bottom: doodle.positionY + 'px',
              height: gameData.doodleSize.height,
              width: gameData.doodleSize.with,
              } } ></div>}
            {gameFild.platforms.map( (item) => {return <CompPlatform currentPlatform={doodle.platform} gameWidth={gameData.fildWith} platformParams={item} key={item.step}/>} )}
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
