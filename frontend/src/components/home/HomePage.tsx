import { useEffect, useState } from "react";
import { DataTable } from "../ui/data-table";
import { columns } from "./_constants";
import { getAllProducts } from "./_actions/products";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts();
        setProducts(response.result);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getProducts();
  }, []);
  return (
    <div className="container mt-20">
      <h1 className="text-2xl font-semibold">Produtos</h1>
      <DataTable columns={columns} data={products} />
    </div>
  );
};

export default HomePage;
