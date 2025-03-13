-- Seed Users
-- Note: Passwords are hashed using bcrypt
-- Default passwords:
-- admin@soccerwey.com = Admin123!
-- john.doe@soccerwey.com = User123!
-- jane.smith@soccerwey.com = User123!

INSERT INTO "User" (id, name, email, "hashedPassword", role, "createdAt", "updatedAt")
VALUES
    (
        'clh1234567890admin',
        'Admin User',
        'admin@soccerwey.com',
        '$2a$12$k8Y6JG3pGXQrw.9Ry0P8h.NR4kN0PjLFcqKKPYt.OYXssOH.xYBIy',
        'ADMIN',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'clh1234567890john',
        'John Doe',
        'john.doe@soccerwey.com',
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewYpfQS.PVZYZGcK',
        'USER',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'clh1234567890jane',
        'Jane Smith',
        'jane.smith@soccerwey.com',
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewYpfQS.PVZYZGcK',
        'USER',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Seed Leagues
INSERT INTO "League" (id, name, "logoUrl", "createdAt", "updatedAt")
VALUES
    (
        'clh1234567890pl',
        'Premier League',
        'https://example.com/logos/premier-league.png',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'clh1234567890ll',
        'La Liga',
        'https://example.com/logos/la-liga.png',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'clh1234567890bl',
        'Bundesliga',
        'https://example.com/logos/bundesliga.png',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Seed Teams
INSERT INTO "Team" (
    id,
    name, 
    "logoUrl", 
    "teamKitColor",
    "teamKitColorSecondary",
    "teamKitColorThird",
    "teamPantsColor",
    "teamPantsColorSecondary",
    "teamPantsColorThird",
    "teamSocksColor",
    "teamSocksColorSecondary",
    "teamSocksColorThird",
    "createdAt",
    "updatedAt"
)
VALUES
    (
        'clh1234567890mu',
        'Manchester United',
        'https://example.com/logos/manchester-united.png',
        '#DA291C',
        '#000000',
        '#FFFFFF',
        '#FFFFFF',
        '#000000',
        '#DA291C',
        '#000000',
        '#DA291C',
        '#FFFFFF',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'clh1234567890lp',
        'Liverpool',
        'https://example.com/logos/liverpool.png',
        '#C8102E',
        '#FFFFFF',
        '#2D3238',
        '#C8102E',
        '#FFFFFF',
        '#2D3238',
        '#C8102E',
        '#FFFFFF',
        '#2D3238',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Seed Players
INSERT INTO "Player" (id, "teamId", "firstName", "lastName", "jerseyNumber", position, "dateOfBirth", "createdAt", "updatedAt")
VALUES
    (
        'clh1234567890mr',
        'clh1234567890mu',
        'Marcus',
        'Rashford',
        10,
        'Forward',
        '1997-10-31',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'clh1234567890bf',
        'clh1234567890mu',
        'Bruno',
        'Fernandes',
        8,
        'Midfielder',
        '1994-09-08',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'clh1234567890ms',
        'clh1234567890lp',
        'Mohamed',
        'Salah',
        11,
        'Forward',
        '1992-06-15',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'clh1234567890vd',
        'clh1234567890lp',
        'Virgil',
        'van Dijk',
        4,
        'Defender',
        '1991-07-08',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Seed a Match
INSERT INTO "Match" (
    id,
    "homeTeamId",
    "awayTeamId",
    "matchDate",
    venue,
    status,
    "homeScore",
    "awayScore",
    "createdAt",
    "updatedAt"
)
VALUES
    (
        'clh1234567890m1',
        'clh1234567890mu',
        'clh1234567890lp',
        CURRENT_TIMESTAMP + INTERVAL '7 days',
        'Old Trafford',
        'SCHEDULED',
        0,
        0,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Seed Match Lineups
INSERT INTO "MatchLineup" (
    id, 
    "matchId", 
    "teamId", 
    "playerId", 
    position, 
    "isStarter",
    "createdAt",
    "updatedAt"
)
VALUES
    (
        'clh1234567890l1',
        'clh1234567890m1',
        'clh1234567890mu',
        'clh1234567890mr',
        'Forward',
        true,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'clh1234567890l2',
        'clh1234567890m1',
        'clh1234567890mu',
        'clh1234567890bf',
        'Midfielder',
        true,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'clh1234567890l3',
        'clh1234567890m1',
        'clh1234567890lp',
        'clh1234567890ms',
        'Forward',
        true,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'clh1234567890l4',
        'clh1234567890m1',
        'clh1234567890lp',
        'clh1234567890vd',
        'Defender',
        true,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Initialize Match Statistics
INSERT INTO "MatchStatistic" (
    id,
    "matchId",
    "teamId",
    possession,
    "shotsOnTarget",
    "shotsOffTarget",
    corners,
    fouls,
    "yellowCards",
    "redCards",
    "createdAt",
    "updatedAt"
)
VALUES
    (
        'clh1234567890s1',
        'clh1234567890m1',
        'clh1234567890mu',
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'clh1234567890s2',
        'clh1234567890m1',
        'clh1234567890lp',
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ); 