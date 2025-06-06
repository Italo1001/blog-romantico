import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: text("username").notNull().unique(),
    password: text("password").notNull(),
});
export const moments = pgTable("moments", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    date: text("date").notNull(),
    icon: text("icon").notNull(),
    userId: integer("user_id").notNull(),
});
export const photos = pgTable("photos", {
    id: serial("id").primaryKey(),
    url: text("url").notNull(),
    caption: text("caption"),
    userId: integer("user_id").notNull(),
});
export const timelineEvents = pgTable("timeline_events", {
    id: serial("id").primaryKey(),
    date: text("date").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    userId: integer("user_id").notNull(),
});
export const futurePlans = pgTable("future_plans", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    icon: text("icon").notNull(),
    userId: integer("user_id").notNull(),
});
export const quotes = pgTable("quotes", {
    id: serial("id").primaryKey(),
    text: text("text").notNull(),
    author: text("author").notNull(),
    userId: integer("user_id").notNull(),
});
export const songs = pgTable("songs", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    artist: text("artist").notNull(),
    userId: integer("user_id").notNull(),
});
// Relations
export const usersRelations = relations(users, ({ many }) => ({
    moments: many(moments),
    photos: many(photos),
    timelineEvents: many(timelineEvents),
    futurePlans: many(futurePlans),
    quotes: many(quotes),
    songs: many(songs),
}));
export const momentsRelations = relations(moments, ({ one }) => ({
    user: one(users, {
        fields: [moments.userId],
        references: [users.id],
    }),
}));
export const photosRelations = relations(photos, ({ one }) => ({
    user: one(users, {
        fields: [photos.userId],
        references: [users.id],
    }),
}));
export const timelineEventsRelations = relations(timelineEvents, ({ one }) => ({
    user: one(users, {
        fields: [timelineEvents.userId],
        references: [users.id],
    }),
}));
export const futurePlansRelations = relations(futurePlans, ({ one }) => ({
    user: one(users, {
        fields: [futurePlans.userId],
        references: [users.id],
    }),
}));
export const quotesRelations = relations(quotes, ({ one }) => ({
    user: one(users, {
        fields: [quotes.userId],
        references: [users.id],
    }),
}));
export const songsRelations = relations(songs, ({ one }) => ({
    user: one(users, {
        fields: [songs.userId],
        references: [users.id],
    }),
}));
// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
    username: true,
    password: true,
});
export const insertMomentSchema = createInsertSchema(moments).omit({
    id: true,
    userId: true,
});
export const insertPhotoSchema = createInsertSchema(photos).omit({
    id: true,
    userId: true,
});
export const insertTimelineEventSchema = createInsertSchema(timelineEvents).omit({
    id: true,
    userId: true,
});
export const insertFuturePlanSchema = createInsertSchema(futurePlans).omit({
    id: true,
    userId: true,
});
export const insertQuoteSchema = createInsertSchema(quotes).omit({
    id: true,
    userId: true,
});
export const insertSongSchema = createInsertSchema(songs).omit({
    id: true,
    userId: true,
});
