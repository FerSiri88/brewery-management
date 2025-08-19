import { neon } from "@neondatabase/serverless";

// Database connection
export const getDb = () => {
  const DATABASE_URL = process.env.DATABASE_URL;

  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  return neon(DATABASE_URL);
};

// Database initialization
export const initializeDatabase = async () => {
  const sql = getDb();

  // Create tanks table if it doesn't exist
  await sql`
    CREATE TABLE IF NOT EXISTS tanks (
      id VARCHAR(50) PRIMARY KEY,
      beer_type VARCHAR(100) NOT NULL,
      volume_liters INTEGER NOT NULL DEFAULT 0,
      capacity_liters INTEGER NOT NULL,
      status VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Check if table is empty and seed with initial data
  const existingTanks = await sql`SELECT COUNT(*) as count FROM tanks`;

  if (existingTanks[0].count === 0) {
    // Insert initial tank data
    await sql`
      INSERT INTO tanks (id, beer_type, volume_liters, capacity_liters, status) VALUES
      ('T-001', 'IPA', 1800, 2000, 'Fermentando'),
      ('T-002', 'Stout', 1950, 2000, 'Madurando'),
      ('T-003', 'Lager', 2000, 2000, 'Lista para envasar'),
      ('T-004', 'Pilsner', 0, 1500, 'Vacío'),
      ('T-005', 'IPA', 1200, 2000, 'Madurando'),
      ('T-006', 'Amber Ale', 1450, 1500, 'Lista para envasar'),
      ('T-007', 'Lager', 1900, 2000, 'Fermentando'),
      ('T-008', 'Stout', 1000, 2000, 'Lista para envasar')
    `;
  }
};

export interface Tank {
  id: string;
  beer_type: string;
  volume_liters: number;
  capacity_liters: number;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export const processStatus = {
  Fermenting: "Fermentando",
  Maturing: "Madurando",
  Ready: "Lista para envasar",
  Empty: "Vacío",
} as const;
