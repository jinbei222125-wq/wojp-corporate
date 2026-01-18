import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

export async function setupVite(app: Express, server: Server) {
  const projectRoot = path.resolve(import.meta.dirname, "../..");
  const clientRoot = path.resolve(projectRoot, "client");
  
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    root: clientRoot,
    resolve: {
      ...viteConfig.resolve,
      alias: {
        "@": path.resolve(clientRoot, "src"),
        "@shared": path.resolve(projectRoot, "shared"),
        "@assets": path.resolve(projectRoot, "attached_assets"),
      },
    },
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  // Vite middleware must be registered before any catch-all routes
  app.use(vite.middlewares);
  
  // SPA fallback: serve index.html for HTML page requests only
  // Vite middleware handles /src/*, /@vite/*, and other asset requests
  app.get("*", async (req, res, next) => {
    const url = req.originalUrl;
    
    // Skip if it's an API route
    if (url.startsWith("/api")) {
      return next();
    }
    
    // Skip if it's a Vite-related path (/src, /@vite, /node_modules, assets)
    if (url.startsWith("/src") || 
        url.startsWith("/@vite") || 
        url.startsWith("/node_modules") ||
        url.match(/\.(js|mjs|jsx|ts|tsx|css|json|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|map)$/)) {
      return next();
    }

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      // Use transformIndexHtml which handles all script/link transformations automatically
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
