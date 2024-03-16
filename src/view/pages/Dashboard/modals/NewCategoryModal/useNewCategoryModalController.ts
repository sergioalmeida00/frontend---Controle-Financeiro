import { z } from "zod";
import { useDashboard } from "../../components/Context/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryParams } from "../../../../../app/services/categoriesService/create";
import { categoriesService } from "../../../../../app/services/categoriesService";
import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().nonempty("Nome não pode ser vazio"),
  icon: z.string().optional(),
  type: z.enum(["EXPENSE", "INCOME"]),
});

type FormData = z.infer<typeof schema>;

export function useNewCategoryModalController() {
  const { isNewCategoryModalOpen, closeNewCategoryModal } = useDashboard();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      type: "INCOME",
      icon: "other",
    },
  });

  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: CategoryParams) => {
      return categoriesService.create(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync(data);

      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoria cadastrada com sucesso!");
      closeNewCategoryModal();
    } catch (error) {
      toast.error("Erro ao cadastrar a categoria!");
    }
  });

  return {
    isNewCategoryModalOpen,
    closeNewCategoryModal,
    handleSubmit,
    register,
    control,
    errors,
    isPending,
  };
}
