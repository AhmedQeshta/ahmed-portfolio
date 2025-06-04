import React from 'react';

interface ProjectPageInterface {
  params: Promise<{ slug: string }>;
}

const ProjectPage = async ({ params }: ProjectPageInterface) => {
  const { slug } = await params;
  return <div>div second time run : {slug}</div>;
};

export default ProjectPage;
