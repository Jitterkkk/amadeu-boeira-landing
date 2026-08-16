import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Poppins } from "next/font/google";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { FloatingSocial } from "@/components/ui/FloatingSocial";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

// NEXT_PUBLIC_SITE_URL precisa estar setada no build de produção — o
// fallback abaixo é um domínio placeholder, não o domínio real da campanha.
// Ver README > Deploy.
const SITE_URL_PLACEHOLDER = "https://amadeuboeira.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL_PLACEHOLDER),
  title: "Amadeu Boeira 44661 — Deputado Estadual | União Brasil",
  description:
    "Quem faz de verdade, faz ainda mais pelo Rio Grande. Conheça a trajetória e os resultados de Amadeu Boeira, candidato a Deputado Estadual pelo União Brasil.",
  openGraph: {
    title: "Amadeu Boeira 44661 — Deputado Estadual | União Brasil",
    description: "Quem faz de verdade, faz ainda mais pelo Rio Grande.",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/img/og-image.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        {children}
        <FloatingSocial />
      </body>
    </html>
  );
}
