import { elsie } from "@/lib/fonts";

export function FloristeriaPageIntro() {
  return (
    <section
      className="relative overflow-hidden py-14 md:py-20"
      aria-labelledby="floristeria-title"
    >
      <div
        className="absolute inset-0 bg-[#faf9f6]/88 backdrop-blur-[1px]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <div className="mx-auto mb-8 h-px w-24 bg-emerald-300/80" aria-hidden />
        <h1
          id="floristeria-title"
          className={`${elsie.className} text-3xl font-normal tracking-wide text-emerald-950 md:text-8xl`}
        >
          Floristeria Artverd
        </h1>
        <h2
          className={`${elsie.className} mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-emerald-900/90 md:text-xl`}
        >
          Les flors són molt més que simples plantes; són símbols de bellesa,
          amor i emocions.
        </h2>
        <div
          className="mx-auto mt-10 h-px w-24 bg-emerald-300/80"
          aria-hidden
        />
      </div>
    </section>
  );
}
