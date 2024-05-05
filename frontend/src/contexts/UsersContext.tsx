"use client";

import { getUsersData } from "@/services/api";
import { UserDataProps } from "@/types/User";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useState
} from "react";
import { toast } from "react-toastify";

export interface UsersDataContextProps {
    searchCsvData: (query: string) => void;
    csvUsersData: UserDataProps[];
    loading?: boolean; 
    isUploaded: boolean;
    setIsUploaded: Dispatch<SetStateAction<boolean>>

  }
  
  export interface UsersDataProviderProps {
    children: ReactNode;
  }
export const UsersDataContext = createContext<UsersDataContextProps | undefined>(
  undefined
);

export const UsersDataProvider: React.FC<UsersDataProviderProps> = ({
  children,
}) => {
  const [csvUsersData, setCsvUsersData] = useState<UserDataProps[]>([]);
  const [isUploaded, setIsUploaded] = useState(false)
  const [loading, setLoading] = useState(false);

  const searchCsvData = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const responseData = await getUsersData(query);
      setCsvUsersData(responseData.data);
    } catch (error:any) {
      toast.error(error.message)

    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, []);

  return (
    <UsersDataContext.Provider
      value={{
        csvUsersData,
        searchCsvData,
        loading,
        isUploaded,
        setIsUploaded
      }}
    >
      {children}
    </UsersDataContext.Provider>
  );
};

export default UsersDataProvider;