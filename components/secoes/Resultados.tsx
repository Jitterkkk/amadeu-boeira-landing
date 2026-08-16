"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import { areas, type Area } from "@/data/projetos";
import { FotoProjeto } from "@/components/ui/FotoProjeto";
import { Reveal } from "@/components/ui/Reveal";

export function Resultados() {
  const [ativaId, setAtivaId] = useState(areas[0].id);
  const [focoId, setFocoId] = useState(areas[0].id);
  const gridRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const baseId = useId();

  const areaAtiva = areas.find((a) => a.id === ativaId) ?? areas[0];

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const grid = gridRef.current;
    if (prefersReduced || !grid) return;

    let cancelado = false;
    (async () => {
      const { default: gsap } = await import("gsap");
      if (cancelado) return;
      const cartoes = grid.querySelectorAll("[data-card]");
      // opacity puro, não autoAlpha — ver nota em components/ui/Reveal.tsx
      gsap.fromTo(
        cartoes,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out" }
      );
    })();

    return () => {
      cancelado = true;
    };
  }, [ativaId]);

  function selecionar(id: string) {
    setAtivaId(id);
    setFocoId(id);
  }

  function aoTeclar(e: React.KeyboardEvent<HTMLButtonElement>, area: Area, index: number) {
    switch (e.key) {
      case "ArrowRight": {
        e.preventDefault();
        const alvo = areas[(index + 1) % areas.length];
        setFocoId(alvo.id);
        tabRefs.current[alvo.id]?.focus();
        break;
      }
      case "ArrowLeft": {
        e.preventDefault();
        const alvo = areas[(index - 1 + areas.length) % areas.length];
        setFocoId(alvo.id);
        tabRefs.current[alvo.id]?.focus();
        break;
      }
      case "Home": {
        e.preventDefault();
        setFocoId(areas[0].id);
        tabRefs.current[areas[0].id]?.focus();
        break;
      }
      case "End": {
        e.preventDefault();
        const ultimo = areas[areas.length - 1];
        setFocoId(ultimo.id);
        tabRefs.current[ultimo.id]?.focus();
        break;
      }
      case "Enter":
      case " ": {
        e.preventDefault();
        selecionar(area.id);
        break;
      }
      default:
        break;
    }
  }

  return (
    <section id="resultados" className="bg-brand-radial relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="text-center text-3xl leading-none font-extrabold tracking-tight uppercase sm:text-4xl md:text-5xl">
            <span className="block text-branco">Resultados que</span>
            <span className="mt-1 inline-block bg-amarelo px-3 py-1 text-azul-escuro">
              Falam por si
            </span>
          </h2>
        </Reveal>
      </div>

      <div className="sticky top-0 z-20 mt-10 bg-azul-base/95 py-3 backdrop-blur-sm md:static md:bg-transparent md:backdrop-blur-none">
        <div
          role="tablist"
          aria-label="Áreas de resultados"
          className="no-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto px-6 md:flex-wrap md:justify-center md:overflow-visible"
        >
          {areas.map((area, index) => {
            const ativa = area.id === ativaId;
            return (
              <button
                key={area.id}
                ref={(el) => {
                  tabRefs.current[area.id] = el;
                }}
                role="tab"
                type="button"
                id={`${baseId}-tab-${area.id}`}
                aria-selected={ativa}
                aria-controls={`${baseId}-painel-${areaAtiva.id}`}
                tabIndex={focoId === area.id ? 0 : -1}
                onClick={() => selecionar(area.id)}
                onFocus={() => setFocoId(area.id)}
                onKeyDown={(e) => aoTeclar(e, area, index)}
                className={`shrink-0 snap-start rounded-full px-5 py-2.5 text-sm font-bold tracking-wide uppercase whitespace-nowrap transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-branco ${
                  ativa
                    ? "bg-amarelo text-azul-escuro"
                    : "bg-branco/10 text-branco hover:bg-branco/20"
                }`}
              >
                {area.nome}
              </button>
            );
          })}
        </div>
      </div>

      <div
        ref={gridRef}
        role="tabpanel"
        id={`${baseId}-painel-${areaAtiva.id}`}
        aria-labelledby={`${baseId}-tab-${areaAtiva.id}`}
        className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {areaAtiva.projetos.map((projeto) => (
          <article
            key={projeto.id}
            data-card
            className="flex flex-col overflow-hidden rounded-2xl bg-branco/5 ring-1 ring-branco/10"
          >
            <FotoProjeto
              foto={projeto.foto}
              alt={projeto.alt || projeto.titulo}
              icone={areaAtiva.icone}
            />
            <div className="flex flex-1 flex-col gap-2 p-5">
              <h3 className="text-lg font-extrabold tracking-tight text-branco uppercase">
                {projeto.titulo}
              </h3>
              <p className="text-sm leading-relaxed text-branco/85">
                {projeto.descricao}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
