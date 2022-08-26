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
            title: 'Page Type',
            name: 'pageType',
            type: 'string',
            initialValue: 'plain',
            options: {
                list: [
                    {title: 'Plain Page', value: 'plain'},
                    {title: 'Contact', value: 'contact'},
                ]
            }
        },
        {
            title: 'Content',
            name: 'content',
            type: 'plainPage',
            hidden: ({ parent }) => parent?.pageType !== 'plain'
        },
        {
            title: 'Contact Page',
            name: 'contactPage',
            type: 'contactPage',
            hidden: ({ parent }) => parent?.pageType !== 'contact'

        },
        {
            title: 'Search Engine Optimization',
            name: 'seo',
            type: 'seo',
            validation: Rule => Rule.required().error('Required for search engines')
        }
    ]
}