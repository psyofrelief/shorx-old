"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

type Link = {
  originalLink: string;
  shortenedLink: string;
  date: Date;
  qrCodeImage: string; // Assuming this is a URL pointing to the QR code image
  icon: string;
};

interface MyContextType {
  links: Link[];
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  pageLoading: boolean;
  setPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

// Custom hook to access MyContext
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};

// Define MyProvider component to provide context value to children
export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [links, setLinks] = useState<Link[]>([]);
  const [sortBy, setSortBy] = useState<string>("oldest");
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <MyContext.Provider
      value={{
        links,
        setLinks,
        sortBy,
        setSortBy,
        pageLoading,
        setPageLoading,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children} {/* Render children wrapped with context */}
    </MyContext.Provider>
  );
};

export { MyContext };
