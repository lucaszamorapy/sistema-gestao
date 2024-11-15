import { ColumnDef } from "@tanstack/react-table";
import ProductTypeBadge from "../ProductTypeBadge";
import EditProductButton from "../EditProductButton";
import DeleteProductButton from "../DeleteProductButton";

export interface Products {
  product_id: number;
  type: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "product_id",
    header: "ID",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: product } }) => {
      return (
        <div className="space-x-1">
          <ProductTypeBadge product={product} />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row: { original: product } }) => (
      <div style={{ width: "200px" }}>{product.name}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: ({ row: { original: product } }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(product.price)),
  },
  {
    accessorKey: "image",
    header: "Imagem",
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: product } }) => {
      return (
        <div className="flex">
          <EditProductButton product={product} />
          <DeleteProductButton productId={product.product_id} />
        </div>
      );
    },
  },
];
