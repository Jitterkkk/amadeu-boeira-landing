import {
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from "@/components/ui/SocialIcons";

const CONTATOS = [
  { href: "https://wa.me/5554996644661", label: "Falar no WhatsApp", Icon: WhatsAppIcon },
  { href: "https://www.facebook.com/amadeu.boeira/", label: "Facebook", Icon: FacebookIcon },
  { href: "https://www.instagram.com/amadeu_boeira/", label: "Instagram", Icon: InstagramIcon },
  { href: "https://youtube.com/@amadeuboeira", label: "YouTube", Icon: YouTubeIcon },
];

export function Footer() {
  return (
    <footer className="bg-azul-escuro px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          <img
            src="/img/marca/logo-amadeu-claro.png"
            alt="Amadeu, Deputado Estadual, número 44661"
            width={1600}
            height={962}
            className="h-auto w-72 sm:w-80 md:w-96"
            loading="lazy"
            decoding="async"
          />
          <div aria-hidden="true" className="hidden h-20 w-px bg-branco/20 sm:block" />
          <img
            src="/img/marca/logo-uniao-brasil.png"
            alt="União Brasil"
            width={1600}
            height={222}
            className="h-auto w-56 sm:w-64 md:w-72"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div aria-hidden="true" className="faixa-rs h-1.5 w-32 rounded-full" />

        <div className="flex flex-col items-center gap-3">
          <p className="text-sm font-bold tracking-wide text-branco/70 uppercase">
            Visite nossas redes sociais
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {CONTATOS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 items-center gap-2 rounded-full border-2 border-branco/50 px-6 py-3 text-sm font-bold tracking-wide text-branco uppercase transition-colors hover:border-amarelo hover:bg-amarelo hover:text-azul-escuro"
              >
                <Icon size={20} />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
