export type Direction = 'left' | 'right';
export type PlatformType = 'standart' | 'static' | 'unsteady';

export interface IDoodle {

    
    with: number
    height: number
    positionX: number
    positionY: number
    animationSpead: number

    isMove: {
        left: boolean
        right: boolean
    }

    isJupm: {
        up: boolean
        down: boolean
    }

    platform: number | null
    direction: Direction
    heightJump: number
    positionOnPlatform: number
    positionDown: number
    lastPlatform: number | null
    life: number

    resize: Function
    jump: Function
    move: Function

}

export interface ILife {

    positionX: number
    width: number
    height: number

}

export interface IPlatform {
    
    height: number 
    width: number 
    step: number 
    spead: number 
    type: PlatformType 
    duration: Direction 
    isLife: ILife | null
    marginLeft: number 
    marginLeftMax: number 
    marginTop: number
    positionY: number 
    opacity: number 

    resize: Function

}

export interface IGameFild {

    width: number
    height: number
    marginTop: number
    newMarginTop: number
    isAnimation: boolean
    platforms: IPlatform[]

    remove: Function
    nextStep: Function

}