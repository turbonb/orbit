const SUMMARY_FIELDS =
  "id, slug, title, excerpt, hero_image_url, hero_image_alt, reading_time_minutes, published_at, tags";
const DETAIL_FIELDS = `${SUMMARY_FIELDS}, content_markdown`;

function resolveSupabasePublicConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.");
  }

  return { url, anonKey };
}

export interface BlogPostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  heroImageUrl: string | null;
  heroImageAlt: string | null;
  readingTimeMinutes: number | null;
  publishedAt: string | null;
  tags: string[];
}

export interface BlogPostDetail extends BlogPostSummary {
  contentMarkdown: string;
}

function mapSummary(raw: Record<string, any>): BlogPostSummary {
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    excerpt: raw.excerpt ?? null,
    heroImageUrl: raw.hero_image_url ?? null,
    heroImageAlt: raw.hero_image_alt ?? null,
    readingTimeMinutes: raw.reading_time_minutes ?? null,
    publishedAt: raw.published_at ?? null,
    tags: Array.isArray(raw.tags) ? raw.tags : []
  };
}

function mapDetail(raw: Record<string, any>): BlogPostDetail {
  return {
    ...mapSummary(raw),
    contentMarkdown: raw.content_markdown ?? ""
  };
}

export async function fetchPublishedBlogPosts(limit = 6): Promise<BlogPostSummary[]> {
  const { url, anonKey } = resolveSupabasePublicConfig();
  const search = new URLSearchParams({
    select: SUMMARY_FIELDS,
    status: "eq.published",
    order: "published_at.desc.nulls last",
    limit: limit.toString()
  });
  search.append("published_at", `lte.${new Date().toISOString()}`);

  const response = await fetch(`${url}/rest/v1/blog_posts?${search.toString()}`, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`
    },
    next: { revalidate: 60 }
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Failed to fetch blog posts: ${detail}`);
  }

  const rows = (await response.json()) as Record<string, any>[];
  return rows.map(mapSummary);
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  const { url, anonKey } = resolveSupabasePublicConfig();
  const search = new URLSearchParams({
    select: DETAIL_FIELDS,
    slug: `eq.${slug}`,
    status: "eq.published"
  });
  search.append("published_at", `lte.${new Date().toISOString()}`);

  const response = await fetch(`${url}/rest/v1/blog_posts?${search.toString()}`, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`
    },
    next: { revalidate: 60 }
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Failed to fetch blog post: ${detail}`);
  }

  const rows = (await response.json()) as Record<string, any>[];
  if (rows.length === 0) {
    return null;
  }

  return mapDetail(rows[0]);
}
