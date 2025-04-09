import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const content = formData.get('content') as string;
    const postType = formData.get('postType') as string;
    const file = formData.get('file') as File | null;

    // Basic validation
    if (!content || !postType) {
      return NextResponse.json(
        { error: 'Content and post type are required' },
        { status: 400 }
      );
    }

    let mediaUrl = '';

    // Handle file upload if present
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique filename
      const filename = `${Date.now()}-${file.name}`;
      const uploadDir = join(process.cwd(), 'public', 'uploads');
      const filepath = join(uploadDir, filename);

      // Save file
      await writeFile(filepath, buffer);
      mediaUrl = `/uploads/${filename}`;
    }

    // Create post object
    const post = {
      id: Date.now(),
      content,
      postType,
      mediaUrl,
      user: {
        name: 'Current User', // This should be replaced with actual user data
        position: 'Employee',
        avatar: '👤'
      },
      timestamp: new Date().toISOString(),
      likes: 0,
      isLiked: false
    };

    // In a real application, save this to a database
    // For now, we'll just return the created post
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Error creating post' },
      { status: 500 }
    );
  }
}