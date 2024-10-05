import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Toaster } from "../ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { register } from "../../composables/user";
import { Label } from "../ui/label";
import { useNavigate } from "react-router-dom";

interface RegisterData {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const formSchema = z.object({
    email: z
      .string()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
        message: "Digite um e-mail válido.",
      })
      .refine((val) => val.endsWith(".com"), {
        message: "E-mail tem que terminar com '.com'",
      }),
    password: z
      .string()
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
    name: z.string().min(1, { message: "Nome é obrigatório." }),
    lastname: z.string().min(1, { message: "Sobrenome é obrigatório." }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      lastname: "",
      icon: null,
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: RegisterData) => {
    setLoading(true);
    try {
      const allowedExtensions = [".jpg", ".jpeg", ".png"];
      let fileExtension = "";

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("last_name", data.lastname);
      formData.append("email", data.email);
      formData.append("password", data.password);

      if (file) {
        fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
        if (!allowedExtensions.includes(`.${fileExtension}`)) {
          toast({
            variant: "destructive",
            title: "Tipo de arquivo não permitido.",
            description: "Permitido apenas arquivos .jpg, .jpeg, ou .png",
          });
          setLoading(false);
          return;
        }

        formData.append("icon", file);
      }

      await register(formData);
    } catch (error) {
      console.log("Erro interno: ", error);
      toast({
        variant: "destructive",
        title: "Ocorreu um erro durante o cadastro.",
      });
      setLoading(false);
    } finally {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  return (
    <section className="mt-32">
      <div className="container">
        <Toaster />
        <div className="flex flex-col items-center justify-center ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 border-2 p-10 rounded-md "
            >
              <div className="flex flex-col">
                <h1 className="font-semibold text-xl">Seja bem-vindo!</h1>
                <p className="text-gray-400">
                  você não esta conectado, precisa fazer o registro para
                  continuar
                </p>
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="Digite seu nome"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="Digite seu sobrenome"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="Digite seu e-mail"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="icon">Ícone</Label>
                <Input
                  id="icon"
                  type="file"
                  accept="image/*"
                  className="w-full"
                  onChange={handleFileChange}
                />
              </div>

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <div className="w-full relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          className="w-full relative"
                          placeholder="Digite sua senha"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-0"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {loading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cadastrando
                </Button>
              ) : (
                <Button type="submit">Enviar</Button>
              )}
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
