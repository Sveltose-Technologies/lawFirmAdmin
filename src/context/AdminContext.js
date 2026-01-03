"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "@/services/api";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  
  // अगर 404 आ रहा है, तो BASE_URL को "https://nodejs.nrislawfirm.com/api/" करके भी देख सकते हैं
  const BASE_URL = "https://nodejs.nrislawfirm.com/"; 

  const loadAdmin = useCallback(async () => {
    try {
      const res = await api.get("/admin/getall-adminprofile");
      const data = res.data;

      if (data) {
        // इमेज पाथ को क्लीन और फुल URL बनाना
        const fullProfilePath = data.profileImage 
          ? `${BASE_URL}${data.profileImage.replace(/^\//, "")}` 
          : null;
        
        const fullLogoPath = data.websiteLogo 
          ? `${BASE_URL}${data.websiteLogo.replace(/^\//, "")}` 
          : null;

        console.log("Admin Data Loaded:", data);
        console.log("Profile Image URL:", fullProfilePath);

        setAdmin({
          ...data,
          profileImage: fullProfilePath,
          websiteLogo: fullLogoPath,
        });
      }
    } catch (err) {
      console.error("Failed to load admin context:", err);
    }
  }, []);

  useEffect(() => {
    loadAdmin();
  }, [loadAdmin]);

  return (
    <AdminContext.Provider value={{ admin, setAdmin, loadAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);