import sqlite3 from 'sqlite3';
import { UserDataProps } from '../types/types';
import { insertUser, searchUsers } from './queries';

jest.mock('./db', () => ({
  getDB: jest.fn(() => new sqlite3.Database(':memory:')),
}));

describe('Database queries', () => {
  let db: sqlite3.Database;

  beforeAll(() => {
    db = new sqlite3.Database(':memory:');

    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, city TEXT, country TEXT, favorite_sport TEXT)");
  });

  afterAll((done) => {
 
    db.close(done);
  });

  describe('insertUser', () => {
    it('should insert a user into the database', async () => {
      const user = {
        name: 'John Doe',
        city: 'New York',
        country: 'USA',
        favorite_sport: 'Basketball'
      };

      await insertUser(user);

      db.get('SELECT * FROM users WHERE name = ?', [user.name], (err, row: UserDataProps) => {
        expect(row.name).toBe(user.name);
        expect(row.city).toBe(user.city);
        expect(row.country).toBe(user.country);
        expect(row.favorite_sport).toBe(user.favorite_sport);
      });
    });
  });

  describe('searchUsers', () => {
    beforeAll(async () => {
      const users = [
        { name: 'John Doe', city: 'New York', country: 'USA', favorite_sport: 'Basketball' },
        { name: 'Jane Smith', city: 'Los Angeles', country: 'USA', favorite_sport: 'Soccer' },
        { name: 'Alice Johnson', city: 'London', country: 'UK', favorite_sport: 'Tennis' }
      ];

      for (const user of users) {
        await insertUser(user);
      }
    });

    it('should return users matching the search term', async () => {
      const searchTerm = 'New York';
      const users = await searchUsers(searchTerm);
      expect(users.length).toBe(1);
      expect(users[0].name).toBe('John Doe');
    });

    it('should return empty array if no users match the search term', async () => {
      const searchTerm = 'Tokyo';
      const users = await searchUsers(searchTerm);
      expect(users.length).toBe(0);
    });
  });
});
