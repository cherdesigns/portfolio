import React from 'react';
import './App.css';
import { MediaLink, Project, Category } from './proxy/PortfolioDataSheetParser';
import { CloseButton, Nav, Navbar } from 'react-bootstrap';
import ContactPage from './ContactPage';
import ProjectsPage from './ProjectsPage';
import Line from './Line';
import Link from './Link';

type CustomNavbarProps = {
    aboutMe: Project[];
    socials: MediaLink[];
    categories: Category[];
    selectedProjects: Project[];
    tags: string[];
    tagsToProjects: { [tag: string]: Project[] };
    setSelectedProjects: (projects: Project[]) => void;
    navigate: (pageName: string) => void;
};

function CustomNavbar(props: CustomNavbarProps) {
    const [tags, setTags] = React.useState<string[]>([]);
    const [show, setShow] = React.useState<boolean>(false);

    const setSelectedProjects = (projects: Project[]) => {
        props.setSelectedProjects(projects);
        props.navigate(ProjectsPage.name);
    };

    const navigateToContact = () => {
        setTags([]);
        props.setSelectedProjects([]);
        props.navigate(ContactPage.name);
    };

    return (
        <Navbar id='nav' expand='sm' style={{ alignItems: 'flex-start', padding: 0 }}>
            <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-sm`}
                style={{ margin: 24, marginBottom: 0, justifySelf: 'end' }}
                onClick={() => setShow(true)}
            />

            <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-sm`}
                aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
                placement='flex-start'
                style={{ padding: 24, alignItems: 'end' }}
                show={show}
            >
                <CloseButton id='close-button' aria-label='Hide navigation menu' onClick={() => setShow(false)} />
                <Nav id='nav-body'>
                    <h1 style={{ marginBottom: 0 }}>Cherilyn Tan</h1>
                    <Line />
                    <h2
                        className={
                            props.aboutMe === props.selectedProjects && props.selectedProjects.length === 1
                                ? 'primary'
                                : ''
                        }
                        style={{
                            marginBottom: 0,
                            cursor: 'pointer',
                            textAlign: 'left',

                            transition: '.2s color',
                        }}
                        onClick={() => {
                            setTags([]);
                            setSelectedProjects(props.aboutMe);
                            setShow(false);
                        }}
                    >
                        About me
                    </h2>
                    <ol type='1' style={{ margin: 0 }}>
                        {props.categories.map((c) => (
                            <h2 key={c.title} style={{ margin: 0 }}>
                                <li
                                    className={
                                        new Set([
                                            ...c.projects.map(({ id }) => id),
                                            ...props.selectedProjects.map(({ id }) => id),
                                        ]).size === c.projects.length
                                            ? 'primary'
                                            : ''
                                    }
                                    style={{
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        transition: '.2s color',
                                    }}
                                    onClick={() => {
                                        setTags([]);
                                        setSelectedProjects(c.projects);
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
                        {props.socials.map(({ name, link }) => (
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
                        {props.tags.map((tag) => (
                            <button
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
                                        new Set(nextTags.map((nextTag) => props.tagsToProjects[nextTag]).flat())
                                    );

                                    setTags(nextTags);
                                    setSelectedProjects(nextProjects.length > 0 ? nextProjects : props.aboutMe);
                                }}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </Nav>
            </Navbar.Offcanvas>
        </Navbar>
    );
}

export default CustomNavbar;
