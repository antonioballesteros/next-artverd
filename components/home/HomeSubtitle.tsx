import { elsie } from "@/lib/fonts";

interface HomeSubtitleProps {
  children: React.ReactNode;
}

export function HomeSubtitle({ children }: HomeSubtitleProps) {
  return (
    <h2
      className={`${elsie.className} bg-background px-4 py-14 text-center text-2xl text-emerald-950 md:py-20 md:text-6xl`}
    >
      {children}
    </h2>
  );
}
