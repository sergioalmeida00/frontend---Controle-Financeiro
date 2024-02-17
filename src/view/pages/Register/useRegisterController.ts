import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthService, SignupParams } from "../../../app/services/authService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from "../../../app/hooks/useAuth";

const schema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z
    .string()
    .nonempty("E-mail é obrigatório")
    .email("Informe um e-mail válido"),
  password: z
    .string()
    .nonempty("Senha é obrigatória")
    .min(6, "Senha deve conter pelo menos 8 dígitos"),
});

type formData = z.infer<typeof schema>;

export function useRegisterController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SignupParams) => {
      return AuthService.signup(data);
    },
  });

  const { signin } = useAuth();
  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { access_token } = await mutateAsync(data);
      signin(access_token);

      toast.success("Conta criada com sucesso!")
    } catch {
      toast.error("Ocorreu um erro ao criar sua conta!");
    }
  });

  return { register, handleSubmit, errors, isPending };
}
