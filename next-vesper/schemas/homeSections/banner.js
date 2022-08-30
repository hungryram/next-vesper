export default {
    title: 'Banner',
    name: 'banner',
    type: 'object',
    fields: [
        {
            title: 'Heading',
            name: 'heading',
            type: 'string'
        },
        {
            title: 'Text',
            name: 'text',
            type: 'text'
        },
        {
            title: 'Button',
            name: 'button',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: true
            },
            fields: [
                {
                    title: 'Button Text',
                    name: 'buttonText',
                    type: 'string',
                },
                {
                    title: 'Button Link',
                    name: 'buttonLink',
                    type: 'string',
                },
            ]
        },
        {
            title: 'Background image or color',
            name: 'background',
            type: 'imageColor'
        },
        {
            title: 'Text Color',
            name: 'textColor',
            type: 'textColor',
        },
    ]
}