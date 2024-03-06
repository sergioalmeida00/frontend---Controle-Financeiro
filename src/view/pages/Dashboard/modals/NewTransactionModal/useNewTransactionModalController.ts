import { z } from "zod";
import { useDashboard } from "../../components/Context/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccount } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionService } from "../../../../../app/services/transactionService";
import { CreateTransactionParams } from "../../../../../app/services/transactionService/create";
import toast from "react-hot-toast";

const schema = z.object({
  value: z.union([z.string().nonempty("Saldo é obrigatório "), z.number()]),
  name: z.string().nonempty("Nome da transação é obrigatório"),
  bank_account_id: z.string().nonempty("Conta é obrigatório"),
  category_id: z.string().nonempty("Categoria é obrigatório"),
  date: z.date(),
});

type formData = z.infer<typeof schema>;

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<formData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();

  const { accounts } = useBankAccount();
  const { categories: categoriesList } = useCategories();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: CreateTransactionParams) => {
      return transactionService.create(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        type: newTransactionType!,
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      closeNewTransactionModal();
      reset();
      toast.success(
        newTransactionType === "EXPENSE"
          ? "Despesa cadastrada com sucesso!"
          : "Receita cadastrada com sucesso!"
      );
    } catch (error) {
      toast.error(
        newTransactionType === "EXPENSE"
          ? "Erro ao cadastrar a despesa!"
          : "Erro ao cadastrar a receita!"
      );
    }
  });

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === newTransactionType
    );
  }, [categoriesList, newTransactionType]);

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    register,
    control,
    handleSubmit,
    errors,
    accounts,
    categories,
    isPending,
  };
}
