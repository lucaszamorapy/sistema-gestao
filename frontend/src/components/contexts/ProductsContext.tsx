import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { ProductData } from "../home/ProductForm";

interface ProductsContextProps {
  products: ProductData[];
  setProducts: Dispatch<SetStateAction<ProductData[]>>;
}

interface IChildren {
  children: JSX.Element;
}

const ProductsContext = createContext<ProductsContextProps>(
  {} as ProductsContextProps
);

export const ProductProvider = ({ children }: IChildren) => {
  const [products, setProducts] = useState<ProductData[]>([]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error("useProduct deve ser usado dentro do ProductProvider");
  }
  return context;
};
