import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertEventSchema } from "@shared/schema";
import { z } from "zod";
import { sendOTPEmail, verifyOTP } from "./emailService";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post('/api/auth/register', async (req, res) => {
    try {
      const { email, username, password, isVolunteer, avatar } = req.body;
      
      if (!email || !username || !password) {
        return res.status(400).json({ message: 'Email, username, and password are required' });
      }

      if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
      }

      // Check if user already exists
      const existingUserByEmail = await storage.getUserByEmail(email);
      if (existingUserByEmail) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }

      const existingUserByUsername = await storage.getUserByUsername(username);
      if (existingUserByUsername) {
        return res.status(400).json({ message: 'User with this username already exists' });
      }

      // Create new user (password should be hashed in production)
      const newUser = await storage.createUser({
        email,
        username,
        password, // In production, hash this password
        skillLevel: 'beginner',
        isVolunteer: isVolunteer || false,
        subscriptionTier: 'free',
        avatar: avatar || {
          piece: 'pawn',
          color: '#1e3a8a',
          accessories: {}
        }
      });

      res.json(newUser);
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      // Find user by email
      const user = await storage.getUserByEmail(email);
      if (!user || user.password !== password) { // In production, compare hashed passwords
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      res.json(user);
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Forgot password - send OTP
  app.post('/api/auth/forgot-password', async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }

      // Check if user exists
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: 'No account found with this email address' });
      }

      // Send OTP email
      const result = await sendOTPEmail(email);
      
      if (result.success) {
        res.json({ 
          message: result.message,
          // Include OTP in response for development/testing - remove in production
          otp: result.otp
        });
      } else {
        res.status(500).json({ message: result.message });
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Reset password with OTP verification
  app.post('/api/auth/reset-password', async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body;
      
      if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: 'Email, OTP, and new password are required' });
      }

      if (newPassword.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
      }

      // Verify OTP
      const otpResult = verifyOTP(email, otp);
      if (!otpResult.success) {
        return res.status(400).json({ message: otpResult.message });
      }

      // Check if user exists
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update password (in production, hash the password)
      await storage.updateUser(user.id, { password: newPassword });

      res.json({ message: 'Password reset successfully. You can now login with your new password.' });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // User routes
  app.put('/api/users/avatar', async (req, res) => {
    try {
      const { avatar } = req.body;
      const { userId } = req.body; // In production, get this from session/token
      
      if (!avatar || !userId) {
        return res.status(400).send('Avatar data and user ID are required');
      }

      // For demo purposes, we'll use a hardcoded user ID (1)
      // In production, get user ID from authenticated session
      const updatedUser = await storage.updateUser(userId || 1, { avatar });
      res.json(updatedUser);
    } catch (error) {
      console.error('Avatar update error:', error);
      res.status(500).send('Failed to update avatar');
    }
  });

  // Event routes
  app.get('/api/events', async (req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ message: 'Failed to fetch events' });
    }
  });

  app.post('/api/events', async (req, res) => {
    try {
      const eventData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(eventData);
      res.status(201).json(event);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Invalid event data', errors: error.errors });
      } else {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Failed to create event' });
      }
    }
  });

  app.put('/api/events/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const eventData = insertEventSchema.parse(req.body);
      const event = await storage.updateEvent(id, eventData);
      res.json(event);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Invalid event data', errors: error.errors });
      } else {
        console.error('Error updating event:', error);
        res.status(500).json({ message: 'Failed to update event' });
      }
    }
  });

  app.delete('/api/events/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteEvent(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).json({ message: 'Failed to delete event' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
