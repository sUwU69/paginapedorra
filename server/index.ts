import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { createServer } from "http";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // register routes and get an http.Server instance so Vite HMR can attach
  const server = await registerRoutes(app);

  // centralized error handler: send response but don't re-throw (which crashes the process)
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    // don't rethrow here
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Serve the app on the port specified in PORT (default 5000).
  // On some platforms (Windows) certain socket options like `reusePort`
  // are not supported and cause ENOTSUP. We'll bind to 127.0.0.1 and try
  // a small range of ports if the preferred one is unavailable.
  const basePort = parseInt(process.env.PORT || "5000", 10);
  const maxAttempts = 6; // try basePort .. basePort+5
  let currentPort = basePort;

  const tryListen = (attemptsLeft: number) => {
    // Temporary error listener for this attempt
    const onError = (err: any) => {
      if ((err?.code === "EADDRINUSE" || err?.code === "EACCES") && attemptsLeft > 0) {
        log(`Port ${currentPort} unavailable (${err.code}), trying ${currentPort + 1}`);
        currentPort += 1;
        // remove this listener before retrying
        server.removeListener("error", onError);
        setTimeout(() => tryListen(attemptsLeft - 1), 200);
      } else {
        console.error(err);
        process.exit(1);
      }
    };

    server.once("error", onError);

    server.listen(currentPort, "127.0.0.1", () => {
      // remove error listener because we started successfully
      server.removeListener("error", onError);
      log(`Servidor escuchando en http://127.0.0.1:${currentPort}`);
    });
  };

  tryListen(maxAttempts);
})();
