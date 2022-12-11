import React from 'react';
import './App.css';
import { PortfolioData, PortfolioDataType, Project, TagData } from './proxy/PortfolioDataSheetParser';
import ProjectsPage from './ProjectsPage';
import ContactPage from './ContactPage';
import CustomNavbar from './CustomNavbar';
import GoogleSheetsProxy from './proxy/GoogleSheetsProxy';
import PortfolioDataSheetParser from './proxy/PortfolioDataSheetParser';
import FirebaseProxy from './proxy/FirebaseProxy';

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
        const fb = new FirebaseProxy();

        fb.init((user) => {
            if (!user) return setError('Failed to initialize a connection to site datastore.');

            user.getIdToken()
                .then((token) => {
                    if (!token) return setError(`Failed to connect to site datastore`);

                    return new GoogleSheetsProxy(token).getSheet(
                        '1chgU4UE0_KH90rIDO5i-qZoExTPvqNuyIzUG1E1mH9w',
                        'Data'
                    );
                })
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
        });
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
                {error.includes('Request had invalid authentication credentials') ? (
                    <p>Site is currently under construction - please check back again later!</p>
                ) : (
                    <>
                        <p>Sorry, there was an error loading this site's data. Here's the specific problem:</p>
                        <p>{error}</p>
                    </>
                )}
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
