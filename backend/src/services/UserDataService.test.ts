import { searchUsers } from '../database/queries';
import { searchUserDataService } from './UserDataService';


jest.mock('../database/queries', () => ({
  searchUsers: jest.fn(),
}));

describe('User Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call searchUsers with empty query when query is undefined', async () => {

    await searchUserDataService(undefined);

    expect(searchUsers).toHaveBeenCalledWith('');
  });

  it('should call searchUsers with provided query', async () => {
   
    const query = 'example';
    await searchUserDataService(query);

    expect(searchUsers).toHaveBeenCalledWith(query);
  });

  it('should throw an error if searchUsers throws an error', async () => {
    const errorMessage = 'Search users failed';

    await expect(searchUserDataService('example')).rejects.toThrow(errorMessage);
  });
});
