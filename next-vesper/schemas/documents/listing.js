export default {
    title: 'Listings',
    name: 'listings',
    type: 'document',
    fields: [
        {
            title: 'Listing Address',
            name: 'address',
            type: 'string',
            validation: Rule => Rule.required().warning('Please enter the street address')
        },
        {
            title: 'City',
            name: 'city',
            type: 'string',
            validation: Rule => Rule.required().warning('Please enter the city')
        },
        {
            title: 'State',
            name: 'state',
            type: 'string',
            validation: Rule => Rule.required().warning('Please enter the state')
        },
        {
            title: 'Zip',
            name: 'zipCode',
            type: 'string',
            validation: Rule => Rule.required().warning('Please enter the zip code')
        },
        {
            title: 'URL',
            name: 'slug',
            type: 'slug',
            options: {
                source: doc => `${doc.address}-${doc.city}-${doc.state}-${doc.zipCode}`
            }
        },
        {
            title: 'Short Title',
            name: 'shortTitle',
            type: 'string',
            validation: Rule => Rule.required().warning('Please enter a short title')
        },
        {
            title: 'Price',
            name: 'price',
            type: 'number'
        },
        {
            title: 'Status',
            name: 'status',
            type: 'string',
            options: {
                list: [
                    {title: 'Active', value: 'active'},
                    {title: 'Auction', value: 'auction'},
                    {title: 'Available', value: 'available'},
                    {title: 'Coming Soon', value: 'coming soon'},
                    {title: 'In Contract', value: 'in contract'},
                    {title: 'Negotiating', value: 'negotiating'},
                    {title: 'Pending', value: 'pending'},
                    {title: 'Rental', value: 'rental'},
                    {title: 'Sold', value: 'sold'},
                ]
            }
        },
        {
            title: 'Property Type',
            name: 'propType',
            type: 'string',
            options: {
                list: [
                    {title: 'Acreage and Land', value: 'acreage and land'},
                    {title: 'Apartment', value: 'apartment'},
                    {title: 'Cabin', value: 'cabin'},
                    {title: 'Co-Op', value: 'co-op'},
                    {title: 'Commercial', value: 'commercial'},
                    {title: 'Condo', value: 'condo'},
                    {title: 'Duplex', value: 'duplex'},
                    {title: 'Farm Land', value: 'farmLand'},
                    {title: 'Farm Ranch', value: 'farm ranch'},
                    {title: 'Mobile Home', value: 'mobile home'},
                    {title: 'Multi Family', value: 'multifamily'},
                    {title: 'New Construction', value: 'new construction'},
                    {title: 'Rental', value: 'rental'},
                    {title: 'Single Family', value: 'single family'},
                    {title: 'Timeshare', value: 'time share'},
                    {title: 'Townhome', value: 'town home'},
                    {title: 'Vacation Home', value: 'vacation home'},
                ]
            }
        },
        {
            title: 'Listing Agent',
            name: 'listingAgent',
            type: 'reference',
            to: [{type: 'team'}]
        },
        {
            title: 'Listing Office',
            name: 'listingOffice',
            type: 'reference',
            to: [{type: 'locations'}]
        },
        {
            title: 'Details',
            name: 'details',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: true,
            },
            fields: [
                {
                    title: 'Bathrooms',
                    name: 'bathrooms',
                    type: 'string',
                },
                {
                    title: 'Bedrooms',
                    name: 'bedrooms',
                    type: 'string',
                },
                {
                    title: 'Garage',
                    name: 'garage',
                    type: 'string',
                },
                {
                    title: 'HOA',
                    name: 'hoa',
                    type: 'string',
                    description: 'Include dollar sign and any additional information'
                },
                {
                    title: 'Lot Size',
                    name: 'lotSize',
                    type: 'string',
                },
                {
                    title: 'MLS Number',
                    name: 'mlsNumber',
                    type: 'string',
                },
                {
                    title: 'Square Footage',
                    name: 'squareFootage',
                    type: 'string',
                },
                {
                    title: 'Year Built',
                    name: 'yearBuilt',
                    type: 'number',
                }
            ]
        },
        {
            title: 'Tools',
            name: 'tools',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: true,
            },
            fields: [
                {
                    title: 'Open House Details',
                    name: 'openHouse',
                    type: 'string'
                },
                {
                    title: 'File Attachment',
                    name: 'fileAttachment',
                    type: 'array',
                    of: [{ type: 'file' }]
                },
                
            ]
        },
        {
            title: 'Gallery',
            name: 'gallery',
            type: 'gallery'
        },
        {
            title: 'Description',
            name: 'description',
            type: 'blockContent'
        },
        {
            title: 'Search Engine Optimization',
            name: 'seo',
            type: 'seo'
        }
    ]
}