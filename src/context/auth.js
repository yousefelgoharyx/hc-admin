import axios from "axios";
import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { baseURL } from "../util/axios";
let AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  let [user, setUser] = React.useState(() => {
    if (localStorage.getItem("refresh_token")) {
      return {
        access_token: localStorage.getItem("access_token"),
        refresh_token: localStorage.getItem("refresh_token"),
      };
    }
    return null;
  });
  let [loading, setLoading] = React.useState(false);

  let signin = async (loginData) => {
    setLoading(true);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios["post"](
          baseURL + "/api/auth/local/signin",
          loginData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        setUser({
          access_token: res.data.access_token,
          refresh_token: res.data.refresh_token,
        });
        setLoading(false);
        resolve(res.data);
      } catch (e) {
        setLoading(false);
        reject(e);
      }
    });
  };

  const signout = () => {
    localStorage.clear();
    setUser(null);
  };

  let value = { user, signin, signout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function ProtectedRoute({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
