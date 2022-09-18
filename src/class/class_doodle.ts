import { Direction } from '../interface';
import GameFild from './class_gameFild';
import Platform from './class_platform';


export default class Doodle {

    public with: number = 70;
    public height: number = 70;
    public positionX: number = (GameFild.staticWith - this.with) / 2;
    public positionY: number = Platform.staticHeight - 2;
    public animationSpead: number = 4;
    public isMove = {
        left: false,
        right: false
    }
    public isJupm = {
        up: false,
        down: false,
    }
    public platform: number | null = 0;
    public direction: Direction = 'left';
    public heightJump: number = 150;
    public positionOnPlatform: number = 0;
    public positionDown: number = this.positionY;
    public lastPlatform: number | null = null;
    public life: number = 3;

    public resize() {
        this.positionX = (GameFild.staticWith - this.with) / 2; 
    }

    public jump() {

        if (this.isJupm.up || this.isJupm.down) return;

        this.isJupm.up = true;
        this.positionDown = this.positionY;
    }

    public move(direction: Direction) {

        if (direction === 'right') {

            this.isMove.right = true;
        }

        if (direction === 'left') {

            this.isMove.left = true;
        }

    }

}