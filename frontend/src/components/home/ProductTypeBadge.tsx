import { CircleIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Products } from "./_constants";

interface ProductTypeBadgeProps {
  product: Products;
}

const ProductTypeBadge = ({ product }: ProductTypeBadgeProps) => {
  switch (product.type) {
    case "Tecnologia":
      return (
        <Badge className="bg-muted font-bold text-primary hover:bg-muted">
          <CircleIcon className="mr-2 fill-primary" size={10} />
          Tecnologia
        </Badge>
      );
    case "Alimentos":
      return (
        <Badge className="bg-red-600 font-bold  bg-opacity-10 text-red-600 hover:bg-red-600 hover:bg-opacity-10">
          <CircleIcon className="mr-2 fill-primary" size={10} />
          Alimentos
        </Badge>
      );
    case "Vestimentas":
      return (
        <Badge className="bg-blue-600 font-bold  bg-opacity-10 text-blue-600 hover:bg-blue-600 hover:bg-opacity-10">
          <CircleIcon className="mr-2 fill-blue-600" size={10} />
          Vestimentas
        </Badge>
      );
    case "Beleza":
      return (
        <Badge className="bg-pink-600 font-bold  bg-opacity-10 text-pink-600 hover:bg-pink-600 hover:bg-opacity-10">
          <CircleIcon className="mr-2 fill-pink-600" size={10} />
          Beleza
        </Badge>
      );
    case "Saúde":
      return (
        <Badge className="bg-yellow-400 font-bold  bg-opacity-10 text-yellow-400 hover:bg-yellow-400 hover:bg-opacity-10">
          <CircleIcon className="mr-2 fill-yellow-400" size={10} />
          Saúde
        </Badge>
      );
  }
};

export default ProductTypeBadge;
