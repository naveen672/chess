# ChessMasters - Interactive Chess Learning Platform

## Overview

ChessMasters is a full-stack web application designed to teach chess through an interactive, gamified learning experience. The platform features an island-themed roadmap system where users progress through three skill levels (beginner, intermediate, advanced) by completing various types of learning activities including lessons, puzzles, videos, games, and assessments.

## User Preferences

Preferred communication style: Simple, everyday language.
AI Features: All AI assistant features should be completely free for all users - no premium restrictions or subscription tiers for AI functionality.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, accessible UI components
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Context API for authentication state, TanStack Query for server state management
- **Theme**: "New York" variant of shadcn/ui with neutral base colors and CSS variables for theming

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Production Build**: esbuild for server bundling

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Shared schema definitions using drizzle-zod for validation
- **Current Storage**: In-memory storage implementation (MemStorage) for development
- **Target Database**: PostgreSQL (configured but not yet implemented)
- **Connection**: Neon Database serverless PostgreSQL driver

## Key Components

### Authentication System
- Context-based authentication using React Context API
- Mock authentication for development (stores user state in memory)
- User schema includes progress tracking, completed lessons, and skill levels

### Interactive Roadmap
- Island-themed learning progression system
- Five types of learning activities: main lessons, videos, puzzles, games, assessments
- Three skill levels with unlocking mechanism based on completion
- Visual positioning system for island placement on the map

### Learning Management
- Progressive skill-based learning paths
- Lesson completion tracking
- Puzzle solving system with difficulty levels
- Progress persistence across sessions

### UI Components
- Comprehensive component library using Radix UI primitives
- Responsive design with mobile-first approach
- Consistent theming system with CSS custom properties
- Form handling with React Hook Form and Zod validation

## Data Flow

### Client-Side Flow
1. User authentication state managed through AuthContext
2. TanStack Query handles server state caching and synchronization
3. Route-based navigation with protected routes for authenticated features
4. Component state for UI interactions and form handling

### Server-Side Flow
1. Express middleware for request logging and JSON parsing
2. Route registration system with API prefix
3. Storage interface abstraction for CRUD operations
4. Error handling middleware for consistent error responses

### Development Flow
1. Vite dev server with HMR for frontend development
2. Express server with automatic TypeScript compilation
3. Shared schema definitions between client and server
4. Development-specific plugins for error overlays and debugging

## External Dependencies

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Headless UI components for accessibility
- **Lucide React**: Icon library
- **class-variance-authority**: Utility for component variants

### Development Tools
- **Vite**: Build tool with React plugin
- **TypeScript**: Type safety across the stack
- **Replit-specific**: Development banner and cartographer plugins

### Database and Validation
- **Drizzle ORM**: Type-safe database operations
- **Zod**: Runtime type validation
- **Neon Database**: Serverless PostgreSQL

### State Management
- **TanStack Query**: Server state management
- **React Hook Form**: Form state and validation
- **Wouter**: Lightweight routing

## Deployment Strategy

### Development Environment
- Local development with Vite dev server
- Express server running on Node.js with tsx
- In-memory storage for rapid prototyping
- Hot module replacement for frontend development

### Production Build Process
1. Frontend build using Vite (outputs to `dist/public`)
2. Server build using esbuild (outputs to `dist/index.js`)
3. Static file serving for production frontend assets
4. Environment variable configuration for database connection

### Architecture Decisions

**Problem**: Need for rapid prototyping and development
**Solution**: In-memory storage with interface abstraction
**Rationale**: Allows immediate development without database setup while maintaining clean architecture for future PostgreSQL integration
**Pros**: Fast development, no external dependencies
**Cons**: Data doesn't persist between server restarts

**Problem**: Complex state management for learning progress
**Solution**: Combination of React Context and TanStack Query
**Rationale**: Context for authentication state that needs to be globally accessible, TanStack Query for server state with caching
**Pros**: Clean separation of concerns, efficient caching
**Cons**: Slight complexity in understanding two state systems

**Problem**: Need for consistent, accessible UI components
**Solution**: shadcn/ui with Radix UI primitives
**Rationale**: Provides pre-built accessible components that can be customized
**Pros**: Accessibility built-in, consistent design system, customizable
**Cons**: Initial setup complexity, larger bundle size

**Problem**: Type safety across client and server
**Solution**: Shared schema definitions and TypeScript throughout
**Rationale**: Prevents runtime errors and improves developer experience
**Pros**: Compile-time error detection, better IDE support
**Cons**: Longer build times, learning curve