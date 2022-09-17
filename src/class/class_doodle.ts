import { Direction } from '../interface';
import { gameData } from '../data/data';


export default class Doodle {

    public positionX: number = (gameData.fildWith - gameData.doodleSize.with) / 2;
    public positionY: number = gameData.platform.height - 2;
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

    public remove() {

    }

    public resize() {
        this.positionX = (gameData.fildWith - gameData.doodleSize.with) / 2; 
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