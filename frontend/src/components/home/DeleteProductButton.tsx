import { TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

interface DeleteProductButtonProps {
  productId: number;
}

const DeleteProductButton = ({ productId }: DeleteProductButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <Button variant={"ghost"} onClick={() => setIsOpen(!isOpen)}>
        <TrashIcon size={16} className="text-muted-foreground" />
      </Button>
    </>
  );
};

export default DeleteProductButton;
