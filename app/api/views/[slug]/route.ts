import { NextRequest, NextResponse } from 'next/server';
import { adminClient } from '@/sanity/lib/adminClient';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    console.log('request', request);
    const { slug } = await params;

    // Validate slug exists
    if (!slug || slug.trim() === '') {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    // Check if document exists
    const existingDoc = await adminClient.fetch(`*[_type == "pageView" && slug == $slug][0]`, {
      slug,
    });

    if (existingDoc) {
      // Increment count atomically
      await adminClient.patch(existingDoc._id).inc({ count: 1 }).commit();
    } else {
      // Create document if it doesn't exist
      await adminClient.create({
        _type: 'pageView',
        slug,
        count: 1,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API] Error incrementing page view:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
