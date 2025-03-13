#!/bin/bash

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Load environment variables from .env file if it exists
if [ -f "$PROJECT_ROOT/.env" ]; then
    set -a
    source "$PROJECT_ROOT/.env"
    set +a
else
    echo "Warning: .env file not found. Using default or existing environment variables."
fi

# Database connection details
DB_NAME=${DB_NAME:-"soccerwey"}
DB_USER=${DB_USER:-"myuser"}
DB_PASSWORD=${DB_PASSWORD:-"mypassword"}
DB_HOST=${DB_HOST:-"localhost"}
DB_PORT=${DB_PORT:-"5432"}

echo "Setting up database..."

# Check if psql is installed
if ! command -v psql &> /dev/null; then
    echo "Error: PostgreSQL client (psql) is not installed or not in PATH"
    echo "Please install PostgreSQL client tools and try again"
    exit 1
fi

# Check if the tables.sql file exists
TABLES_FILE="$PROJECT_ROOT/tables.sql"
if [ ! -f "$TABLES_FILE" ]; then
    echo "Error: tables.sql file not found at $TABLES_FILE"
    exit 1
fi

# Check if the seed.sql file exists
SEED_FILE="$PROJECT_ROOT/prisma/seed.sql"
if [ ! -f "$SEED_FILE" ]; then
    echo "Error: seed.sql file not found at $SEED_FILE"
    exit 1
fi

# First create the tables
echo "Creating tables..."
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f "$TABLES_FILE"
if [ $? -ne 0 ]; then
    echo "Error: Failed to create tables"
    exit 1
fi

# Then seed the data
echo "Seeding data..."
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f "$SEED_FILE"
if [ $? -ne 0 ]; then
    echo "Error: Failed to seed data"
    exit 1
fi

echo "Database setup completed successfully!"
