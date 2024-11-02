import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./components/contexts/AuthContext";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import SidebarHeader from "./components/sidebar/SidebarHeader";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/cadastro" element={<Register />} />
          <Route
            path="/home"
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
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
