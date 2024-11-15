import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./components/contexts/AuthContext";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import SidebarHeader from "./components/sidebar/SidebarHeader";
import Home from "./pages/Home";
import { ProductProvider } from "./components/contexts/ProductsContext";
import { useEffect } from "react";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <AuthProvider>
      <ProductProvider>
        <Routes>
          <Route path="/cadastro" element={<Register />} />
          <Route
            path="/"
            element={
              <SidebarProvider>
                <SidebarHeader />
                <SidebarTrigger />
                <Home />
              </SidebarProvider>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ProductProvider>
    </AuthProvider>
  );
};

const RootApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default RootApp;
