import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccount } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { useMemo, useState } from "react";
import { Transaction } from "../../../../../app/entities/Transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateTransactionParams } from "../../../../../app/services/transactionService/update";
import { transactionService } from "../../../../../app/services/transactionService";
import toast from "react-hot-toast";

const schema = z.object({
  value: z.union([z.string().nonempty("Informe o valor"), z.number()]),
  name: z.string().nonempty("Nome da transação é obrigatório"),
  bank_account_id: z.string().nonempty("Conta é obrigatório"),
  category_id: z.string().nonempty("Categoria é obrigatório"),
  date: z.date(),
});

type formData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void
) {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
  } = useForm<formData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bank_account_id: transaction?.bank_account_id,
      category_id: transaction?.category_id,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction.date) : new Date(),
    },
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { accounts } = useBankAccount();
  const { categories: categoriesList } = useCategories();
  const queryClient = useQueryClient();

  const { isPending, mutateAsync: updateTransaction } = useMutation({
    mutationFn: async (data: UpdateTransactionParams) => {
      return transactionService.update(data);
    },
  });

  const { isPending: isPendingDelete, mutateAsync: removeTransaction } =
    useMutation({
      mutationFn: async (transactionId: string) => {
        return transactionService.remove(transactionId);
      },
    });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await updateTransaction({
        ...data,
        id: transaction!.id,
        type: transaction!.type,
        value: data.value,
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });

      toast.success(
        transaction!.type === "EXPENSE"
          ? "Despesa editada com sucesso!"
          : "Receita editada com sucesso!"
      );
      onClose();
    } catch {
      toast.error(
        transaction!.type === "EXPENSE"
          ? "Erro ao salvar a despesa!"
          : "Erro ao salvar a receita!"
      );
    }
  });

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteTransaction() {
    try {
      await removeTransaction(transaction!.id);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success(
        transaction!.type === "EXPENSE"
          ? "Despesa deletada com sucesso!"
          : "Receita deletada com sucesso!"
      );
      onClose();
    } catch (error) {
      toast.error(
        transaction!.type === "EXPENSE"
          ? "Erro ao deletar a despesa!"
          : "Erro ao deletar a receita!"
      );
    }
  }

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === transaction?.type
    );
  }, [categoriesList, transaction]);

  return {
    register,
    control,
    handleSubmit,
    errors,
    accounts,
    categories,
    isPending,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    isDeleteModalOpen,
    handleDeleteTransaction,
    isPendingDelete
  };
}
