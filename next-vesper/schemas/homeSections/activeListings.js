export default {
    title: 'Active Listings',
    name: 'activeListings',
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
            type: 'blockContent'
        },
        {
            title: 'Background image or color',
            name: 'background',
            type: 'imageColor'
        }

    ]
}