/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `jerseyNumber` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `teamKitColor` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `teamKitColorSecondary` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `teamKitColorThird` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `teamPantsColor` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `teamPantsColorSecondary` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `teamPantsColorThird` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `teamSocksColor` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `teamSocksColorSecondary` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `teamSocksColorThird` on the `Team` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "KitType" AS ENUM ('MAIN', 'SECOND', 'THIRD');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('GK', 'DEF', 'MID', 'FWD');

-- Drop foreign key first
ALTER TABLE "Player" DROP CONSTRAINT IF EXISTS "Player_teamId_fkey";

-- Drop index
DROP INDEX IF EXISTS "Player_teamId_idx";

-- First, create the new columns in Player table
ALTER TABLE "Player"
ADD COLUMN "isSubstitute" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "lineupId" TEXT,
ADD COLUMN "name" TEXT,
ADD COLUMN "number" INTEGER,
ADD COLUMN "x" DOUBLE PRECISION,
ADD COLUMN "y" DOUBLE PRECISION;

-- Update Player data with concatenated names
UPDATE "Player"
SET 
    "name" = CONCAT("firstName", ' ', "lastName"),
    "number" = "jerseyNumber"
WHERE "firstName" IS NOT NULL AND "lastName" IS NOT NULL;

-- Create a temporary column for the new position type
ALTER TABLE "Player" ADD COLUMN "new_position" "Position";

-- Update the temporary column with the converted values
UPDATE "Player"
SET "new_position" = 
    CASE position
        WHEN 'Forward' THEN 'FWD'::"Position"
        WHEN 'Midfielder' THEN 'MID'::"Position"
        WHEN 'Defender' THEN 'DEF'::"Position"
        WHEN 'Goalkeeper' THEN 'GK'::"Position"
        ELSE 'MID'::"Position"
    END;

-- Drop the old position column and rename the new one
ALTER TABLE "Player" DROP COLUMN "position";
ALTER TABLE "Player" RENAME COLUMN "new_position" TO "position";

-- Create Kit table
CREATE TABLE "Kit" (
    "id" TEXT NOT NULL,
    "type" "KitType" NOT NULL,
    "teamId" TEXT NOT NULL,
    "jersey" TEXT NOT NULL,
    "pants" TEXT NOT NULL,
    "socks" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Kit_pkey" PRIMARY KEY ("id")
);

-- Create Lineup table
CREATE TABLE "Lineup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "kitId" TEXT NOT NULL,
    "formation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Lineup_pkey" PRIMARY KEY ("id")
);

-- Add userId to Team
ALTER TABLE "Team" ADD COLUMN "userId" TEXT;

-- Migrate kit data from Team to Kit table
INSERT INTO "Kit" ("id", "type", "teamId", "jersey", "pants", "socks", "createdAt", "updatedAt")
SELECT 
    gen_random_uuid()::TEXT,
    'MAIN'::"KitType",
    "id",
    "teamKitColor",
    "teamPantsColor",
    "teamSocksColor",
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM "Team"
WHERE "teamKitColor" IS NOT NULL;

INSERT INTO "Kit" ("id", "type", "teamId", "jersey", "pants", "socks", "createdAt", "updatedAt")
SELECT 
    gen_random_uuid()::TEXT,
    'SECOND'::"KitType",
    "id",
    "teamKitColorSecondary",
    "teamPantsColorSecondary",
    "teamSocksColorSecondary",
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM "Team"
WHERE "teamKitColorSecondary" IS NOT NULL;

INSERT INTO "Kit" ("id", "type", "teamId", "jersey", "pants", "socks", "createdAt", "updatedAt")
SELECT 
    gen_random_uuid()::TEXT,
    'THIRD'::"KitType",
    "id",
    "teamKitColorThird",
    "teamPantsColorThird",
    "teamSocksColorThird",
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM "Team"
WHERE "teamKitColorThird" IS NOT NULL;

-- Create indexes
CREATE INDEX "Kit_teamId_idx" ON "Kit"("teamId");
CREATE UNIQUE INDEX "Kit_teamId_type_key" ON "Kit"("teamId", "type");
CREATE INDEX "Lineup_teamId_idx" ON "Lineup"("teamId");
CREATE INDEX "Lineup_kitId_idx" ON "Lineup"("kitId");
CREATE INDEX "Player_lineupId_idx" ON "Player"("lineupId");
CREATE INDEX "Team_userId_idx" ON "Team"("userId");
CREATE INDEX "Team_leagueId_idx" ON "Team"("leagueId");

-- Add foreign key constraints
ALTER TABLE "Team" ADD CONSTRAINT "Team_userId_fkey" 
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Kit" ADD CONSTRAINT "Kit_teamId_fkey" 
    FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Lineup" ADD CONSTRAINT "Lineup_teamId_fkey" 
    FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Lineup" ADD CONSTRAINT "Lineup_kitId_fkey" 
    FOREIGN KEY ("kitId") REFERENCES "Kit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Player" ADD CONSTRAINT "Player_lineupId_fkey" 
    FOREIGN KEY ("lineupId") REFERENCES "Lineup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Now it's safe to drop the old columns from Team
ALTER TABLE "Team"
DROP COLUMN "teamKitColor",
DROP COLUMN "teamKitColorSecondary",
DROP COLUMN "teamKitColorThird",
DROP COLUMN "teamPantsColor",
DROP COLUMN "teamPantsColorSecondary",
DROP COLUMN "teamPantsColorThird",
DROP COLUMN "teamSocksColor",
DROP COLUMN "teamSocksColorSecondary",
DROP COLUMN "teamSocksColorThird";

-- Finally, drop the old columns from Player
ALTER TABLE "Player"
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "dateOfBirth",
DROP COLUMN "jerseyNumber",
DROP COLUMN "teamId",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
