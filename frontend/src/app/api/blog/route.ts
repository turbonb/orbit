import { NextResponse } from "next/server";

import { fetchPublishedBlogPosts } from "@/lib/blog";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limitParam = url.searchParams.get("limit");
  const limit = limitParam ? Math.min(Math.max(Number.parseInt(limitParam, 10) || 0, 1), 24) : 6;

  try {
    const posts = await fetchPublishedBlogPosts(limit);
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Failed to fetch blog posts", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to fetch blog posts right now. Please try again later."
      },
      { status: 500 }
    );
  }
}
