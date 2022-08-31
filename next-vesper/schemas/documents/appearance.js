export default {
    name: 'appearances',
    title: 'Appearance',
    type: 'document',
    fields: [
        {
            title: 'Branding',
            name: 'branding',
            type: 'branding'
        },
        {
            title: 'Header',
            name: 'header',
            type: 'headerMenu'
        },
        {
            title: 'Colors',
            name: 'mainColors',
            type: 'mainColors'
        },
        {
            title: 'Sidebar',
            name: 'sidebar',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: true,
            },
            fields: [
                {
                    title: 'Sidebar Builder',
                    name: 'pageBuilder',
                    type: 'array',
                    of: [
                        {type: 'teamSlider'},
                        {type: 'blogSlider'},
                        {type: 'activeListings'},
                        {type: 'plainPage'},
                        {type: 'contactPage'},
                        {type: 'codeBlock'},
                        {type: 'imageandText'},
                        {type: 'socialComponent'},
                    ]
                },
            ]
        },
        {
            title: 'Footer',
            name: 'footer',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: true
            },
            fields: [
                {
                    title: 'Footer Logo',
                    name: 'footerLogo',
                    type: 'image'
                },
                {
                    title: 'Footer Text',
                    name: 'footerText',
                    type: 'blockContent'
                },
                {
                    title: "Quick links",
                    name: "quickLinks",
                    type: "array",
                    of: [{ type: "navigationItem" }]
                },
                {
                    title: 'Footer Background',
                    name: 'footerBackground',
                    type: 'imageColor'
                },
                {
                    title: 'Header Color',
                    name: 'headerColor',
                    type: 'color',
                },
                {
                    title: 'Text Color',
                    name: 'textColor',
                    type: 'color',
                }
            ]
        }
    ]
}