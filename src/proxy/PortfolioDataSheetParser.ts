type GoogleSheet = { values: string[][] };

export type MediaLink = {
    name: string;
    link: string;
};

export type Project = {
    id: string;
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
    id: string;
    src: string;
    alt: string;
};

type DatastoreCategory = {
    title: string;
    projects: string[];
};

type DatastoreImage = {
    id: string;
    src: string;
    alt: string;
};

type DatastoreMediaLink = {
    name: string;
    link: string;
};

type DatastoreProject = {
    id: string;
    title: string;
    description: string;
    images: string[];
    link: string;
    tags: string[];
};

export enum PortfolioDataType {
    EMPTY = '',
    SOCIAL_MEDIA = 'Social media',
    CATEGORIES = 'Project categories',
    PROJECTS = 'Projects',
    IMAGES = 'Images',
}

const PortfolioDataTypes: { [key in PortfolioDataType]: { [mapping: string]: any } } = {
    [PortfolioDataType.EMPTY]: {},
    [PortfolioDataType.SOCIAL_MEDIA]: {
        Name: 'name',
        Link: 'link',
    },
    [PortfolioDataType.CATEGORIES]: {
        Name: 'title',
        Projects: 'projects',
    },
    [PortfolioDataType.PROJECTS]: {
        ID: 'id',
        Title: 'title',
        Description: 'description',
        'Image IDs': 'images',
        Link: 'link',
        Tags: 'tags',
    },
    [PortfolioDataType.IMAGES]: {
        ID: 'id',
        Source: 'src',
        Description: 'alt',
    },
};

export type PortfolioData = {
    [PortfolioDataType.SOCIAL_MEDIA]: MediaLink[];
    [PortfolioDataType.CATEGORIES]: Category[];
    [PortfolioDataType.PROJECTS]: Project[];
    [PortfolioDataType.IMAGES]: Image[];
};

export type TagData = { tags: string[]; tagsToProjects: { [tag: string]: Project[] } };

class PortfolioDataSheetParser {
    static parse(sheet: GoogleSheet): PortfolioData {
        const res: {
            [PortfolioDataType.EMPTY]: any[];
            [PortfolioDataType.SOCIAL_MEDIA]: DatastoreMediaLink[];
            [PortfolioDataType.CATEGORIES]: DatastoreCategory[];
            [PortfolioDataType.PROJECTS]: DatastoreProject[];
            [PortfolioDataType.IMAGES]: DatastoreImage[];
        } = {
            [PortfolioDataType.EMPTY]: [],
            [PortfolioDataType.SOCIAL_MEDIA]: [],
            [PortfolioDataType.CATEGORIES]: [],
            [PortfolioDataType.PROJECTS]: [],
            [PortfolioDataType.IMAGES]: [],
        };

        let dataCategory: PortfolioDataType = PortfolioDataType.EMPTY;
        let dataCategoryFields: string[] = [];
        for (const row of sheet.values) {
            if (row.length > 0) {
                if (row[0].length > 0) {
                    dataCategory = row[0] as PortfolioDataType;
                    dataCategoryFields = row.slice(1);
                } else {
                    const values = row.slice(1);
                    const item = dataCategoryFields.reduce(
                        (acc, field, i) =>
                            PortfolioDataTypes[dataCategory][field]
                                ? {
                                      ...acc,
                                      [PortfolioDataTypes[dataCategory][field]]:
                                          PortfolioDataTypes[dataCategory][field] === 'images' ||
                                          PortfolioDataTypes[dataCategory][field] === 'projects' ||
                                          PortfolioDataTypes[dataCategory][field] === 'tags'
                                              ? values[i].split(',')
                                              : values[i],
                                  }
                                : acc,
                        {}
                    );

                    res[dataCategory].push(item);
                }
            }
        }

        const processedProjects = res.Projects.map((project) => {
            const images: Image[] = project.images.map((imageId) => {
                const image = res.Images.find(({ id }) => imageId === id);

                if (!image) {
                    throw new Error(`Image not found for project image ${imageId}`);
                }

                return image;
            });

            return { ...project, images };
        });

        const processedCategories = res['Project categories'].map((category) => {
            const projects: Project[] = category.projects.map((projectId) => {
                const project = processedProjects.find(({ id }) => projectId === id);

                if (!project) {
                    throw new Error(`Project not found for category project ${projectId}`);
                }

                return project;
            });

            return { ...category, projects };
        });

        const portfolioData: PortfolioData = {
            [PortfolioDataType.SOCIAL_MEDIA]: res['Social media'],
            [PortfolioDataType.CATEGORIES]: processedCategories,
            [PortfolioDataType.PROJECTS]: processedProjects,
            [PortfolioDataType.IMAGES]: res.Images,
        };

        return portfolioData;
    }

    static getTagsFromProjects = (projects: Project[]): TagData => {
        const tagsToProjects: { [tag: string]: Project[] } = {};
        const tagsSet = new Set<string>();

        for (const p of projects) {
            for (const t of p.tags) {
                tagsSet.add(t);
                if (t in tagsToProjects) {
                    tagsToProjects[t].push(p);
                } else {
                    tagsToProjects[t] = [p];
                }
            }
        }

        return {
            tags: Array.from(tagsSet.values()),
            tagsToProjects,
        };
    };
}

export default PortfolioDataSheetParser;
