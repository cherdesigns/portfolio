// The "About me" section

export const ABOUT_ME: Project = {
    title: 'Hi there!',
    description:
        'Vivamus semper varius risus, a congue lectus pharetra id. Cras dapibus tortor ac cursus aliquet. Quisque dui ante, convallis eget fermentum vitae, blandit eu ipsum. Aenean vel ligula ut enim dignissim volutpat. Proin quis ullamcorper odio, eget pretium arcu. Phasellus eu sem mollis, mollis nibh ac, venenatis ante. Phasellus eu risus id nunc lacinia ornare eget varius metus.',
    images: [
        {
            src: 'https://media-exp1.licdn.com/dms/image/C5603AQHr--nwL3tg3Q/profile-displayphoto-shrink_400_400/0/1526011778526?e=1675296000&v=beta&t=-V0Js93Wpwa94kASX-SUpkAlnSJYFddlUSMjHe-CNXM',
            alt: 'Cherilyn Tan',
        },
    ],
    link: '#',
    tags: [],
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
                title: 'DFA Project 1',
                images: [
                    {
                        src: 'https://images.squarespace-cdn.com/content/v1/62a839e99ffbaa281368a294/3db9931a-4d9a-49bb-827d-c6accb399598/Asset+15.jpg?format=1500w',
                        alt: 'Image 1',
                    },
                ],

                description:
                    'Vivamus semper varius risus, a congue lectus pharetra id. Cras dapibus tortor ac cursus aliquet. Quisque dui ante, convallis eget fermentum vitae, blandit eu ipsum. Aenean vel ligula ut enim dignissim volutpat. Proin quis ullamcorper odio, eget pretium arcu. Phasellus eu sem mollis, mollis nibh ac, venenatis ante. Phasellus eu risus id nunc lacinia ornare eget varius metus.',
                link: 'https://www.designforamerica.org/',
                tags: ['Community building', 'Teaching'],
            },
        ],
    },
    {
        title: 'Agncy',
        projects: [
            {
                title: 'Agncy Project 1',
                images: [
                    {
                        src: 'data:image/png;base64,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',
                        alt: 'Image 1',
                    },
                ],

                description:
                    'Vivamus semper varius risus, a congue lectus pharetra id. Cras dapibus tortor ac cursus aliquet. Quisque dui ante, convallis eget fermentum vitae, blandit eu ipsum. Aenean vel ligula ut enim dignissim volutpat. Proin quis ullamcorper odio, eget pretium arcu. Phasellus eu sem mollis, mollis nibh ac, venenatis ante. Phasellus eu risus id nunc lacinia ornare eget varius metus.',
                link: 'https://agncy.org/',
                tags: ['Design'],
            },
        ],
    },
    {
        title: 'Creative Reaction Lab',
        projects: [
            {
                title: 'CRX Project 1',
                images: [
                    {
                        src: 'data:image/png;base64,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',
                        alt: 'Image 1',
                    },
                ],

                description:
                    'Vivamus semper varius risus, a congue lectus pharetra id. Cras dapibus tortor ac cursus aliquet. Quisque dui ante, convallis eget fermentum vitae, blandit eu ipsum. Aenean vel ligula ut enim dignissim volutpat. Proin quis ullamcorper odio, eget pretium arcu. Phasellus eu sem mollis, mollis nibh ac, venenatis ante. Phasellus eu risus id nunc lacinia ornare eget varius metus.',
                link: 'https://crxlab.org/',
                tags: ['Community building', 'Art'],
            },
        ],
    },
    {
        title: 'Brown University',
        projects: [
            {
                title: 'Peer career advisor',
                images: [
                    {
                        src: 'data:image/png;base64,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',
                        alt: 'Image 1',
                    },
                ],

                description:
                    'Vivamus semper varius risus, a congue lectus pharetra id. Cras dapibus tortor ac cursus aliquet. Quisque dui ante, convallis eget fermentum vitae, blandit eu ipsum. Aenean vel ligula ut enim dignissim volutpat. Proin quis ullamcorper odio, eget pretium arcu. Phasellus eu sem mollis, mollis nibh ac, venenatis ante. Phasellus eu risus id nunc lacinia ornare eget varius metus.',
                link: 'https://www.brown.edu/campus-life/support/careerlab/about-us/our-staff/peer-career-advisors-pcas',
                tags: ['Mentoring', 'Career'],
            },
        ],
    },
];

export const TAGS_TO_PROJECTS: { [tag: string]: Project[] } = {};

const tagsSet = new Set<string>();
for (const c of CATEGORIES) {
    for (const p of c.projects) {
        for (const t of p.tags) {
            tagsSet.add(t);

            if (t in TAGS_TO_PROJECTS) {
                TAGS_TO_PROJECTS[t].push(p);
            } else {
                TAGS_TO_PROJECTS[t] = [p];
            }
        }
    }
}

export const TAGS: string[] = Array.from(tagsSet.values());

// Stuff you don't have to worry about

export type Project = {
    title: string;
    description: string;
    images: Image[];
    link: string;
    tags: string[];
};

export type Category = {
    title: string;
    projects: Project[];
};

export type Image = {
    src: string;
    alt: string;
};
