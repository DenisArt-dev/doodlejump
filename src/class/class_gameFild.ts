import Platform from './class_platform';

export default class GameFild {

    public static staticWith: number = 810;
    public static staticHeight: number = 508;
    public width: number = GameFild.staticWith;
    public height: number = GameFild.staticHeight;

    public marginTop: number = 0;
    public newMarginTop: number = 0;
    public isAnimation: boolean = false;
    public platforms = [ new Platform(0, 'static', Platform.staticMaxWidht, (GameFild.staticWith - Platform.staticMaxWidht) / 2) ];

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