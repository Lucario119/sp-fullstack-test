import { Request, Response } from 'express';
import { searchUserDataService } from '../services/UserDataService';
import { searchUsersController } from './UserController';

jest.mock('../services/UserDataService');

describe('Search Users Controller', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {

    mockReq = {
      query: { q: 'searchTerm' },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should call searchUserDataService and return the result', async () => {
    const mockResult = { data: ['user1', 'user2'] };

    (searchUserDataService as jest.Mock).mockResolvedValueOnce(mockResult);

    await searchUsersController(mockReq as Request, mockRes as Response);

    expect(searchUserDataService).toHaveBeenCalledWith('searchTerm');

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResult);
  });

  it('should return 500 if searchUserDataService throws an error', async () => {
    const errorMessage = 'Search failed';

    (searchUserDataService as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await searchUsersController(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});
