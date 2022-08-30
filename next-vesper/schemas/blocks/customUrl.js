export default {
    name: "customUrl",
    title: "Custom URL",
    type: "object",
    fields: [
      {
        title: 'Name',
        name: 'name',
        type: 'string'
      },
      {
        name: "external",
        type: "url",
        title: "URL",
        hidden: ({ parent, value }) => !value && parent?.internal,
      },
      {
        name: "internal",
        type: "reference",
        to: [{ type: "pages" }, { type: "blog" }, { type: "legal" }],
        hidden: ({ parent, value }) => !value && parent?.external,
      },
    ],
  };