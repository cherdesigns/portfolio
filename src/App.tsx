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

const isOAuthError = (error: string) => {
    return (
        error.includes('Request had invalid authentication credentials') ||
        error.includes('The request is missing a valid API key.')
    );
};

function App() {
    const [needsNewToken, setNeedsNewToken] = React.useState<boolean>(false);
    const [providedToken, setProvidedToken] = React.useState<string>(
        localStorage.getItem('portfolio-google-auth-token') ?? ''
    );

    const [error, setError] = React.useState<any>(null);
    const [selectedProjects, setSelectedProjects] = React.useState<Project[]>([]);
    const [pageKey, setPageKey] = React.useState<string>(ProjectsPage.name);
    const [portfolioData, setPortfolioData] = React.useState<PortfolioData | null>(null);
    const [tagData, setTagData] = React.useState<TagData | null>(null);

    const Page = pages[pageKey].page;

    const loadData = () => {
        new GoogleSheetsProxy(providedToken)
            .getSheet('1chgU4UE0_KH90rIDO5i-qZoExTPvqNuyIzUG1E1mH9w', 'Data')
            .then((res) => {
                if (res.error) throw new Error(`${res.error.message}`);

                const parsedPortfolioData = PortfolioDataSheetParser.parse(res);
                setPortfolioData(parsedPortfolioData);
                setTagData(
                    PortfolioDataSheetParser.getTagsFromProjects(parsedPortfolioData[PortfolioDataType.PROJECTS])
                );
                setSelectedProjects(parsedPortfolioData[PortfolioDataType.ABOUT_ME]);
            })
            .catch((e) => {
                if (isOAuthError(e.message)) {
                    setNeedsNewToken(true);
                } else {
                    setError(`${typeof e === 'string' ? e : e.message}`);
                }
            });
    };

    React.useEffect(() => {
        loadData();
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
                {isOAuthError(error) ? (
                    <p>Site is currently under construction - please check back again later!</p>
                ) : (
                    <>
                        <p>Sorry, there was an error loading this site's data. Here's the specific problem:</p>
                        <p>{error}</p>
                    </>
                )}
            </div>
        );

    if (needsNewToken) {
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
                <p>
                    {' '}
                    The auth token to Google Sheets expired, or an invalid one was provided. For a temp token, please do
                    the following:
                </p>
                <ul
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        flexFlow: 'column',
                        width: '80%',
                        textAlign: 'left',
                    }}
                >
                    <li style={{ maxWidth: '100%' }}>
                        Follow{' '}
                        <a href='https://accounts.google.com/signin/oauth/consent?authuser=4&part=AJi8hANd91hsg4YlBym9j3B-8q86SKcMR6v7GZreQqzX-8Mq-LkRBvZVF4sIjYwouegn5Wi0dp9JNeLFS9V-O6ZgY9XzLri4Fi4Ei2074P2m2ppYF-pNWsC72KUlSKIGudHn2pIBVpp9NkZ-SJH4urugaJ-5VJVM80ZF25TTeYngun1gf2HIg6vhZBHqVrI57N0VFFK38CvHN0wXbBW_O-ogI3Z8ojjvXvNIj71-I8OF7EfWZYSueQ9IbGzuIpuSvAS1RblGZdzSJI4d_-3UBu34ZltaFuk7zjm9JrX1fK8MHwy6pCEnp2MefYYrvnu63uNX05IzYsaid0H5cJUDNzaUlRW_h_lmDX7muwIMFjgafBnS6VqF0eCIlPA2MttV5ZMZdKPGLAE-65PQ9GyNAW2HxR9R7IWzxUv6HU-hRudAL6XTzGxgQAM&as=S1275646382%3A1670787429002918&client_id=407408718192.apps.googleusercontent.com&pli=1&rapt=AEjHL4OCZUJMIf0Rx0Vl9Fe5W5Z-vqo1Viz8HQ-8VWsgS73_YCYI_F_EEchXqGlPBI9wzZOFJNonTNisLfgeTYPpgCHUo4dQ8Q#'>
                            this link
                        </a>{' '}
                        and click Allow
                    </li>
                    <li> Cick "Exchange authorization code for tokens"</li>
                    <li>
                        Under step 2, copy the string in the box next to "Access token" (it'll be long, like
                        ya29.a0AeTM1iemTwSzhCMxRJgXphWTlCCDw8Lo2LIIZY6Qge7Tg5Q4eOVsJrIyWtnqMqm3qG6jMEXEvfoK1D9uatiiLC-J15FHiP0afMmfZ6vA7rPBnAU28u3av9Axod8P_BosDNKpLfTfzdm96iqs8T2jHnRhzd7FaCgYKAbMSARASFQHWtWOmJqraSSqTdgkDrOR8p7f_2g0163)
                    </li>
                    <li> Paste the access token below and click submit</li>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setNeedsNewToken(false);
                            localStorage.setItem('portfolio-google-auth-token', providedToken);
                            loadData();
                        }}
                    >
                        <input name='newToken' onChange={(e) => setProvidedToken(e.target.value)} />
                        <input type='submit' />
                    </form>
                </ul>
            </div>
        );
    }

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
