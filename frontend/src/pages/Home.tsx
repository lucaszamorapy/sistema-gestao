import { useAuth } from "@/components/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  if (!userInfo?.user_id) {
    navigate("/login");
  }
  return <div></div>;
};

export default Home;
