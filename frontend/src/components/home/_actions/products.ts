import { API_URL } from "@/globalFunctions";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response ? error.response.data.error : 'Erro desconhecido. Tente novamente mais tarde.';
      toast.error(errorMessage);
      console.error("Erro ao buscar os produtos:", error);
    }
  }
};
