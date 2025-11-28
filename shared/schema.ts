import { pgTable, text, serial, integer, boolean, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  skillLevel: text("skill_level").notNull().default('beginner'),
  completedLessons: json("completed_lessons").$type<string[]>().default([]),
  totalPoints: integer("total_points").notNull().default(0),
  isVolunteer: boolean("is_volunteer").notNull().default(false),
  subscriptionTier: text("subscription_tier").notNull().default('free'), // 'free', 'master', 'grandmaster'
  avatar: json("avatar").$type<{
    piece: string;
    color: string;
    accessories: {
      eyebrows?: string;
      hair?: string;
      nose?: string;
      mouth?: string;
      ears?: string;
    };
  }>().default({
    piece: 'pawn',
    color: '#1e3a8a',
    accessories: {}
  }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  location: text("location"),
  isOnline: boolean("is_online").notNull().default(false),
  maxParticipants: integer("max_participants"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  completedLessons: true,
  totalPoints: true,
  createdAt: true,
}).extend({
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;
