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
                  }
            ]
        }
    ]
}