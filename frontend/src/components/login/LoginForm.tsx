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
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

interface LoginData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser } = useAuth();

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
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: LoginData) => {
    setLoading(true);
    try {
      await loginUser(data.email, data.password);
    } catch (error) {
      console.log("Erro interno: ", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-56">
      <div className="container">
        <Toaster />
        <div className="flex flex-col items-center justify-center ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)} //form.handleSubmit ja passa o data da função onSubmit
              className="space-y-4 border-2 p-10 rounded-md "
            >
              <div className="flex flex-col">
                <h1 className="font-semibold text-xl">Seja bem-vindo!</h1>
                <p className="text-gray-400">
                  você não esta conectado, precisa fazer o login para continuar
                </p>
              </div>
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
                  Entrando
                </Button>
              ) : (
                <Button type="submit">Entrar</Button>
              )}
              <div className="flex flex-col">
                <p className="text-sm">
                  Ainda não possui uma conta?{" "}
                  <Link className="text-primary" to={"/cadastro"}>
                    Cadastre-se agora
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
