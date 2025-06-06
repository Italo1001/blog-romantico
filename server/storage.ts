import { 
  users, 
  moments, 
  photos, 
  timelineEvents, 
  futurePlans, 
  quotes, 
  songs,
  type User, 
  type InsertUser,
  type Moment,
  type InsertMoment,
  type Photo,
  type InsertPhoto,
  type TimelineEvent,
  type InsertTimelineEvent,
  type FuturePlan,
  type InsertFuturePlan,
  type Quote,
  type InsertQuote,
  type Song,
  type InsertSong
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Moment methods
  getMoments(userId: number): Promise<Moment[]>;
  createMoment(userId: number, moment: InsertMoment): Promise<Moment>;
  
  // Photo methods
  getPhotos(userId: number): Promise<Photo[]>;
  createPhoto(userId: number, photo: InsertPhoto): Promise<Photo>;
  
  // Timeline methods
  getTimelineEvents(userId: number): Promise<TimelineEvent[]>;
  createTimelineEvent(userId: number, event: InsertTimelineEvent): Promise<TimelineEvent>;
  
  // Future plans methods
  getFuturePlans(userId: number): Promise<FuturePlan[]>;
  createFuturePlan(userId: number, plan: InsertFuturePlan): Promise<FuturePlan>;
  
  // Quote methods
  getQuotes(userId: number): Promise<Quote[]>;
  createQuote(userId: number, quote: InsertQuote): Promise<Quote>;
  
  // Song methods
  getSongs(userId: number): Promise<Song[]>;
  createSong(userId: number, song: InsertSong): Promise<Song>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Moment methods
  async getMoments(userId: number): Promise<Moment[]> {
    return await db.select().from(moments).where(eq(moments.userId, userId));
  }

  async createMoment(userId: number, moment: InsertMoment): Promise<Moment> {
    const [newMoment] = await db
      .insert(moments)
      .values({ ...moment, userId })
      .returning();
    return newMoment;
  }

  // Photo methods
  async getPhotos(userId: number): Promise<Photo[]> {
    return await db.select().from(photos).where(eq(photos.userId, userId));
  }

  async createPhoto(userId: number, photo: InsertPhoto): Promise<Photo> {
    const [newPhoto] = await db
      .insert(photos)
      .values({ ...photo, userId })
      .returning();
    return newPhoto;
  }

  // Timeline methods
  async getTimelineEvents(userId: number): Promise<TimelineEvent[]> {
    return await db.select().from(timelineEvents).where(eq(timelineEvents.userId, userId));
  }

  async createTimelineEvent(userId: number, event: InsertTimelineEvent): Promise<TimelineEvent> {
    const [newEvent] = await db
      .insert(timelineEvents)
      .values({ ...event, userId })
      .returning();
    return newEvent;
  }

  // Future plans methods
  async getFuturePlans(userId: number): Promise<FuturePlan[]> {
    return await db.select().from(futurePlans).where(eq(futurePlans.userId, userId));
  }

  async createFuturePlan(userId: number, plan: InsertFuturePlan): Promise<FuturePlan> {
    const [newPlan] = await db
      .insert(futurePlans)
      .values({ ...plan, userId })
      .returning();
    return newPlan;
  }

  // Quote methods
  async getQuotes(userId: number): Promise<Quote[]> {
    return await db.select().from(quotes).where(eq(quotes.userId, userId));
  }

  async createQuote(userId: number, quote: InsertQuote): Promise<Quote> {
    const [newQuote] = await db
      .insert(quotes)
      .values({ ...quote, userId })
      .returning();
    return newQuote;
  }

  // Song methods
  async getSongs(userId: number): Promise<Song[]> {
    return await db.select().from(songs).where(eq(songs.userId, userId));
  }

  async createSong(userId: number, song: InsertSong): Promise<Song> {
    const [newSong] = await db
      .insert(songs)
      .values({ ...song, userId })
      .returning();
    return newSong;
  }
}

export const storage = new DatabaseStorage();
