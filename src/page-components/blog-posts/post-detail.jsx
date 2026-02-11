"use client";

import { getPostImageUrl } from "../../constants/api-url";
import Link from "next/link";
import dayjs from "dayjs";
import PostComments from "../../components/comment/comment.component";
import { Calendar, FolderOpen, ChevronRight } from "lucide-react";

const BlogPostDetailPage = ({
  post,
  categories,
  tags,
  latestPosts,
  uploadsBaseUrl,
}) => {
  const imageUrl = getPostImageUrl(post?.imageUrl);
  const postTags = post?.tags ?? [];
  const postCategory = post?.category;

  return (
    <article className="min-h-screen bg-[#fafaf9]">
      {/* Article hero: featured image + overlay + title & meta */}
      <header className="relative w-full overflow-hidden bg-[#1a1a1a]">
        <div className="relative aspect-[3/1] min-h-[200px] md:min-h-[240px]">
          {imageUrl ? (
            <>
              <img
                src={imageUrl}
                alt={post?.title ?? ""}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent"
                aria-hidden
              />
            </>
          ) : (
            <div
              className="absolute inset-0 bg-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)"
              aria-hidden
            />
          )}
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-5 md:pb-6 pt-8">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-white/80 mb-4" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="w-4 h-4 shrink-0" />
                <Link href="/blog_posts" className="hover:text-white transition-colors">Posts</Link>
                <ChevronRight className="w-4 h-4 shrink-0" />
                <span className="text-white/95 truncate max-w-[180px] md:max-w-none" aria-current="page">
                  {post?.title}
                </span>
              </nav>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight max-w-3xl">
                {post?.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-white/90">
                {post?.createdAt && (
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" aria-hidden />
                    {dayjs(post.createdAt).format("MMM D, YYYY")}
                  </span>
                )}
                {postCategory && (
                  <Link
                    href={`/categories/${postCategory.slug}`}
                    className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <FolderOpen className="w-4 h-4" aria-hidden />
                    {postCategory.name}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {post?.summary && (
              <p className="text-lg md:text-xl text-[#374151] leading-relaxed">
                {post.summary}
              </p>
            )}

            <div
              className="article-prose rounded-2xl bg-white border border-[#e5e5e5] shadow-sm overflow-hidden"
              style={{ padding: "clamp(1.5rem, 4vw, 2.5rem)" }}
            >
              <div
                className="article-prose-body text-[#374151] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post?.content ?? "" }}
              />
            </div>

            {postTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-sm font-medium text-[#6b7280] mr-1">Tags:</span>
                {postTags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/tags/${tag.slug}`}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-[#fef2f2] text-[#82181a] hover:bg-[#fce7e7] transition-colors"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6 lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-2xl bg-white border border-[#e5e5e5] shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-[#e5e5e5] bg-[#fafaf9]">
                <h2 className="text-base font-semibold text-[#1a1a1a]">Latest Posts</h2>
              </div>
              <ul className="divide-y divide-[#e5e5e5]">
                {latestPosts?.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/blog_posts/${p.slug}`}
                      className="block px-5 py-3.5 text-[#374151] hover:bg-[#fef2f2] hover:text-[#82181a] transition-colors line-clamp-2"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl bg-white border border-[#e5e5e5] shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-[#e5e5e5] bg-[#fafaf9]">
                <h2 className="text-base font-semibold text-[#1a1a1a]">Categories</h2>
              </div>
              <ul className="divide-y divide-[#e5e5e5]">
                {categories?.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/categories/${cat.slug}`}
                      className="flex items-center gap-2 px-5 py-3.5 text-[#374151] hover:bg-[#fef2f2] hover:text-[#82181a] transition-colors"
                    >
                      <FolderOpen className="w-4 h-4 shrink-0" />
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl bg-white border border-[#e5e5e5] shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-[#e5e5e5] bg-[#fafaf9]">
                <h2 className="text-base font-semibold text-[#1a1a1a]">Tags</h2>
              </div>
              <div className="p-4 flex flex-wrap gap-2">
                {tags?.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/tags/${tag.slug}`}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-[#f5f5f5] text-[#374151] hover:bg-[#fef2f2] hover:text-[#82181a] transition-colors"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </section>
          </aside>
        </div>

        {/* Comments */}
        <section className="mt-12 md:mt-16 pt-8 border-t border-[#e5e5e5]">
          <PostComments postId={post?.id} />
        </section>
      </div>
    </article>
  );
};

export default BlogPostDetailPage;
