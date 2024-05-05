import fs from 'fs';
import { uploadCsvFileService } from './FileUploadService';

const sampleCSVPath = 'sample.csv';

describe('uploadCsvFileService', () => {
  beforeAll(() => {
    const sampleData = 'column1,column2\nvalue1,value2\nvalue3,value4';
    fs.writeFileSync(sampleCSVPath, sampleData);
  });
  
  afterAll(() => {
    fs.unlinkSync(sampleCSVPath);
  });
  
    it('should process the file and return data rows', async () => {
      const req = {
        file: {
          path: sampleCSVPath,
        },
      };

      const result = await uploadCsvFileService(req.file.path);

      expect(result).toEqual([
        { column1: 'value1', column2: 'value2' },
        { column1: 'value3', column2: 'value4' },
      ]);
    });
});