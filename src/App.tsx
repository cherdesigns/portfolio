import React from 'react';
import './App.css';
import Carousel from 'react-bootstrap/Carousel';
import { ABOUT_ME, CATEGORIES, Project } from './data/projects';
import { EMAIL, EMAIL_LINK, SOCIALS } from './data/contact';

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

    return (
        <div className='App' style={{ display: 'flex', height: '100vh' }}>
            <div
                id='nav'
                style={{
                    display: 'flex',
                    flex: 1,
                    padding: 24,
                    flexFlow: 'column',
                    alignItems: 'start',
                    boxSizing: 'border-box',
                }}
            >
                <h1 style={{ marginBottom: 0 }}>Cherilyn Tan</h1>
                <h2
                    style={{ marginBottom: 0, cursor: 'pointer', textAlign: 'left' }}
                    onClick={() => setProjects([ABOUT_ME])}
                >
                    About me
                </h2>
                <Line />
                <nav>
                    <ol type='1' style={{ margin: 0 }}>
                        {CATEGORIES.map(({ title, projects }) => (
                            <h2 key={title} style={{ margin: 0 }}>
                                <li
                                    style={{ cursor: 'pointer', textAlign: 'left' }}
                                    onClick={() => setProjects(projects)}
                                >
                                    {title}
                                </li>
                            </h2>
                        ))}
                    </ol>
                </nav>
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
                <h2 style={{ margin: 0 }}>
                    <Link href={EMAIL_LINK}>{EMAIL}</Link>
                </h2>
            </div>
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
                                    <Carousel.Item>
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
