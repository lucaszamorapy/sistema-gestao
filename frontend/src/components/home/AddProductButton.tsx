import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import ProductForm from "./ProductForm";

const AddProductButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(!open)} className="gap-2">
        <PlusCircle /> Adicionar produto
      </Button>
      <ProductForm isOpen={open} setIsOpen={setOpen} />
    </>
  );
};

export default AddProductButton;
