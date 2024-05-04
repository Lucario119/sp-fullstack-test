import { Request, Response } from 'express';
import { uploadCsvFileService } from '../services/FileUploadService';

export async function uploadFileController(req: Request, res: Response) {

  try {
    if (!req?.file) {
        return res.status(500).json({message: 'No File uploaded'});
    }
    if (req?.file?.mimetype !== 'text/csv') {
        return res.status(500).json({message: 'Wrong type of file uploaded'});
    }

    const result = await uploadCsvFileService(req.file.path);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
