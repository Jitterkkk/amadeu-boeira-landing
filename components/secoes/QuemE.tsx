import { FotoRetrato } from "@/components/ui/FotoRetrato";
import { Reveal } from "@/components/ui/Reveal";

export function QuemE() {
  return (
    <section id="quem-e" className="secao-clara relative px-6 py-20 sm:py-28">
      <div className="mx-auto flex max-w-5xl flex-col gap-12 lg:flex-row lg:items-center">
        <div className="flex-1">
          <Reveal>
            <h2 className="text-3xl leading-none font-extrabold tracking-tight uppercase sm:text-4xl md:text-5xl">
              <span className="block text-azul-base">Quem é</span>
              <span className="block text-azul-escuro">Amadeu</span>
              <span className="mt-1 inline-block bg-amarelo px-3 py-1 text-azul-escuro">
                Boeira
              </span>
            </h2>
          </Reveal>

          <div className="mt-8 flex flex-col gap-5 text-base leading-relaxed text-azul-escuro/80 sm:text-lg">
            <Reveal delay={0.1}>
              <p>
                Nasci e cresci no interior de Vacaria, em uma família de
                agricultores. Desde cedo aprendi o valor do trabalho, da
                honestidade e da responsabilidade.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                Foi essa trajetória que moldou minha forma de fazer política:
                sempre perto das pessoas, ouvindo, trabalhando e entregando
                resultados.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Como empresário e prefeito de Vacaria por dois mandatos, tive
                a oportunidade de transformar nossa cidade com investimentos
                históricos em saúde, educação, infraestrutura, segurança,
                habitação, agricultura e desenvolvimento.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p>
                Hoje, coloco toda essa experiência à disposição do Rio Grande
                do Sul, porque acredito que quem já fez muito por uma cidade
                pode fazer ainda mais por todo o nosso Estado.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.15} className="flex-1">
          <div className="relative mx-auto max-w-sm">
            <FotoRetrato
              slug="deputado-do-povo"
              alt="Amadeu Boeira ao ar livre, sorrindo, em conversa com moradores"
              sizes="(min-width: 432px) 384px, calc(100vw - 48px)"
              className="aspect-3/4 w-full rounded-3xl object-cover shadow-xl"
            />
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-amarelo px-5 py-2 text-sm font-extrabold tracking-wide text-azul-escuro uppercase shadow-lg whitespace-nowrap">
              Deputado do Povo
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
