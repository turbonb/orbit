import Link from "next/link";

import { fetchPublishedBlogPosts } from "@/lib/blog";
import { formatDate, cn } from "@/lib/utils";

export async function BlogSection() {
  const posts = await fetchPublishedBlogPosts(3);

  if (!posts.length) {
    return null;
  }

  return (
    <section id="insights" className="section-shell relative py-24">
      <div className="container space-y-12">
        <header className="max-w-2xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Fresh from the Ops Desk</p>
          <h2 className="display-subheading text-balance text-3xl font-semibold text-foreground sm:text-4xl">
            Supabase-backed workflows that keep Silver Lining responsive.
          </h2>
          <p className="text-base text-white/85 sm:text-lg">
            These notes feed the front-line teams and give prospects a feel for how we operate. Pull
            from them when you need fast copy updates or want to showcase the automation stack.
          </p>
        </header>
        <div className="grid gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className={cn(
                "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_32px_120px_rgba(20,9,40,0.35)] transition hover:border-white/16 hover:bg-white/7"
              )}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/55">
                  <span>{formatDate(post.publishedAt)}</span>
                  {post.readingTimeMinutes ? <span>{post.readingTimeMinutes} min read</span> : null}
                </div>
                <h3 className="text-xl font-semibold text-white transition group-hover:text-accent">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-sm text-white/75">{post.excerpt}</p>
                {post.tags.length ? (
                  <ul className="flex flex-wrap gap-2 pt-3 text-[0.7rem] uppercase tracking-[0.25em] text-white/60">
                    {post.tags.map((tag) => (
                      <li key={tag} className="rounded-full border border-white/20 px-3 py-1">
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <div className="mt-8">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.35em] text-accent transition hover:text-white"
                >
                  Read Article
                  <span aria-hidden className="text-xs">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
