import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle({ client: sql });

























// const testConnection = async () => {
//     try {
//       const result = await db.execute('SELECT 1');
//       console.log('Connection successful:', result);
//     } catch (error) {
//       console.error('Error connecting to the database:', error);
//     }
//   };
  
//   testConnection();