import React from 'react';
import './App.css';
import { ABOUT_ME, Project } from './data/projects';
import ProjectsPage from './ProjectsPage';
import ContactPage from './ContactPage';
import CustomNavbar from './CustomNavbar';

type PageOption = {
    page: (props: any) => JSX.Element;
    getProps: (projects: Project[], setProjects: (projects: Project[]) => void) => {};
};

const pages: { [name: string]: PageOption } = {
    [ProjectsPage.name]: {
        page: ProjectsPage,
        getProps: (projects: Project[], setProjects: (projects: Project[]) => void) => ({ projects, setProjects }),
    },
    [ContactPage.name]: {
        page: ContactPage,
        getProps: (projects: Project[], setProjects: (projects: Project[]) => void) => ({}),
    },
};

function App() {
    const [projects, setProjects] = React.useState<Project[]>([ABOUT_ME]);
    const [pageKey, setPageKey] = React.useState<string>(ProjectsPage.name);

    const Page = pages[pageKey].page;

    return (
        <div className='App' style={{ display: 'flex', height: '100vh' }}>
            <CustomNavbar projects={projects} setProjects={setProjects} navigate={setPageKey} />
            <div
                style={{
                    display: 'flex',
                    flex: 2,
                    width: '100%',
                }}
            >
                <Page {...pages[pageKey].getProps(projects, setProjects)} />
            </div>
        </div>
    );
}

export default App;
