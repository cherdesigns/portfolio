import React from 'react';
import './App.css';
import Carousel from 'react-bootstrap/Carousel';
import { ABOUT_ME, CATEGORIES, Project, TAGS, TAGS_TO_PROJECTS } from './data/projects';
import { SOCIALS } from './data/contact';
import { Nav, Navbar } from 'react-bootstrap';

const Line = (props: any) => (
    <div
        style={{
            background: 'black',
            height: 1,
            width: '100%',
            marginBottom: 8,
            marginTop: 8,
            ...(props.style ?? {}),
        }}
    />
);

const Link = (props: any) => <a target='_blank' {...props} />;

function App() {
    const [tags, setTags] = React.useState<string[]>([]);
    const [projects, setProjects] = React.useState<Project[]>([ABOUT_ME]);
    const [show, setShow] = React.useState<boolean>(false);

    return (
        <div className='App' style={{ display: 'flex', height: '100vh' }}>
            <Navbar expand='sm' style={{ alignItems: 'start', padding: 0, flex: 1 }}>
                <Navbar.Toggle
                    aria-controls={`offcanvasNavbar-expand-sm`}
                    style={{ margin: 24, marginBottom: 0, justifySelf: 'end' }}
                    onClick={() => {
                        setShow(true);
                    }}
                />

                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-sm`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
                    placement='start'
                    style={{ padding: 24 }}
                    show={show}
                >
                    <Nav id='nav-body'>
                        <h1 style={{ marginBottom: 0 }}>Cherilyn Tan</h1>
                        <Line />
                        <h2
                            className={ABOUT_ME === projects[0] ? 'primary' : ''}
                            style={{
                                marginBottom: 0,
                                cursor: 'pointer',
                                textAlign: 'left',

                                transition: '.2s color',
                            }}
                            onClick={() => {
                                setProjects([ABOUT_ME]);
                                setShow(false);
                            }}
                        >
                            About me
                        </h2>
                        <ol type='1' style={{ margin: 0 }}>
                            {CATEGORIES.map((c) => (
                                <h2 key={c.title} style={{ margin: 0 }}>
                                    <li
                                        className={c.projects === projects ? 'primary' : ''}
                                        style={{
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            transition: '.2s color',
                                        }}
                                        onClick={() => {
                                            setProjects(c.projects);
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

                                        setTags(nextTags);
                                        setProjects(
                                            Array.from(
                                                new Set(nextTags.map((nextTag) => TAGS_TO_PROJECTS[nextTag]).flat())
                                            )
                                        );
                                    }}
                                >
                                    {tag}
                                </a>
                            ))}
                        </div>
                        {/* <Line />
                        <h2 style={{ margin: 0 }}>
                            <Link href={EMAIL_LINK}>{EMAIL}</Link>
                        </h2> */}
                    </Nav>
                </Navbar.Offcanvas>
            </Navbar>
            <div
                id='content'
                style={{
                    display: 'flex',
                    flexFlow: 'column',
                    flex: 2,
                    padding: 24,
                    height: '100%',
                    overflow: 'scroll',
                    boxSizing: 'border-box',
                }}
            >
                {projects.map(({ title, images, description, link }) => (
                    <div
                        id={`project-${title}`}
                        key={title}
                        style={{ display: 'flex', flexFlow: 'column', flex: 1, alignItems: 'start' }}
                    >
                        <h1 style={{ marginBottom: 0 }}>{title}</h1>
                        <Line />
                        {images.length > 0 && (
                            <Carousel style={{ width: '100%' }} variant='dark'>
                                {images.map(({ src, alt }) => (
                                    <Carousel.Item key={src}>
                                        <Link href={link}>
                                            <img src={src} alt={alt} style={{ marginBottom: 16, maxWidth: '100%' }} />
                                        </Link>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        )}
                        <p style={{ textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: description }}></p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
