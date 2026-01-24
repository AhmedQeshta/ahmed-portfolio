import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export const POST = async (req: NextRequest) => {
  try {
    const { isValidSignature, body } = await parseBody<{
      _type: string;
      slug?: { current: string };
    }>(req, process.env.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      return new Response('Invalid Signature', { status: 401 });
    }

    if (!body?._type) {
      return new Response('Bad Request', { status: 400 });
    }

    // Default tags
    const tags = ['sanity'];
    
    // Add specific tags based on type
    if (['blogPost', 'category', 'technology'].includes(body._type)) {
      tags.push('blogs');
      tags.push('blogPosts'); // Legacy tag if used
    }
    if (['project', 'category', 'technology'].includes(body._type)) {
      tags.push('projects');
    }
    if (['workExperience', 'technology'].includes(body._type)) {
      tags.push('works');
      tags.push('workExperience'); // Legacy tag if used
    }
    if (body._type === 'baseInfo') {
      tags.push('baseInfo');
    }
    
    // Specific item tags
    if (body.slug?.current) {
      if (body._type === 'blogPost') tags.push(`blog:${body.slug.current}`);
      if (body._type === 'project') tags.push(`project:${body.slug.current}`);
      if (body._type === 'workExperience') tags.push(`work:${body.slug.current}`);
    }

    console.log('[Revalidate] Revalidating tags:', tags);

    // Revalidate all tags
    for (const tag of tags) {
      revalidateTag(tag);
    }

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      tags,
    });
  } catch (err: any) {
    console.error(err);
    return new Response(err.message, { status: 500 });
  }
};
