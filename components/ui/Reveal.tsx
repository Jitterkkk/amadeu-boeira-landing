"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
};

export function Reveal({ children, className = "", y = 32, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const el = ref.current;
    if (prefersReduced || !el) return;

    let cancelado = false;
    let reverter: (() => void) | undefined;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelado) return;

      gsap.registerPlugin(ScrollTrigger);

      // opacity puro (nunca autoAlpha/inert/tabIndex=-1): qualquer coisa
      // que tire o conteúdo da árvore de acessibilidade ou do fluxo de Tab
      // quebra a navegação por teclado — testado e comprovado (ver commit:
      // tabIndex=-1 travava o foco pra sempre porque o navegador só rola
      // até um elemento QUANDO ele recebe foco via Tab, e um elemento fora
      // do fluxo de Tab nunca recebe foco pra começar, então o
      // ScrollTrigger nunca disparava e o link ficava inalcançável).
      // A rolagem nativa do navegador ao focar um elemento abaixo da dobra
      // já cruza o "top 85%" e dispara a revelação sozinha.
      const ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      reverter = () => ctx.revert();
    })();

    return () => {
      cancelado = true;
      reverter?.();
    };
  }, [y, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
