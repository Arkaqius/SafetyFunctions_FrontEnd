import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchAllData } from "../services/haFetcher";

const HADataContext = createContext();

export const HADataProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [config, setConfig] = useState({});
  const [healthStatus, setHealthStatus] = useState("Operational");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: newData, healthStatus: status, config: newConfig } = await fetchAllData();
      setData(newData);
      setConfig(newConfig);
      setHealthStatus(status);
    } catch (error) {
      console.error("Error fetching HA data:", error);
      setHealthStatus("Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <HADataContext.Provider value={{ data, config, healthStatus, loading }}>
      {children}
    </HADataContext.Provider>
  );
};

export const useHAData = () => useContext(HADataContext);
