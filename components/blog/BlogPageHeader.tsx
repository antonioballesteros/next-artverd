import { elsie } from "@/lib/fonts";

export function BlogPageHeader() {
  return (
    <header
      className="via-background to-background relative overflow-hidden bg-linear-to-b from-emerald-100/90 pt-28 pb-10 md:pt-32 md:pb-14"
      aria-labelledby="blog-page-title"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgb(5 78 58) 0%, transparent 45%), radial-gradient(circle at 80% 60%, rgb(16 185 129) 0%, transparent 40%)",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-4 text-center">
        <h1
          id="blog-page-title"
          className={`${elsie.className} text-4xl font-normal tracking-wide text-emerald-950 md:text-6xl`}
        >
          Blog
        </h1>
        <div
          className="mx-auto mt-6 h-px w-32 origin-center bg-emerald-400/90 motion-safe:animate-[blog-title-line_0.9s_ease-out_both] motion-reduce:opacity-100"
          aria-hidden
        />
      </div>
    </header>
  );
}
