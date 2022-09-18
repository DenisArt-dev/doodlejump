
export default function CompPlatform(params: any) {

    if (params.platformParams.marginLeftMax === 0) {
        params.platformParams.marginLeftMax = params.gameWidth - params.platformParams.width;
    }

    if (params.platformParams.type === 'unsteady' && params.currentPlatform === params.platformParams.step) {
        params.platformParams.opacity -= 0.003;
    }

    if (params.platformParams.type !== 'static') {

        if (params.platformParams.duration === 'right') {
            params.platformParams.marginLeft = params.platformParams.marginLeft + params.platformParams.spead;
            if (params.platformParams.marginLeft > params.platformParams.marginLeftMax) {
                params.platformParams.marginLeft = params.platformParams.marginLeftMax;
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
            height: params.platformParams.height,
            marginTop: params.platformParams.marginTop + 'px',
            opacity: params.platformParams.opacity,
        }}> { params.platformParams.isLife && <svg style={ {
                position: 'relative',
                top: -(params.platformParams.height + 6) + 'px',
                left: params.platformParams.isLife.positionX + 'px',
                display: params.platformParams.isLife.isVisible ? 'block' : 'none'
            } } version="1.1" xmlns="http://www.w3.org/2000/svg" width={params.platformParams.isLife.width} height={params.platformParams.isLife.height} viewBox="0 0 32 32"> <path d="M23 2c-2.404 0-4.331 0.863-6.030 2.563-0.001 0.001-0.002 0.002-0.003 0.003h-0.001l-0.966 1.217-0.966-1.143c-0.001-0.001-0.002-0.002-0.003-0.003h-0.001c-1.7-1.701-3.626-2.637-6.030-2.637s-4.664 0.936-6.364 2.636c-1.699 1.7-2.636 3.96-2.636 6.364 0 2.402 0.935 4.662 2.633 6.361l11.947 12.047c0.375 0.379 0.887 0.592 1.42 0.592s1.045-0.213 1.42-0.592l11.946-12.047c1.698-1.699 2.634-3.958 2.634-6.361s-0.937-4.664-2.636-6.364c-1.7-1.7-3.96-2.636-6.364-2.636v0z"></path></svg> }
        </div>
        
    );
  
};