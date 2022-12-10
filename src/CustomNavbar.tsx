import React from 'react';
import './App.css';
import { ABOUT_ME, CATEGORIES, Project, TAGS, TAGS_TO_PROJECTS } from './data/projects';
import { SOCIALS } from './data/contact';
import { CloseButton, Nav, Navbar } from 'react-bootstrap';
import ContactPage from './ContactPage';
import ProjectsPage from './ProjectsPage';
import Line from './Line';
import Link from './Link';

type CustomNavbarProps = {
    projects: Project[];
    setProjects: (projects: Project[]) => void;
    navigate: (pageName: string) => void;
};

function CustomNavbar(props: CustomNavbarProps) {
    const [tags, setTags] = React.useState<string[]>([]);
    const [show, setShow] = React.useState<boolean>(false);

    const setProjects = (projects: Project[]) => {
        props.setProjects(projects);
        props.navigate(ProjectsPage.name);
    };

    const navigateToContact = () => {
        props.setProjects([]);
        props.navigate(ContactPage.name);
    };

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
                                    className={c.projects === props.projects ? 'primary' : ''}
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
                        <h2 style={{ margin: 0 }}>
                            <Link href='#' target='_self' onClick={navigateToContact}>
                                <li style={{ textAlign: 'left' }}>Contact</li>
                            </Link>
                        </h2>
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
                                    setProjects(nextProjects.length > 0 ? nextProjects : [ABOUT_ME]);
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
