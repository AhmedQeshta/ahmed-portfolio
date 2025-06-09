import React from 'react';

interface WorkPageInterface {
  params: Promise<{ slug: string }>;
}

const WorkPage = async ({ params }: WorkPageInterface) => {
  const { slug } = await params;
  return <div>div second time run : {slug}</div>;
};

export default WorkPage;
