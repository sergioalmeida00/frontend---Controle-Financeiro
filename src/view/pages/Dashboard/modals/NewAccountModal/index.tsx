import { Controller } from "react-hook-form";
import { Modal } from "../../../../Components";
import { Button } from "../../../../Components/Button";
import { ColorDropdownInput } from "../../../../Components/ColorDropdownInput";
import { Input } from "../../../../Components/Input";
import { InputCurrency } from "../../../../Components/InputCurrency";
import { Select } from "../../../../Components/Select";
import { useNewAccountModalController } from "./useNewAccountModalController";

export function NewAccountModal() {
  const {
    isNewAccountModalOpen,
    closeNewAccountModal,
    errors,
    register,
    handleSubmit,
    control,
    isPending,
    handleChangeOptionType,
    isOptionInvestment,
  } = useNewAccountModalController();

  return (
    <Modal
      title="Nova Conta"
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
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
              defaultValue="0"
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
                  handleChangeOptionType(selectedOption);
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

          {isOptionInvestment && (
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
          Criar
        </Button>
      </form>
    </Modal>
  );
}
