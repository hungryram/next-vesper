export default {
    title: 'Introduction',
    name: 'intro',
    type: 'object',
    fields: [
        {
            title: 'Heading',
            name: 'heading',
            type: 'string'
        },
        {
            title: 'Content',
            name: 'content',
            type: 'blockContent'
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
            title: 'Image Alt Tag',
            name: 'altTag',
            type: 'string',
            description: 'Describe your image'
        },
        {
            title: 'Button',
            name: 'button',
            type: 'navigationItem'
        }
    ]
}