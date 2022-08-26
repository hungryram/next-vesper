export default {
    title: 'Locations',
    name: 'locations',
    type: 'document',
    fields: [
        {
            title: 'Name',
            name: 'name',
            type: 'string',
            validation: Rule => Rule.required().warning('Create a title')
        },
        {
            title: 'URL',
            name: 'slug',
            type: 'slug',
            description: 'We recommend clicking generate. Changing URL may cause broken pages',
            options: {
              source: "name",
            },
        },
        {
            title: 'Image',
            name: 'image',
            type: 'image',
            options: {
                hotspot: true,
            }
        },
        {
            title: 'Contact Information',
            name: 'contactInformation',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: true,
            },
            fields: [
                {
                    title: 'Phone Number',
                    name: 'phoneNumber',
                    type: 'string',
                },
                {
                    title: 'Email',
                    name: 'email',
                    type: 'string'
                },
                {
                    title: 'Website Link',
                    name: 'websiteLink',
                    type: 'url'
                }
            ]
        },
        {
            title: 'Location',
            name: 'location',
            type: 'location'
        },
        {
            title: 'Social Accounts',
            name: 'socialAccounts',
            type: 'social'
        },
        {
            title: 'About',
            name: 'about',
            type: 'blockContent'
        },
        {
            title: 'Search Engine Optimization',
            name: 'seo',
            type: 'seo'
        }
    ]
}