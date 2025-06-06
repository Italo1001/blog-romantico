// server/index.ts
import express2 from "express";
import http from "http";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import {
  users,
  moments,
  photos,
  timelineEvents,
  futurePlans,
  quotes,
  songs
} from "@shared/schema";

// server/db.ts
import dotenv from "dotenv";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "@shared/schema";
dotenv.config();
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema });

// server/storage.ts
import { eq } from "drizzle-orm";
var DatabaseStorage = class {
  // User methods
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  // Moment methods
  async getMoments(userId) {
    return await db.select().from(moments).where(eq(moments.userId, userId));
  }
  async createMoment(userId, moment) {
    const [newMoment] = await db.insert(moments).values({ ...moment, userId }).returning();
    return newMoment;
  }
  // Photo methods
  async getPhotos(userId) {
    return await db.select().from(photos).where(eq(photos.userId, userId));
  }
  async createPhoto(userId, photo) {
    const [newPhoto] = await db.insert(photos).values({ ...photo, userId }).returning();
    return newPhoto;
  }
  // Timeline methods
  async getTimelineEvents(userId) {
    return await db.select().from(timelineEvents).where(eq(timelineEvents.userId, userId));
  }
  async createTimelineEvent(userId, event) {
    const [newEvent] = await db.insert(timelineEvents).values({ ...event, userId }).returning();
    return newEvent;
  }
  // Future plans methods
  async getFuturePlans(userId) {
    return await db.select().from(futurePlans).where(eq(futurePlans.userId, userId));
  }
  async createFuturePlan(userId, plan) {
    const [newPlan] = await db.insert(futurePlans).values({ ...plan, userId }).returning();
    return newPlan;
  }
  // Quote methods
  async getQuotes(userId) {
    return await db.select().from(quotes).where(eq(quotes.userId, userId));
  }
  async createQuote(userId, quote) {
    const [newQuote] = await db.insert(quotes).values({ ...quote, userId }).returning();
    return newQuote;
  }
  // Song methods
  async getSongs(userId) {
    return await db.select().from(songs).where(eq(songs.userId, userId));
  }
  async createSong(userId, song) {
    const [newSong] = await db.insert(songs).values({ ...song, userId }).returning();
    return newSong;
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import {
  insertMomentSchema,
  insertPhotoSchema,
  insertTimelineEventSchema,
  insertFuturePlanSchema,
  insertQuoteSchema,
  insertSongSchema
} from "@shared/schema";
async function registerRoutes(app2) {
  app2.get("/api/moments/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const moments2 = await storage.getMoments(userId);
      res.json(moments2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch moments" });
    }
  });
  app2.post("/api/moments/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const validatedData = insertMomentSchema.parse(req.body);
      const moment = await storage.createMoment(userId, validatedData);
      res.json(moment);
    } catch (error) {
      res.status(400).json({ error: "Invalid moment data" });
    }
  });
  app2.get("/api/photos/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const photos2 = await storage.getPhotos(userId);
      res.json(photos2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch photos" });
    }
  });
  app2.post("/api/photos/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const validatedData = insertPhotoSchema.parse(req.body);
      const photo = await storage.createPhoto(userId, validatedData);
      res.json(photo);
    } catch (error) {
      res.status(400).json({ error: "Invalid photo data" });
    }
  });
  app2.get("/api/timeline/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const events = await storage.getTimelineEvents(userId);
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch timeline events" });
    }
  });
  app2.post("/api/timeline/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const validatedData = insertTimelineEventSchema.parse(req.body);
      const event = await storage.createTimelineEvent(userId, validatedData);
      res.json(event);
    } catch (error) {
      res.status(400).json({ error: "Invalid timeline event data" });
    }
  });
  app2.get("/api/plans/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const plans = await storage.getFuturePlans(userId);
      res.json(plans);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch future plans" });
    }
  });
  app2.post("/api/plans/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const validatedData = insertFuturePlanSchema.parse(req.body);
      const plan = await storage.createFuturePlan(userId, validatedData);
      res.json(plan);
    } catch (error) {
      res.status(400).json({ error: "Invalid future plan data" });
    }
  });
  app2.get("/api/quotes/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const quotes2 = await storage.getQuotes(userId);
      res.json(quotes2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quotes" });
    }
  });
  app2.post("/api/quotes/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const validatedData = insertQuoteSchema.parse(req.body);
      const quote = await storage.createQuote(userId, validatedData);
      res.json(quote);
    } catch (error) {
      res.status(400).json({ error: "Invalid quote data" });
    }
  });
  app2.get("/api/songs/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const songs2 = await storage.getSongs(userId);
      res.json(songs2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch songs" });
    }
  });
  app2.post("/api/songs/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const validatedData = insertSongSchema.parse(req.body);
      const song = await storage.createSong(userId, validatedData);
      res.json(song);
    } catch (error) {
      res.status(400).json({ error: "Invalid song data" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { cartographer } from "@replit/vite-plugin-cartographer";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [cartographer()] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared")
    }
  },
  root: "client",
  build: {
    outDir: "../dist/public",
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: ["*"]
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    log(`Error: ${err.stack || err}`);
  });
  const server = http.createServer(app);
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen(port, () => {
    log(`Server listening on port ${port}`);
  });
  server.on("error", (err) => {
    log(`Server error: ${err.message}`);
  });
})();
