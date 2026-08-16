import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";

const REDES = [
  {
    href: "https://wa.me/5554996644661",
    label: "Falar no WhatsApp",
    Icon: WhatsAppIcon,
    className: "bg-azul-escuro text-branco",
  },
  {
    href: "https://www.facebook.com/amadeu.boeira/",
    label: "Facebook de Amadeu Boeira",
    Icon: FacebookIcon,
    className: "bg-azul-escuro text-branco",
  },
  {
    href: "https://www.instagram.com/amadeu_boeira/",
    label: "Instagram de Amadeu Boeira",
    Icon: InstagramIcon,
    className: "bg-azul-escuro text-branco",
  },
];

// Fica fixo na tela, acima de tudo, em qualquer ponto do scroll — acesso
// direto às redes sociais sem precisar rolar até o footer.
export function FloatingSocial() {
  return (
    <div
      aria-label="Redes sociais"
      className="fixed right-4 bottom-4 z-50 flex flex-col gap-3 sm:right-6 sm:bottom-6"
    >
      {REDES.map(({ href, label, Icon, className }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110 ${className}`}
        >
          <Icon size={22} />
        </a>
      ))}
    </div>
  );
}
