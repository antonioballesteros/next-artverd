import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { BLOG_POSTS } from "@/lib/blogPosts";

export function BlogPostGrid() {
  return (
    <div
      id="blog-posts"
      className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-8 px-4 pb-20 md:grid-cols-2 md:gap-10 md:pb-28 lg:grid-cols-3"
    >
      {BLOG_POSTS.map((post) => (
        <BlogPostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
