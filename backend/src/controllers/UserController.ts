import { Request, Response } from 'express';
import { searchUserDataService } from '../services/UserDataService';

export async function searchUsersController(req: Request, res: Response) {
  try {
    const searchTerm = req.query.q?.toString();
    const result = await searchUserDataService(searchTerm);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
