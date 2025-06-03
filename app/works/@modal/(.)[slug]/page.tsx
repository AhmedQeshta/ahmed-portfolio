import React from 'react';

interface WorkModalInterface {
  params: Promise<{ slug: string }>;
}

const WorkModal = async ({ params }: WorkModalInterface) => {
  const { slug } = await params;
  /*
    create modal the content has this ( id ,title ,company ,technologies ,period ,logo ,description)
    use fake data it will replace from server
  */
  return <div>modal first time run : {slug}</div>;
};

export default WorkModal;
