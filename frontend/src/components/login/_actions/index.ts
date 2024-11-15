import { API_URL } from "@/globalFunctions"
import { toast } from "sonner"

import axios, { AxiosError } from "axios"

interface userLogin {
  email: string;
  password: string;
}


export const login = async (userLogin: userLogin) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, userLogin);
    toast.success(response.data.message);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response ? error.response.data.error : 'Erro desconhecido. Tente novamente mais tarde.';
      toast.error(errorMessage);
      console.error("Erro ao logar usuário:", error);
    }
  }
};

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