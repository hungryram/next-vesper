export default {
    title: 'Image or Color',
    name: 'imageColor',
    type: 'object',
    fields: [
        {
            title: "Select background type",
            name: "backgroundType",
            type: "string",
            options: {
                list: [
                    { title: "Image", value: "image" },
                    { title: "Color", value: "color" },
                ],
                layout: "radio",
            },
        },
        {
            title: 'Image',
            name: 'image',
            type: 'image',
            hidden: ({parent}) => parent.backgroundType !== 'image'
        },
        {
            title: 'Background Color',
            name: 'color',
            type: 'color',
            hidden: ({parent}) => parent.backgroundType !== 'color'
        },
        {
            title: 'Text Color',
            name: 'textColor',
            type: 'color',
            hidden: ({parent}) => parent.backgroundType !== 'color'
        }
    ]
}