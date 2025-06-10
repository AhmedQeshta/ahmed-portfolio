import { type SchemaTypeDefinition } from 'sanity';
import { workExperience } from '@/sanity/schemaTypes/workExperience';
import { project } from '@/sanity/schemaTypes/project';
import { blogPost } from '@/sanity/schemaTypes/blogPost';
import { technology } from '@/sanity/schemaTypes/technology';
import { category } from '@/sanity/schemaTypes/category';
import { baseInfo } from '@/sanity/schemaTypes/baseInfo';


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [technology, workExperience, project, blogPost, category,baseInfo],
};
