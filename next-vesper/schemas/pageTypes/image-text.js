export default {
    title: 'Image and Text',
    name: 'imageandText',
    type: 'object',
    fields: [
        {
            title: 'Heading',
            name: 'heading',
            type: 'string',
        },
        {
            title: 'Text',
            name: 'text',
            type: 'text',
        },
        {
            title: 'Link',
            name: 'link',
            type: 'string',
        },
        {
            title: 'Image',
            name: 'image',
            type: 'image',
            options: {
                hotspot: true
            },
            fields: [
                {
                    title: 'Alt Tag',
                    name: 'altTag',
                    type: 'string',
                    description: 'Describe your image'
                }
            ]
        }
    ]
}