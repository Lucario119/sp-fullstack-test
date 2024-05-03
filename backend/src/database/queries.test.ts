import { searchUsers } from './queries';

jest.setTimeout(10000);

describe('searchUsers function', () => {
  test('should return users matching the search term', () => {
  
    const searchTerm = 'John';
    return searchUsers(searchTerm).then(result => {

      expect(result.length).toBeGreaterThan(0);
    });
  });
});
