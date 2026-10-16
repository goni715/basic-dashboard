class SessionHelper {
  setToken = (token: string) => {
    if (!token || typeof token !== "string" || !token.trim()) {
      return;
    }

    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", "true");
    }
  };

  getToken = (): string => {
    if (typeof window !== "undefined" && window.localStorage) {
      const token = localStorage.getItem("token");
      if (token && token !== "undefined" && token !== "null" && token.trim().length > 0) {
        return token;
      }
    }
    return "";
  };

  removeToken = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
    }
  };

  isLoggedIn = (): boolean => {
    const token = this.getToken();
    return Boolean(token && token.trim().length > 0);
  };

  setUserInfo = (userInfo: { fullName: string; email: string; profileImg: string; role: string }) => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("fullName", userInfo?.fullName || "");
      localStorage.setItem("email", userInfo?.email || "");
      localStorage.setItem("profileImg", userInfo?.profileImg || "");
      localStorage.setItem("role", userInfo?.role || "");
    }
  };

  getUserInfo = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      return {
        fullName: localStorage.getItem("fullName") || "",
        email: localStorage.getItem("email") || "",
        profileImg: localStorage.getItem("profileImg") || "",
        role: localStorage.getItem("role") || "",
      };
    }
    return { fullName: "", email: "", profileImg: "", role: "" };
  };

  removeUserInfo = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem("fullName");
      localStorage.removeItem("email");
      localStorage.removeItem("profileImg");
      localStorage.removeItem("role");
    }
  };

  clearSession = () => {
    this.removeToken();
    this.removeUserInfo();
  };
}

const sessionHelper = new SessionHelper();

export const {
  setToken,
  getToken,
  removeToken,
  isLoggedIn,
  setUserInfo,
  getUserInfo,
  removeUserInfo,
  clearSession,
} = sessionHelper;

export default sessionHelper;
