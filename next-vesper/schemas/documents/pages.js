import { MdOutlineArticle } from "react-icons/md"

export default {
    title: 'Pages',
    name: 'pages',
    type: 'document',
    icons: MdOutlineArticle,
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string'
        },
        {
            title: 'URL',
            name: 'slug',
            type: 'slug',
            description: 'We recommend clicking generate. Changing URL may cause broken pages',
            options: {
              source: "title",
            },
        },
        {
            title: 'Header Image',
            name: 'headerImage',
            type: 'image',
        },
        {
            title: 'Page Layout',
            name: 'pageLayout',
            type: 'string',
            initialValue: 'sidebar',
            options: {
                list: [
                    {title: 'Full Width', value: 'fullWidth'},
                    {title: 'Sidebar', value: 'sidebar'}
                ]
            }
        },
        {
            title: 'Page Builder',
            name: 'pageBuilder',
            type: 'array',
            of: [
                {type: 'hero'},
                {type: 'intro'},
                {type: 'featured'},
                {type: 'teamSlider'},
                {type: 'blogSlider'},
                {type: 'banner'},
                {type: 'imageBlocks'},
                {type: 'activeListings'},
                {type: 'plainPage'},
                {type: 'contactPage'},
            ]
        },
        {
            title: 'Search Engine Optimization',
            name: 'seo',
            type: 'seo',
            validation: Rule => Rule.required().error('Required for search engines')
        }
    ]
}