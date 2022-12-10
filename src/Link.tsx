import React from 'react';
import ZigZagLine from './ZigZagLine';

const Link = (props: any) => {
    const [active, setActive] = React.useState<boolean>(false);

    return (
        <a
            target='_blank'
            rel='noreferrer'
            {...props}
            style={{ textDecoration: 'none', position: 'relative', ...(props.style ?? {}) }}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
        >
            {props.children}
            {/* <ZigZagLine
                active={active}
                style={{
                    position: 'absolute',
                    top: 16,
                    left: -74,
                    width: '200%',
                }}
            /> */}
        </a>
    );
};

export default Link;
