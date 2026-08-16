import { FotoRetrato } from "@/components/ui/FotoRetrato";
import { Reveal } from "@/components/ui/Reveal";

export function Futuro() {
  return (
    <section id="futuro" className="secao-clara relative overflow-hidden px-6 py-20 sm:py-28">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <Reveal>
            <h2 className="text-3xl leading-none font-extrabold tracking-tight uppercase sm:text-4xl md:text-5xl">
              <span className="block text-azul-base">O Futuro</span>
              <span className="block text-azul-escuro">Começa</span>
              <span className="mt-1 inline-block bg-amarelo px-3 py-1 text-azul-escuro">
                Agora!
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 text-base font-bold tracking-wide text-azul-escuro uppercase sm:text-lg">
              Chegou a hora de fazer mais pelo Rio Grande do Sul.
            </p>
          </Reveal>

          <div className="mt-6 flex flex-col gap-5 text-base leading-relaxed text-azul-escuro/80 sm:text-lg">
            <Reveal delay={0.15}>
              <p>
                Durante oito anos, trabalhei para transformar Vacaria com
                planejamento, responsabilidade e resultados.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Agora quero levar essa mesma dedicação para a Assembleia
                Legislativa, defendendo os municípios, fortalecendo a saúde,
                apoiando quem produz, buscando investimentos e lutando por
                mais oportunidades para todas as regiões do Estado.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p>
                Meu compromisso continua sendo o mesmo: trabalhar com
                seriedade, ouvir as pessoas e fazer a política acontecer na
                vida de quem mais precisa.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <p className="mt-8 border-l-4 border-amarelo py-1 pl-4 text-lg font-extrabold tracking-tight text-azul-escuro uppercase sm:text-xl">
              Conto com a sua confiança. Vamos construir esse novo capítulo
              juntos.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <FotoRetrato
            slug="futuro-candidato"
            alt="Amadeu Boeira abraçando uma criança em uma rua de Vacaria"
            sizes="(min-width: 1024px) 439px, calc(100vw - 48px)"
            className="aspect-4/5 w-full rounded-3xl object-cover shadow-2xl"
          />
        </Reveal>
      </div>
    </section>
  );
}
