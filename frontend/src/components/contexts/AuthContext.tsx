import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo, login } from "../login/_actions";

interface UserInfoProps {
  user_id: number | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  last_name: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  email: any;
  icon: File | null | undefined;
}

interface AuthContextProps {
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
        } catch (error) {
          console.error(error);
          setUserInfo(undefined);
        }
      } else {
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
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("welcomeMessageShow");
    setUserInfo(undefined);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
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
