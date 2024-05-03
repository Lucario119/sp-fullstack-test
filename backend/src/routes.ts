import csvParser from 'csv-parser';
import express, { Request, Response } from 'express';
import fs from 'fs';
import multer from 'multer';
import { insertUser, searchUsers } from './database/queries';
import { UserDataProps } from './types/types';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

export const uploadRoute = router.post('/', upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    const fileRows: UserDataProps[] = [];

    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on('data', (data: any) => fileRows.push(data))
      .on('end', async () => {
        await Promise.all(fileRows.map(async (row: any) => {
          await insertUser(row);
        }));

        res.status(200).json({ message: 'The file was uploaded successfully.' });
      });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export const searchRoute = router.get('/', async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.q?.toString() || '';
    const users = await searchUsers(searchTerm);
    res.status(200).json({ data: users });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
