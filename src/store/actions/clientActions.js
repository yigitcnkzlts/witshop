import api, {
  apiGet,
  apiPost,
  syncAuthToken,
} from "../../api/api";

// Action Creators
export const setUser = (user) => ({
  type: "SET_USER",
  payload: user,
});

export const setRoles = (roles) => ({
  type: "SET_ROLES",
  payload: roles,
});

export const setTheme = (theme) => ({
  type: "SET_THEME",
  payload: theme,
});

export const setLanguage = (language) => ({
  type: "SET_LANGUAGE",
  payload: language,
});

// Thunk Action Creator for fetching roles
export const fetchRoles = () => {
  return async (dispatch) => {
    try {
      const response = await apiGet("/roles");
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
      const response = await apiPost("/login", {
        email: loginData.email,
        password: loginData.password,
      });

      const { token, ...userData } = response.data;

      const user = {
        name: userData.name,
        email: userData.email,
        role_id: userData.role_id,
      };

      dispatch(setUser(user));
      syncAuthToken(token);

      sessionStorage.removeItem("token");
      localStorage.removeItem("token");

      if (loginData.rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      return user;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Giris basarisiz. Email ve sifreyi kontrol edin.";
      throw new Error(errorMessage);
    }
  };
};

// Thunk Action Creator for auto login (T11)
export const verifyToken = () => {
  return async (dispatch) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      return false;
    }

    try {
      syncAuthToken(token);

      const response = await apiGet("/verify");
      const { token: _token, ...userData } = response.data;

      dispatch(setUser({
        name: userData.name,
        email: userData.email,
        role_id: userData.role_id,
      }));

      return true;
    } catch (error) {
      console.error("Token verification failed:", error);
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      syncAuthToken(null);
      return false;
    }
  };
};

// Action Creator for logout
export const logoutUser = () => {
  return (dispatch) => {
    dispatch(setUser({}));
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    syncAuthToken(null);
  };
};
