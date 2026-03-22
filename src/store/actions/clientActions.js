import api from "../../api/api";

// Action Creators
export const setUser = (user) => ({
  type: "SET_USER",
  payload: user
});

export const setRoles = (roles) => ({
  type: "SET_ROLES",
  payload: roles
});

export const setTheme = (theme) => ({
  type: "SET_THEME",
  payload: theme
});

export const setLanguage = (language) => ({
  type: "SET_LANGUAGE",
  payload: language
});

// Thunk Action Creator for fetching roles
export const fetchRoles = () => {
  return async (dispatch) => {
    try {
      const response = await api.get("/roles");
      dispatch(setRoles(response.data));
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };
};

// Thunk Action Creator for login
export const loginUser = (loginData) => {
  return async (dispatch) => {
    try {
      const response = await api.post("/login", {
        email: loginData.email,
        password: loginData.password
      });

      const { user, token } = response.data;
      
      // Set user in Redux store
      dispatch(setUser(user));
      
      // Set token in axios headers
      api.defaults.headers.common['Authorization'] = token;
      
      // Save token to localStorage if remember me is checked
      if (loginData.rememberMe) {
        localStorage.setItem('token', token);
      }
      
      return user;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      throw new Error(errorMessage);
    }
  };
};

// Thunk Action Creator for auto login (T11)
export const verifyToken = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return false;
    }
    
    try {
      // Set token in axios headers
      api.defaults.headers.common['Authorization'] = token;
      
      // Verify token with backend
      const response = await api.get("/verify");
      const user = response.data;
      
      // Set user in Redux store
      dispatch(setUser(user));
      
      // Renew token in localStorage
      localStorage.setItem('token', token);
      
      return true;
    } catch (error) {
      // Token is invalid, remove it
      console.error("Token verification failed:", error);
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      return false;
    }
  };
};

// Action Creator for logout
export const logoutUser = () => {
  return (dispatch) => {
    // Clear user from Redux store
    dispatch(setUser({}));
    
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Remove token from axios headers
    delete api.defaults.headers.common['Authorization'];
  };
};