type FotoRetratoProps = {
  slug: string;
  alt: string;
  className?: string;
  prioridade?: boolean;
  sizes?: string;
};

export function FotoRetrato({
  slug,
  alt,
  className = "",
  prioridade = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: FotoRetratoProps) {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`/img/retratos/${slug}-800.webp 800w, /img/retratos/${slug}-1600.webp 1600w`}
        sizes={sizes}
      />
      <img
        src={`/img/retratos/${slug}-800.jpg`}
        alt={alt}
        width={800}
        height={1200}
        className={className}
        loading={prioridade ? "eager" : "lazy"}
        fetchPriority={prioridade ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}
