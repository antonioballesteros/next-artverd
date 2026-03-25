import { PenLine } from "lucide-react";
import Link from "next/link";

export function FloristeriaContactCta() {
  return (
    <section className="px-4 py-16 md:py-24" aria-label="Contacte">
      <div className="mx-auto flex max-w-3xl justify-center">
        <Link
          href="/contacte"
          className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-emerald-800 px-8 py-3.5 text-sm font-semibold tracking-wide text-white uppercase shadow-md transition hover:bg-emerald-900 md:px-10"
        >
          <PenLine className="h-5 w-5 shrink-0" aria-hidden strokeWidth={2} />
          Contacta amb nosaltres
        </Link>
      </div>
    </section>
  );
}
