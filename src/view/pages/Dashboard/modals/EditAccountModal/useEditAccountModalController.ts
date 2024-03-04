import { z } from "zod";
import { useDashboard } from "../../components/Context/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountsService } from "../../../../../app/services/bankAccountService";
import { BankAccountParams } from "../../../../../app/services/bankAccountService/create";
import toast from "react-hot-toast";

const schema = z.object({
  initial_balance: z.union([
    z.string().nonempty("Saldo inicial é obrigatório "),
    z.number(),
  ]),
  name: z.string().nonempty("Nome da conta é obrigatório"),
  type: z.enum(["INVESTMENT", "CASH", "CHECKING"]),
  color: z.string().nonempty("Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
  const { isEditAccountModalOpen, closeEditAccountModal, accountEdited } =
    useDashboard();

  console.log(accountEdited);
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountEdited?.color,
      name: accountEdited?.name,
      type: accountEdited?.type,
      initial_balance: accountEdited?.initial_balance,
    },
  });

  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: BankAccountParams) => {
      return bankAccountsService.update({ id: accountEdited!.id, ...data });
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync(data);

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("A conta foi editada com sucesso!");
      closeEditAccountModal();
    } catch (error) {
      toast.error("Erro ao salvar as alterações!");
    }
  });

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    FormData,
    register,
    errors,
    handleSubmit,
    control,
    isPending,
  };
}
