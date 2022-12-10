import React from 'react';
import anime from 'animejs';
import zigzag from './assets/svg/zigzag.svg';

type ZigZagLineProps = { active: boolean; style?: {} };

const ZigZagLine = (props: ZigZagLineProps) => {
    const { active, style, ...divProps } = props;

    const animate = () => {
        anime({
            targets: '.st0, .st1',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'cubicBezier(.5, .05, .1, .3)',
            duration: 1000,
            delay: function (el, i) {
                return i * 250;
            },
        });
    };

    React.useEffect(() => {
        if (active) animate();
    }, [active]);

    return (
        <img
            src={zigzag}
            height='100%'
            width='100%'
            style={{
                ...(style ?? {}),
            }}
        />
    );
};

export default ZigZagLine;
