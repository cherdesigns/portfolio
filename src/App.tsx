import React from 'react';
import './App.css';
import { ABOUT_ME } from './data/projects';
import { PortfolioData, PortfolioDataType, Project, TagData } from './proxy/PortfolioDataSheetParser';
import ProjectsPage from './ProjectsPage';
import ContactPage from './ContactPage';
import CustomNavbar from './CustomNavbar';
import GoogleSheetsProxy from './proxy/GoogleSheetsProxy';
import PortfolioDataSheetParser from './proxy/PortfolioDataSheetParser';

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
    const [error, setError] = React.useState<any>(null);
    const [projects, setProjects] = React.useState<Project[]>([ABOUT_ME]);
    const [pageKey, setPageKey] = React.useState<string>(ProjectsPage.name);
    const [portfolioData, setPortfolioData] = React.useState<PortfolioData | null>(null);
    const [tagData, setTagData] = React.useState<TagData | null>(null);

    const Page = pages[pageKey].page;

    React.useEffect(() => {
        const sheets = new GoogleSheetsProxy('');

        sheets
            .getSheet('1KqnU47HQpSNXWFefUiArD-eF_Cz_jrZXxkHxZh4ppSM', 'Data')
            .then((res) => {
                if (res.error) return setError(`${res.error.message}`);

                const parsedPortfolioData = PortfolioDataSheetParser.parse(res);
                setPortfolioData(parsedPortfolioData);
                setTagData(
                    PortfolioDataSheetParser.getTagsFromProjects(parsedPortfolioData[PortfolioDataType.PROJECTS])
                );
            })
            .catch((e) => setError(`${e}`));
    }, []);

    if (error)
        return (
            <div
                className='App'
                style={{
                    display: 'flex',
                    height: '100vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexFlow: 'column',
                }}
            >
                <p>Sorry, there was an error loading this site's data. Here's the specific problem:</p>
                <p>{error}</p>
            </div>
        );

    if (!portfolioData || !tagData) return null;

    return (
        <div className='App' style={{ display: 'flex', height: '100vh' }}>
            <CustomNavbar
                socials={portfolioData[PortfolioDataType.SOCIAL_MEDIA]}
                categories={portfolioData[PortfolioDataType.CATEGORIES]}
                projects={portfolioData[PortfolioDataType.PROJECTS]}
                tags={tagData.tags}
                tagsToProjects={tagData.tagsToProjects}
                setProjects={setProjects}
                navigate={setPageKey}
            />
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
