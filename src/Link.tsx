import React from 'react';
import ZigZagLine from './ZigZagLine';

const Link = (props: any) => {
    const [active, setActive] = React.useState<boolean>(false);

    return (
        <a
            target='_blank'
            {...props}
            style={{ textDecoration: 'none', ...(props.style ?? {}) }}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
        >
            {props.children}
            <ZigZagLine
                active={active}
                style={{
                    top: -14,
                }}
            />
        </a>
    );
};

export default Link;
