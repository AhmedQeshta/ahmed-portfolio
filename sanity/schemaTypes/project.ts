import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [{ title: 'Bullet', value: 'bullet' }],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
        },
        {
          type: 'object',
          name: 'codeBlock',
          title: 'Code Block',
          fields: [
            {
              name: 'language',
              title: 'Language',
              type: 'string',
              options: {
                list: [
                  { title: 'JavaScript', value: 'javascript' },
                  { title: 'TypeScript', value: 'typescript' },
                  { title: 'React', value: 'jsx' },
                  { title: 'HTML', value: 'html' },
                  { title: 'CSS', value: 'css' },
                  { title: 'Python', value: 'python' },
                  { title: 'JSON', value: 'json' },
                ],
              },
            },
            {
              name: 'code',
              title: 'Code',
              type: 'text',
              rows: 10,
            },
          ],
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'technology' }],
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'screenshot',
      title: 'Screenshot',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'repoUrl',
      title: 'Repository URL',
      type: 'url',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live Demo URL',
      type: 'url',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Completed', value: 'completed' },
          { title: 'On Hold', value: 'on-hold' },
        ],
      },
      validation: (rule) => rule.required(),
      initialValue: 'completed',
    }),
    defineField({
      name: 'category',
      title: 'category',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }],
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'screenshot',
    },
  },
  orderings: [
    {
      title: 'Featured',
      name: 'featuredDesc',
      by: [{ field: 'featured', direction: 'desc' }],
    },
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Start Date, New',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
  ],
});
