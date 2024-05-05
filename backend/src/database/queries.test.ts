import sqlite3 from 'sqlite3';
import { UserDataProps } from '../types/types';
import { connectDB, getDB } from './db';
import { insertUser, searchUsers } from './queries';


jest.mock('sqlite3', () => ({
  Database: jest.fn(() => ({
    run: jest.fn(),
    close: jest.fn(),
  })),
}));
describe('Database queries', () => {
  let db: sqlite3.Database;

  beforeEach(async () => {

    await connectDB();
    db = getDB();
  });

  afterEach(() => {
    db?.close();
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
    it('should return users matching the search term', async () => {
      const users = [
        { name: 'John Doe', city: 'New York', country: 'USA', favorite_sport: 'Basketball' },
        { name: 'Jane Smith', city: 'Los Angeles', country: 'USA', favorite_sport: 'Soccer' },
        { name: 'Alice Johnson', city: 'London', country: 'UK', favorite_sport: 'Tennis' }
      ];

      for (const user of users) {
        await insertUser(user);
      }


      const searchTerm = 'New York';
      const searchResult = await searchUsers(searchTerm);
      expect(searchResult.length).toBe(1);
      expect(searchResult[0].name).toBe('John Doe');
    });

    it('should return empty array if no users match the search term', async () => {

      const users = [
        { name: 'John Doe', city: 'New York', country: 'USA', favorite_sport: 'Basketball' },
        { name: 'Jane Smith', city: 'Los Angeles', country: 'USA', favorite_sport: 'Soccer' },
        { name: 'Alice Johnson', city: 'London', country: 'UK', favorite_sport: 'Tennis' }
      ];

      for (const user of users) {
        await insertUser(user);
      }

      const searchTerm = 'Tokyo';
      const searchResult = await searchUsers(searchTerm);
      expect(searchResult.length).toBe(0);
    });
  });
});
