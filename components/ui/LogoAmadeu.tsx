type LogoAmadeuProps = {
  className?: string;
  prioridade?: boolean;
  /** "escuro" (letras azuis, pra fundo branco/claro) ou "claro" (letras brancas, pra fundo azul) */
  variante?: "escuro" | "claro";
};

// Lockup AMADEU / DEPUTADO ESTADUAL / 44661. Duas variantes porque o
// arquivo original só vem com letras azuis (pensado pra fundo branco) —
// "claro" é extraída via scripts/otimizar-imagens.mjs a partir da prova de
// cor que a campanha mandou, pra não ficar apagada sobre fundo azul.
// Trocar aqui quando os SVGs oficiais das duas versões chegarem.
export function LogoAmadeu({
  className = "",
  prioridade = false,
  variante = "escuro",
}: LogoAmadeuProps) {
  const src =
    variante === "claro"
      ? "/img/marca/logo-amadeu-claro.png"
      : "/img/marca/logo-amadeu.png";

  return (
    <img
      src={src}
      alt="Amadeu, Deputado Estadual, número 44661"
      className={className}
      loading={prioridade ? "eager" : "lazy"}
      fetchPriority={prioridade ? "high" : "auto"}
      decoding="async"
    />
  );
}
