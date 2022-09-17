export type Direction = 'left' | 'right';
export type PlatformType = 'standart' | 'static' | 'unsteady';

export interface IDoodle {
    positionX: number
    direction: Direction
}