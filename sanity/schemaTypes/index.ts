import { type SchemaTypeDefinition } from 'sanity';
import { workExperience } from './workExperience';
import { project } from './project';
import { blogPost } from './blogPost';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [workExperience, project, blogPost],
};
