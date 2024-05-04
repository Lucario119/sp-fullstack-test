"use client"

import { Input } from '@/components/Input';
import { UserCard } from '@/components/UserCard';
import { useCsvUsersData } from '@/hooks/useCsvUserData';
import { uploadCsvFile } from '@/services/api';
import { UserDataProps } from '@/types/User';
import { ChangeEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default function HomeContent() {
  const [csvFile, setCsvFile] = useState<File | null>()
  const {csvUsersData, isUploaded, setIsUploaded} = useCsvUsersData()
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return
		const selectedFile = e.target.files[0]
		setCsvFile(selectedFile)
  }

  const handleFileUpload = async () => {
		const formData = new FormData()
		formData.append('file', csvFile as Blob)
	try {
		const response = await uploadCsvFile(formData)

		if (response?.status === 200) {
			setIsUploaded(true)
		   toast.success(response.data.message);
		} else {
			toast.error(response.response.data.message)
		}
		
	} catch (error: any) {
		toast.error(`${error}`)
	}
  }
  const removeFile = () => {
	setCsvFile(null)
}
  return (
	
    <div className="h-screen w-screen flex flex-col justify-start items-center py-10">
      <div className='flex flex-col items-center gap-4 '>
		<h2>Upload your csv file</h2>
	     <label htmlFor="file-input">
			<div
				className='w-32 h-32 rounded-full border-[1px] border-black flex items-center justify-center cursor-pointer'
				>
					<input
						type="file"
						id="file-input"
						onChange={handleFileChange}
						accept=".csv"
						className='hidden'
					/>
						
			</div>
	
		 </label>
		 {csvFile && (
			<>
				<h4>{csvFile?.name}</h4>
        		<div className='flex gap-3'>
					<button className='bg-green-700 text-white rounded-lg cursor-pointer px-4 py-2' onClick={handleFileUpload}>Upload File</button>
					<button className='bg-red-700 text-white rounded-lg cursor-pointer px-4 py-2' onClick={removeFile}>Remove File</button>
				</div>
			    
			</>
		 )}
	  </div>

     {isUploaded && (
	 <div className='flex flex-col gap-10'>
		<Input/>  
		<div className='md:grid md:grid-cols-5 gap-4 flex flex-col'>
			{csvUsersData.map((item: UserDataProps, index: number)=> (
				<UserCard key={index} userData={item}/>
			))}
		</div>
	 </div>
	 )}
	 <ToastContainer/>
    </div>
	
  );
}
