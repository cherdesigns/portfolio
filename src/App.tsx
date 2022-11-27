import React from 'react';
import './App.css';
import Carousel from 'react-bootstrap/Carousel';
import { ABOUT_ME, CATEGORIES, Project } from './data/projects';
import { EMAIL, EMAIL_LINK, SOCIALS } from './data/contact';
import { Nav, Navbar, Offcanvas } from 'react-bootstrap';

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

const Link = (props: any) => (
    <a target='_blank' {...props} style={{ textDecoration: 'none', ...(props.style ?? {}) }} />
);

function App() {
    const [projects, setProjects] = React.useState<Project[]>([ABOUT_ME]);
    const [show, setShow] = React.useState<boolean>(false);

    return (
        <div className='App' style={{ display: 'flex', height: '100vh' }}>
            <Navbar expand='sm' style={{ alignItems: 'start', padding: 0 }}>
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
                    <Offcanvas.Header closeButton className='justify-content-end' style={{ padding: 0 }} />
                    <Nav id='nav-body'>
                        <h1 style={{ marginBottom: 0 }}>Cherilyn Tan</h1>
                        <Line />
                        <h2
                            style={{ marginBottom: 0, cursor: 'pointer', textAlign: 'left' }}
                            onClick={() => {
                                setProjects([ABOUT_ME]);
                                setShow(false);
                            }}
                        >
                            About me
                        </h2>
                        <ol type='1' style={{ margin: 0 }}>
                            {CATEGORIES.map(({ title, projects }) => (
                                <h2 key={title} style={{ margin: 0 }}>
                                    <li
                                        style={{ cursor: 'pointer', textAlign: 'left' }}
                                        onClick={() => {
                                            setProjects(projects);
                                            setShow(false);
                                        }}
                                    >
                                        {title}
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
                                            <img src={src} alt={alt} style={{ marginBottom: 16 }} />
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
