import * as sqlite3 from 'sqlite3';

let db: sqlite3.Database;

export const connectDB = async () => {
  try {
    db = new sqlite3.Database('./database.db');
    await new Promise<void>((resolve, reject) => {
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY,
          name TEXT,
          city TEXT,
          country TEXT,
          favorite_sport TEXT
        );
      `, (error) => {
        if (error) {
          reject(error);
        } else {
          console.log('Database connected');
          resolve();
        }
      });
    });
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
};

export const getDB = () => db;
