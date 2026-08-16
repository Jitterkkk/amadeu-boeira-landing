# Amadeu Boeira 44661 — Landing Page

Landing page single-page da campanha de Amadeu Boeira a Deputado Estadual (União
Brasil, 44661). Next.js 16 com export estático, mobile-first, para deploy no
Cloudflare Pages.

## Stack

- Next.js 16 (App Router) com `output: 'export'`
- TypeScript strict
- Tailwind CSS v4 (`@theme` em `app/globals.css`)
- GSAP + ScrollTrigger (reveals das seções abaixo da dobra)
- Lenis (scroll suave, desliga com `prefers-reduced-motion`)
- sharp (pipeline de imagem em build-time)
- lucide-react (ícones)

Sem backend, sem formulário, sem coleta de dado de usuário.

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000`.

## Adicionando ou trocando uma foto

1. Coloque o arquivo original em `amadeu_imgs/` (pasta ignorada pelo git —
   nunca é versionada, só existe localmente).
2. Adicione uma entrada no `MANIFEST` de
   [scripts/otimizar-imagens.mjs](scripts/otimizar-imagens.mjs) com o nome do
   arquivo, um `slug`, o `mode` (`projeto` para os cards da grade de
   resultados — recorte 3:2 inteligente; `retrato` para fotos de seção sem
   recorte; `marca` para logos com transparência) e a pasta de saída.
3. Rode:

   ```bash
   npm run otimizar
   ```

   O script é idempotente: só gera o que ainda não existe em `public/img/`.
   Para forçar reprocessamento de um item, apague os arquivos de saída dele
   antes de rodar de novo.
4. Se for uma foto de projeto, aponte o campo `foto` do projeto correspondente
   em [data/projetos.ts](data/projetos.ts) para o `slug` usado. Projetos sem
   foto usam `foto: null` e caem automaticamente no placeholder de marca.

Para reinventariar a pasta de origem (dimensões, peso, orientação, GPS no
EXIF) a qualquer momento:

```bash
npm run inventario
```

## Build de produção

```bash
npm run build
```

Gera o site estático em `out/`. O build falha se houver erro de tipo
(`next build` roda `tsc` internamente); para checar isoladamente:

```bash
npx tsc --noEmit
npm run lint
```

## Deploy — Cloudflare Pages

1. No painel da Cloudflare, crie um projeto Pages conectado a este
   repositório (ou use `npx wrangler pages deploy out`).
2. Configuração de build:
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
3. **Obrigatório antes de ir para produção:** defina a variável de ambiente
   `NEXT_PUBLIC_SITE_URL` com o domínio real da campanha (ex:
   `https://amadeuboeira.com.br`) no painel do Cloudflare Pages. Ela vira o
   `metadataBase` em `app/layout.tsx`, usado para montar as URLs absolutas
   do Open Graph (imagem de compartilhamento, etc). Sem essa variável, o
   build usa um domínio placeholder e o preview de link nas redes sociais
   sai errado.

## Estrutura

```
app/                  App Router (layout, página, globals.css)
components/secoes/    As 4 seções da página (Hero, QuemE, Resultados, Futuro)
components/ui/        Componentes reutilizáveis (FotoProjeto, FotoRetrato, LogoAmadeu, Reveal, SmoothScroll)
data/projetos.ts      Dados tipados das áreas/projetos de "Resultados que Falam por Si"
lib/icons.ts          Mapa de ícones lucide-react usados nos placeholders
scripts/              Pipeline de imagem (inventário + otimização)
amadeu_imgs/          Fotos de origem, não versionado — só local
public/img/           Fotos otimizadas (gerado por npm run otimizar, versionado)
```
