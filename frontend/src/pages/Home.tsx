import { useAuth } from "@/components/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  if (!userInfo?.user_id) {
    navigate("/login");
  }
  return (
    <div>
      <Toaster />
    </div>
  );
};

export default Home;
