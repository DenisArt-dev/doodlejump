import Platform from './class_platform';
import { gameData } from '../data/data';

export default class GameFild {

    public marginTop: number = 0;
    public newMarginTop: number = 0;
    public isAnimation: boolean = false;
    public platforms = [ new Platform(0, 'static', gameData.platformMaxW, (gameData.fildWith - gameData.platformMaxW) / 2) ];

    constructor() {
        for(let i = 0; i < 3; i++) {
            this.platforms.push(new Platform(i + 1));
        }
    }

    public remove() {
        this.platforms = [];
    }

    public nextStep (newPlatform: any) {
        this.platforms.push(newPlatform);
    }

}