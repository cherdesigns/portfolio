import React from 'react';
import './App.css';
import Carousel from 'react-bootstrap/Carousel';
import { Project } from './data/projects';

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

type ProjectsPageProps = {
    projects: Project[];
};

function ProjectsPage(props: ProjectsPageProps) {
    return (
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
            {props.projects.map(({ title, images, description, link }) => (
                <div
                    id={`project-${title}`}
                    key={title}
                    style={{ display: 'flex', flexFlow: 'column', flex: 1, alignItems: 'start' }}
                >
                    <h1 style={{ marginBottom: 0 }}>{title}</h1>
                    <Line />
                    {images.length === 1 ? (
                        <div
                            style={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'start',
                            }}
                        >
                            <a href={link} target='_blank'>
                                <img
                                    src={images[0].src}
                                    alt={images[0].alt}
                                    style={{ marginBottom: 16, maxWidth: '100%' }}
                                />
                            </a>
                        </div>
                    ) : images.length > 1 ? (
                        <Carousel style={{ width: '100%' }} variant='dark'>
                            {images.map(({ src, alt }) => (
                                <Carousel.Item key={src}>
                                    <a href={link} target='_blank'>
                                        <img src={src} alt={alt} style={{ marginBottom: 16, maxWidth: '100%' }} />
                                    </a>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    ) : null}
                    <p style={{ textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: description }}></p>
                </div>
            ))}
        </div>
    );
}

export default ProjectsPage;
