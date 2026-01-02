import { defineField, defineType } from 'sanity';

export const pageView = defineType({
  name: 'pageView',
  title: 'Page View',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'count',
      title: 'Count',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      slug: 'slug',
      count: 'count',
    },
    prepare({ slug, count }) {
      return {
        title: `Page: ${slug}`,
        subtitle: `${count?.toLocaleString() || 0} views`,
      };
    },
  },
});

