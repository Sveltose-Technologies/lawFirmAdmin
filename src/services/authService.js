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
    console.log("📢 Calling GET /capability-categories/get-all");

    const res = await api.get("/capability-categories/get-all");

    console.log("✅ Full API Response:", res);
    console.log("✅ Response Data:", res.data);

    return {
      success: true,
      data: res.data.data || res.data,
    };
  } catch (err) {
    console.error("❌ API Error:", err.response || err);
    return {
      success: false,
      message: "Failed to fetch categories",
    };
  }
},

  // [CREATE] - ADD NEW CAPABILITY CATEGORY
  createCapabilityCategory: async (categoryData) => {
    try {
      const user = authService.getCurrentUser();
      const adminId = user?.id || 3;

      const formData = new FormData();
      formData.append("adminId", adminId);
      formData.append("categoryName", categoryData.categoryName);
      formData.append("description", categoryData.description);
      
      if (categoryData.bannerImage) {
        formData.append("bannerImage", categoryData.bannerImage);
      }

      const res = await api.post("/capability-categories/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return { success: true, data: res.data };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Create failed" };
    }
  },

  // [UPDATE] - EDIT CAPABILITY CATEGORY
  updateCapabilityCategory: async (id, categoryData) => {
    try {
      const formData = new FormData();
      formData.append("categoryName", categoryData.categoryName);
      formData.append("description", categoryData.description);
      
      if (categoryData.bannerImage instanceof File) {
        formData.append("bannerImage", categoryData.bannerImage);
      }

      const res = await api.put(`/capability-categories/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return { success: true, data: res.data };
    } catch (err) {
      return { success: false, message: "Update failed" };
    }
  },

  // [DELETE] - DELETE CAPABILITY CATEGORY
  deleteCapabilityCategory: async (id) => {
    try {
      const res = await api.delete(`/capability-categories/delete/${id}`);
      return { success: true, data: res.data };
    } catch (err) {
      return { success: false, message: "Delete failed" };
    }
  },

  // ==========================================
// SECTION: CAPABILITY SUBCATEGORIES API
// ==========================================

// [GET ALL] - FETCH ALL SUBCATEGORIES

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
};

export default authService;