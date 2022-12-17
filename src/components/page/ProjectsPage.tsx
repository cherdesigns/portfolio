import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Project } from '../../proxy/PortfolioDataSheetParser';
import Line from '../common/Line';

type ProjectsPageProps = {
    projects: Project[];
};

function ProjectsPage(props: ProjectsPageProps) {
    return (
        <div
            style={{
                display: 'flex',
                flexFlow: 'column',
                flex: 1,
                padding: 24,
                overflow: 'scroll',
            }}
        >
            {props.projects.map(({ title, images, description, link }) => (
                <div
                    id={`project-${title}`}
                    key={title}
                    style={{ display: 'flex', flexFlow: 'column', flex: 1, alignItems: 'flex-start' }}
                >
                    <h1 style={{ marginBottom: 0 }}>{title}</h1>
                    <Line />
                    {images.length === 1 ? (
                        <div
                            style={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                            }}
                        >
                            <a href={link} target='_blank' rel='noreferrer'>
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
                                    <a href={link} target='_blank' rel='noreferrer'>
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
