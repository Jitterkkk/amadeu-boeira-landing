import { shorts } from "@/data/shorts";
import { CardShort } from "@/components/ui/CardShort";
import { Reveal } from "@/components/ui/Reveal";

export function Shorts() {
  return (
    <section className="secao-clara relative py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <h2 className="text-center text-3xl leading-none font-extrabold tracking-tight uppercase sm:text-4xl md:text-5xl">
            <span className="block text-azul-base">Acompanhe</span>
            <span className="block text-azul-escuro">A Trajetória</span>
            <span className="mt-1 inline-block bg-amarelo px-3 py-1 text-azul-escuro">
              De Amadeu
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="no-scrollbar mt-10 flex snap-x snap-mandatory justify-center gap-4 overflow-x-auto">
            {shorts.map((short) => (
              <div key={short.slug} className="w-40 shrink-0 snap-start sm:w-48">
                <CardShort short={short} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
