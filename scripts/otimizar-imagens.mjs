// Passo 2 do pipeline de imagens: otimiza fotos brutas de amadeu_imgs/ para public/img/.
// Idempotente — pula qualquer saída que já exista. Ver PROJETO (instruções do pipeline).
import { mkdir, stat, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC_DIR = path.join(ROOT, "amadeu_imgs");
const OUT_DIR = path.join(ROOT, "public", "img");

const WIDTHS = [800, 1600];
const QUALITY = 82;

// mode "projeto": crop 3:2 com crop inteligente (attention). Usado nos cards da grade.
// mode "retrato": mantém proporção original, só redimensiona (respeita o teto de 1600px).
// mode "marca": logos/lockups com transparência — PNG, sem crop, sem lossy.
const MANIFEST = [
  {
    src: "Camada-7.jpg.jpeg",
    slug: "150km-asfalto",
    mode: "projeto",
    dir: "projetos",
  },
  {
    // Trocada por uma foto mais clara de entrega de material (mochilas
    // "Município de Vacaria"). A antiga (Camada-8, criança calçando tênis)
    // fica disponível como sobra em public/img/projetos se quiser reverter.
    src: "imagens_projetos/20230531_181800__dsc5428.jpg.jpeg",
    slug: "uniformes-material-tenis",
    mode: "projeto",
    dir: "projetos",
  },
  // Camada-2.jpg.jpeg (médico/paciente) e Camada-6-copiar.jpg.jpeg
  // (operários) foram removidas daqui de propósito: eu tinha associado
  // essas fotos a "Nova UBS" e "Distrito Industrial" por conta própria,
  // sem confirmação. Em material eleitoral, foto genérica sob uma
  // afirmação de obra específica é uma declaração factual — não associar
  // foto a projeto sem confirmação humana explícita. Se um dia forem
  // confirmadas, basta devolver a entrada aqui e apontar o `foto` do
  // projeto correspondente em data/projetos.ts.
  //
  // Lote novo (amadeu_imgs/imagens_projetos/) — fotos reais e
  // identificáveis (placa, fachada, crachá), mapeadas olhando o conteúdo
  // de cada uma, não o nome do arquivo.
  {
    src: "imagens_projetos/20220306_121207_dsc00305.jpg.jpeg",
    slug: "novas-esf",
    mode: "projeto",
    dir: "projetos",
  },
  {
    src: "imagens_projetos/20240426_150516_dji_20240426134206_0025_d.jpg.jpeg",
    slug: "nova-farmacia-municipal",
    mode: "projeto",
    dir: "projetos",
  },
  {
    src: "imagens_projetos/20230915_170629__dsc0309.jpg.jpeg",
    slug: "farmacia-movel",
    mode: "projeto",
    dir: "projetos",
  },
  {
    src: "imagens_projetos/materno-1.jpg.jpeg",
    slug: "unidade-obstetrica-maternal",
    mode: "projeto",
    dir: "projetos",
  },
  {
    src: "imagens_projetos/20211109_112549_3 (1).jpg.jpeg",
    slug: "frota-saude",
    mode: "projeto",
    dir: "projetos",
  },
  {
    src: "imagens_projetos/20241121_143414_a7r05998.jpg.jpeg",
    slug: "base-samu",
    mode: "projeto",
    dir: "projetos",
  },
  {
    src: "imagens_projetos/WhatsApp Image 2026-08-15 at 14.32.08.jpeg",
    slug: "investimentos-escolas",
    mode: "projeto",
    dir: "projetos",
  },
  {
    src: "imagens_projetos/20241218_142431__dsc6207.jpg.jpeg",
    slug: "almoxarifado-smed",
    mode: "projeto",
    dir: "projetos",
  },
  {
    src: "imagens_projetos/DJI_0709-scaled.jpg.jpeg",
    slug: "aeroporto",
    mode: "projeto",
    dir: "projetos",
  },
  {
    src: "imagens_projetos/20241219_152953_dji_20241218082332_0014_d.jpg.jpeg",
    slug: "parque-maquinas",
    mode: "projeto",
    dir: "projetos",
  },
  {
    src: "imagens_projetos/20230308_184356__dsc8359.jpg.jpeg",
    slug: "coordenadoria-mulher",
    mode: "projeto",
    dir: "projetos",
  },
  {
    // Placa "Viaduto sobre a Rede Ferroviária Engenheiro João Alfredo
    // Acauan" — confirmado pelo usuário como o do Kennedy/Jardim América.
    src: "imagens_projetos/20200812_094308_img_0965.jpg.jpeg",
    slug: "viaduto-kennedy-jardim-america",
    mode: "projeto",
    dir: "projetos",
  },
  {
    src: "imagens_projetos/5670895_e8f52cf681d4d0c.webp",
    slug: "viaduto-br116",
    mode: "projeto",
    dir: "projetos",
  },
  {
    // Aérea com via + prédios ao fundo — por eliminação, é a Perimetral
    // (o usuário mandou uma foto nova e específica pro Distrito Industrial).
    src: "imagens_projetos/20240425_103313_dji_0021-1-.jpg.jpeg",
    slug: "perimetral",
    mode: "projeto",
    dir: "projetos",
  },
  {
    src: "imagens_projetos/Design sem nome (6).jpg.jpeg",
    slug: "distrito-industrial",
    mode: "projeto",
    dir: "projetos",
  },
  {
    src: "imagens_projetos/20210115_185023_5.jpg.jpeg",
    slug: "iluminacao-led",
    mode: "projeto",
    dir: "projetos",
  },
  // uti1.jpg.jpeg — leito de hospital genérico, sobra disponível pra
  // Unidade Obstétrica Maternal se quiser uma segunda foto.
  // 20210115_185021_4.jpg.jpeg — a original de 159x117px, substituída pela
  // 20210115_185023_5.jpg.jpeg (mesma cena, resolução usável).
  {
    // Substituída pelo banner pronto (logo + foto + frase) mandado depois.
    // Fica como sobra caso queira voltar ao layout anterior do Hero.
    src: "A7R00812.jpg.jpeg",
    slug: "hero-candidato",
    mode: "retrato",
    dir: "retratos",
  },
  {
    // Banner completo pra Hero — landscape, mantém proporção original
    // (sem crop), "retrato" aqui só significa "não recortar".
    src: "imagens_projetos/WhatsApp Image 2026-08-17 at 19.58.43.jpeg",
    slug: "hero-banner",
    mode: "retrato",
    dir: "retratos",
  },
  {
    src: "A7R00787.jpg.jpeg",
    slug: "sobre-candidato",
    mode: "retrato",
    dir: "retratos",
  },
  {
    src: "Camada-1.jpg.jpeg",
    slug: "deputado-do-povo",
    mode: "retrato",
    dir: "retratos",
  },
  {
    src: "Camada-4.jpg.jpeg",
    slug: "futuro-candidato",
    mode: "retrato",
    dir: "retratos",
  },
  {
    src: "logo opção  amadeu-02 (1).png",
    slug: "logo-amadeu",
    mode: "marca",
    dir: "marca",
  },
  {
    src: "Uniao_Brasil_44_Sobre_BGAZUL_Horizontal.png",
    slug: "logo-uniao-brasil",
    mode: "marca",
    dir: "marca",
  },
];

async function existeTudo(outDir, slug, mode) {
  const nomes =
    mode === "marca"
      ? [`${slug}.png`]
      : [
          `${slug}-800.webp`,
          `${slug}-1600.webp`,
          `${slug}-800.jpg`,
        ];
  for (const nome of nomes) {
    try {
      await stat(path.join(outDir, nome));
    } catch {
      return false;
    }
  }
  return true;
}

async function processarProjeto(inputPath, outDir, slug) {
  for (const width of WIDTHS) {
    const height = Math.round((width * 2) / 3); // proporção 3:2
    await sharp(inputPath)
      .rotate() // auto-orient pelo EXIF
      .resize({ width, height, fit: "cover", position: sharp.strategy.attention })
      .webp({ quality: QUALITY })
      .toFile(path.join(outDir, `${slug}-${width}.webp`));
  }
  const heightFallback = Math.round((800 * 2) / 3);
  await sharp(inputPath)
    .rotate()
    .resize({ width: 800, height: heightFallback, fit: "cover", position: sharp.strategy.attention })
    .jpeg({ quality: QUALITY })
    .toFile(path.join(outDir, `${slug}-800.jpg`));
}

async function processarRetrato(inputPath, outDir, slug) {
  for (const width of WIDTHS) {
    await sharp(inputPath)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(path.join(outDir, `${slug}-${width}.webp`));
  }
  await sharp(inputPath)
    .rotate()
    .resize({ width: 800, withoutEnlargement: true })
    .jpeg({ quality: QUALITY })
    .toFile(path.join(outDir, `${slug}-800.jpg`));
}

async function processarMarca(inputPath, outDir, slug) {
  // Preserva transparência - PNG, sem recompressão lossy. Só limita a largura e tira metadado.
  await sharp(inputPath)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .png()
    .toFile(path.join(outDir, `${slug}.png`));
}

async function tamanhoDir(dir) {
  let total = 0;
  let entradas;
  try {
    entradas = await readdir(dir, { withFileTypes: true });
  } catch {
    return 0;
  }
  for (const e of entradas) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      total += await tamanhoDir(full);
    } else if (e.isFile()) {
      const { size } = await stat(full);
      total += size;
    }
  }
  return total;
}

async function gerarOgImage() {
  const destino = path.join(OUT_DIR, "og-image.png");
  try {
    await stat(destino);
    return; // idempotente
  } catch {
    // segue
  }

  const W = 1200;
  const H = 630;
  const gradiente = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g" cx="50%" cy="50%" r="75%">
          <stop offset="0%" stop-color="#025cd2"/>
          <stop offset="100%" stop-color="#0145ab"/>
        </radialGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#g)"/>
    </svg>`
  );

  const logoPath = path.join(OUT_DIR, "marca", "logo-amadeu.png");
  const logo = await sharp(logoPath).resize({ width: 720 }).toBuffer();
  const logoMeta = await sharp(logo).metadata();

  await sharp(gradiente)
    .composite([
      {
        input: logo,
        left: Math.round((W - (logoMeta.width ?? 720)) / 2),
        top: Math.round((H - (logoMeta.height ?? 0)) / 2),
      },
    ])
    .png()
    .toFile(destino);
}

async function gerarLogoAmadeuClaro() {
  // Variante clara do lockup AMADEU, pra usar sobre fundo azul — a logo
  // "logo-amadeu" (letras azuis) só lê bem sobre fundo branco/claro, o que
  // a deixa apagada nas seções azuis do site. O arquivo de referência
  // "Prancheta 1" traz as duas versões empilhadas (metade de cima: letras
  // azuis sobre branco; metade de baixo: letras brancas sobre azul) —
  // recortamos a metade de baixo e isolamos só o texto/gráfico (branco +
  // cores saturadas da fita/faixa), removendo o fundo azul+estrelas por
  // diferença de cor.
  const destino = path.join(OUT_DIR, "marca", "logo-amadeu-claro.png");
  try {
    await stat(destino);
    return; // idempotente
  } catch {
    // segue
  }

  const src = path.join(SRC_DIR, "logo opção  amadeu_Prancheta 1.png");
  try {
    await stat(src);
  } catch {
    console.warn("⚠ referência não encontrada: Prancheta 1 (pulando logo-amadeu-claro)");
    return;
  }

  const meta = await sharp(src).metadata();
  const alturaTotal = meta.height ?? 4048;
  const largura = meta.width ?? 3339;
  const metade = Math.round(alturaTotal / 2);

  const recorte = await sharp(src)
    .extract({ left: 0, top: metade + 16, width: largura, height: alturaTotal - metade - 16 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = recorte;
  const { width, height, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const sat = max === 0 ? 0 : (max - min) / max;

    const branco = lum > 195 && sat < 0.22;
    // fundo azul: canal B domina claramente sobre R e G.
    const fundoAzul = b === max && b > r * 1.25 && b > g * 1.05;
    const corSaturada = sat > 0.3 && !fundoAzul;

    data[i + 3] = branco || corSaturada ? 255 : 0;
  }

  await sharp(data, { raw: { width, height, channels } })
    .resize({ width: 1600, withoutEnlargement: true })
    .png()
    .toFile(destino);
}

const SHORTS = [
  { id: "O3wvmYeQU20", slug: "short-1" },
  { id: "PXWuzDaEUtI", slug: "short-2" },
  { id: "vZFJ16koSK8", slug: "short-3" },
];

async function gerarThumbsShorts() {
  // Baixa a miniatura oficial de cada Short (endpoint público do YouTube,
  // sem chave de API) e recorta pra 9:16 — o endpoint sempre devolve
  // 16:9, então usamos crop inteligente (attention) pra manter o que
  // importa no quadro (geralmente uma pessoa) dentro do recorte vertical.
  // Mesmas larguras (WIDTHS) e convenção de nome do resto do pipeline,
  // só muda a proporção do recorte.
  const outDir = path.join(OUT_DIR, "shorts");
  for (const { id, slug } of SHORTS) {
    if (await existeTudo(outDir, slug, "projeto")) {
      console.log(`↷ ${slug} já existe, pulando`);
      continue;
    }

    let buffer;
    for (const qualidade of ["maxresdefault", "hqdefault"]) {
      const res = await fetch(`https://i.ytimg.com/vi/${id}/${qualidade}.jpg`);
      if (res.ok) {
        buffer = Buffer.from(await res.arrayBuffer());
        break;
      }
    }
    if (!buffer) {
      console.warn(`⚠ não consegui baixar miniatura do Short ${id} (pulando ${slug})`);
      continue;
    }

    for (const width of WIDTHS) {
      const height = Math.round((width * 16) / 9); // proporção 9:16
      await sharp(buffer)
        .resize({ width, height, fit: "cover", position: sharp.strategy.attention })
        .webp({ quality: QUALITY })
        .toFile(path.join(outDir, `${slug}-${width}.webp`));
    }
    const hFallback = Math.round((800 * 16) / 9);
    await sharp(buffer)
      .resize({ width: 800, height: hFallback, fit: "cover", position: sharp.strategy.attention })
      .jpeg({ quality: QUALITY })
      .toFile(path.join(outDir, `${slug}-800.jpg`));

    console.log(`✓ ${slug} (short)`);
  }
}

async function gerarFavicon() {
  const destino = path.join(ROOT, "app", "icon.png");
  try {
    await stat(destino);
    return; // idempotente
  } catch {
    // segue
  }

  const SIZE = 512;
  const svg = Buffer.from(
    `<svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${SIZE}" height="${SIZE}" rx="96" fill="#0145ab"/>
      <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial, sans-serif" font-weight="800" font-size="240" fill="#f8bd1b">44</text>
    </svg>`
  );
  await sharp(svg).png().toFile(destino);
}

async function main() {
  await mkdir(path.join(OUT_DIR, "projetos"), { recursive: true });
  await mkdir(path.join(OUT_DIR, "retratos"), { recursive: true });
  await mkdir(path.join(OUT_DIR, "marca"), { recursive: true });
  await mkdir(path.join(OUT_DIR, "shorts"), { recursive: true });

  const antes = await tamanhoDir(SRC_DIR);

  for (const item of MANIFEST) {
    const inputPath = path.join(SRC_DIR, item.src);
    const outDir = path.join(OUT_DIR, item.dir);

    if (await existeTudo(outDir, item.slug, item.mode)) {
      console.log(`↷ ${item.slug} já existe, pulando`);
      continue;
    }

    try {
      await stat(inputPath);
    } catch {
      console.warn(`⚠ fonte não encontrada: ${item.src} (pulando ${item.slug})`);
      continue;
    }

    if (item.mode === "projeto") {
      await processarProjeto(inputPath, outDir, item.slug);
    } else if (item.mode === "retrato") {
      await processarRetrato(inputPath, outDir, item.slug);
    } else if (item.mode === "marca") {
      await processarMarca(inputPath, outDir, item.slug);
    }
    console.log(`✓ ${item.slug} (${item.mode})`);
  }

  await gerarLogoAmadeuClaro();
  console.log("✓ logo-amadeu-claro.png gerado");
  await gerarThumbsShorts();
  await gerarOgImage();
  console.log("✓ og-image.png gerado");
  await gerarFavicon();
  console.log("✓ app/icon.png gerado");

  const depois = await tamanhoDir(OUT_DIR);
  const fmt = (b) => `${(b / 1024 / 1024).toFixed(1)} MB`;
  console.log(`\nPeso das fontes em amadeu_imgs/: ${fmt(antes)}`);
  console.log(`Peso total gerado em public/img/: ${fmt(depois)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
