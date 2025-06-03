import { type SchemaTypeDefinition } from 'sanity';
import { workExperience } from './workExperience';
import { project } from './project';
import { blogPost } from './blogPost';
import { technology } from './technology';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [technology, workExperience, project, blogPost],
};
