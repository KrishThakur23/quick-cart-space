# Replit.md

## Overview

This is a full-stack e-commerce web application built with React, TypeScript, and Express.js. The application features a modern product marketplace called "Bonemart" with user authentication, product management, shopping cart functionality, and order processing.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React Query (@tanstack/react-query) for server state management
- **Routing**: React Router for client-side navigation
- **UI Components**: Radix UI primitives with custom styling via shadcn/ui

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: PostgreSQL session store (connect-pg-simple)

### Development Setup
- **Monorepo Structure**: Client and server code in separate directories with shared schema
- **Hot Reload**: Vite dev server with HMR for frontend, tsx for backend development
- **TypeScript**: Strict configuration with path mapping for clean imports

## Key Components

### Authentication System
- User registration and login functionality
- Role-based access control (customer, owner, admin)
- Session-based authentication
- Profile management for users

### Product Management
- Product CRUD operations for store owners
- Image upload functionality (multiple images per product)
- Category-based product organization
- Search and filtering capabilities

### Shopping Experience
- Product catalog with detailed product pages
- Shopping cart functionality
- Order placement and management
- Responsive design for mobile and desktop

### Database Schema
- **Users**: User authentication and profile data
- **Products**: Product information, pricing, and metadata
- **Orders**: Order tracking and customer information
- **Profiles**: Extended user profile information with roles

## Data Flow

1. **Authentication Flow**: Users sign up/in through Supabase Auth, profile data stored in PostgreSQL
2. **Product Management**: Owners can create/edit products with image uploads to storage
3. **Shopping Flow**: Customers browse products, add to cart, and place orders
4. **Order Processing**: Orders are stored with customer details and product information

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form handling and validation
- **zod**: Schema validation

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Frontend build tool
- **tsx**: TypeScript execution for development
- **esbuild**: Production build bundling

## Deployment Strategy

### Production Build Process
1. Frontend: Vite builds optimized React app to `dist/public`
2. Backend: esbuild bundles Express server to `dist/index.js`
3. Database: Drizzle migrations applied via `db:push` command

### Environment Configuration
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Environment setting (development/production)

### Hosting Requirements
- Node.js runtime environment
- PostgreSQL database instance
- Static file serving capability for frontend assets

## Changelog

Changelog:
- June 29, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.