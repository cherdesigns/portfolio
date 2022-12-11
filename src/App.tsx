import React from 'react';
import './App.css';
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
    const [selectedProjects, setSelectedProjects] = React.useState<Project[]>([]);
    const [pageKey, setPageKey] = React.useState<string>(ProjectsPage.name);
    const [portfolioData, setPortfolioData] = React.useState<PortfolioData | null>(null);
    const [tagData, setTagData] = React.useState<TagData | null>(null);

    const Page = pages[pageKey].page;

    React.useEffect(() => {
        const sheets = new GoogleSheetsProxy(
            // Auth for a throwaway Google account
            'ya29.a0AeTM1iemTwSzhCMxRJgXphWTlCCDw8Lo2LIIZY6Qge7Tg5Q4eOVsJrIyWtnqMqm3qG6jMEXEvfoK1D9uatiiLC-J15FHiP0afMmfZ6vA7rPBnAU28u3av9Axod8P_BosDNKpLfTfzdm96iqs8T2jHnRhzd7FaCgYKAbMSARASFQHWtWOmJqraSSqTdgkDrOR8p7f_2g0163'
        );

        sheets
            .getSheet('1chgU4UE0_KH90rIDO5i-qZoExTPvqNuyIzUG1E1mH9w', 'Data')
            .then((res) => {
                if (res.error) return setError(`${res.error.message}`);

                const parsedPortfolioData = PortfolioDataSheetParser.parse(res);
                setPortfolioData(parsedPortfolioData);
                setTagData(
                    PortfolioDataSheetParser.getTagsFromProjects(parsedPortfolioData[PortfolioDataType.PROJECTS])
                );
                setSelectedProjects(parsedPortfolioData[PortfolioDataType.ABOUT_ME]);
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
                aboutMe={portfolioData[PortfolioDataType.ABOUT_ME]}
                socials={portfolioData[PortfolioDataType.SOCIAL_MEDIA]}
                categories={portfolioData[PortfolioDataType.CATEGORIES]}
                selectedProjects={selectedProjects}
                tags={tagData.tags}
                tagsToProjects={tagData.tagsToProjects}
                setSelectedProjects={setSelectedProjects}
                navigate={setPageKey}
            />
            <div
                style={{
                    display: 'flex',
                    flex: 2,
                    width: '100%',
                }}
            >
                <Page {...pages[pageKey].getProps(selectedProjects, setSelectedProjects)} />
            </div>
        </div>
    );
}

export default App;
