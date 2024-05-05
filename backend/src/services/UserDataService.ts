import { searchUsers } from '../database/queries';
import { UserDataProps } from '../types/types';

export async function searchUserDataService(query: string | undefined) {
  try {
    const searchTerm = query || '';
    const users: UserDataProps[] = await searchUsers(searchTerm);
    return { data: users };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
