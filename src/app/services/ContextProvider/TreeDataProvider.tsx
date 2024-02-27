"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import {normalizeResponseData} from '../../helper/utils'
import { TransformedItems } from "../../types/baseTypes";


type TreeDataProviderProps = {
    children: ReactNode;
  };

// making api call in provider to enhance resusability and state management
export const TreeDataContext = createContext<TransformedItems[]>([]);

const TreeDataProvider: React.FC<TreeDataProviderProps> = ({ children }) => {
  const [responseData, setResponseData] = useState<TransformedItems[]>([]);


  useEffect(() => {
    // fetch the data using network call
    const fetchData = async () => {
      const response = await fetch("data/response.json");
      const data = await response.json();
      const transFormedResponse : TransformedItems[]= normalizeResponseData(data)
      setResponseData(transFormedResponse);
    };

    fetchData();
  }, []);

  return (
    <TreeDataContext.Provider value={responseData }>
      {children}
    </TreeDataContext.Provider>
  );
};

export default TreeDataProvider;
