import React from 'react';
import './App.css';
import { ABOUT_ME, CATEGORIES, Project, TAGS, TAGS_TO_PROJECTS } from './data/projects';
import { SOCIALS } from './data/contact';
import { CloseButton, Nav, Navbar } from 'react-bootstrap';

const Line = (props: any) => (
    <div
        style={{
            background: 'black',
            width: '100%',
            marginBottom: 8,
            marginTop: 8,
            height: 1,
            ...(props.style ?? {}),
        }}
        {...props}
    />
);

const ZigZagLine = (props: any) => (
    <div
        style={{
            width: '100%',
            ...(props.style ?? {}),
        }}
        className={'zigzag-base' + (props.active ? ' zigzag' : '')}
        {...props}
    />
);

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

type CustomNavbarProps = {
    projects: Project[];
    setProjects: (projects: Project[]) => void;
};

function CustomNavbar(props: CustomNavbarProps) {
    const [tags, setTags] = React.useState<string[]>([]);
    const [show, setShow] = React.useState<boolean>(false);

    return (
        <Navbar id='nav' expand='sm' style={{ alignItems: 'start', padding: 0 }}>
            <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-sm`}
                style={{ margin: 24, marginBottom: 0, justifySelf: 'end' }}
                onClick={() => setShow(true)}
            />

            <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-sm`}
                aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
                placement='start'
                style={{ padding: 24, alignItems: 'end' }}
                show={show}
            >
                <CloseButton id='close-button' aria-label='Hide navigation menu' onClick={() => setShow(false)} />
                <Nav id='nav-body'>
                    <h1 style={{ marginBottom: 0 }}>Cherilyn Tan</h1>
                    <Line />
                    <h2
                        className={ABOUT_ME === props.projects[0] && props.projects.length === 1 ? 'primary' : ''}
                        style={{
                            marginBottom: 0,
                            cursor: 'pointer',
                            textAlign: 'left',

                            transition: '.2s color',
                        }}
                        onClick={() => {
                            props.setProjects([ABOUT_ME]);
                            setShow(false);
                        }}
                    >
                        About me
                    </h2>
                    <ol type='1' style={{ margin: 0 }}>
                        {CATEGORIES.map((c) => (
                            <h2 key={c.title} style={{ margin: 0 }}>
                                <li
                                    className={c.projects === props.projects ? 'primary' : ''}
                                    style={{
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        transition: '.2s color',
                                    }}
                                    onClick={() => {
                                        props.setProjects(c.projects);
                                        setShow(false);
                                    }}
                                >
                                    {c.title}
                                </li>
                            </h2>
                        ))}
                    </ol>
                    <Line />
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                        {SOCIALS.map(({ name, link }) => (
                            <h2 key={name} style={{ margin: 0 }}>
                                <Link href={link}>
                                    <li style={{ textAlign: 'left' }}>{name}</li>
                                </Link>
                            </h2>
                        ))}
                    </ul>
                    <Line />
                    <h4>Tags</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {TAGS.map((tag) => (
                            <a
                                key={tag}
                                className={'primary-button' + (tags.includes(tag) ? '-selected' : '')}
                                style={{
                                    fontSize: 16,
                                    marginBottom: 8,
                                    marginRight: 8,
                                }}
                                onClick={() => {
                                    const i = tags.indexOf(tag);
                                    const nextTags =
                                        i === -1 ? [...tags, tag] : tags.slice(0, i).concat(tags.slice(i + 1));
                                    const nextProjects = Array.from(
                                        new Set(nextTags.map((nextTag) => TAGS_TO_PROJECTS[nextTag]).flat())
                                    );

                                    setTags(nextTags);
                                    props.setProjects(nextProjects.length > 0 ? nextProjects : [ABOUT_ME]);
                                }}
                            >
                                {tag}
                            </a>
                        ))}
                    </div>
                </Nav>
            </Navbar.Offcanvas>
        </Navbar>
    );
}

export default CustomNavbar;
