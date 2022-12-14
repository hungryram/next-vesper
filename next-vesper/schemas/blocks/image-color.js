export default {
    title: 'Image or Color',
    name: 'imageColor',
    type: 'object',
    options: {
        collapsible: true,
        collapsed: true,
    },
    fields: [
        {
            title: "Select background type",
            name: "backgroundType",
            type: "string",
            initialValue: 'color',
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
        }
    ]
}