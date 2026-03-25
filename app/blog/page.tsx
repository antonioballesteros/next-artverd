import { BlogPageHeader, BlogPostGrid } from "@/components/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notícies i consells de floristeria Art Verd a Terrassa: colors de les roses, primavera i flors per a esdeveniments.",
};

export default function BlogPage() {
  return (
    <>
      <BlogPageHeader />
      <BlogPostGrid />
    </>
  );
}
