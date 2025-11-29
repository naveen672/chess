import { z } from "zod";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  skillLevel: string;
  completedLessons: string[];
  totalPoints: number;
  isVolunteer: boolean;
  subscriptionTier: string;
  avatar: {
    piece: string;
    color: string;
    accessories: {
      eyebrows?: string;
      hair?: string;
      nose?: string;
      mouth?: string;
      ears?: string;
    };
  };
  createdAt: Date;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: Date;
  location?: string;
  isOnline: boolean;
  maxParticipants?: number;
  createdAt: Date;
}

export const insertUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  skillLevel: z.string().default('beginner'),
  isVolunteer: z.boolean().default(false),
  subscriptionTier: z.string().default('free'),
  avatar: z.object({
    piece: z.string(),
    color: z.string(),
    accessories: z.object({
      eyebrows: z.string().optional(),
      hair: z.string().optional(),
      nose: z.string().optional(),
      mouth: z.string().optional(),
      ears: z.string().optional(),
    }),
  }).optional(),
});

export const insertEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  date: z.date(),
  location: z.string().optional(),
  isOnline: z.boolean().default(false),
  maxParticipants: z.number().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertEvent = z.infer<typeof insertEventSchema>;
