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
            title: 'Button',
            name: 'button',
            type: 'navigationItem'
        }
    ]
}