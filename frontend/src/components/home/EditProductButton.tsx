import { PencilIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import ProductForm, { ProductData } from "./ProductForm";

interface EditProductButtonProps {
  product: ProductData;
}

const EditProductButton = ({ product }: EditProductButtonProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant={"ghost"} onClick={() => setOpen(!open)}>
        <PencilIcon size={16} className="text-muted-foreground" />
      </Button>
      <ProductForm
        setIsOpen={setOpen}
        productId={product.product_id}
        editValues={product}
        isOpen={open}
      />
    </>
  );
};

export default EditProductButton;
