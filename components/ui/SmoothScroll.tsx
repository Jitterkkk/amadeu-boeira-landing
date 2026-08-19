"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let cancelado = false;
    let destruir: (() => void) | undefined;

    // Import dinâmico: gsap + lenis não entram no bundle inicial, só
    // carregam depois que a página já pintou (mantém o LCP livre delas).
    (async () => {
      const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
      if (cancelado) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);

      const onTick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      // O Lenis calcula o limite de scroll a partir da altura do documento
      // num dado momento. Se algo muda essa altura depois (imagem sem
      // width/height que só reserva o espaço certo quando termina de
      // carregar, seção que revela por scroll, fonte trocando via
      // font-display: swap...), o limite antigo fica desatualizado e o
      // scroll para antes do fim de verdade da página. Um ResizeObserver
      // no <body> resolve isso de forma genérica, sem depender de caçar
      // cada causa possível uma por uma.
      const resizeObserver = new ResizeObserver(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      });
      resizeObserver.observe(document.body);

      destruir = () => {
        resizeObserver.disconnect();
        gsap.ticker.remove(onTick);
        lenis.destroy();
      };
    })();

    return () => {
      cancelado = true;
      destruir?.();
    };
  }, []);

  return null;
}
