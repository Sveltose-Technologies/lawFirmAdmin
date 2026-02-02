


import api from "./api";

const authService = {
  // Base URL for Images
  IMG_URL: "https://nodejs.nrislawfirm.com",

  getImgUrl: (path) => {
    if (!path || path === "null" || path === "undefined") {
      return "https://placehold.co/70x45?text=No+Image";
    }

    if (path.startsWith("http")) return path;

    // Remove leading slash if it exists to avoid double slashes
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;

    // The base URL
    const BASE = "https://nodejs.nrislawfirm.com";

    // Check if the path already contains 'uploads'
    if (cleanPath.startsWith("uploads/")) {
      return `${BASE}/${cleanPath}`;
    }

    // If it's just a filename, add uploads/
    return `${BASE}/uploads/${cleanPath}`;
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

      return {
        success: false,
        message: response.data.message || "Invalid credentials",
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  },
  // [POST] - FORGOT PASSWORD (Send OTP)
  forgotPassword: async (email) => {
    try {
      console.log("Calling Forgot Password API for:", email);
      const response = await api.post("/admin/forgot-password", { email });
      return {
        success: true,
        message: response.data.message || "OTP sent to email",
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to send OTP",
      };
    }
  },

  // [POST] - VERIFY OTP
  verifyOtp: async (email, otp) => {
    try {
      console.log("Calling Verify OTP API with:", { email, otp });
      const response = await api.post("/admin/verify-otp", { email, otp });
      return {
        success: true,
        message: response.data.message || "OTP Verified",
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Invalid OTP",
      };
    }
  },

  // [POST] - RESET PASSWORD
  resetPassword: async (email, newPassword, confirmPassword) => {
    try {
      const response = await api.post("/admin/reset-password", {
        email,
        newPassword,
        confirmPassword,
      });
      console.error("Reset password:", response);
      return {
        success: true,
        message: response.data.message || "Password reset successful",
      };
    } catch (error) {
      console.error("Reset password error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Password reset failed",
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
      return {
        success: false,
        message: err.response?.data?.message || "Update failed",
      };
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
  // SECTION: CAPABILITY CATEGORIES (Multipart/FormData)
  // ==========================================
  getAllCapabilityCategories: async () => {
    const response = await api.get("/capability-categories/get-all");
    return response.data;
  },

  // 2. Create Method ko update karein (Taki ID 25 jaisi galti na ho)
  createCapabilityCategory: async (formData) => {
    // Yahan formData component se seedha pass ho raha hai
    const response = await api.post("/capability-categories/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  // authService.js ke andar update method
  updateCapabilityCategory: async (id, payload) => {
    const data = new FormData();
    data.append("categoryName", payload.categoryName);
    data.append("description", payload.description);

    // Sirf tabhi append karein agar user ne nayi file select ki ho
    if (payload.bannerImage instanceof File) {
      data.append("bannerImage", payload.bannerImage);
    }

    const response = await api.put(
      `/capability-categories/update/${id}`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response.data;
  },

  deleteCapabilityCategory: async (id) => {
    const response = await api.delete(`/capability-categories/delete/${id}`);
    return response.data;
  },

  // ==========================================
  // SECTION: CAPABILITY SUBCATEGORIES (Multipart/FormData)
  // ==========================================
  getAllCapabilitySubCategories: async () => {
    const res = await api.get("/capability-subcategory/getall-subcategory");
    return { success: true, data: res.data.data || res.data || [] };
  },

  createCapabilitySubCategory: async (formData) => {
    // Hum component se seedha FormData bhejenge
    const res = await api.post("/capability-subcategory/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  updateCapabilitySubCategory: async (id, formData) => {
    const res = await api.put(
      `/capability-subcategory/update/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return res.data;
  },
  deleteCapabilitySubCategory: async (id) => {
    const res = await api.delete(`/capability-subcategory/delete/${id}`);
    return res.data;
  },

  // ==========================================
  // SECTION: CMS CONTENT (JSON Data)
  // ==========================================
  getAllCMSCategories: async () => {
    const response = await api.get("/cms-category/getall");
    return response.data;
  },

  createCMSCategory: async (data) => {
    // API Expects: { adminId, categoryId, subcategoryIds, content }
    const response = await api.post("/cms-category/create", data);
    return response.data;
  },

  updateCMSCategory: async (id, data) => {
    const response = await api.put(`/cms-category/update/${id}`, data);
    return response.data;
  },

  deleteCMSCategory: async (id) => {
    const response = await api.delete(`/cms-category/delete/${id}`);
    return response.data;
  },

  getAllCMSSubcategories: async () => {
    const response = await api.get("/cms-subcategory/getall");
    return response.data;
  },

  createCMSSubcategory: async (data) => {
    const response = await api.post("/cms-subcategory/create", data);
    return response.data;
  },

  updateCMSSubcategory: async (id, data) => {
    const response = await api.put(`/cms-subcategory/update/${id}`, data);
    return response.data;
  },

  deleteCMSSubcategory: async (id) => {
    const response = await api.delete(`/cms-subcategory/delete/${id}`);
    return response.data;
  },
  //ourfirm
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
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

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
  // ==========================================
  // SECTION: NEWS MANAGEMENT
  // ==========================================

  // [GET ALL] - FETCH ALL NEWS
  getAllNews: async () => {
    try {
      console.log("📢 Fetching all news...");
      const res = await api.get("/news/getall");
      console.log("✅ Get All News Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Get News Error:", err);
      return { success: false, message: "Failed to fetch news" };
    }
  },

  // [CREATE] - ADD NEW NEWS (Multipart/Form-Data)
  createNews: async (formData) => {
    try {
      console.log("📢 Creating News...");
      const res = await api.post("/news/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("✅ Create News Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Create News Error:", err);
      return { success: false, message: "Create news failed" };
    }
  },

  // [UPDATE] - EDIT NEWS (Multipart/Form-Data)
  updateNews: async (id, formData) => {
    try {
      console.log(`📢 Updating News ID: ${id}...`);
      const res = await api.put(`/news/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("✅ Update News Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Update News Error:", err);
      return { success: false, message: "Update news failed" };
    }
  },

  // [DELETE] - DELETE NEWS
  deleteNews: async (id) => {
    try {
      console.log(`📢 Deleting News ID: ${id}`);
      const res = await api.delete(`/news/delete/${id}`);
      console.log("✅ Delete News Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Delete News Error:", err);
      return { success: false, message: "Delete news failed" };
    }
  },

  getAllClients: async () => {
    const response = await api.get("/client/getall");
    console.log("client", response);

    return response.data;
  },
  deleteClient: async (id) => {
    const response = await api.delete(`/client/delete/${id}`);
    return response.data;
  },

  // --- ATTORNEY APIs ---
  getAllAttorneys: async () => {
    const response = await api.get("/attorney/getall");
    return response.data;
  },
  deleteAttorney: async (id) => {
    const response = await api.delete(`/attorney/delete/${id}`);
    return response.data;
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
        adminId: user?.id || 1,
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

  // ==========================================
  // SECTION: LOCATIONS (Missing functions added here)
  // ==========================================
  // ==========================================
  // SECTION: LOCATION COUNTRY
  // ==========================================
  getAllCountries: async () => {
    try {
      const res = await api.get("/location-country/getall");
      return res.data; // Response structure is {success: true, data: []}
    } catch (err) {
      console.error("❌ getAllCountries Error:", err);
      throw err;
    }
  },

  createLocationCountry: async (data) => {
    try {
      // Keys: adminId, countryName, content
      const res = await api.post("/location-country/create", data);
      return res.data;
    } catch (err) {
      console.error("❌ createLocationCountry Error:", err);
      throw err;
    }
  },

  updateLocationCountry: async (id, data) => {
    try {
      // Keys: countryName, content
      const res = await api.put(`/location-country/update/${id}`, data);
      return res.data;
    } catch (err) {
      console.error("❌ updateLocationCountry Error:", err);
      throw err;
    }
  },

  deleteLocationCountry: async (id) => {
    try {
      const res = await api.delete(`/location-country/delete/${id}`);
      return res.data;
    } catch (err) {
      console.error("❌ deleteLocationCountry Error:", err);
      throw err;
    }
  },

  // ==========================================
  // SECTION: LOCATION CITY
  // ==========================================
  getAllCities: async () => {
    try {
      const res = await api.get("/location-city/getall");
      return res.data; // Response structure is {success: true, data: []}
    } catch (err) {
      console.error("❌ getAllCities Error:", err);
      throw err;
    }
  },

  createLocationCity: async (formData) => {
    try {
      // Expects FormData: adminId, countryId, cityName, address, phoneNo, faxNo, image
      const res = await api.post("/location-city/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      console.error("❌ createLocationCity Error:", err);
      throw err;
    }
  },

  updateLocationCity: async (id, formData) => {
    try {
      // Expects FormData: cityName, address, phoneNo, faxNo, image
      const res = await api.put(`/location-city/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      console.error("❌ updateLocationCity Error:", err);
      throw err;
    }
  },

  deleteLocationCity: async (id) => {
    try {
      const res = await api.delete(`/location-city/delete/${id}`);
      return res.data;
    } catch (err) {
      console.error("❌ deleteLocationCity Error:", err);
      throw err;
    }
  },
  // ==========================================
  // SECTION: EVENTS MANAGEMENT
  // ==========================================

  getAllEvents: async () => {
    try {
      const res = await api.get("/event/getall");
      console.log("📢 Fetch All Events Response:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Get All Events Error:", err);
      return { success: false, data: [] };
    }
  },

  createEvent: async (formData) => {
    try {
      console.log("🚀 Creating Event...");
      const res = await api.post("/event/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Create Event Error:", err);
      throw err;
    }
  },

  updateEvent: async (id, formData) => {
    try {
      console.log(`🚀 Updating Event ID: ${id}...`);
      const res = await api.put(`/event/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Update Event Error:", err);
      throw err;
    }
  },

  deleteEvent: async (id) => {
    try {
      const res = await api.delete(`/event/delete/${id}`);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Delete Event Error:", err);
      return { success: false, message: "Delete failed" };
    }
  },

  // ==========================================
  // SECTION: CAREER MANAGEMENT
  // ==========================================

  getAllCareers: async () => {
    try {
      const res = await api.get("/career/getall");
      console.log("📢 Career Get All:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Career Fetch Error:", err);
      return { success: false, data: [] };
    }
  },

  createCareer: async (formData) => {
    // formData will be Multipart/FormData because of bannerImage
    const res = await api.post("/career/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true, data: res.data };
  },

  updateCareer: async (id, formData) => {
    const res = await api.put(`/career/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true, data: res.data };
  },

  deleteCareer: async (id) => {
    const res = await api.delete(`/career/delete/${id}`);
    return { success: true, data: res.data };
  },
};

export default authService;


// import api from "./api";

// const authService = {
//   // Base URL for Images
//   IMG_URL: "http://72.62.87.252:3000",

//   // ==========================================
//   // HELPERS
//   // ==========================================
// getImgUrl: (path) => {
//   if (!path || path === "null" || path === undefined) {
//     return "https://placehold.co/60x40?text=No+Image";
//   }
  
//   if (path.startsWith("http")) return path;

//   // Path clean karein (agar shuru mein slash hai toh hata dein)
//   const cleanPath = path.startsWith("/") ? path.substring(1) : path;
  
//   // Final URL (Ensure Base URL matches exactly where images are served)
//   return `http://72.62.87.252:3000/${cleanPath}`;
// },
//   getCurrentUser: () => {
//     if (typeof window !== "undefined") {
//       const user = localStorage.getItem("user");
//       return user ? JSON.parse(user) : null;
//     }
//     return null;
//   },

//   // ==========================================
//   // SECTION: AUTHENTICATION
//   // ==========================================
//   login: async (email, password) => {
//     try {
//       const response = await api.post("/admin/login", { email, password });
//       if (response.data && response.data.admin?.token) {
//         const adminData = response.data.admin;
//         localStorage.setItem("token", adminData.token);
//         localStorage.setItem("user", JSON.stringify(adminData));
//         localStorage.setItem("isLoggedIn", "true");
//         return { success: true, message: response.data.message };
//       }
//       return { success: false, message: response.data.message || "Invalid credentials" };
//     } catch (error) {
//       return { success: false, message: error.response?.data?.message || "Login failed" };
//     }
//   },

//   logout: () => {
//     if (typeof window !== "undefined") {
//       localStorage.clear();
//       window.location.href = "/login";
//     }
//   },

//   // ==========================================
//   // SECTION: ADMIN PROFILE
//   // ==========================================
//   getAdminProfile: async () => {
//     const res = await api.get("/admin/getall-adminprofile");
//     return { success: true, data: res.data };
//   },

//   updateAdminProfile: async (id, formData) => {
//     const res = await api.put(`/admin/update/${id}`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return { success: true, data: res.data };
//   },

//   // ==========================================
//   // SECTION: USER MANAGEMENT (Client / Attorney)
//   // ==========================================
//   getAllUsers: async () => {
//     const res = await api.get("/auth/getall");
//     return { success: true, data: res.data };
//   },

//   deleteUser: async (id) => {
//     const res = await api.delete(`/auth/${id}`);
//     return res.data;
//   },

//   getAllClients: async () => {
//     const response = await api.get("/client/getall");
//     return response.data;
//   },

//   deleteClient: async (id) => {
//     const response = await api.delete(`/client/delete/${id}`);
//     return response.data;
//   },

//   getAllAttorneys: async () => {
//     const response = await api.get("/attorney/getall");
//     return response.data;
//   },

//   deleteAttorney: async (id) => {
//     const response = await api.delete(`/attorney/delete/${id}`);
//     return response.data;
//   },

//   // ==========================================
//   // SECTION: CAPABILITY CATEGORIES (Multipart/FormData)
//   // ==========================================
//   getAllCapabilityCategories: async () => {
//     const response = await api.get("/capability-categories/get-all");
//     return response.data;
//   },

// // 2. Create Method ko update karein (Taki ID 25 jaisi galti na ho)
// createCapabilityCategory: async (formData) => {
//   // Yahan formData component se seedha pass ho raha hai
//   const response = await api.post("/capability-categories/create", formData, {
//     headers: { 'Content-Type': 'multipart/form-data' }
//   });
//   return response.data;
// },
// // authService.js ke andar update method
// updateCapabilityCategory: async (id, payload) => {
//   const data = new FormData();
//   data.append("categoryName", payload.categoryName);
//   data.append("description", payload.description);
  
//   // Sirf tabhi append karein agar user ne nayi file select ki ho
//   if (payload.bannerImage instanceof File) {
//     data.append("bannerImage", payload.bannerImage);
//   }

//   const response = await api.put(`/capability-categories/update/${id}`, data, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return response.data;
// },

//   deleteCapabilityCategory: async (id) => {
//     const response = await api.delete(`/capability-categories/delete/${id}`);
//     return response.data;
//   },

//   // ==========================================
//   // SECTION: CAPABILITY SUBCATEGORIES (Multipart/FormData)
//   // ==========================================
//   getAllCapabilitySubCategories: async () => {
//     const res = await api.get("/capability-subcategory/getall-subcategory");
//     return { success: true, data: res.data.data || res.data || [] };
//   },

//   createCapabilitySubCategory: async (formData) => {
//   // Hum component se seedha FormData bhejenge
//   const res = await api.post("/capability-subcategory/create", formData, {
//     headers: { "Content-Type": "multipart/form-data" }
//   });
//   return res.data;
// },

// updateCapabilitySubCategory: async (id, formData) => {
//   const res = await api.put(`/capability-subcategory/update/${id}`, formData, {
//     headers: { "Content-Type": "multipart/form-data" }
//   });
//   return res.data;
// },
//   deleteCapabilitySubCategory: async (id) => {
//     const res = await api.delete(`/capability-subcategory/delete/${id}`);
//     return res.data;
//   },

//   // ==========================================
//   // SECTION: CMS CONTENT (JSON Data)
//   // ==========================================
//   getAllCMSCategories: async () => {
//     const response = await api.get("/cms-category/getall");
//     return response.data;
//   },

//   createCMSCategory: async (data) => {
//     // API Expects: { adminId, categoryId, subcategoryIds, content }
//     const response = await api.post("/cms-category/create", data);
//     return response.data;
//   },

//   updateCMSCategory: async (id, data) => {
//     const response = await api.put(`/cms-category/update/${id}`, data);
//     return response.data;
//   },

//   deleteCMSCategory: async (id) => {
//     const response = await api.delete(`/cms-category/delete/${id}`);
//     return response.data;
//   },

//   getAllCMSSubcategories: async () => {
//     const response = await api.get("/cms-subcategory/getall");
//     return response.data;
//   },

//   createCMSSubcategory: async (data) => {
//     const response = await api.post("/cms-subcategory/create", data);
//     return response.data;
//   },

//   updateCMSSubcategory: async (id, data) => {
//     const response = await api.put(`/cms-subcategory/update/${id}`, data);
//     return response.data;
//   },

//   deleteCMSSubcategory: async (id) => {
//     const response = await api.delete(`/cms-subcategory/delete/${id}`);
//     return response.data;
//   },

//   // ==========================================
//   // SECTION: OTHER CMS (News, Terms, Privacy, Firm)
//   // ==========================================
//   getAllNews: async () => {
//     const res = await api.get("/news/getall");
//     return { success: true, data: res.data };
//   },

//   createNews: async (formData) => {
//     const res = await api.post("/news/create", formData);
//     return { success: true, data: res.data };
//   },

//   deleteNews: async (id) => {
//     const res = await api.delete(`/news/delete/${id}`);
//     return { success: true, data: res.data };
//   },

//   getAllTerms: async () => {
//     const res = await api.get("/terms-condition/getall");
//     return { success: true, data: res.data };
//   },

//   createTerm: async (data) => {
//     const res = await api.post("/terms-condition/create", { ...data, adminId: 3 });
//     return { success: true, data: res.data };
//   },

//   deleteTerm: async (id) => {
//     const res = await api.delete(`/terms-condition/delete/${id}`);
//     return { success: true, data: res.data };
//   },

//   getAllPrivacyPolicies: async () => {
//     const res = await api.get("/privacy-policy/getall");
//     return { success: true, data: res.data };
//   },

//   createPrivacyPolicy: async (data) => {
//     const res = await api.post("/privacy-policy/create", { ...data, adminId: 3 });
//     return { success: true, data: res.data };
//   },

//   deletePrivacyPolicy: async (id) => {
//     const res = await api.delete(`/privacy-policy/delete/${id}`);
//     return { success: true, data: res.data };
//   },

//   getAllOurFirm: async () => {
//     const res = await api.get("/ourfirm/getall");
//     return { success: true, data: res.data };
//   },

//   deleteOurFirm: async (id) => {
//     const res = await api.delete(`/ourfirm/delete/${id}`);
//     return { success: true, data: res.data };
//   },

//   getAllContacts: async () => {
//     const res = await api.get("/contact/getall");
//     return { success: true, data: res.data };
//   },

//   getAllPromoters: async () => {
//     const res = await api.get("/promoter/getall");
//     return { success: true, data: res.data };
//   },

//   getAllAwards: async () => {
//     const res = await api.get("/award/getall");
//     return { success: true, data: res.data };
//   }
// };

// export default authService;