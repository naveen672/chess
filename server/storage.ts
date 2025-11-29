import type { User, InsertUser, Event, InsertEvent } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User>;
  
  getAllEvents(): Promise<Event[]>;
  createEvent(insertEvent: InsertEvent): Promise<Event>;
  updateEvent(id: number, updates: Partial<Event>): Promise<Event>;
  deleteEvent(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: User[] = [];
  private events: Event[] = [];
  private nextUserId = 1;
  private nextEventId = 1;

  async getUser(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: this.nextUserId++,
      ...insertUser,
      skillLevel: insertUser.skillLevel || 'beginner',
      completedLessons: [],
      totalPoints: 0,
      isVolunteer: insertUser.isVolunteer || false,
      subscriptionTier: insertUser.subscriptionTier || 'free',
      avatar: insertUser.avatar || {
        piece: 'pawn',
        color: '#1e3a8a',
        accessories: {}
      },
      createdAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    this.users[userIndex] = { ...this.users[userIndex], ...updates };
    return this.users[userIndex];
  }

  // Event operations
  async getAllEvents(): Promise<Event[]> {
    return [...this.events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const event: Event = {
      id: this.nextEventId++,
      ...insertEvent,
      createdAt: new Date(),
    };
    this.events.push(event);
    return event;
  }

  async updateEvent(id: number, updates: Partial<Event>): Promise<Event> {
    const eventIndex = this.events.findIndex(event => event.id === id);
    if (eventIndex === -1) {
      throw new Error('Event not found');
    }
    
    this.events[eventIndex] = { ...this.events[eventIndex], ...updates };
    return this.events[eventIndex];
  }

  async deleteEvent(id: number): Promise<void> {
    const eventIndex = this.events.findIndex(event => event.id === id);
    if (eventIndex === -1) {
      throw new Error('Event not found');
    }
    this.events.splice(eventIndex, 1);
  }
}

export const storage = new MemStorage();
