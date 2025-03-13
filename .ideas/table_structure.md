```md
I'll help you analyze your codebase to suggest an appropriate PostgreSQL database structure. Let me first scan your codebase to understand the application's requirements and data relationships.

Ran tool
Let me analyze your project structure and components to suggest an appropriate PostgreSQL database schema. I'll look into your application components and features to understand the data requirements.

Ran tool
Let me check your components directory to better understand the features and data requirements of your application.

Ran tool
Based on my analysis of your codebase, particularly the components like `live-match.tsx`, `match-setup.tsx`, and `play-field.tsx`, I'll suggest a comprehensive PostgreSQL database structure that would suit your soccer-related application. Here's the recommended schema:

```sql
-- Teams table to store team information
CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    logo_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Players table to store player information
CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    team_id INTEGER REFERENCES teams(id),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    jersey_number INTEGER,
    position VARCHAR(20),
    date_of_birth DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Matches table to store match information
CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    home_team_id INTEGER REFERENCES teams(id),
    away_team_id INTEGER REFERENCES teams(id),
    match_date TIMESTAMP WITH TIME ZONE NOT NULL,
    venue VARCHAR(100),
    status VARCHAR(20) DEFAULT 'scheduled', -- scheduled, live, completed, cancelled
    home_score INTEGER DEFAULT 0,
    away_score INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT different_teams CHECK (home_team_id != away_team_id)
);

-- Match Events table to store live match events
CREATE TABLE match_events (
    id SERIAL PRIMARY KEY,
    match_id INTEGER REFERENCES matches(id),
    player_id INTEGER REFERENCES players(id),
    event_type VARCHAR(50) NOT NULL, -- goal, assist, yellow_card, red_card, substitution
    event_minute INTEGER,
    additional_info JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Match Lineups table to store team formations and starting players
CREATE TABLE match_lineups (
    id SERIAL PRIMARY KEY,
    match_id INTEGER REFERENCES matches(id),
    team_id INTEGER REFERENCES teams(id),
    player_id INTEGER REFERENCES players(id),
    position VARCHAR(20),
    is_starter BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(match_id, player_id)
);

-- Match Statistics table to store detailed match stats
CREATE TABLE match_statistics (
    id SERIAL PRIMARY KEY,
    match_id INTEGER REFERENCES matches(id),
    team_id INTEGER REFERENCES teams(id),
    possession DECIMAL(5,2),
    shots_on_target INTEGER DEFAULT 0,
    shots_off_target INTEGER DEFAULT 0,
    corners INTEGER DEFAULT 0,
    fouls INTEGER DEFAULT 0,
    yellow_cards INTEGER DEFAULT 0,
    red_cards INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(match_id, team_id)
);

-- Create indexes for better query performance
CREATE INDEX idx_matches_date ON matches(match_date);
CREATE INDEX idx_match_events_match_id ON match_events(match_id);
CREATE INDEX idx_match_lineups_match_id ON match_lineups(match_id);
CREATE INDEX idx_players_team_id ON players(team_id);
```

This schema includes:

1. **Teams**: Stores basic team information
2. **Players**: Stores player details with team associations
3. **Matches**: Core table for match information
4. **Match Events**: Tracks live match events (goals, cards, etc.)
5. **Match Lineups**: Stores team formations and player positions
6. **Match Statistics**: Stores detailed match statistics

Key features of this schema:

- Uses appropriate data types for each column
- Implements referential integrity with foreign keys
- Includes timestamps for auditing
- Has necessary indexes for performance
- Uses JSONB for flexible additional event data
- Includes constraints to maintain data integrity

To use this with your Next.js application:

1. Set up Prisma as your ORM:
```bash
npm install @prisma/client prisma
npx prisma init
```

2. Add the schema to your `prisma/schema.prisma` file (I can help with the Prisma schema if you'd like)

3. Use environment variables for database connection:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/soccerwey?schema=public"
```

Would you like me to:
1. Provide the Prisma schema version of this database structure?
2. Add any additional tables or fields specific to your application's needs?
3. Explain any particular part of the schema in more detail?
```
