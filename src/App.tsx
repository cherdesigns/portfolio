import React from 'react';
import './App.css';
import { ABOUT_ME, Project } from './data/projects';
import ProjectsPage from './ProjectsPage';
import CustomNavbar from './CustomNavbar';

function App() {
    const [projects, setProjects] = React.useState<Project[]>([ABOUT_ME]);

    return (
        <div className='App' style={{ display: 'flex', height: '100vh' }}>
            <CustomNavbar projects={projects} setProjects={setProjects} />
            <ProjectsPage projects={projects} />
        </div>
    );
}

export default App;
