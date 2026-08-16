import { Play } from "lucide-react";
import type { Short } from "@/data/shorts";

type CardShortProps = {
  short: Short;
};

// Miniatura oficial do YouTube (baixada e recortada 9:16 em build-time, ver
// scripts/otimizar-imagens.mjs) com botão de play por cima. Não é um player
// embutido de propósito — clicar sempre abre o Short de verdade no YouTube,
// sem carregar o player deles aqui (mais leve, sem dependência de terceiro
// no runtime).
export function CardShort({ short }: CardShortProps) {
  return (
    <a
      href={short.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={short.titulo}
      className="group relative block aspect-9/16 w-full overflow-hidden rounded-2xl shadow-lg"
    >
      <picture>
        <source
          type="image/webp"
          srcSet={`/img/shorts/${short.slug}-800.webp 800w, /img/shorts/${short.slug}-1600.webp 1600w`}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 80vw"
        />
        <img
          src={`/img/shorts/${short.slug}-800.jpg`}
          alt=""
          width={800}
          height={1422}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </picture>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-azul-escuro/70 via-transparent to-transparent"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-branco/90 shadow-lg transition-transform group-hover:scale-110">
          <Play className="ml-1 text-azul-escuro" size={26} fill="currentColor" />
        </span>
      </div>
    </a>
  );
}
