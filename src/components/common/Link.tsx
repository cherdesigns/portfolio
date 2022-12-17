import React from 'react';

const Link = (props: any) => {
    const [active, setActive] = React.useState<boolean>(false);

    return (
        <a
            target='_blank'
            rel='noreferrer'
            {...props}
            style={{ textDecoration: active ? 'solid' : 'none', position: 'relative', ...(props.style ?? {}) }}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
        >
            {props.children}
        </a>
    );
};

export default Link;
