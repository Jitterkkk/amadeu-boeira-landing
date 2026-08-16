// Inventário das fotos brutas em amadeu_imgs/ — passo 1 do pipeline de imagens.
// Não escreve nada, só lê e imprime. Ver PROJETO.md / instruções do pipeline.
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import exifr from "exifr";

const SRC_DIR = path.resolve(import.meta.dirname, "..", "amadeu_imgs");

function orientacao(width, height) {
  if (width === height) return "quadrada";
  return width > height ? "paisagem" : "retrato";
}

function formatarPeso(bytes) {
  const mb = bytes / 1024 / 1024;
  return `${mb.toFixed(1)} MB`;
}

async function temGps(filePath) {
  try {
    const dados = await exifr.parse(filePath, { gps: true });
    return Boolean(dados?.latitude || dados?.longitude);
  } catch {
    return false;
  }
}

async function main() {
  const entradas = await readdir(SRC_DIR, { withFileTypes: true });
  const arquivos = entradas
    .filter((e) => e.isFile() && /\.(jpe?g|png|webp|tiff?)$/i.test(e.name))
    .map((e) => e.name)
    .sort();

  const linhas = [];

  for (const nome of arquivos) {
    const filePath = path.join(SRC_DIR, nome);
    const { size } = await stat(filePath);
    const img = sharp(filePath);
    const meta = await img.metadata();
    const width = meta.width ?? 0;
    const height = meta.height ?? 0;
    const gps = await temGps(filePath);

    linhas.push({
      arquivo: nome,
      largura: width,
      altura: height,
      orientacao: orientacao(width, height),
      formato: meta.format ?? "?",
      peso: formatarPeso(size),
      pesoBytes: size,
      gps: gps ? "SIM" : "não",
    });
  }

  console.table(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- descartado de propósito, só queremos o resto
    linhas.map(({ pesoBytes, ...resto }) => resto)
  );

  const totalBytes = linhas.reduce((acc, l) => acc + l.pesoBytes, 0);
  console.log(`\nTotal: ${linhas.length} arquivos, ${formatarPeso(totalBytes)}`);
  const comGps = linhas.filter((l) => l.gps === "SIM");
  if (comGps.length > 0) {
    console.log(
      `⚠ ${comGps.length} arquivo(s) com GPS no EXIF (será removido na otimização): ${comGps
        .map((l) => l.arquivo)
        .join(", ")}`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
