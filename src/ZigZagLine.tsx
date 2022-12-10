import React from 'react';

type ZigZagLineProps = { active: boolean; style?: {} };

const ZigZagLine = (props: ZigZagLineProps) => {
    const { active, style, ...divProps } = props;
    return (
        <div
            style={{
                width: '100%',
                ...(style ?? {}),
            }}
            className={'zigzag-base' + (active ? ' zigzag' : '')}
            {...divProps}
        />
    );
};

export default ZigZagLine;
