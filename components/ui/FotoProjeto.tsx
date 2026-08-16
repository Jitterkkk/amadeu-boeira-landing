import { ICONES, ICONE_PADRAO } from "@/lib/icons";

type FotoProjetoProps = {
  foto: string | null;
  alt: string;
  /** nome do ícone lucide-react usado no placeholder quando não há foto */
  icone: string;
  className?: string;
};

const SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

export function FotoProjeto({ foto, alt, icone, className = "" }: FotoProjetoProps) {
  const Icone = ICONES[icone] ?? ICONE_PADRAO;

  return (
    <div
      className={`relative aspect-3/2 w-full overflow-hidden rounded-xl bg-brand-radial ${className}`}
    >
      {foto ? (
        <picture>
          <source
            type="image/webp"
            srcSet={`/img/projetos/${foto}-800.webp 800w, /img/projetos/${foto}-1600.webp 1600w`}
            sizes={SIZES}
          />
          <img
            src={`/img/projetos/${foto}-800.jpg`}
            alt={alt}
            width={800}
            height={533}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </picture>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Icone
            className="text-amarelo"
            style={{ opacity: 0.2 }}
            size={64}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}
