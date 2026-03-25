import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";
import sirv from "sirv";

export default function search(): AstroIntegration {
  let outDir: string;
  let basePath = "/";

  const trimSlashes = (value: string) => value.replace(/^\/+|\/+$/g, "");
  const buildPagefindRequestPrefix = (base: string) => {
    const normalized = trimSlashes(base);
    return normalized ? `/${normalized}/pagefind/` : "/pagefind/";
  };

  const buildPagefindOutputSubdir = (base: string) => {
    const normalized = trimSlashes(base);
    return normalized ? `${normalized}/pagefind` : "pagefind";
  };

  return {
    name: "search",
    hooks: {
      "astro:config:setup": ({ config, logger }) => {
        basePath = config.base ?? "/";

        if (config.output === "server") {
          logger.warn(
            "Output type `server` does not produce static *.html pages in its output and thus will not work with astro-pagefind integration.",
          );
          return;
        }

        if (config.adapter?.name.startsWith("@astrojs/vercel")) {
          outDir = fileURLToPath(new URL(".vercel/output/static/", config.root));
        } else if (config.adapter?.name === "@astrojs/cloudflare") {
          outDir = fileURLToPath(new URL(config.base?.replace(/^\//, ""), config.outDir));
        } else {
          outDir = fileURLToPath(config.outDir);
        }
      },
      "astro:server:setup": ({ server, logger }) => {
        if (!outDir) {
          logger.warn(
            "astro-pagefind couldn't reliably determine the output directory. Search assets will not be served.",
          );
          return;
        }

        const pagefindRequestPrefix = buildPagefindRequestPrefix(basePath);

        const serve = sirv(outDir, {
          dev: true,
          etag: true,
        });
        server.middlewares.use((req, res, next) => {
          if (req.url?.startsWith(pagefindRequestPrefix)) {
            serve(req, res, next);
          } else {
            next();
          }
        });
      },
      "astro:build:done": ({ logger }) => {
        if (!outDir) {
          logger.warn(
            "astro-pagefind couldn't reliably determine the output directory. Search index will not be built.",
          );
          return;
        }

        const outputSubdir = buildPagefindOutputSubdir(basePath);

        const cmd = `npx pagefind --site "${outDir}" --output-subdir "${outputSubdir}"`;
        execSync(cmd, {
          stdio: [process.stdin, process.stdout, process.stderr],
        });
      },
    },
  };
}
