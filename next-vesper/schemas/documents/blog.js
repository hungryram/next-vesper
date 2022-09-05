import { MdOutlinePostAdd } from "react-icons/md"

export default {
  name: 'blog',
  title: 'Blog',
  type: 'document',
  icon: MdOutlinePostAdd,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'URL',
      type: 'slug',
      description: 'We recommend clicking generate. Changing URL after publishing may cause broken pages',
      options: {
        source: "title",
        slugify: (input) =>
        input.toLowerCase()
        .replace(/\s+/g, "-").slice(0, 200)
        //Remove special characters
        .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ""),
      validation: (Rule) => Rule.required(),
      },
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          title: 'Image Alt Tag',
          name: 'altTag',
          type: 'string',
          description: 'Describe your image'
        }
      ]
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'date',
      options: {
        dateFormat: 'MM-DD-YYYY'
      }
    },
    {
      title: 'Excerpt',
      name: 'excerpt',
      type: 'text',
      description: 'Short description of your post'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
    {
      title: 'Search Engine Optimization',
      name: 'seo',
      type: 'seo'
    }
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      })
    },
  },
}
