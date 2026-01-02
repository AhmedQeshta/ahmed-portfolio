export const siteUrl = process.env.SITE_URL || 'https://ahmedqeshta.tech';

export const getCustomUrl = (slug: string, type: 'blogs' | 'projects' | 'works') => {
  return `${siteUrl}/${type}/${slug}`;
};
