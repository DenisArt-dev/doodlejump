export default class Life {

    public positionX: number = 0;
    public isVisible: boolean = true;
    public width: number = 30;
    public height: number = 30;

    constructor (platformWidth: number) {
        this.positionX = this.getRandomMinMax(0, platformWidth - 30); 
    }

    private getRandomMinMax(min: number, max: number, afterPoint?: number) {
        if (!afterPoint) afterPoint = 0;
        return +(min + Math.random() * (max - min)).toFixed(afterPoint);
    }

}