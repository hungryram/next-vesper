export default {
    title: 'Blog Slider',
    name: 'blogSlider',
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
            type: 'blockContent'
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