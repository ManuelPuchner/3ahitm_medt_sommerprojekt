import express from "express";
import { createServer as createViteServer } from "vite";
import { createProxyMiddleware } from "http-proxy-middleware";

async function createServer() {
  const app = express();

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom", // don't include Vite's default HTML handling middlewares
  });
  // Use vite's connect instance as middleware
  app.use(vite.middlewares);

  // Proxy requests to /api
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
      secure: false,
      ws: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );

  app.use(express.static("dist"));

  app.listen(3000, () => {
    console.log("http://localhost:3000");
  });
}

createServer();
