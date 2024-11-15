import { API_URL } from "@/globalFunctions";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const register = async (formData: FormData) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, formData)
    toast.success(response.data.message);
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response ? error.response.data.error : 'Erro desconhecido. Tente novamente mais tarde.';
      toast.error(errorMessage);
      console.error("Erro ao cadastrar usuário:", error);
    }
  }
}
