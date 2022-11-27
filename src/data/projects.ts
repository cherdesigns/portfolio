import { EMAIL_LINK } from './contact';

// The "About me" section

export const ABOUT_ME: Project = {
    title: 'Hi there!',
    description:
        'Vivamus semper varius risus, a congue lectus pharetra id. Cras dapibus tortor ac cursus aliquet. Quisque dui ante, convallis eget fermentum vitae, blandit eu ipsum. Aenean vel ligula ut enim dignissim volutpat. Proin quis ullamcorper odio, eget pretium arcu. Phasellus eu sem mollis, mollis nibh ac, venenatis ante. Phasellus eu risus id nunc lacinia ornare eget varius metus.',
    images: [],
    link: EMAIL_LINK,
};

/*
## Adding a category

The CATEGORIES list defines the categories in the left sidebar and each project that's in the category.
To add a new category, you can copy-paste the following into the CATEGORIES right above the last "];" (so within the square brackets):

{
    title: 'INSERT_CATEGORY_TITLE',
    projects: [
    ],
},

## Adding a project

To add a new project to a category, you can copy-paste the following into the "projects" field within the category. So for the above, you'd paste it right after the "projects: [":

{
    title: 'INSERT_PROJECT_TITLE',
    images: [
        {
            src: 'INSERT_LINK_TO_PROJECT_IMAGE',
            alt: 'INSERT_PROJECT_IMAGE_ALT_TEXT',
        },
    ],

    description: 'INSERT_PROJECT_DESCRIPTION',
    link: 'INSERT_LINK_TO_PROJECT',
},

## Adding links to descriptions

If you want to put a link in any part of the project description, you can put the text in an <a></a> tag like so:

<a href="INSERT_LINK">INSERT_TEXT</a>

So if you wanted the link `https://www.google.com/` on the text "go to Google!", then you'd do:

<a href="https://www.google.com/">go to Google!</a>
*/

export const CATEGORIES: Category[] = [
    {
        title: 'DFA',
        projects: [
            {
                title: 'Project 1',
                images: [
                    {
                        src: 'https://images.squarespace-cdn.com/content/v1/62a839e99ffbaa281368a294/3db9931a-4d9a-49bb-827d-c6accb399598/Asset+15.jpg?format=1500w',
                        alt: 'Image 1',
                    },
                    {
                        src: 'https://images.squarespace-cdn.com/content/v1/62a839e99ffbaa281368a294/3db9931a-4d9a-49bb-827d-c6accb399598/Asset+15.jpg?format=1500w',
                        alt: 'Image 1',
                    },
                ],

                description:
                    'Vivamus semper varius risus, a congue lectus pharetra id. Cras dapibus tortor ac cursus aliquet. Quisque dui ante, convallis eget fermentum vitae, blandit eu ipsum. Aenean vel ligula ut enim dignissim volutpat. Proin quis ullamcorper odio, eget pretium arcu. Phasellus eu sem mollis, mollis nibh ac, venenatis ante. Phasellus eu risus id nunc lacinia ornare eget varius metus.',
                link: 'https://www.designforamerica.org/',
            },
        ],
    },
];

// Stuff you don't have to worry about

export type Project = {
    title: string;
    description: string;
    images: Image[];
    link: string;
};

export type Category = {
    title: string;
    projects: Project[];
};

export type Image = {
    src: string;
    alt: string;
};

for (let i = 1; i < 8; i++) {
    CATEGORIES.push({ ...CATEGORIES[0], title: `Organization ${i + 1}` });
}
