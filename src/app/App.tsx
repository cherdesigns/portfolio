import React, { useCallback } from 'react';
import '../assets/css/App.css';
import { PortfolioData, PortfolioDataType, Project, TagData } from '../proxy/PortfolioDataSheetParser';
import ProjectsPage from '../components/page/ProjectsPage';
import ContactPage from '../components/page/ContactPage';
import CustomNavbar from '../components/nav/CustomNavbar';
import GoogleSheetsProxy from '../proxy/GoogleSheetsProxy';
import PortfolioDataSheetParser from '../proxy/PortfolioDataSheetParser';

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

    const loadData = useCallback(() => {
        console.log('Using token ' + providedToken);
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
                console.error(e);

                if (isOAuthError(e.message)) {
                    setNeedsNewToken(true);
                } else {
                    setError(`${typeof e === 'string' ? e : e.message}`);
                }
            });
    }, [providedToken]);

    React.useEffect(loadData, [loadData]);

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
                        <a href='https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?redirect_uri=https%3A%2F%2Fdevelopers.google.com%2Foauthplayground&prompt=consent&response_type=code&client_id=407408718192.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fspreadsheets.readonly&access_type=offline&service=lso&o2v=2&flowName=GeneralOAuthFlow'>
                            this link
                        </a>{' '}
                        , log in, and click Allow
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
