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

export const createProduct = async (formData: FormData) => {
  try {
    const response = await axios.post(`${API_URL}/products/register`, formData)
    toast.success(response.data.message);
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response ? error.response.data.error : 'Erro desconhecido. Tente novamente mais tarde.';
      toast.error(errorMessage);
      console.error("Erro ao cadastrar o produto:", error);
    }
  }
}

export const changeProduct = async (product_id: number | undefined, formData: FormData) => {
  try {
    const response = await axios.put(`${API_URL}/products/${product_id}`, formData)
    toast.success(response.data.message);
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response ? error.response.data.error : 'Erro desconhecido. Tente novamente mais tarde.';
      toast.error(errorMessage);
      console.error("Erro ao alterar o produto:", error);
    }
  }
}

export const deleteProduct = async (product_id: number | undefined) => {
  try {
    const response = await axios.delete(`${API_URL}/products/${product_id}`)
    toast.success(response.data.message);
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response ? error.response.data.error : 'Erro desconhecido. Tente novamente mais tarde.';
      toast.error(errorMessage);
      console.error("Erro ao deletar o produto:", error);
    }
  }
}

