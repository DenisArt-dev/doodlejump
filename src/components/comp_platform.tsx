import { gameData } from "../data/data";

export default function CompPlatform(params: any) {

    if (params.platformParams.marginMax === 0) {
        params.platformParams.marginMax = params.gameWidth - params.platformParams.width;
    }

    if (params.platformParams.type === 'unsteady' && params.currentPlatform === params.platformParams.step) {
        params.platformParams.opacity -= 0.003;
    }

    if (params.platformParams.type !== 'static') {

        if (params.platformParams.duration === 'right') {
            params.platformParams.marginLeft = params.platformParams.marginLeft + params.platformParams.spead;
            if (params.platformParams.marginLeft > params.platformParams.marginMax) {
                params.platformParams.marginLeft = params.platformParams.marginMax;
                params.platformParams.duration = 'left';
            }
        } else {
            params.platformParams.marginLeft = params.platformParams.marginLeft - params.platformParams.spead;
            if (params.platformParams.marginLeft < 0) {
                params.platformParams.marginLeft = 0;
                params.platformParams.duration = 'right';
            }
        }

    }

    return (
  
        <div className={['platform', params.platformParams.type === 'unsteady' ? 'platf_unsteady' : 'platf_standart'].join(' ')} style={{
            width: params.platformParams.width + 'px',
            marginLeft: params.platformParams.marginLeft + 'px',
            height: gameData.platform.height,
            marginTop: gameData.platform.margin + 'px',
            opacity: params.platformParams.opacity,
        }}></div>
        
    );
  
};