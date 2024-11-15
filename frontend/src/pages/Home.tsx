import { useAuth } from "@/components/contexts/AuthContext";
import HomePage from "@/components/home/HomePage";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  if (!userInfo?.user_id) {
    navigate("/login");
  }
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default Home;
