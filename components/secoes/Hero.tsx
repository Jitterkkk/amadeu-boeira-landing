export function Hero() {
  return (
    <section className="relative isolate overflow-hidden text-center">
      {/* React 19 eleva este <link> para o <head> automaticamente. Mesmo
          srcset/sizes do <picture> abaixo — senão o preload baixa um
          arquivo e o navegador decide servir outro, pagando o peso duas
          vezes. (Testado: sem isso, nenhum preload é gerado pro hero —
          React não faz isso sozinho pra <img> dentro de <picture>.)
          Dois preloads porque o banner muda no breakpoint lg — o navegador
          só busca o que realmente vai usar, pela media query. */}
      <link
        rel="preload"
        as="image"
        type="image/webp"
        media="(min-width: 1024px)"
        href="/img/retratos/hero-banner-800.webp"
        imageSrcSet="/img/retratos/hero-banner-800.webp 800w, /img/retratos/hero-banner-1600.webp 1600w"
        imageSizes="100vw"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        type="image/webp"
        media="(max-width: 1023px)"
        href="/img/retratos/hero-banner-mobile-800.webp"
        imageSrcSet="/img/retratos/hero-banner-mobile-800.webp 800w, /img/retratos/hero-banner-mobile-1600.webp 1600w"
        imageSizes="100vw"
        fetchPriority="high"
      />

      {/* Banner já traz nome, número e frase de campanha embutidos na
          imagem — o h1 abaixo existe só pra manter a hierarquia de
          heading/SEO da página, sem duplicar o texto visualmente. */}
      <h1 className="sr-only">
        Amadeu Boeira, Deputado Estadual 44661. Coragem para decidir,
        compromisso para fazer.
      </h1>

      {/* Largura cheia, sem moldura — o banner É o topo da página.
          Abaixo de 1024px troca pra variante vertical (a landscape vira
          uma tira fina demais em tela de celular/tablet). */}
      <div className="hero-cascata hero-cascata-foto relative z-10 mx-auto w-full max-w-[1920px]">
        <picture>
          <source
            media="(min-width: 1024px)"
            type="image/webp"
            srcSet="/img/retratos/hero-banner-800.webp 800w, /img/retratos/hero-banner-1600.webp 1600w"
            sizes="100vw"
          />
          <source
            media="(min-width: 1024px)"
            srcSet="/img/retratos/hero-banner-800.jpg"
          />
          <source
            type="image/webp"
            srcSet="/img/retratos/hero-banner-mobile-800.webp 800w, /img/retratos/hero-banner-mobile-1600.webp 1600w"
            sizes="100vw"
          />
          <img
            src="/img/retratos/hero-banner-mobile-800.jpg"
            alt="Amadeu, Deputado Estadual, número 44661. Coragem para decidir. Compromisso para fazer."
            width={1200}
            height={1600}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="block h-auto w-full"
          />
        </picture>
      </div>
    </section>
  );
}
