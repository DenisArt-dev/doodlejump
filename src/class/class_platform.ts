import { PlatformType, Direction } from "../interface";
import { gameData } from "../data/data";

export default class Platform {

    public step: number = 0;
    public spead: number = this.getRandomMinMax(1, 3);
    public width: number = this.getRandomMinMax(gameData.platformMinW, gameData.platformMaxW);
    public type: PlatformType = (this.getRandomMinMax(1, 10) < 7) ? 'standart' : 'unsteady';
    public duration: Direction = (this.getRandomMinMax(1, 2) === 2) ? 'left' : 'right';
    public marginLeft: number = 0;
    public marginMax: number = 0;
    public positionY: number = 0;
    public opacity: number = 1;

    constructor(step: number, type?: PlatformType, width?: number, marginLeft?: number) {

        if (type) this.type = type;
        if (width) this.width = width;

        if (marginLeft) this.marginLeft = marginLeft;
        else this.marginLeft = this.getRandomMinMax(0, this.marginMax);

        this.step = step;
        this.marginMax = gameData.fildWith - this.width;
        this.positionY = ((gameData.platform.margin + gameData.platform.height) * this.step) + gameData.platform.height;

    }

    public resize() {
        this.marginMax = gameData.fildWith - this.width;
        if (this.width + 50 >= gameData.fildWith) this.width = gameData.platformMinW;
        if (this.type === 'static') {
            this.marginLeft = (gameData.fildWith - this.width) / 2;
        }
    }

    private getRandomMinMax(min: number, max: number, afterPoint?: number) {
        if (!afterPoint) afterPoint = 0;
        return +(min + Math.random() * (max - min)).toFixed(afterPoint);
    }

}