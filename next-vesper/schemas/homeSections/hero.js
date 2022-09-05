export default {
    title: 'Hero',
    name: 'hero',
    type: 'object',
    fields: [
        {
            title: 'Heading',
            name: 'heading',
            type: 'string'
        },
        {
            title: 'Subtitle',
            name: 'subtitle',
            type: 'text'
        },
        {
            title: 'Image',
            name: 'image',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            title: 'Text Color',
            name: 'textColor',
            type: 'textColor',
        },
        {
            title: 'Button',
            name: 'button',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: true,
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
                    type: 'string'
                }
            ]
        }
    ]
}