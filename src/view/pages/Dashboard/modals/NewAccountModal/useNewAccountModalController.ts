import { z } from "zod";
import { useDashboard } from "../../components/Context/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountsService } from "../../../../../app/services/bankAccountService";
import { BankAccountParams } from "../../../../../app/services/bankAccountService/create";
import toast from "react-hot-toast";
import { useState } from "react";

const schema = z.object({
  initial_balance: z.string().nonempty("Saldo inicial é obrigatório "),
  name: z.string().nonempty("Nome da conta é obrigatório"),
  type: z.enum(["INVESTMENT", "CASH", "CHECKING"]),
  goal: z.string().optional(),
  color: z.string().nonempty("Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export function useNewAccountModalController() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();
  const [isOptionInvestment, setIsOptionInvestment] = useState(false);
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      initial_balance: "0",
      color: "",
      type: "CHECKING",
      goal:""
    },
  });

  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: BankAccountParams) => {
      return bankAccountsService.create(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync(data);

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("Conta cadastrada com sucesso!");
      closeNewAccountModal();
      reset();
    } catch (error) {
      toast.error("Erro ao cadastrar a conta!");
    }
  });

  function handleChangeOptionType(optionValue: string) {
    if (optionValue === "INVESTMENT") {
      setIsOptionInvestment(true);
    }else{
      setIsOptionInvestment(false);
    }
  }

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
    FormData,
    register,
    errors,
    handleSubmit,
    control,
    isPending,
    handleChangeOptionType,
    isOptionInvestment,
  };
}
