import { Modal } from "../../../../Components";
import { Button } from "../../../../Components/Button";
import { ColorDropdownInput } from "../../../../Components/ColorDropdownInput";
import { Input } from "../../../../Components/Input";
import { InputCurrency } from "../../../../Components/InputCurrency";
import { Select } from "../../../../Components/Select";
import { useNewAccountModalController } from "./useNewAccountModalController";

export function NewAccountModal() {
  const { isNewAccountModalOpen, closeNewAccountModal } =
    useNewAccountModalController();

  return (
    <Modal
      title="Nova Conta"
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
      <form action="">
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">Saldo</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <InputCurrency />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input type="text" name="name" placeholder="Nome da Conta" />

          <Select
            placeholder="Tipo"
            options={[
              { value: "INVESTMENT", label: "Investimnto" },
              { value: "CHECKING", label: "Conta Corrente" },
              { value: "CASH", label: "Dinheiro Físico" },
            ]}
          />

          <ColorDropdownInput />
        </div>
        <Button className="w-full mt-10">Criar</Button>
      </form>
    </Modal>
  );
}
