# Soccerwey - Soccer Management System Hey this is a WIP - not yet finished

A modern soccer management system built with Next.js 15, Prisma, and PostgreSQL. This application helps manage soccer leagues, teams, players, matches, and statistics.

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 18, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Styling**: TailwindCSS, Radix UI Components
- **State Management**: Zustand
- **Form Handling**: React Hook Form, Zod
- **Real-time Updates**: Pusher
- **TypeScript** for type safety

## 📋 Features

- User authentication with multiple providers
- Role-based access control (Admin/User)
- League management
- Team management with detailed kit information
- Player profiles and statistics
- Match scheduling and live updates
- Match lineups and statistics tracking
- Real-time updates for match events

## 🛠 Prerequisites

- Node.js v18 or higher
- PostgreSQL 15 or higher
- npm or yarn

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd soccerwey
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/soccerwey"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   ```

4. **Initialize the database**
   ```bash
   npx prisma migrate dev
   ```

5. **Seed the database**
   ```bash
   npx prisma db seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

## 📚 Prisma Commands and Usage

### Database Migration Commands

1. **Create a new migration**
   ```bash
   npx prisma migrate dev --name <migration-name>
   ```

2. **Apply migrations to production**
   ```bash
   npx prisma migrate deploy
   ```

3. **Reset database (caution: deletes all data)**
   ```bash
   npx prisma migrate reset
   ```

### Database Management

1. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

2. **View database in Prisma Studio**
   ```bash
   npx prisma studio
   ```

3. **Format schema file**
   ```bash
   npx prisma format
   ```

### Seeding Data

The project includes a comprehensive seeding system that creates:
- Admin and regular user accounts
- Sample leagues
- Teams with detailed kit information
- Players
- Sample matches with lineups
- Initial match statistics

To modify seed data, edit `prisma/seed_updated.sql` and run:
```bash
npx prisma db seed
```

## 📊 Database Schema

### Core Models

1. **User**
   - Authentication and authorization
   - Role-based access (Admin/User)
   - Integrated with NextAuth.js

2. **League**
   - Manages soccer leagues
   - Contains teams and competition structure

3. **Team**
   - Detailed team information
   - Kit colors (primary, secondary, third)
   - Player roster management

4. **Player**
   - Player biographical information
   - Team associations
   - Match participation tracking

5. **Match**
   - Match scheduling and status
   - Score tracking
   - Home and away team relationships

6. **MatchLineup**
   - Player assignments for matches
   - Starting lineup tracking

7. **MatchStatistic**
   - Comprehensive match statistics
   - Team performance metrics

## 🔐 Authentication

The application uses NextAuth.js with:
- Email/Password authentication
- Social login support
- Session management
- Password reset functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email [nuzulfikrie@gmail.com] or open an issue in the repository.  

## Tech Stack for Realtime Features

The application implements realtime features using a combination of technologies:

### Primary Realtime Stack
- **Pusher** - Main websocket provider for realtime communication
  - Used for match updates, scores, and live statistics
  - Handles player substitutions and event notifications
  - Manages live chat features during matches

### Implementation Details
1. **Match Updates**
   ```typescript
   // Example channel structure
   match-updates-{matchId}
   team-updates-{teamId}
   league-updates-{leagueId}
   ```

2. **Event Types**
   - Live score updates
   - Player substitutions
   - Card events (yellow/red)
   - Goal notifications
   - Match status changes

### Scalability Features
- Channel presence detection
- Client event broadcasting
- WebSocket fallback to HTTP long-polling
- Automatic reconnection handling

### Security Measures
- Private channels for authenticated users
- Channel authorization via Next.js API routes
- Rate limiting on event publishing
- Encrypted communication

### Local Development
```bash
# Install Pusher dependencies
npm install pusher pusher-js

# Set up environment variables
PUSHER_APP_ID=your_app_id
PUSHER_KEY=your_key
PUSHER_SECRET=your_secret
PUSHER_CLUSTER=your_cluster
```

### Production Considerations
- Multiple server instances support
- Automatic scaling with usage
- Fallback transport options
- Regional clustering for lower latency
