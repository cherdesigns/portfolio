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
    const [projects, setProjects] = React.useState<Project[]>([ABOUT_ME]);
    const [pageKey, setPageKey] = React.useState<string>(ProjectsPage.name);
    const [portfolioData, setPortfolioData] = React.useState<PortfolioData | null>(null);
    const [tagData, setTagData] = React.useState<TagData | null>(null);

    const Page = pages[pageKey].page;

    React.useEffect(() => {
        const sheets = new GoogleSheetsProxy(
            'ya29.a0AeTM1icAvqwHk9aoAPXge1EXE829GAo4cEcpH41vVBgBThtb95qe8GxGoC9Jt9nOlIM5tyb3KR3WZxMSfg02S8hRxk3b8HcojRbcvLl2zH8ayZF3wWOtbOZZqS_IyN31P8vTmvyuR4QyUEHYncfIyuM2FP4qaCgYKAcYSARMSFQHWtWOmgMISlCrzLFcKOYhTCbEf_Q0163'
        );

        sheets.getSheet('1KqnU47HQpSNXWFefUiArD-eF_Cz_jrZXxkHxZh4ppSM', 'Data').then((d) => {
            const parsedPortfolioData = PortfolioDataSheetParser.parse(d);
            setPortfolioData(parsedPortfolioData);
            setTagData(PortfolioDataSheetParser.getTagsFromProjects(parsedPortfolioData[PortfolioDataType.PROJECTS]));
        });
    }, []);

    if (!portfolioData || !tagData) return null;

    console.log(portfolioData);

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
