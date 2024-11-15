import { useEffect } from "react";
import { DataTable } from "../ui/data-table";
import { columns } from "./_constants";
import { getAllProducts } from "./_actions/index";
import AddProductButton from "./AddProductButton";
import { useProduct } from "../contexts/ProductsContext";
import { ScrollArea } from "../ui/scroll-area";

const HomePage = () => {
  const { products, setProducts } = useProduct();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.result);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, [setProducts]);

  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <div className="mt-20">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Produtos</h1>
        <AddProductButton />
      </div>
      <ScrollArea className="h-[750px]">
        <DataTable columns={columns} data={safeProducts} />
      </ScrollArea>
    </div>
  );
};

export default HomePage;
