import { PlatformType, Direction, ILife } from '../interface';
import GameFild from './class_gameFild';
import Life from './class_life';

export default class Platform {

    public static staticHeight: number = 22;
    public static staticMarginTop: number = 100;
    public static staticMinWidht: number = 50;
    public static staticMaxWidht: number = 200;

    public height: number = Platform.staticHeight;
    public width: number = GameFild.getRandomMinMax(Platform.staticMinWidht, Platform.staticMaxWidht);
    public step: number = 0;
    public spead: number = GameFild.getRandomMinMax(1, 3);
    public type: PlatformType = (GameFild.getRandomMinMax(1, 10) < 7) ? 'standart' : 'unsteady';
    public duration: Direction = (GameFild.getRandomMinMax(1, 2) === 2) ? 'left' : 'right';
    public isLife: ILife | null = null;
    public marginLeft: number = 0;
    public marginLeftMax: number = 0;
    public marginTop: number = Platform.staticMarginTop;
    public positionY: number = 0;
    public opacity: number = 1;

    constructor(step: number, type?: PlatformType, width?: number, marginLeft?: number) {

        if (type) this.type = type;
        if (width) this.width = width;

        if (marginLeft) this.marginLeft = marginLeft;
        else this.marginLeft = GameFild.getRandomMinMax(0, this.marginLeftMax);

        this.step = step;
        this.marginLeftMax = GameFild.staticWith - this.width;
        this.positionY = ((this.marginTop + Platform.staticHeight) * this.step) + Platform.staticHeight;

        if (this.step !== 0) this.isLife = (GameFild.getRandomMinMax(1, 100) < 90) ? null : new Life(this.width);

    }

    public resize() {
        this.marginLeftMax = GameFild.staticWith - this.width;
        if (this.width + 50 >= GameFild.staticWith) this.width = Platform.staticMinWidht;
        if (this.type === 'static') {
            this.marginLeft = (GameFild.staticWith - this.width) / 2;
        }
    }

}