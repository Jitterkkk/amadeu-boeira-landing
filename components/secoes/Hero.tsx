import { ChevronDown } from "lucide-react";
import { FotoRetrato } from "@/components/ui/FotoRetrato";
import { LogoAmadeu } from "@/components/ui/LogoAmadeu";

const HERO_SIZES = "(min-width: 640px) 288px, 224px";

export function Hero() {
  return (
    <section className="bg-brand-radial relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      {/* React 19 eleva este <link> para o <head> automaticamente. Mesmo
          srcset/sizes do <picture> abaixo — senão o preload baixa um
          arquivo e o navegador decide servir outro, pagando o peso duas
          vezes. (Testado: sem isso, nenhum preload é gerado pro hero —
          React não faz isso sozinho pra <img> dentro de <picture>.) */}
      <link
        rel="preload"
        as="image"
        type="image/webp"
        href="/img/retratos/hero-candidato-800.webp"
        imageSrcSet="/img/retratos/hero-candidato-800.webp 800w, /img/retratos/hero-candidato-1600.webp 1600w"
        imageSizes={HERO_SIZES}
        fetchPriority="high"
      />

      <p
        aria-hidden="true"
        className="hero-cascata hero-cascata-numero pointer-events-none absolute inset-0 flex select-none items-center justify-center font-extrabold text-azul-escuro/50"
        style={{ fontSize: "clamp(5rem, 32vw, 22rem)", lineHeight: 1 }}
      >
        44661
      </p>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-12 top-16 h-40 w-40 rotate-12 rounded-3xl bg-amarelo/90 sm:h-56 sm:w-56"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-24 h-32 w-32 -rotate-12 rounded-full bg-amarelo/80 sm:h-48 sm:w-48"
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="hero-cascata hero-cascata-foto">
          <FotoRetrato
            slug="hero-candidato"
            alt="Amadeu Boeira, candidato a Deputado Estadual"
            prioridade
            sizes={HERO_SIZES}
            className="h-64 w-52 rounded-3xl object-cover shadow-2xl sm:h-80 sm:w-64"
          />
        </div>

        <h1 className="hero-cascata hero-cascata-headline max-w-3xl text-4xl leading-tight font-extrabold tracking-tight text-branco uppercase sm:text-5xl md:text-6xl">
          Quem faz de verdade,{" "}
          <span className="text-amarelo">faz ainda mais pelo Rio Grande.</span>
        </h1>

        {/* Assinatura só com a logo do Amadeu — o lockup já carrega o selo do
            partido, e o logo do União Brasil por extenso mora no footer.
            Repetir os dois aqui deixava esse trecho parecendo um rodapé
            perdido no meio da página. */}
        <div className="hero-cascata hero-cascata-assinatura flex flex-col items-center gap-3">
          <LogoAmadeu prioridade variante="claro" className="h-auto w-64 sm:w-72" />
          <div aria-hidden="true" className="faixa-rs h-1.5 w-40 rounded-full" />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce text-branco/70"
      >
        <ChevronDown size={28} />
      </div>
    </section>
  );
}
