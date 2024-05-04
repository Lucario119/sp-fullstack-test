import { UsersDataContext } from "@/contexts/UsersContext";
import { useContext } from "react";

export const useCsvUsersData = () => {
 const context = useContext(UsersDataContext);
 if (!context) {
    throw new Error("useCsvData must be used within a CsvDataProvider");
 }
 return context;
};
  