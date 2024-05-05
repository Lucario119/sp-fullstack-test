import { useContext } from "react";
import { UsersDataContext } from "../contexts/UsersContext";

export const useCsvUsersData = () => {
 const context = useContext(UsersDataContext);
 if (!context) {
    throw new Error("useCsvData must be used within a CsvDataProvider");
 }
 return context;
};
  