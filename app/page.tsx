import { Hero } from "@/components/secoes/Hero";
import { QuemE } from "@/components/secoes/QuemE";
import { Resultados } from "@/components/secoes/Resultados";
import { Shorts } from "@/components/secoes/Shorts";
import { Futuro } from "@/components/secoes/Futuro";
import { Footer } from "@/components/secoes/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <QuemE />
        <Resultados />
        <Shorts />
        <Futuro />
      </main>
      <Footer />
    </>
  );
}
