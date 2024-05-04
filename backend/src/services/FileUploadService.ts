import csvParser from 'csv-parser';
import fs from 'fs';
import { insertUser } from '../database/queries';
import { UserDataProps } from '../types/types';

export async function uploadCsvFileService(filePath: any) {
  try {
    const fileRows:UserDataProps[] = [];
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (data:UserDataProps) => fileRows.push(data))
        .on('end', resolve)
        .on('error', reject);
    });

    await Promise.all(fileRows.map(async (row) => {
      await insertUser(row);
    }));

    return { message: 'The file was uploaded successfully.' };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
