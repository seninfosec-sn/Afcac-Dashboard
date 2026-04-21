import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);
const users = JSON.parse(readFileSync('./data/users.json', 'utf8'));

await sql`
  INSERT INTO afcac_kv (key, value)
  VALUES ('users', ${JSON.stringify(users)}::jsonb)
  ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
`;
console.log('Done — pushed', users.length, 'users to Neon');
