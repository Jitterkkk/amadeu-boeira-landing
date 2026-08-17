import { ChevronDown } from "lucide-react";

const BANNER_SIZES = "(min-width: 1024px) 1024px, calc(100vw - 32px)";

export function Hero() {
  return (
    <section className="bg-brand-radial relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16 text-center sm:px-6">
      {/* React 19 eleva este <link> para o <head> automaticamente. Mesmo
          srcset/sizes do <picture> abaixo — senão o preload baixa um
          arquivo e o navegador decide servir outro, pagando o peso duas
          vezes. (Testado: sem isso, nenhum preload é gerado pro hero —
          React não faz isso sozinho pra <img> dentro de <picture>.) */}
      <link
        rel="preload"
        as="image"
        type="image/webp"
        href="/img/retratos/hero-banner-800.webp"
        imageSrcSet="/img/retratos/hero-banner-800.webp 800w, /img/retratos/hero-banner-1600.webp 1600w"
        imageSizes={BANNER_SIZES}
        fetchPriority="high"
      />

      {/* Banner já traz nome, número e frase de campanha embutidos na
          imagem — o h1 abaixo existe só pra manter a hierarquia de
          heading/SEO da página, sem duplicar o texto visualmente. */}
      <h1 className="sr-only">
        Amadeu Boeira, Deputado Estadual 44661. Coragem para decidir,
        compromisso para fazer.
      </h1>

      <p
        aria-hidden="true"
        className="hero-cascata hero-cascata-numero pointer-events-none absolute inset-0 flex select-none items-center justify-center font-extrabold text-azul-escuro/50"
        style={{ fontSize: "clamp(5rem, 32vw, 22rem)", lineHeight: 1 }}
      >
        44661
      </p>

      <div className="hero-cascata hero-cascata-foto relative z-10 w-full max-w-5xl">
        <picture>
          <source
            type="image/webp"
            srcSet="/img/retratos/hero-banner-800.webp 800w, /img/retratos/hero-banner-1600.webp 1600w"
            sizes={BANNER_SIZES}
          />
          <img
            src="/img/retratos/hero-banner-800.jpg"
            alt="Amadeu, Deputado Estadual, número 44661. Coragem para decidir. Compromisso para fazer."
            width={1280}
            height={400}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-auto w-full shadow-2xl"
          />
        </picture>
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
