export default {
    title: 'Internal Links',
    name: 'internalLinks',
    type: 'object',
    fields: [
        {
            title: 'Website Link',
            name: 'internalLink',
            description: 'Select pages for navigation',
            type: 'reference',
            to: [{ type: 'blog' }, { type: 'legal' }, { type: 'author' }],
        },
    ]
}