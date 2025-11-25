import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

// Güvenlik için basit token kontrolü
const REVALIDATE_TOKEN = process.env.REVALIDATE_SECRET || 'fts-cache-revalidate-2024';

export async function POST(request: NextRequest) {
  try {
    const { token, paths, tags } = await request.json();

    // Token kontrolü
    if (token !== REVALIDATE_TOKEN) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Path'leri revalidate et
    if (paths && Array.isArray(paths)) {
      for (const path of paths) {
        revalidatePath(path);
      }
    }

    // Tag'leri revalidate et
    if (tags && Array.isArray(tags)) {
      for (const tag of tags) {
        revalidateTag(tag);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Cache başarıyla temizlendi',
      revalidated: {
        paths: paths || [],
        tags: tags || []
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Revalidation failed' },
      { status: 500 }
    );
  }
}