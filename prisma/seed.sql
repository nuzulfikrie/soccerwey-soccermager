-- Clear existing data
TRUNCATE TABLE "MatchStatistic" CASCADE;
TRUNCATE TABLE "MatchLineup" CASCADE;
TRUNCATE TABLE "Match" CASCADE;
TRUNCATE TABLE "Player" CASCADE;
TRUNCATE TABLE "Lineup" CASCADE;
TRUNCATE TABLE "Kit" CASCADE;
TRUNCATE TABLE "Team" CASCADE;
TRUNCATE TABLE "League" CASCADE;
TRUNCATE TABLE "Session" CASCADE;
TRUNCATE TABLE "Account" CASCADE;
TRUNCATE TABLE "VerificationToken" CASCADE;
TRUNCATE TABLE "User" CASCADE;

-- Seed Users
INSERT INTO "User" ("id", "name", "email", "hashedPassword", "role", "createdAt", "updatedAt") VALUES
('clh1234567890admin', 'Admin User', 'admin@soccerwey.com', '$2a$12$k8Y6JG3pGXQrw.9Ry0P8h.NR4kN0PjLFcqKKPYt.OYXssOH.xYBIy', 'ADMIN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('clh1234567890john', 'John Doe', 'john.doe@soccerwey.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewYpfQS.PVZYZGcK', 'USER', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('clh1234567890jane', 'Jane Smith', 'jane.smith@soccerwey.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewYpfQS.PVZYZGcK', 'USER', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Seed Leagues
INSERT INTO "League" ("id", "name", "logoUrl", "createdAt", "updatedAt") VALUES
('clh1234567890pl', 'Premier League', 'https://example.com/logos/premier-league.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('clh1234567890ll', 'La Liga', 'https://example.com/logos/la-liga.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('clh1234567890bl', 'Bundesliga', 'https://example.com/logos/bundesliga.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Seed Teams
INSERT INTO "Team" ("id", "name", "logoUrl", "leagueId", "userId", "createdAt", "updatedAt") VALUES
('clh1234567890mu', 'Manchester United', 'https://example.com/logos/manchester-united.png', 'clh1234567890pl', 'clh1234567890john', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('clh1234567890lp', 'Liverpool', 'https://example.com/logos/liverpool.png', 'clh1234567890pl', 'clh1234567890jane', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Seed Kits
INSERT INTO "Kit" ("id", "type", "teamId", "jersey", "pants", "socks", "createdAt", "updatedAt") VALUES
('clh1234567890muk1', 'MAIN', 'clh1234567890mu', '#DA291C', '#FFFFFF', '#000000', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('clh1234567890muk2', 'SECOND', 'clh1234567890mu', '#000000', '#000000', '#DA291C', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('clh1234567890lpk1', 'MAIN', 'clh1234567890lp', '#C8102E', '#C8102E', '#C8102E', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('clh1234567890lpk2', 'SECOND', 'clh1234567890lp', '#FFFFFF', '#FFFFFF', '#FFFFFF', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Seed Lineups
INSERT INTO "Lineup" ("id", "name", "teamId", "kitId", "formation", "createdAt", "updatedAt") VALUES
('clh1234567890mul1', 'Main Formation', 'clh1234567890mu', 'clh1234567890muk1', '4-3-3', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('clh1234567890lpl1', 'Main Formation', 'clh1234567890lp', 'clh1234567890lpk1', '4-3-3', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Seed Players
INSERT INTO "Player" ("id", "name", "number", "position", "lineupId", "isSubstitute", "x", "y") VALUES
('clh1234567890mr', 'Marcus Rashford', 10, 'FWD', 'clh1234567890mul1', false, 75, 80),
('clh1234567890bf', 'Bruno Fernandes', 8, 'MID', 'clh1234567890mul1', false, 50, 60),
('clh1234567890ms', 'Mohamed Salah', 11, 'FWD', 'clh1234567890lpl1', false, 75, 80),
('clh1234567890vd', 'Virgil van Dijk', 4, 'DEF', 'clh1234567890lpl1', false, 25, 30);

-- Seed Matches
INSERT INTO "Match" ("id", "homeTeamId", "awayTeamId", "matchDate", "venue", "status", "homeScore", "awayScore", "createdAt", "updatedAt") VALUES
('clh1234567890m1', 'clh1234567890mu', 'clh1234567890lp', CURRENT_TIMESTAMP + interval '7 days', 'Old Trafford', 'SCHEDULED', 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Seed Match Lineups
INSERT INTO "MatchLineup" ("id", "matchId", "teamId", "playerId", "position", "isStarter", "createdAt", "updatedAt") VALUES
('clh1234567890ml1', 'clh1234567890m1', 'clh1234567890mu', 'clh1234567890mr', 'FWD', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('clh1234567890ml2', 'clh1234567890m1', 'clh1234567890mu', 'clh1234567890bf', 'MID', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('clh1234567890ml3', 'clh1234567890m1', 'clh1234567890lp', 'clh1234567890ms', 'FWD', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('clh1234567890ml4', 'clh1234567890m1', 'clh1234567890lp', 'clh1234567890vd', 'DEF', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Seed Match Statistics
INSERT INTO "MatchStatistic" ("id", "matchId", "teamId", "possession", "shotsOnTarget", "shotsOffTarget", "corners", "fouls", "yellowCards", "redCards", "createdAt", "updatedAt") VALUES
('clh1234567890s1', 'clh1234567890m1', 'clh1234567890mu', 0, 0, 0, 0, 0, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('clh1234567890s2', 'clh1234567890m1', 'clh1234567890lp', 0, 0, 0, 0, 0, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);