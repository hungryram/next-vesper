export default {
    title: 'Home',
    name: 'homeDesign',
    type: 'document',
    fields: [
        {
            title: 'Page Builder',
            name: 'pageBuilder',
            type: 'array',
            of: [
                {type: 'hero'},
                {type: 'intro'},
                {type: 'featured'},
                {type: 'teamSlider'},
                {type: 'blogSlider'},
                {type: 'banner'},
                {type: 'imageBlocks'},
                {type: 'activeListings'},
            ]
        }
    ]
}