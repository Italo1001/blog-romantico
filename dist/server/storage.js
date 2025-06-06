import { users, moments, photos, timelineEvents, futurePlans, quotes, songs } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
export class DatabaseStorage {
    // User methods
    async getUser(id) {
        const [user] = await db.select().from(users).where(eq(users.id, id));
        return user || undefined;
    }
    async getUserByUsername(username) {
        const [user] = await db.select().from(users).where(eq(users.username, username));
        return user || undefined;
    }
    async createUser(insertUser) {
        const [user] = await db
            .insert(users)
            .values(insertUser)
            .returning();
        return user;
    }
    // Moment methods
    async getMoments(userId) {
        return await db.select().from(moments).where(eq(moments.userId, userId));
    }
    async createMoment(userId, moment) {
        const [newMoment] = await db
            .insert(moments)
            .values({ ...moment, userId })
            .returning();
        return newMoment;
    }
    // Photo methods
    async getPhotos(userId) {
        return await db.select().from(photos).where(eq(photos.userId, userId));
    }
    async createPhoto(userId, photo) {
        const [newPhoto] = await db
            .insert(photos)
            .values({ ...photo, userId })
            .returning();
        return newPhoto;
    }
    // Timeline methods
    async getTimelineEvents(userId) {
        return await db.select().from(timelineEvents).where(eq(timelineEvents.userId, userId));
    }
    async createTimelineEvent(userId, event) {
        const [newEvent] = await db
            .insert(timelineEvents)
            .values({ ...event, userId })
            .returning();
        return newEvent;
    }
    // Future plans methods
    async getFuturePlans(userId) {
        return await db.select().from(futurePlans).where(eq(futurePlans.userId, userId));
    }
    async createFuturePlan(userId, plan) {
        const [newPlan] = await db
            .insert(futurePlans)
            .values({ ...plan, userId })
            .returning();
        return newPlan;
    }
    // Quote methods
    async getQuotes(userId) {
        return await db.select().from(quotes).where(eq(quotes.userId, userId));
    }
    async createQuote(userId, quote) {
        const [newQuote] = await db
            .insert(quotes)
            .values({ ...quote, userId })
            .returning();
        return newQuote;
    }
    // Song methods
    async getSongs(userId) {
        return await db.select().from(songs).where(eq(songs.userId, userId));
    }
    async createSong(userId, song) {
        const [newSong] = await db
            .insert(songs)
            .values({ ...song, userId })
            .returning();
        return newSong;
    }
}
export const storage = new DatabaseStorage();
