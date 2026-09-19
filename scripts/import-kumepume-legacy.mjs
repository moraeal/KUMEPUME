import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";

const sourceRoot = "https://kumepume.wixsite.com/main";
const sitemapNames = [
  "pages-sitemap.xml",
  "blog-posts-sitemap.xml",
  "blog-categories-sitemap.xml",
  "event-pages-sitemap.xml",
  "dynamic-portfolio_p_d92930b5_7f6f_435e_8263_064168c5751f_0_5000-sitemap.xml",
  "dynamic-home-1_p_6c294a77_3cba_4a88_a8c0_1235dd0498a5_0_5000-sitemap.xml",
  "dynamic-aitem_p_0f4ba997_3d46_42db_88d7_a4d1aa86dca8_0_5000-sitemap.xml",
  "dynamic-news_p_3e0ec0ce_5170_4eea_a2ad_59a509d676d9_0_5000-sitemap.xml",
];

const repoRoot = process.cwd();
const archiveRoot = join(repoRoot, "archive/kumepume-wix");
const imageDirectory = join(archiveRoot, "images/original");
const documentDirectory = join(archiveRoot, "documents/original");
const dataDirectory = join(repoRoot, "src/data/kumepume");
const reportDirectory = join(repoRoot, "docs");

const decodeEntities = (value = "") => value
  .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
  .replace(/&#([0-9]+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)))
  .replace(/&nbsp;|&#xA0;/gi, " ")
  .replace(/&amp;/gi, "&")
  .replace(/&quot;/gi, '"')
  .replace(/&apos;|&#39;/gi, "'")
  .replace(/&lt;/gi, "<")
  .replace(/&gt;/gi, ">");

const cleanHtmlText = (value = "") => decodeEntities(value)
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<br\s*\/?\s*>/gi, "\n")
  .replace(/<[^>]+>/g, " ")
  .replace(/[ \t]+/g, " ")
  .replace(/\s*\n\s*/g, "\n")
  .trim();

const unescapeHtmlSource = (html) => html
  .replaceAll("\\u002F", "/")
  .replaceAll("\\/", "/")
  .replaceAll("&amp;", "&");

const sha = (value) => createHash("sha256").update(value).digest("hex").slice(0, 12);

async function fetchText(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(45_000) });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.text();
}

function sitemapKind(name) {
  if (name === "pages-sitemap.xml") return "page";
  if (name === "blog-posts-sitemap.xml") return "post";
  if (name === "blog-categories-sitemap.xml") return "category";
  if (name === "event-pages-sitemap.xml") return "event";
  return "dynamic";
}

function extractUrlEntries(xml, sitemap) {
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/gi)].map((match) => {
    const block = match[1];
    const sourceUrl = decodeEntities((block.match(/<loc>([^<]+)<\/loc>/i) || [])[1] || "");
    const lastModified = (block.match(/<lastmod>([^<]+)<\/lastmod>/i) || [])[1] || null;
    const sitemapImages = [...block.matchAll(/<image:loc>([^<]+)<\/image:loc>/gi)].map((item) => decodeEntities(item[1]));
    return { sourceUrl, lastModified, sitemap, kind: sitemapKind(sitemap), sitemapImages };
  });
}

function extractMeta(html, key) {
  const patterns = [
    new RegExp(`<meta[^>]+(?:property|name)=["']${key}["'][^>]+content=["']([^"']*)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name)=["']${key}["']`, "i"),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return decodeEntities(match[1]).trim();
  }
  return "";
}

function extractContentBlocks(html) {
  const blocks = [...html.matchAll(/<(h[1-6]|p|li|figcaption|blockquote)[^>]*>([\s\S]*?)<\/\1>/gi)]
    .map((match) => ({ type: match[1].toLowerCase(), text: cleanHtmlText(match[2]) }))
    .filter((block) => block.text.length > 1 && block.text.length < 12_000);

  const seen = new Set();
  return blocks.filter((block) => {
    const key = `${block.type}:${block.text}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function extractMediaUrls(html, sitemapImages) {
  const source = unescapeHtmlSource(html);
  const htmlMedia = [...source.matchAll(/https:\/\/static\.wixstatic\.com\/media\/[A-Za-z0-9_~.%()-]+/g)].map((match) => match[0]);
  return [...new Set([...sitemapImages, ...htmlMedia])].sort();
}

function extractDocumentUrls(html) {
  const source = unescapeHtmlSource(html);
  return [...new Set([
    ...[...source.matchAll(/https:\/\/static\.wixstatic\.com\/(?:media|ugd)\/[A-Za-z0-9_~.%()/:-]+\.pdf(?:\?[^"'<>\s]*)?/gi)].map((match) => match[0]),
    ...[...source.matchAll(/https:\/\/[^"'<>\s]+\.pdf(?:\?[^"'<>\s]*)?/gi)].map((match) => match[0]),
  ])].sort();
}

function preferredExtension(url, contentType) {
  const pathExtension = extname(new URL(url).pathname).toLowerCase();
  if (/^\.[a-z0-9]{2,5}$/.test(pathExtension)) return pathExtension;
  const typeMap = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
    "image/svg+xml": ".svg",
    "application/pdf": ".pdf",
  };
  return typeMap[contentType?.split(";")[0]?.toLowerCase()] || ".bin";
}

async function downloadAsset(url, directory) {
  const response = await fetch(url, { signal: AbortSignal.timeout(60_000) });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const extension = preferredExtension(url, response.headers.get("content-type"));
  const rawBase = basename(new URL(url).pathname).replace(/[^A-Za-z0-9._~-]+/g, "-");
  const stem = rawBase.replace(/\.[A-Za-z0-9]{2,5}$/, "").slice(0, 96) || "asset";
  const filename = `${stem}-${sha(url)}${extension}`;
  await writeFile(join(directory, filename), bytes);
  return { sourceUrl: url, filename, sizeBytes: bytes.length, contentType: response.headers.get("content-type") || null };
}

async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  async function run() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return results;
}

await Promise.all([
  mkdir(imageDirectory, { recursive: true }),
  mkdir(documentDirectory, { recursive: true }),
  mkdir(dataDirectory, { recursive: true }),
  mkdir(reportDirectory, { recursive: true }),
]);

const sitemapResults = await mapLimit(sitemapNames, 4, async (name) => ({
  name,
  xml: await fetchText(`${sourceRoot}/${name}`),
}));

const urlMap = new Map();
for (const { name, xml } of sitemapResults) {
  for (const entry of extractUrlEntries(xml, name)) {
    const existing = urlMap.get(entry.sourceUrl);
    if (existing) existing.sitemapImages = [...new Set([...existing.sitemapImages, ...entry.sitemapImages])];
    else urlMap.set(entry.sourceUrl, entry);
  }
}

const sourceEntries = [...urlMap.values()].filter((entry) => entry.sourceUrl);
const pageRecords = await mapLimit(sourceEntries, 5, async (entry) => {
  try {
    const html = await fetchText(entry.sourceUrl);
    const title = cleanHtmlText((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "").replace(/\s*\|\s*main$/i, "");
    return {
      ...entry,
      status: "captured",
      title,
      description: extractMeta(html, "og:description") || extractMeta(html, "description"),
      contentBlocks: extractContentBlocks(html),
      mediaUrls: extractMediaUrls(html, entry.sitemapImages),
      documentUrls: extractDocumentUrls(html),
    };
  } catch (error) {
    return { ...entry, status: "failed", error: String(error), title: "", description: "", contentBlocks: [], mediaUrls: entry.sitemapImages, documentUrls: [] };
  }
});

const imageUrls = [...new Set(pageRecords.flatMap((record) => record.mediaUrls))].sort();
const ownedImageUrls = imageUrls.filter((url) => basename(new URL(url).pathname).startsWith("80ad1a_"));
const externalTemplateImageUrls = imageUrls.filter((url) => !ownedImageUrls.includes(url));
const documentUrls = [...new Set(pageRecords.flatMap((record) => record.documentUrls))].sort();

const imageAssets = await mapLimit(ownedImageUrls, 6, async (url) => {
  try {
    return { status: "downloaded", ...(await downloadAsset(url, imageDirectory)) };
  } catch (error) {
    return { status: "failed", sourceUrl: url, error: String(error) };
  }
});

const documentAssets = await mapLimit(documentUrls, 3, async (url) => {
  try {
    return { status: "downloaded", ...(await downloadAsset(url, documentDirectory)) };
  } catch (error) {
    return { status: "failed", sourceUrl: url, error: String(error) };
  }
});

const imageLookup = Object.fromEntries(imageAssets.filter((asset) => asset.filename).map((asset) => [asset.sourceUrl, `archive/kumepume-wix/images/original/${asset.filename}`]));
const documentLookup = Object.fromEntries(documentAssets.filter((asset) => asset.filename).map((asset) => [asset.sourceUrl, `archive/kumepume-wix/documents/original/${asset.filename}`]));

for (const record of pageRecords) {
  record.localImages = record.mediaUrls.map((url) => imageLookup[url]).filter(Boolean);
  record.localDocuments = record.documentUrls.map((url) => documentLookup[url]).filter(Boolean);
}

const manifest = {
  schemaVersion: 1,
  sourceRoot,
  capturedAt: new Date().toISOString(),
  preservationPolicy: "Original text, source URLs, images and documents are retained. Public reuse is curated separately.",
  counts: {
    urls: pageRecords.length,
    capturedUrls: pageRecords.filter((record) => record.status === "captured").length,
    failedUrls: pageRecords.filter((record) => record.status === "failed").length,
    uniqueImageUrls: imageUrls.length,
    ownedImageUrls: ownedImageUrls.length,
    externalTemplateImageUrls: externalTemplateImageUrls.length,
    downloadedImages: imageAssets.filter((asset) => asset.status === "downloaded").length,
    failedImages: imageAssets.filter((asset) => asset.status === "failed").length,
    uniqueDocumentUrls: documentUrls.length,
    downloadedDocuments: documentAssets.filter((asset) => asset.status === "downloaded").length,
    failedDocuments: documentAssets.filter((asset) => asset.status === "failed").length,
  },
  pages: pageRecords,
  imageAssets,
  externalTemplateImageUrls,
  documentAssets,
};

await writeFile(join(dataDirectory, "legacy-content-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);

const byKind = Object.groupBy(pageRecords, (record) => record.kind);
const report = `# KUMEPUME 기존 홈페이지 원본 보존 결과\n\n` +
  `- 수집 시각: ${manifest.capturedAt}\n` +
  `- 원본 사이트: ${sourceRoot}\n` +
  `- 전체 주소: ${manifest.counts.urls}\n` +
  `- 정상 수집: ${manifest.counts.capturedUrls}\n` +
  `- 이미지: ${manifest.counts.downloadedImages}/${manifest.counts.uniqueImageUrls}\n` +
  `- 문서: ${manifest.counts.downloadedDocuments}/${manifest.counts.uniqueDocumentUrls}\n\n` +
  `## 주소 유형\n\n` +
  Object.entries(byKind).map(([kind, records]) => `- ${kind}: ${records.length}`).join("\n") +
  `\n\n## 보존 원칙\n\n원본 파일은 화면용 파일과 분리해 보존한다. 공개 페이지 편집 시 제목·날짜·인물·사업·출처를 확인하고, 이 원본 목록에서 복사해 사용한다.\n`;

await writeFile(join(reportDirectory, "KUMEPUME_LEGACY_IMPORT_REPORT.md"), report);

console.log(JSON.stringify(manifest.counts, null, 2));
