import { Request, Response } from 'express';

import { uploadCsvFileService } from '../services/FileUploadService';
import { uploadFileController } from './FileController';

jest.mock('../services/FileUploadService');

describe('Upload Controller', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
 
    mockReq = {
      file: { path: 'test.csv', mimetype: 'text/csv' } as any,
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should return 500 if no file uploaded', async () => {

    mockReq.file = undefined;

    await uploadFileController(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'No File uploaded' });
  });

  it('should return 500 if wrong type of file uploaded', async () => {

    mockReq.file!.mimetype = 'application/json';

    await uploadFileController(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Wrong type of file uploaded' });
  });

  it('should call uploadCsvFileService and return the result', async () => {
    const mockResult = { message: 'File uploaded successfully' };

    (uploadCsvFileService as jest.Mock).mockResolvedValueOnce(mockResult);

    await uploadFileController(mockReq as Request, mockRes as Response);

    expect(uploadCsvFileService).toHaveBeenCalledWith('test.csv');

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResult);
  });

  it('should return 500 if uploadCsvFileService throws an error', async () => {
    const errorMessage = 'File upload failed';

    (uploadCsvFileService as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await uploadFileController(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});
