export default {
    title: 'Image Blocks',
    name: 'imageBlocks',
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
            type: 'blockContent',
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
                            title: 'Image',
                            name: 'image',
                            type: 'image',
                            options: {
                                hotspot: true
                            }
                        },
                        {
                            title: 'Link',
                            name: 'link',
                            type: 'navigationItem'
                        }
                    ]
                }
            ]
        }
    ]
}