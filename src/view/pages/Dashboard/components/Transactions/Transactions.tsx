import { FilterIcon } from "../../../../Components/icons/FilterIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { CategoryIcon } from "../../../../Components/icons/categories/CategoryIcon";
import { useTransactionController } from "./useTransactionController";
import { cn } from "../../../../../app/utils/cn";
import { Spinner } from "../../../../Components/Spinner";
import emptyState from "../../../../../assets/images/emptyState.svg";
import { TransactionTypeDropdown } from "./TransactionTypeDropdown";
import { FiltersModal } from "./FiltersModal";
import { EditTransactionModal } from "../../modals/EditTransactionModal";
import { formatDate } from "../../../../../app/utils/formatDate";

export function Transactions() {
  const {
    areValuesVisible,
    isLoading,
    transactions,
    isInitialLoading,
    isFiltersModalOpen,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
    handleChangeMonth,
    filters,
    handleChangeFilters,
    handleApplyFilters,
    handleCloseModal,
    handleOpenModal,
    isEditModalOpen,
    transactionEdited,
  } = useTransactionController();

  const hasTransactions = transactions.length > 0;

  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
      {isInitialLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="w-10 h-10" />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <FiltersModal
            open={isFiltersModalOpen}
            onClose={handleCloseFiltersModal}
            onApplyFilters={handleApplyFilters}
          />
          <header>
            <div className="flex items-center justify-between">
              <TransactionTypeDropdown
                onSelect={handleChangeFilters("type")}
                selectedType={filters.type}
              />

              <button onClick={handleOpenFiltersModal}>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                slidesPerView={3}
                centeredSlides
                initialSlide={filters.month}
                onSlideChange={(swiper) => {
                  if (swiper.realIndex === filters.month) return;
                  handleChangeMonth(swiper.realIndex);
                }}
              >
                <SliderNavigation />

                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption
                        isActive={isActive}
                        month={month}
                        index={index}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
            {isLoading && (
              <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
                <Spinner className="w-10 h-10" />
              </div>
            )}

            {!hasTransactions && !isLoading && (
              <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
                <img src={emptyState} alt={emptyState} />
                <span className="text-gray-700">
                  Não encontramos nenhuma transação!
                </span>
              </div>
            )}

            {hasTransactions && !isLoading && (
              <>
                {transactionEdited && (
                  <EditTransactionModal
                    open={isEditModalOpen}
                    onClose={handleCloseModal}
                    transaction={transactionEdited}
                  />
                )}

                {transactions.map((transaction) => (
                  <div
                    className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4"
                    key={transaction.id}
                    role="button"
                    onClick={() => handleOpenModal(transaction)}
                  >
                    <div className="flex-1 flex items-center gap-3">
                      <CategoryIcon
                        type={
                          transaction.type === "EXPENSE" ? "expense" : "income"
                        }
                        category={transaction.category?.icon}
                      />

                      <div>
                        <strong className="font-bold tracking-[-0.5px] block">
                          {transaction.name}
                        </strong>
                        <span className="text-sm text-gray-600">
                          {formatDate(new Date(transaction.date))}
                        </span>
                      </div>
                    </div>
                    <span
                      className={cn(
                        " tracking-[-0.5px] font-medium",
                        !areValuesVisible && "blur-sm",
                        transaction.type === "EXPENSE"
                          ? "text-red-800"
                          : "text-green-800"
                      )}
                    >
                      {transaction.type === "EXPENSE" ? "-" : "+"}
                      {formatCurrency(transaction.value)}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
