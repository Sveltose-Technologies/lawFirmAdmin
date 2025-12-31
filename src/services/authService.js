import api from "./api";

const authService = {
  // 1. लॉगिन एंडपॉइंट
  login: async (email, password) => {
    try {
      const response = await api.post("auth/admin/login", { email, password });
      
      if (response.success) {
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
  updateProfile: async (id, adminData) => {
    try {
      const response = await api.put(`/admin/update/${id}`, adminData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // 3. लॉगआउट
  logout: () => {
    localStorage.clear();
    window.location.href = "/login";
  },

  // 4. हेल्पर फंक्शन: लोकल स्टोरेज से यूजर डेटा निकालने के लिए
  getCurrentUser: () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    }
    return null;
  }
};

export default authService;