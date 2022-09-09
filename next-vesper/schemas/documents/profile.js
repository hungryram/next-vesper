export default {
    name: 'profileSettings',
    title: 'Profile Settings',
    type: 'document',
    fields: [
        {
            title: 'Company Name',
            name: 'company_name',
            type: 'string',
        },
        {
            title: 'Contact Information',
            name: 'contact_information',
            type: 'contact'
        },
        {
            title: 'Address',
            name: 'address',
            type: 'location'
        },
        {
            title: 'Social',
            name: 'social',
            type: 'social'
        },
        {
            name: 'seo',
            title: 'Search Engine Optimization',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: true,
            },
            fields: [
                {
                    title: 'Title Tag',
                    name: 'title_tag',
                    type: 'string'
                },
                {
                    title: 'Meta Description',
                    name: 'meta_description',
                    type: 'text'
                },
                {
                    title: 'Twitter Username',
                    name: 'twitterHandle',
                    type: 'string'
                },
                {
                    title: 'Default Image Banner',
                    name: 'defaultImageBanner',
                    type: 'image',
                    description: 'Banner used when sharing your website link'
                },
                {
                    title: 'Website domain',
                    name: 'websiteName',
                    type: 'url',
                    description: 'Must include the full URL',
                    validation: Rule => Rule.required().error('Needed for website configuration')
                },
            ]
        },
        {
            title: 'IDX Settings',
            name: 'idxSettings',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: true,
            },
            fields: [
                {
                    title: 'IDX ID',
                    name: 'idxID',
                    type: 'number',
                    description: 'Please contact support@hungryram.com if you do not know your ID'
                }
            ]
        }
    ]
}