export default {
    title: 'Header Menu',
    name: 'headerMenu',
    type: 'object',
    options: {
        collapsible: true,
        collapsed: true,

    },
    fields: [
        {
            title: 'Main navigation',
            name: 'mainNav',
            description: 'Select menu for main navigation',
            type: 'reference',
            to: { type: 'navigation' },
        },
        {
            name: 'headerColor',
            title: 'Header Color',
            type: 'color'
        },
        {
            name: 'navColor',
            title: 'Navigation Text Color',
            type: 'color'
        },
        {
            title: 'Call to Action Button Text',
            name: 'ctaText',
            type: 'string',
        },
        {
            title: 'Call to Action Button Link',
            name: 'ctaLink',
            type: 'string'
        }
    ]
}