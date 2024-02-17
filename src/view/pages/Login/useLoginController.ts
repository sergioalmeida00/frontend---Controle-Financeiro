import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthService, SigninParams } from "../../../app/services/authService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from "../../../app/hooks/useAuth";

const schema = z.object({
  email: z
    .string()
    .nonempty("E-mail é obrigatório")
    .email("Informe um e-mail válido"),
  password: z
    .string()
    .nonempty("Senha é obrigatória")
    .min(6, "Senha deve conter pelo menos 6 dígitos"),
});

type FormData = z.infer<typeof schema>;
export function useLoginController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SigninParams) => {
      return AuthService.signin(data);
    },
  });

  const { signin } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { access_token } = await mutateAsync(data);
      signin(access_token);
      toast.success("Logado com sucesso");
    } catch {
      toast.error("Credenciais inválidas!");
    }
  });

  return { handleSubmit, register, errors, isPending };
}
