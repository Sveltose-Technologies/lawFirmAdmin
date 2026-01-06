// import api from "./api";

// const authService = {
//   // 1. लॉगिन एंडपॉइंट
//   login: async (email, password) => {
//     try {
//       const response = await api.post("/admin/login", { email, password });
//       console.log('login Response', response);
      
//       if (response.data.message==='Admin login successful') {
//         localStorage.setItem("isLoggedIn", "true");
//         if (response.data && response.data.user) {
//           localStorage.setItem("user", JSON.stringify(response.data.user));
//           localStorage.setItem("token", response.data.user.token);
//         }
//         return { success: true, message: response.message };
//       }
//       return { success: false, message: response.message };
//     } catch (error) {
//       return { success: false, message: typeof error === 'string' ? error : "Login failed" };
//     }
//   },

//     getCurrentUser: () => {
//     const user = localStorage.getItem("user");
//     return user ? JSON.parse(user) : null;
//   },

//   // PUT :- /admin/update/:id
// getEditAdminData: async () => {
//     try {
//       const currentUser = authService.getCurrentUser();
//       if (!currentUser || !currentUser.email) return null;

//       const currentEmail = currentUser.email.trim().toLowerCase();

//       // Admin API call WITHOUT token
//       const response = await api.get("/admin/getall-adminprofile");

//       if (response.data && response.data.length > 0) {
//         const adminData = response.data.find(
//           (admin) =>
//             admin.email &&
//             admin.email.trim().toLowerCase() === currentEmail
//         );
//         return adminData || null;
//       }

//       return null;
//     } catch (error) {
//       console.error("getEditAdminData error:", error);
//       return null;
//     }
//   },
// };




//   // 2. Update Admin Profile
//  updateProfile: async (adminData) => {
//   try {
//     const currentUser = authService.getCurrentUser();
//     if (!currentUser || !currentUser.id) {
//       throw new Error("No logged-in user found or user ID missing");
//     }

//     const adminId = currentUser.id;
//     console.log("Updating admin ID:", adminId);

//     const formData = new FormData();

//     for (const key in adminData) {
//       if (adminData[key] !== null && adminData[key] !== undefined && adminData[key] !== "") {
//         formData.append(key, adminData[key]);
//       }
//     }

//     // ✅ Log FormData properly
//     console.log("FormData entries before API call:");
//     for (let pair of formData.entries()) {
//       console.log(pair[0], pair[1]);
//     }

//     const response = await api.put(`/admin/update/${adminId}`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     console.log("Update response:", response.data);

//     return response.data;
//   } catch (error) {
//     console.error("Profile update error:", error);
//     throw error.response?.data || { message: error.message || "Profile update failed" };
//   }
// },


//   // 3. लॉगआउट
//   logout: () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   },


//   // 5. GET ALL USERS
//   getAllUsers: async () => {
//     try {
//       const res = await api.get('/auth/getall');
//       return { success: true, data: res.data };
//     } catch (err) {
//       return { success: false, message: err.response?.data?.message || 'Failed' };
//     }
//   },

//   // 6. DELETE USER BY ID
//   deleteUser: async (id) => {
//     try {
//       const res = await api.delete(`/auth/${id}`);
//       return { success: true, data: res.data };
//     } catch (err) {
//       return { success: false, message: err.response?.data?.message || 'Failed' };
//     }
//   },

//   // 7. UPDATE USER
//   updateUser: async (id, data) => {
//     try {
//       const res = await api.put(`/auth/${id}`, data);
//       return { success: true, data: res.data };
//     } catch(err) {
//       return { success: false, message: err.response?.data?.message || 'Update failed' };
//     }
//   },

//   // 8. ADD USER
//   addUser: async (data) => {
//     try {
//       const res = await api.post('/auth/register', data);
//       return { success: true, data: res.data };
//     } catch(err) {
//       return { success: false, message: err.response?.data?.message || 'Add failed' };
//     }
//   }



// export default authService;


// import api from "./api";

// const authService = {
//   // 1. लॉगिन एंडपॉइंट
//   login: async (email, password) => {
//     try {
//       const response = await api.post("/admin/login", { email, password });
//       console.log('login Response', response);

//       if (response.data.message === 'Admin login successful') {
//         localStorage.setItem("isLoggedIn", "true");
//         if (response.data && response.data.user) {
//           localStorage.setItem("user", JSON.stringify(response.data.user));
//           localStorage.setItem("token", response.data.user.token);
//         }
//         return { success: true, message: response.data.message };
//       }
//       return { success: false, message: response.data.message };
//     } catch (error) {
//       return { success: false, message: typeof error === 'string' ? error : "Login failed" };
//     }
//   },

//   // 2. Get current logged-in user
//   getCurrentUser: () => {
//   const user = localStorage.getItem("user");
//   return user ? JSON.parse(user) : null;
// },

//     // 3. Get admin data for edit (matches currently logged-in admin by email)
//   getEditAdminData: async () => {
//     try {
//       const currentUser = authService.getCurrentUser();
//       if (!currentUser?.email) {
//         console.log("No logged-in user found");
//         return null;
//       }

//       const currentEmail = currentUser.email.trim().toLowerCase();

//       // Fetch all admin profiles
//       const response = await api.get("/admin/getall-adminprofile");
//       const admins = response.data;

//       if (!admins || !admins.length) return null;

//       // Find admin that matches the logged-in email
//       const matchedAdmin = admins.find(
//         (admin) =>
//           admin.email?.trim().toLowerCase() === currentEmail
//       );

//       if (!matchedAdmin) {
//         console.log("No matching admin found in API");
//         return null;
//       }

//       console.log("Matched admin data:", matchedAdmin);
//       return matchedAdmin;
//     } catch (error) {
//       console.error("getEditAdminData error:", error);
//       return null;
//     }
//   },

//   // 4. Update admin profile
//   updateProfile: async (adminData) => {
//     try {
//       const currentUser = authService.getCurrentUser();
//       if (!currentUser?.id) {
//         throw new Error("No logged-in user found or user ID missing");
//       }

//       const adminId = currentUser.id;
//       console.log("Updating admin ID:", adminId);

//       const formData = new FormData();
//       for (const key in adminData) {
//         if (adminData[key] !== null && adminData[key] !== undefined && adminData[key] !== "") {
//           formData.append(key, adminData[key]);
//         }
//       }

//       const response = await api.put(`/admin/update/${adminId}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       console.log("Update response:", response.data);
//       return response.data;
//     } catch (error) {
//       console.error("Profile update error:", error);
//       throw error.response?.data || { message: error.message || "Profile update failed" };
//     }
//   },


//   // 4. Update admin profile
//   updateProfile: async (adminData) => {
//     try {
//       const currentUser = authService.getCurrentUser();
//       if (!currentUser || !currentUser.id) {
//         throw new Error("No logged-in user found or user ID missing");
//       }

//       const adminId = currentUser.id;
//       console.log("Updating admin ID:", adminId);

//       const formData = new FormData();
//       for (const key in adminData) {
//         if (adminData[key] !== null && adminData[key] !== undefined && adminData[key] !== "") {
//           formData.append(key, adminData[key]);
//         }
//       }

//       // Log FormData entries
//       console.log("FormData entries before API call:");
//       for (let pair of formData.entries()) {
//         console.log(pair[0], pair[1]);
//       }

//       const response = await api.put(`/admin/update/${adminId}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       console.log("Update response:", response.data);
//       return response.data;
//     } catch (error) {
//       console.error("Profile update error:", error);
//       throw error.response?.data || { message: error.message || "Profile update failed" };
//     }
//   },

//   // 5. लॉगआउट
//   logout: () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   },

//  getAllUsers: async () => {
//     try {
//       const res = await api.get("/auth/getall");
//       return { success: true, data: res.data };
//     } catch (err) {
//       console.error("getAllUsers error:", err.response?.data || err.message);
//       return { success: false, message: err.response?.data?.message || "Failed to get users" };
//     }
//   },

//   // 2. DELETE USER BY ID
//   deleteUser: async (id) => {
//     try {
//       const res = await api.delete(`/auth/${id}`);
//       return { success: true, data: res.data };
//     } catch (err) {
//       console.error("deleteUser error:", err.response?.data || err.message);
//       return { success: false, message: err.response?.data?.message || "Failed to delete user" };
//     }
//   },

// }
// export default authService;



import api from "./api";

const authService = {
  // Base URL for Images
  IMG_URL: "http://72.62.87.252:3000", 

  // ==========================================
  // HELPER: GET FULL IMAGE URL
  // ==========================================
  getImgUrl: (path) => {
    if (!path) return "https://via.placeholder.com/150";
    
    // Agar path already full URL hai (http se shuru ho raha hai)
    if (path.startsWith("http")) return path;

    // Path ke aage se '/' hatayein agar hai toh, double slash se bachne ke liye
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;

    const fullUrl = `${authService.IMG_URL}/${cleanPath}`;
    
    // Console log debugging ke liye (Ise baad mein hata sakte hain)
    // console.log("🖼️ Image Loading From:", fullUrl);
    
    return fullUrl;
  },


  // ==========================================
  // SECTION: AUTHENTICATION
  // ==========================================

  // [POST] - ADMIN LOGIN
  login: async (email, password) => {
    try {
      const response = await api.post("/admin/login", { email, password });
      console.log("Login Response:", response.data);

      if (response.data && response.data.admin?.token) {
        const adminData = response.data.admin;
        
        localStorage.setItem("token", adminData.token);
        localStorage.setItem("user", JSON.stringify(adminData)); 
        localStorage.setItem("isLoggedIn", "true");

        return { success: true, message: response.data.message };
      }
      
      return { success: false, message: response.data.message || "Invalid credentials" };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  },

  // [LOGOUT] - CLEAR SESSION
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
      window.location.href = "/login";
    }
  },


  // ==========================================
  // SECTION: ADMIN PROFILE
  // ==========================================

  getAdminProfile: async () => {
    try {
      console.log("📢 Fetching Admin Profile...");
      const res = await api.get("/admin/getall-adminprofile");
      console.log("✅ Admin Profile Data:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Get Admin Profile Error:", err);
      return { success: false, message: "Failed to fetch profile" };
    }
  },

  updateAdminProfile: async (id, formData) => {
    try {
      console.log(`📢 Updating Admin ID: ${id}`);
      const res = await api.put(`/admin/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("✅ Update Success:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Update Error:", err);
      return { success: false, message: err.response?.data?.message || "Update failed" };
    }
  },

  // HELPER - GET CURRENT LOGGED IN USER
  getCurrentUser: () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    }
    return null;
  },


  // ==========================================
  // SECTION: USER MANAGEMENT 
  // ==========================================

  // [GET ALL] - FETCH ALL USERS
  getAllUsers: async () => {
    try {
      const res = await api.get("/auth/getall");
      console.log("Raw API Response:", res.data); 
      return { success: true, data: res.data };
    } catch (err) {
      console.error("getAllUsers Error:", err.response || err);
      return {
        success: false,
        message: err.response?.data?.message || "Failed to fetch users",
      };
    }
  },

  // [DELETE] - DELETE USER BY ID
  deleteUser: async (id) => {
    try {
      const res = await api.delete(`/auth/${id}`);
      return res.data;
    } catch (err) {
      return { success: false, message: "Delete failed" };
    }
  },


  // ==========================================
  // SECTION: CASE CATEGORIES
  // ==========================================

  // [GET ALL] - FETCH ALL CASE CATEGORIES
  getAllCategories: async () => {
    try {
      const res = await api.get("/casecategories/get-all");
      return res.data;
    } catch (err) {
      return { success: false, message: "Fetch failed" };
    }
  },

  // [CREATE] - ADD NEW CASE CATEGORY
  createCategory: async (categoryData) => {
    try {
      const user = authService.getCurrentUser();
      const payload = { ...categoryData, adminId: user?.id || 1 };
      const res = await api.post("/casecategories/create", payload);
      return res.data;
    } catch (err) {
      return { success: false, message: "Create failed" };
    }
  },

  // [UPDATE] - EDIT CASE CATEGORY
  updateCategory: async (id, categoryData) => {
    try {
      const res = await api.put(`/casecategories/update/${id}`, categoryData);
      return res.data;
    } catch (err) {
      return { success: false, message: "Update failed" };
    }
  },

  // [DELETE] - DELETE CASE CATEGORY
  deleteCategory: async (id) => {
    try {
      const res = await api.delete(`/casecategories/delete/${id}`);
      return res.data;
    } catch (err) {
      return { success: false, message: "Delete failed" };
    }
  },


  // ==========================================
  // SECTION: CAPABILITY CATEGORIES (Multipart/Form-Data)
  // ==========================================

  // [GET ALL] - FETCH ALL CAPABILITY CATEGORIES
 // services/authService.js

 getAllCapabilityCategories: async () => {
    try {
      console.log("📢 Sending GET request to /capability-categories/get-all");
      const response = await api.get("/capability-categories/get-all");
      console.log("✅ GET ALL CATEGORIES RESPONSE:", response.data);
      return response.data; // सीधा डेटा रिटर्न करें
    } catch (error) {
      console.error("❌ GET ALL API Error:", error);
      return { success: false, data: [] };
    }
  },

  // [CREATE] - CAPABILITY CATEGORY
  createCapabilityCategory: async (data) => {
    try {
      console.log("📢 Sending CREATE request with data:", data);

      const formData = new FormData();
      formData.append("categoryName", data.categoryName);
      formData.append("description", data.description || "");

      if (data.bannerImage) {
        formData.append("bannerImage", data.bannerImage);
      }

      const response = await api.post("/capability-categories/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ CREATE CATEGORY RESPONSE:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ CREATE API Error:", error);
      return { success: false, message: error.message };
    }
  },

  // [UPDATE] - CAPABILITY CATEGORY
  updateCapabilityCategory: async (id, data) => {
    try {
      console.log(`📢 Sending UPDATE request for ID: ${id} with data:`, data);

      const formData = new FormData();
      formData.append("categoryName", data.categoryName);
      formData.append("description", data.description || "");

      if (data.bannerImage) {
        formData.append("bannerImage", data.bannerImage);
      }

      const response = await api.put(`/capability-categories/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("🟡 UPDATE CATEGORY RESPONSE:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ UPDATE API Error:", error);
      return { success: false, message: error.message };
    }
  },

  // [DELETE] - CAPABILITY CATEGORY
  deleteCapabilityCategory: async (id) => {
    try {
      console.log(`📢 Sending DELETE request for ID: ${id}`);
      const response = await api.delete(`/capability-categories/delete/${id}`);
      console.log("🔴 DELETE CATEGORY RESPONSE:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ DELETE API Error:", error);
      return { success: false, message: error.message };
    }
  },

  // ==========================================
// SECTION: CAPABILITY SUBCATEGORIES API
// ==========================================


// [GET ALL] - FETCH ALL SUBCATEGORIES
getAllCapabilitySubCategories: async () => {
  try {
    const res = await api.get("/capability-subcategory/getall-subcategory");
    console.log("Subcategory API Check:", res.data);
    // आपके कंसोल के अनुसार डेटा 'data' फील्ड में है
    return { success: true, data: res.data.data || [] };
  } catch (err) {
    return { success: false, message: "Fetch failed" };
  }
},
// [CREATE] - ADD NEW SUBCATEGORY (FormData)
createCapabilitySubCategory: async (subData) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const adminId = user?.id || 3;

    const formData = new FormData();
    formData.append("adminId", adminId);
    formData.append("categoryId", subData.categoryId); // Category Selection
    formData.append("subcategoryName", subData.subcategoryName);
    formData.append("description", subData.description);
    
    if (subData.bannerImage) {
      formData.append("bannerImage", subData.bannerImage);
    }

    const res = await api.post("/capability-subcategory/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Create failed" };
  }
},

// [UPDATE] - EDIT SUBCATEGORY
updateCapabilitySubCategory: async (id, subData) => {
  try {
    const formData = new FormData();
    formData.append("categoryId", subData.categoryId);
    formData.append("subcategoryName", subData.subcategoryName);
    formData.append("description", subData.description);
    
    if (subData.bannerImage instanceof File) {
      formData.append("bannerImage", subData.bannerImage);
    }

    const res = await api.put(`/capability-subcategory/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, message: "Update failed" };
  }
},

// [DELETE] - DELETE SUBCATEGORY
deleteCapabilitySubCategory: async (id) => {
  try {
    const res = await api.delete(`/capability-subcategory/delete/${id}`);
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, message: "Delete failed" };
  }
},

// ==========================================
  // SECTION: LOCATION COUNTRY
  // ==========================================

  // [GET ALL] - FETCH ALL COUNTRIES
  getAllCountries: async () => {
    try {
      console.log("📢 Fetching all countries...");
      const res = await api.get("/location-country/getall");
      console.log("✅ Get All Countries Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Get All Countries Error:", err);
      return { success: false, message: "Failed to fetch countries" };
    }
  },

  // [CREATE] - ADD NEW COUNTRY
  createCountry: async (countryData) => {
    try {
      const user = authService.getCurrentUser();
      const payload = { 
        ...countryData, 
        adminId: user?.id || 1 
      };
      console.log("📢 Creating Country with payload:", payload);
      const res = await api.post("/location-country/create", payload);
      console.log("✅ Create Country Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Create Country Error:", err);
      return { success: false, message: "Failed to create country" };
    }
  },

  // [UPDATE] - EDIT COUNTRY
  updateCountry: async (id, countryData) => {
    try {
      console.log(`📢 Updating Country ID: ${id} with:`, countryData);
      const res = await api.put(`/location-country/update/${id}`, countryData);
      console.log("✅ Update Country Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Update Country Error:", err);
      return { success: false, message: "Update failed" };
    }
  },

  // [DELETE] - DELETE COUNTRY
  deleteCountry: async (id) => {
    try {
      console.log(`📢 Deleting Country ID: ${id}`);
      const res = await api.delete(`/location-country/delete/${id}`);
      console.log("✅ Delete Country Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Delete Country Error:", err);
      return { success: false, message: "Delete failed" };
    }
  },


  // ==========================================
  // SECTION: LOCATION CITY (Multipart/Form-Data for Image)
  // ==========================================

  // [GET ALL] - FETCH ALL CITIES
  getAllCities: async (countryId = null) => {
    try {
      // Agar countryId pass ki hai toh filter query lagayenge
      const url = countryId ? `/location-city/getall?countryId=${countryId}` : "/location-city/getall";
      console.log(`📢 Fetching cities. URL: ${url}`);
      const res = await api.get(url);
      console.log("✅ Get All Cities Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Get Cities Error:", err);
      return { success: false, message: "Failed to fetch cities" };
    }
  },

  // [CREATE] - ADD NEW CITY
  createCity: async (cityData) => {
    try {
      const user = authService.getCurrentUser();
      const formData = new FormData();
      formData.append("adminId", user?.id || 1);
      formData.append("countryId", cityData.countryId);
      formData.append("cityName", cityData.cityName);
      formData.append("address", cityData.address);
      formData.append("phoneNo", cityData.phoneNo);
      formData.append("faxNo", cityData.faxNo);
      
      if (cityData.image) {
        formData.append("image", cityData.image);
      }

      console.log("📢 Creating City (FormData)...");
      const res = await api.post("/location-city/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("✅ Create City Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Create City Error:", err);
      return { success: false, message: "Create city failed" };
    }
  },

  // [UPDATE] - EDIT CITY
  updateCity: async (id, cityData) => {
    try {
      const formData = new FormData();
      formData.append("countryId", cityData.countryId);
      formData.append("cityName", cityData.cityName);
      formData.append("address", cityData.address);
      formData.append("phoneNo", cityData.phoneNo);
      formData.append("faxNo", cityData.faxNo);
      
      if (cityData.image instanceof File) {
        formData.append("image", cityData.image);
      }

      console.log(`📢 Updating City ID: ${id}...`);
      const res = await api.put(`/location-city/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("✅ Update City Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Update City Error:", err);
      return { success: false, message: "Update city failed" };
    }
  },

  // [DELETE] - DELETE CITY
  deleteCity: async (id) => {
    try {
      console.log(`📢 Deleting City ID: ${id}`);
      const res = await api.delete(`/location-city/delete/${id}`);
      console.log("✅ Delete City Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Delete City Error:", err);
      return { success: false, message: "Delete city failed" };
    }
  },


  // ==========================================
  // SECTION: LOCATION CMS
  // ==========================================

  // [GET ALL] - FETCH ALL CMS CONTENT
  getAllLocationCMS: async () => {
    try {
      console.log("📢 Fetching all Location CMS...");
      const res = await api.get("/location-cms/getall");
      console.log("✅ Get All CMS Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Get CMS Error:", err);
      return { success: false, message: "Failed to fetch CMS" };
    }
  },

  // [CREATE] - ADD NEW CMS CONTENT
  createLocationCMS: async (cmsData) => {
    try {
      const user = authService.getCurrentUser();
      const payload = { 
        ...cmsData, 
        adminId: user?.id || 1 
      };
      console.log("📢 Creating CMS with payload:", payload);
      const res = await api.post("/location-cms/create", payload);
      console.log("✅ Create CMS Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Create CMS Error:", err);
      return { success: false, message: "Create CMS failed" };
    }
  },

  // [UPDATE] - EDIT CMS CONTENT
  updateLocationCMS: async (id, cmsData) => {
    try {
      console.log(`📢 Updating CMS ID: ${id} with:`, cmsData);
      const res = await api.put(`/location-cms/update/${id}`, cmsData);
      console.log("✅ Update CMS Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Update CMS Error:", err);
      return { success: false, message: "Update CMS failed" };
    }
  },

  // [DELETE] - DELETE CMS CONTENT
  deleteLocationCMS: async (id) => {
    try {
      console.log(`📢 Deleting CMS ID: ${id}`);
      const res = await api.delete(`/location-cms/delete/${id}`);
      console.log("✅ Delete CMS Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Delete CMS Error:", err);
      return { success: false, message: "Delete CMS failed" };
    }
  },

  getAllOurFirm: async () => {
    try {
      console.log("📢 Fetching Our Firm data...");
      const res = await api.get("/ourfirm/getall");
      console.log("✅ Get Our Firm Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Get Our Firm Error:", err);
      return { success: false, message: "Fetch failed" };
    }
  },

  createOurFirm: async (formData) => {
    try {
      console.log("📢 Creating Our Firm entry...");
      // FormData console log helper
      for (let pair of formData.entries()) { console.log(pair[0] + ': ' + pair[1]); }
      
      const res = await api.post("/ourfirm/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("✅ Create Our Firm Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Create Our Firm Error:", err);
      return { success: false, message: "Create failed" };
    }
  },

  updateOurFirm: async (id, formData) => {
    try {
      console.log(`📢 Updating Our Firm ID: ${id}`);
      const res = await api.put(`/ourfirm/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("✅ Update Our Firm Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Update Our Firm Error:", err);
      return { success: false, message: "Update failed" };
    }
  },

  deleteOurFirm: async (id) => {
    try {
      console.log(`📢 Deleting Our Firm ID: ${id}`);
      const res = await api.delete(`/ourfirm/delete/${id}`);
      console.log("✅ Delete Our Firm Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Delete Our Firm Error:", err);
      return { success: false, message: "Delete failed" };
    }
  },


  // ==========================================
  // SECTION: AWARDS (About Us)
  // ==========================================

  getAllAwards: async () => {
    try {
      console.log("📢 Fetching all awards...");
      const res = await api.get("/award/getall");
      console.log("✅ Get Awards Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Get Awards Error:", err);
      return { success: false, message: "Fetch failed" };
    }
  },

  createAward: async (formData) => {
    try {
      console.log("📢 Creating New Award...");
      const res = await api.post("/award/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("✅ Create Award Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      return { success: false, message: "Create failed" };
    }
  },

  updateAward: async (id, formData) => {
    try {
      console.log(`📢 Updating Award ID: ${id}`);
      const res = await api.put(`/award/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("✅ Update Award Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      return { success: false, message: "Update failed" };
    }
  },

  deleteAward: async (id) => {
    try {
      console.log(`📢 Deleting Award ID: ${id}`);
      const res = await api.delete(`/award/delete/${id}`);
      console.log("✅ Delete Award Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      return { success: false, message: "Delete failed" };
    }
  },
// ==========================================
  // SECTION: PROMOTER (About Us)
  // ==========================================

  getAllPromoters: async () => {
    try {
      console.log("📢 Fetching all promoters...");
      const res = await api.get("/promoter/getall");
      console.log("✅ Get Promoters Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Get Promoters Error:", err);
      return { success: false, message: "Fetch failed" };
    }
  },

  createPromoter: async (formData) => {
    try {
      console.log("📢 Creating New Promoter...");
      const res = await api.post("/promoter/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("✅ Create Promoter Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Create Promoter Error:", err);
      return { success: false, message: "Create failed" };
    }
  },

  updatePromoter: async (id, formData) => {
    try {
      console.log(`📢 Updating Promoter ID: ${id}`);
      const res = await api.put(`/promoter/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("✅ Update Promoter Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Update Promoter Error:", err);
      return { success: false, message: "Update failed" };
    }
  },

  deletePromoter: async (id) => {
    try {
      console.log(`📢 Deleting Promoter ID: ${id}`);
      const res = await api.delete(`/promoter/delete/${id}`);
      console.log("✅ Delete Promoter Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Delete Promoter Error:", err);
      return { success: false, message: "Delete failed" };
    }
},

// SECTION: TERMS & CONDITIONS 
 getAllTerms: async () => {
  try {
    console.log("📢 Fetching all Terms & Conditions...");
    const res = await api.get("/terms-condition/getall");
    console.log("✅ Get Terms Response:", res.data);
    return { success: true, data: res.data };
  } catch (err) {
    console.error("❌ Get Terms Error:", err);
    return { success: false, message: "Fetch failed" };
  }
},

  createTerm: async (data) => {
    try {
      const user = authService.getCurrentUser();
      const payload = { ...data, adminId: user?.id || 3 };
      const res = await api.post("/terms-condition/create", payload);
      return { success: true, data: res.data };
    } catch (err) {
      return { success: false, message: "Create failed" };
    }
  },

  updateTerm: async (id, data) => {
    try {
      const res = await api.put(`/terms-condition/update/${id}`, data);
      return { success: true, data: res.data };
    } catch (err) {
      return { success: false, message: "Update failed" };
    }
  },

  deleteTerm: async (id) => {
    try {
      const res = await api.delete(`/terms-condition/delete/${id}`);
      return { success: true, data: res.data };
    } catch (err) {
      return { success: false, message: "Delete failed" };
    }
  },


  getCurrentUser: () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  IMG_URL: "http://72.62.87.252:3000",

  getImgUrl: (path) => {
    if (!path) return "https://via.placeholder.com/150";
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;
    return `${authService.IMG_URL}/${cleanPath}`;
  },

  // =========================
  // PRIVACY POLICY
  // =========================
  getAllPrivacyPolicies: async () => {
    try {
      console.log("📢 Fetching all Privacy Policies...");
      const res = await api.get("/privacy-policy/getall");
      console.log("✅ Get Privacy Policy Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Get Privacy Policy Error:", err);
      return { success: false, message: "Fetch failed" };
    }
  },

  createPrivacyPolicy: async (data) => {
    try {
      const user = authService.getCurrentUser();
      const payload = { ...data, adminId: user?.id || 3 };
      console.log("📢 Creating Privacy Policy:", payload);
      const res = await api.post("/privacy-policy/create", payload);
      console.log("✅ Create Privacy Policy Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Create Privacy Policy Error:", err);
      return { success: false, message: "Create failed" };
    }
  },

  updatePrivacyPolicy: async (id, data) => {
    try {
      console.log(`📢 Updating Privacy Policy ID: ${id}`, data);
      const res = await api.put(`/privacy-policy/update/${id}`, data);
      console.log("✅ Update Privacy Policy Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Update Privacy Policy Error:", err);
      return { success: false, message: "Update failed" };
    }
  },

  deletePrivacyPolicy: async (id) => {
    try {
      console.log(`📢 Deleting Privacy Policy ID: ${id}`);
      const res = await api.delete(`/privacy-policy/delete/${id}`);
      console.log("✅ Delete Privacy Policy Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Delete Privacy Policy Error:", err);
      return { success: false, message: "Delete failed" };
    }
  },

  // ==========================================
  // SECTION: CONTACT US (Leads Management)
  // ==========================================

  getAllContacts: async () => {
    try {
      console.log("📢 Fetching all Contact inquiries...");
      const res = await api.get("/contact/getall");
      console.log("✅ Get Contact Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Get Contact Error:", err);
      return { success: false, message: "Fetch failed" };
    }
  },
}
export default authService;