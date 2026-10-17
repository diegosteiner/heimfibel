#!/usr/bin/env node
// Checks the built site in `dist/`:
//  1. every internal link (<a href>, <link href>, meta refresh) resolves to a generated file;
//  2. every URL listed in scripts/legacy-urls.txt still exists, so published links never break.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const dist = process.argv[2] ?? "dist";
const legacyFile = fileURLToPath(new URL("./legacy-urls.txt", import.meta.url));

if (!existsSync(dist)) {
  console.error(`${dist}/ not found. Run the build first.`);
  process.exit(1);
}

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) yield* walk(path);
    else if (path.endsWith(".html")) yield path;
  }
}

/** Files that could serve `pathname` on a static host (GitHub Pages resolves `/x` to `x.html` or `x/index.html`). */
function candidates(pathname) {
  const path = decodeURIComponent(pathname).replace(/\/$/, "").replace(/^\//, "");
  if (path === "") return ["index.html"];
  const list = [`${path}.html`, join(path, "index.html")];
  if (extname(path)) list.unshift(path);
  return list;
}

const resolves = (pathname) => candidates(pathname).some((file) => existsSync(join(dist, file)));

/** The URL a visitor sees for a generated file: dist/de/articles/x.html -> /de/articles/x */
function pageUrl(file) {
  const rel = `/${relative(dist, file).split(sep).join("/")}`;
  return rel.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
}

const skip = /^(https?:|mailto:|tel:|#|data:)/;
const problems = [];

for (const file of walk(dist)) {
  const html = readFileSync(file, "utf8");
  const page = pageUrl(file);
  const hrefs = [
    ...[...html.matchAll(/<(?:a|link)\b[^>]*\bhref="([^"]+)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/http-equiv="refresh"[^>]*content="[^"]*url=([^"]+)"/g)].map((m) => m[1]),
  ];
  for (const href of hrefs) {
    if (skip.test(href)) continue;
    const { pathname } = new URL(href, `http://localhost${page}`);
    if (pathname.startsWith("/_astro/") || pathname.startsWith("/pagefind/")) continue;
    if (!resolves(pathname)) problems.push(`${page}: broken link "${href}" -> ${pathname}`);
  }
}

const legacy = readFileSync(legacyFile, "utf8")
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("#"));
for (const pathname of legacy) {
  if (!resolves(pathname)) problems.push(`legacy URL no longer exists: ${pathname}`);
}

if (problems.length > 0) {
  console.error(problems.join("\n"));
  console.error(`\n${problems.length} problem(s) found.`);
  process.exit(1);
}
console.log(`OK: all internal links resolve and all ${legacy.length} legacy URLs exist.`);
