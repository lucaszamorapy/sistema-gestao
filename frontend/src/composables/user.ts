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
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Ocorreu um erro durante o cadastro.",
    });
    console.error("Erro ao cadastrar o usuário.", error)
  }
}

export const login = async (userLogin: userLogin) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, userLogin)
    toast({
      variant: "default",
      title: `${response.data.message}`,
    });
    return response.data
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Usuário ou senha inválidos.",
    });
    console.error("Erro ao logar usuário.", error)
  }
}

export const getUserInfo = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/user/info`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    console.error("Erro ao pegar as informações do usuário.", error)
  }
}