import { getUserInfo, login } from "@/composables/user";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface UserInfoProps {
  user_id: number | null;
  name: any;
  last_name: any;
  email: any;
  icon: File | null | undefined;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  userInfo: UserInfoProps | undefined;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
  loading: boolean;
}

interface IChildren {
  children: JSX.Element;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: IChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("authToken")
  );
  const [userInfo, setUserInfo] = useState<UserInfoProps>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthToken = async () => {
      const token = localStorage.getItem("authToken");
      setLoading(true);
      if (token) {
        try {
          const userInfo = await getUserInfo(token);
          setUserInfo(userInfo.result);
          setIsAuthenticated(true);
        } catch (error) {
          console.error(error);
          setIsAuthenticated(false);
          setUserInfo(undefined);
        }
      } else {
        setIsAuthenticated(false);
        setUserInfo(undefined);
      }
      setLoading(false);
    };

    checkAuthToken();
  }, [navigate]);

  const loginUser = async (email: string, password: string) => {
    try {
      const newLogin = await login({
        email,
        password,
      });
      localStorage.setItem("authToken", newLogin.result);
      setIsAuthenticated(true);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("welcomeMessageShow");
    setIsAuthenticated(false);
    setUserInfo(undefined);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loginUser,
        logoutUser,
        userInfo,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth dentro do AuthProvider");
  }
  return context;
};
