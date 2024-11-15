import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MoneyInput } from "../ui/money-input";
import { productTypes } from "./_constants";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { changeProduct, createProduct, getAllProducts } from "./_actions";
import { useProduct } from "../contexts/ProductsContext";
import { ScrollArea } from "../ui/scroll-area";

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  type: z.enum(["Tecnologia", "Alimentos", "Vestimentas", "Beleza", "Saúde"], {
    required_error: "O tipo é obrigatório.",
  }),
  description: z.string().trim().min(1, {
    message: "A descrição é obrigatória.",
  }),
  price: z
    .union([
      z.string().min(1, { message: "O preço é obrigatório." }),
      z.number({ required_error: "O preço é obrigatório." }),
    ])
    .transform((value) => Number(value))
    .refine((value) => value > 0, { message: "O valor deve ser positivo." }),
});

interface ProductFormProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  editValues?: ProductData;
  productId?: number;
}

export interface ProductData {
  product_id?: number;
  type: "Tecnologia" | "Alimentos" | "Vestimentas" | "Beleza" | "Saúde";
  name: string;
  description: string;
  price: number;
  image?: File | null;
}

const ProductForm = ({
  isOpen,
  setIsOpen,
  editValues,
  productId,
}: ProductFormProps) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { setProducts } = useProduct();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: editValues ?? {
      name: "",
      type: "Tecnologia",
      description: "",
      price: 50,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  const onSubmit = async (data: ProductData) => {
    setLoading(true);
    try {
      const allowedExtensions = [".jpg", ".jpeg", ".png"];
      let fileExtension = "";

      const formData = new FormData();
      formData.append("type", data.type);
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());

      if (file) {
        fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
        if (!allowedExtensions.includes(`.${fileExtension}`)) {
          toast.error("Permitido apenas arquivos .jpg, .jpeg, ou .png");
          setLoading(false);
          return;
        }
        formData.append("image", file);
      }
      if (!editValues) {
        const response = await createProduct(formData);
        setProducts((prevProducts) => [...prevProducts, response.result]);
      } else {
        await changeProduct(productId, formData);
        const response = await getAllProducts();
        setProducts(response.result);
      }
      setLoading(false);
      setIsOpen(false);
    } catch (error) {
      console.error("Erro interno: ", error);
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {productId ? "Editar produto" : "Adicionar produto"}
          </DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo do produto" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {productTypes.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <MoneyInput
                      placeholder="Digite o valor"
                      value={field.value ?? ""}
                      onValueChange={({ floatValue }) => {
                        field.onChange(floatValue ?? "");
                      }}
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite a descrição" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="image">Imagem</Label>
              {editValues?.image && (
                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                  <img
                    src={`http://localhost:8082/${editValues.image}`}
                    alt="Imagem atual do produto"
                    className="mb-4 w-32 h-auto object-fit"
                  />
                </ScrollArea>
              )}
              <Input
                id="image"
                type="file"
                accept="image/*"
                className="w-full"
                onChange={handleFileChange}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant={"outline"}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2Icon className="animate-spin" />}
                {productId ? "Atualizar" : "Adicionar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
