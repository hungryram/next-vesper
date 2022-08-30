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
        },
        {
            title: 'Number of Columns',
            name: 'columns',
            type: 'number',
            validation: Rule => Rule.min(1).max(12)
        },
        {
            title: 'Block Colors',
            name: 'blockColors',
            type: 'imageColor'
        },
        {
            title: 'Block Text Color',
            name: 'blockText',
            type: 'textColor',
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