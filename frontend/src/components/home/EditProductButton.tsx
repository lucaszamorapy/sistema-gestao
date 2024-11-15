import { PencilIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Products } from "./_constants";
import { useState } from "react";

interface EditProductButtonProps {
  product: Products;
}

const EditProductButton = ({ product }: EditProductButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <Button variant={"ghost"} onClick={() => setIsOpen(!isOpen)}>
        <PencilIcon size={16} className="text-muted-foreground" />
      </Button>
    </>
  );
};

export default EditProductButton;
