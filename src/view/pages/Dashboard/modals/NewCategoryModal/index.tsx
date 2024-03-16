import { Controller } from "react-hook-form";
import { Modal } from "../../../../Components";
import { Input } from "../../../../Components/Input";
import { useNewCategoryModalController } from "./useNewCategoryModalController";
import { Select } from "../../../../Components/Select";
import { Button } from "../../../../Components/Button";

export function NewCategoryModal() {
  const {
    isNewCategoryModalOpen,
    closeNewCategoryModal,
    control,
    errors,
    register,
    handleSubmit,
    isPending,
  } = useNewCategoryModalController();
  return (
    <Modal
      title="Nova Categoria"
      open={isNewCategoryModalOpen}
      onClose={closeNewCategoryModal}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            error={errors.name?.message}
            placeholder="Nome da categoria"
            {...register("name")}
          />

          <Controller
            control={control}
            name="type"
            defaultValue="INCOME"
            render={({ field: { onChange, value } }) => (
              <Select
                error={errors.type?.message}
                placeholder="Tipo"
                onChange={onChange}
                value={value}
                options={[
                  { value: "EXPENSE", label: "Despesa" },
                  { value: "INCOME", label: "Receita" },
                ]}
              />
            )}
          />
        </div>

        <Button className="w-full mt-6" isLoading={isPending}>
          Criar
        </Button>
      </form>
    </Modal>
  );
}
