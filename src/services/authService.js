import api from "./api";

const authService = {
  // 1. लॉगिन एंडपॉइंट
  login: async (email, password) => {
    try {
      const response = await api.post("/admin/login", { email, password });
      console.log('login Response', response);
      
      if (response.data.message==='Admin login successful') {
        localStorage.setItem("isLoggedIn", "true");
        if (response.data && response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", response.data.user.token);
        }
        return { success: true, message: response.message };
      }
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: typeof error === 'string' ? error : "Login failed" };
    }
  },

  // PUT :- /admin/update/:id
  // 2. Update Admin Profile
 updateProfile: async (adminData) => {
  try {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || !currentUser.id) {
      throw new Error("No logged-in user found or user ID missing");
    }

    const adminId = currentUser.id;
    console.log("Updating admin ID:", adminId);

    const formData = new FormData();

    for (const key in adminData) {
      if (adminData[key] !== null && adminData[key] !== undefined && adminData[key] !== "") {
        formData.append(key, adminData[key]);
      }
    }

    // ✅ Log FormData properly
    console.log("FormData entries before API call:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const response = await api.put(`/admin/update/${adminId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Update response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Profile update error:", error);
    throw error.response?.data || { message: error.message || "Profile update failed" };
  }
},


  // 3. लॉगआउट
  logout: () => {
    localStorage.clear();
    window.location.href = "/login";
  },
 // 4. HELPER: Get current user from localStorage
  getCurrentUser: () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  // 5. GET ALL USERS
  getAllUsers: async () => {
    try {
      const res = await api.get('/auth/getall');
      return { success: true, data: res.data };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Failed' };
    }
  },

  // 6. DELETE USER BY ID
  deleteUser: async (id) => {
    try {
      const res = await api.delete(`/auth/${id}`);
      return { success: true, data: res.data };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Failed' };
    }
  },

  // 7. UPDATE USER
  updateUser: async (id, data) => {
    try {
      const res = await api.put(`/auth/${id}`, data);
      return { success: true, data: res.data };
    } catch(err) {
      return { success: false, message: err.response?.data?.message || 'Update failed' };
    }
  },

  // 8. ADD USER
  addUser: async (data) => {
    try {
      const res = await api.post('/auth/register', data);
      return { success: true, data: res.data };
    } catch(err) {
      return { success: false, message: err.response?.data?.message || 'Add failed' };
    }
  }
};


export default authService;