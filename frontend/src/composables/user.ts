import { API_URL } from "@/globalFunctions"
import { toast } from "@/hooks/use-toast";

import axios from "axios"

interface userLogin {
  email: string;
  password: string;
}

export const register = async (formData: FormData) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, formData)
    toast({
      variant: "default",
      title: `${response.data.message}`,
    });
    return response.data
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Ocorreu um erro durante o cadastro.",
      description:
        error.message || "Erro desconhecido. Tente novamente mais tarde.",
    });
  }
}

export const login = async (userLogin: userLogin) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, userLogin)
    return response.data
  } catch (error) {
    console.error("Erro ao logar usuário", error)
  }
}