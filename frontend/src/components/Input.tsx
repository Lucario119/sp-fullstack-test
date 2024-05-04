"use client"
import { useCsvUsersData } from '@/hooks/useCsvUserData';
import { useEffect, useState } from 'react';

export function Input() {
  const [searchValue, setSearchValue] = useState('')
  const {searchCsvData} = useCsvUsersData()

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchValue) {
        searchCsvData(searchValue);
      } else {
        searchCsvData('')
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchCsvData, searchValue]);

  return (
    <div className="self-center w-60 h-12">
      <label htmlFor="search">Search:</label>
		  <input
		  type="text"
			placeholder="Search csv data..."
			id="query-input"
			className=" h-full w-full border-2 py-0 pl-4 pr-0 text-gray-900 placeholder:text-gray-400 sm:text-sm"
			value={searchValue}
			onChange={(e) => setSearchValue(e.target.value)}
		  />
	

    </div>
  );
}
