export default {
    title: 'Featured',
    name: 'featured',
    type: 'object',
    fields: [
        {
            title: 'Heading',
            name: 'heading',
            type: 'string'
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
            title: 'Blocks',
            name: 'blocks',
            type: 'array',
            of: [
                {
                    title: 'Blocks',
                    type: 'object',
                    fields: [
                        {
                            title: 'Name',
                            name: 'value',
                            type: 'string'
                        },
                        {
                            title: 'Text',
                            name: 'text',
                            type: 'text'
                        }
                    ]
                }
            ]
        }
    ]
}