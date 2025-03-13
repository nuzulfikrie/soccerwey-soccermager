-- Seed Users
-- Note: Passwords are hashed using bcrypt
-- Default passwords:
-- admin@soccerwey.com = Admin123!
-- john.doe@soccerwey.com = User123!
-- jane.smith@soccerwey.com = User123!

INSERT INTO users (name, email, password, role, created_at, updated_at)
VALUES
    (
        'Admin User',
        'admin@soccerwey.com',
        '$2a$12$k8Y6JG3pGXQrw.9Ry0P8h.NR4kN0PjLFcqKKPYt.OYXssOH.xYBIy', -- Admin123!
        'ADMIN',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'John Doe',
        'john.doe@soccerwey.com',
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewYpfQS.PVZYZGcK', -- User123!
        'USER',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'Jane Smith',
        'jane.smith@soccerwey.com',
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewYpfQS.PVZYZGcK', -- User123!
        'USER',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Seed Leagues
INSERT INTO leagues (name, logo_url, created_at, updated_at)
VALUES
    (
        'Premier League',
        'https://example.com/logos/premier-league.png',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'La Liga',
        'https://example.com/logos/la-liga.png',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'Bundesliga',
        'https://example.com/logos/bundesliga.png',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Seed Teams
INSERT INTO teams (
    name, 
    logo_url, 
    team_kit_color,
    team_kit_color_secondary,
    team_kit_color_third,
    team_pants_color,
    team_pants_color_secondary,
    team_pants_color_third,
    team_socks_color,
    team_socks_color_secondary,
    team_socks_color_third,
    created_at,
    updated_at
)
VALUES
    (
        'Manchester United',
        'https://example.com/logos/manchester-united.png',
        '#DA291C', -- Red
        '#000000', -- Black
        '#FFFFFF', -- White
        '#FFFFFF', -- White
        '#000000', -- Black
        '#DA291C', -- Red
        '#000000', -- Black
        '#DA291C', -- Red
        '#FFFFFF', -- White
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'Liverpool',
        'https://example.com/logos/liverpool.png',
        '#C8102E', -- Red
        '#FFFFFF', -- White
        '#2D3238', -- Dark Grey
        '#C8102E', -- Red
        '#FFFFFF', -- White
        '#2D3238', -- Dark Grey
        '#C8102E', -- Red
        '#FFFFFF', -- White
        '#2D3238', -- Dark Grey
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Seed Players
INSERT INTO players (team_id, first_name, last_name, jersey_number, position, date_of_birth, created_at, updated_at)
VALUES
    (
        1, -- Manchester United
        'Marcus',
        'Rashford',
        10,
        'Forward',
        '1997-10-31',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        1, -- Manchester United
        'Bruno',
        'Fernandes',
        8,
        'Midfielder',
        '1994-09-08',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        2, -- Liverpool
        'Mohamed',
        'Salah',
        11,
        'Forward',
        '1992-06-15',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        2, -- Liverpool
        'Virgil',
        'van Dijk',
        4,
        'Defender',
        '1991-07-08',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Seed a Match
INSERT INTO matches (
    home_team_id,
    away_team_id,
    match_date,
    venue,
    status,
    home_score,
    away_score,
    created_at,
    updated_at
)
VALUES
    (
        1, -- Manchester United (Home)
        2, -- Liverpool (Away)
        CURRENT_TIMESTAMP + INTERVAL '7 days',
        'Old Trafford',
        'scheduled',
        0,
        0,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Seed Match Lineups
INSERT INTO match_lineups (match_id, team_id, player_id, position, is_starter)
VALUES
    (1, 1, 1, 'Forward', true),    -- Rashford
    (1, 1, 2, 'Midfielder', true), -- Fernandes
    (1, 2, 3, 'Forward', true),    -- Salah
    (1, 2, 4, 'Defender', true);   -- van Dijk

-- Initialize Match Statistics
INSERT INTO match_statistics (
    match_id,
    team_id,
    possession,
    shots_on_target,
    shots_off_target,
    corners,
    fouls,
    yellow_cards,
    red_cards
)
VALUES
    (1, 1, 0, 0, 0, 0, 0, 0, 0), -- Manchester United stats
    (1, 2, 0, 0, 0, 0, 0, 0, 0); -- Liverpool stats 