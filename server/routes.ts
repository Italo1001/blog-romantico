import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertMomentSchema,
  insertPhotoSchema,
  insertTimelineEventSchema,
  insertFuturePlanSchema,
  insertQuoteSchema,
  insertSongSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Moments routes
  app.get('/api/moments/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const moments = await storage.getMoments(userId);
      res.json(moments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch moments' });
    }
  });

  app.post('/api/moments/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const validatedData = insertMomentSchema.parse(req.body);
      const moment = await storage.createMoment(userId, validatedData);
      res.json(moment);
    } catch (error) {
      res.status(400).json({ error: 'Invalid moment data' });
    }
  });

  // Photos routes
  app.get('/api/photos/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const photos = await storage.getPhotos(userId);
      res.json(photos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch photos' });
    }
  });

  app.post('/api/photos/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const validatedData = insertPhotoSchema.parse(req.body);
      const photo = await storage.createPhoto(userId, validatedData);
      res.json(photo);
    } catch (error) {
      res.status(400).json({ error: 'Invalid photo data' });
    }
  });

  // Timeline events routes
  app.get('/api/timeline/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const events = await storage.getTimelineEvents(userId);
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch timeline events' });
    }
  });

  app.post('/api/timeline/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const validatedData = insertTimelineEventSchema.parse(req.body);
      const event = await storage.createTimelineEvent(userId, validatedData);
      res.json(event);
    } catch (error) {
      res.status(400).json({ error: 'Invalid timeline event data' });
    }
  });

  // Future plans routes
  app.get('/api/plans/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const plans = await storage.getFuturePlans(userId);
      res.json(plans);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch future plans' });
    }
  });

  app.post('/api/plans/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const validatedData = insertFuturePlanSchema.parse(req.body);
      const plan = await storage.createFuturePlan(userId, validatedData);
      res.json(plan);
    } catch (error) {
      res.status(400).json({ error: 'Invalid future plan data' });
    }
  });

  // Quotes routes
  app.get('/api/quotes/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const quotes = await storage.getQuotes(userId);
      res.json(quotes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch quotes' });
    }
  });

  app.post('/api/quotes/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const validatedData = insertQuoteSchema.parse(req.body);
      const quote = await storage.createQuote(userId, validatedData);
      res.json(quote);
    } catch (error) {
      res.status(400).json({ error: 'Invalid quote data' });
    }
  });

  // Songs routes
  app.get('/api/songs/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const songs = await storage.getSongs(userId);
      res.json(songs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch songs' });
    }
  });

  app.post('/api/songs/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const validatedData = insertSongSchema.parse(req.body);
      const song = await storage.createSong(userId, validatedData);
      res.json(song);
    } catch (error) {
      res.status(400).json({ error: 'Invalid song data' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
