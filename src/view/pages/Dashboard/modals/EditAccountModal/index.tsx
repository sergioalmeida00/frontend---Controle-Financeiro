import { Controller } from "react-hook-form";
import { Modal } from "../../../../Components";
import { Button } from "../../../../Components/Button";
import { ColorDropdownInput } from "../../../../Components/ColorDropdownInput";
import { Input } from "../../../../Components/Input";
import { InputCurrency } from "../../../../Components/InputCurrency";
import { Select } from "../../../../Components/Select";
import { useEditAccountModalController } from "./useEditAccountModalController";
import { TrashIcon } from "../../../../Components/icons/TrashIcon";
import { ConfirmDeleteModal } from "../../../../Components/ConfirmDeleteModal";

export function EditAccountModal() {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    errors,
    register,
    handleSubmit,
    control,
    isPending,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
    isPendingDelete,
    handleEditChangeOptionType,
    isEditOptionInvestment,
  } = useEditAccountModalController();

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        onConfirm={handleDeleteAccount}
        isLoading={isPendingDelete}
        onClose={handleCloseDeleteModal}
        title="Tem certeza que deseja excluir esta conta ?"
        description="Ao excluir a conta, também serão excluídos todos os registros de
        receita e despesas relacionados."
      />
    );
  }

  return (
    <Modal
      title="Editar Conta"
      open={isEditAccountModalOpen}
      onClose={closeEditAccountModal}
      rightAction={
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="w-6 h-6 text-red-900" />
        </button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Saldo Inicial
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>

            <Controller
              control={control}
              name="initial_balance"
              defaultValue={0}
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.initial_balance?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Nome da Conta"
            error={errors.name?.message}
            {...register("name")}
          />

          <Controller
            control={control}
            name="type"
            defaultValue="CHECKING"
            render={({ field: { onChange, value } }) => (
              <Select
                error={errors.type?.message}
                placeholder="Tipo"
                onChange={(selectedOption) => {
                  onChange(selectedOption);
                  handleEditChangeOptionType(selectedOption);
                }}
                value={value}
                options={[
                  { value: "INVESTMENT", label: "Investimento" },
                  { value: "CHECKING", label: "Conta Corrente" },
                  { value: "CASH", label: "Dinheiro Físico" },
                ]}
              />
            )}
          />

          {isEditOptionInvestment && (
            <div>
              <Controller
                control={control}
                name="goal"
                render={({ field: { onChange, value } }) => (
                  <InputCurrency
                    error={errors.goal?.message}
                    onChange={onChange}
                    value={value}
                    className="w-full text-[16px] font-normal bg-white rounded-lg border border-gray-500 px-3 h-[52px]  placeholder:text-gray-700  focus:border-gray-800 transition-all outline-none"
                    placeholder="Valor da Meta"
                  />
                )}
              />
            </div>
          )}

          <Controller
            control={control}
            name="color"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <ColorDropdownInput
                error={errors.color?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>
        <Button className="w-full mt-10" isLoading={isPending}>
          Salvar
        </Button>
      </form>
    </Modal>
  );
}
