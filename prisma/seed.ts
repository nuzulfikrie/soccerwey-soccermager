import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient();

async function clearDatabase() {
  // Delete in reverse order of dependencies
  await prisma.$executeRaw`TRUNCATE TABLE "MatchStatistic" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "MatchLineup" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Match" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Player" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Team" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "League" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Session" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Account" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "VerificationToken" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "User" CASCADE;`;

  console.log('Database cleared successfully');
}

function extractSQLStatements(sql: string): { [key: string]: string[] } {
  const sections: { [key: string]: string[] } = {};
  let currentSection = '';
  let currentStatements: string[] = [];
  let isCollectingStatements = false;

  // Split the SQL into lines
  const lines = sql.split('\n');

  for (let line of lines) {
    line = line.trim();

    // Skip empty lines
    if (!line) continue;

    // Check if this is a main section comment (not a Note or password comment)
    if (line.startsWith('-- ') &&
      !line.toLowerCase().includes('note:') &&
      !line.toLowerCase().includes('password') &&
      !line.includes('=')) {
      // If we have a previous section, save it
      if (currentSection && currentStatements.length > 0) {
        sections[currentSection] = currentStatements;
      }

      // Start new section
      currentSection = line.replace('-- ', '');
      currentStatements = [];
      isCollectingStatements = true;
      continue;
    }

    // Skip other comments
    if (line.startsWith('--')) continue;

    // Only collect statements if we're in a valid section
    if (isCollectingStatements) {
      currentStatements.push(line);
    }
  }

  // Don't forget to save the last section
  if (currentSection && currentStatements.length > 0) {
    sections[currentSection] = currentStatements;
  }

  // Join statements and split by semicolon
  const result: { [key: string]: string[] } = {};
  for (const [section, lines] of Object.entries(sections)) {
    const joined = lines.join('\n');
    result[section] = joined
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0)
      .map(stmt => stmt + ';');
  }

  return result;
}

async function main() {
  try {
    // Clear existing data first
    await clearDatabase();

    // Read the SQL seed file
    const seedPath = join(__dirname, 'seed_updated.sql');
    console.log('Reading seed file from:', seedPath);
    const seedSQL = readFileSync(seedPath, 'utf8');
    console.log('Seed file content length:', seedSQL.length);

    // Extract SQL statements by section
    const sections = extractSQLStatements(seedSQL);
    console.log('Found sections:', Object.keys(sections));

    // Define the order of sections to process
    const sectionOrder = [
      'Seed Users',
      'Seed Leagues',
      'Seed Teams',
      'Seed Players',
      'Seed a Match',
      'Seed Match Lineups',
      'Initialize Match Statistics'
    ];

    // Process sections in order
    for (const sectionName of sectionOrder) {
      const statements = sections[sectionName] || [];
      console.log(`Processing section: ${sectionName}`);
      console.log(`Number of statements in ${sectionName}:`, statements.length);

      for (const statement of statements) {
        try {
          console.log(`Executing statement in ${sectionName}:`, statement.substring(0, 100) + '...');
          await prisma.$executeRawUnsafe(statement);

          if (sectionName === 'Seed Users') {
            // Verify user insertion
            const userCount = await prisma.user.count();
            console.log(`User count after insertion: ${userCount}`);
          }

          console.log(`Successfully executed statement from section: ${sectionName}`);
        } catch (error) {
          console.error(`Error in section "${sectionName}" executing statement:`, statement);
          console.error('Error details:', error);
          throw error;
        }
      }
    }

    // Final verification
    const finalUserCount = await prisma.user.count();
    console.log(`Final user count: ${finalUserCount}`);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 