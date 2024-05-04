import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export async function getUsersData(searchValue: string) {
  try {
    const searchResponse = await axios.get(`${apiUrl}/api/users?q=${searchValue}`)
    return searchResponse.data;
  } catch (error: any) {
    return (error)
  }
}

export async function uploadCsvFile(formData: FormData) {
    try {
		const response = await axios.post(
			`${apiUrl}/api/files/`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		)
		return response;
	} catch (error: any) {
		return (error)
	}
}