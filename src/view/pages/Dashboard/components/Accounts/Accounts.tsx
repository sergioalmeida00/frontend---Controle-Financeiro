import { Swiper, SwiperSlide } from "swiper/react";
import { AccountCard } from "./AccountCard";
import "swiper/css";
import { AccountsSliderNavigation } from "./AccountsSliderNavigation";
import { EyeIcon } from "../../../../Components/icons/EyeIcon";
import { useAccountsController } from "./useAccountsController";
import { Spinner } from "../../../../Components/Spinner";
import { PlusIcon } from "@radix-ui/react-icons";
import { Card } from "../../../../Components/Card";

export function Accounts() {
  const {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading,
    accounts,
    openNewAccountModal,
    summaryTotal,
    sliderSummary,
    setSliderSummary
  } = useAccountsController();

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="text-teal-950 fill-white w-10 h-10" />
        </div>
      )}

      {!isLoading && (
        <>
          <div>
            <Swiper
              spaceBetween={16}
              slidesPerView={windowWidth >= 500 ? 2.1 : 1.1}
              onSlideChange={(swiper) => {
                setSliderSummary({
                  isBeginning: swiper.isBeginning,
                  isEnd: swiper.isEnd,
                });
              }}
            >
              <div
                className="flex items-center justify-between mb-4"
                slot="container-start"
              >
                <button
                  className="w-8 h-8 flex items-center justify-center"
                  onClick={toggleValuesVisibility}
                >
                  <EyeIcon open={!areValuesVisible} />
                </button>
                <AccountsSliderNavigation
                  isBeginning={sliderSummary.isBeginning}
                  isEnd={sliderSummary.isEnd}
                />
              </div>

              <div className="flex gap-2">
                {Object.entries(summaryTotal).map(([key, { value, title }]) => (
                  <SwiperSlide key={key}>
                    <Card title={title} value={value} visible={areValuesVisible} />
                  </SwiperSlide>
                ))}                
              </div>
            </Swiper>
          </div>

          <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
            {accounts.length === 0 && (
              <>
                <div className=" mb-4">
                  <strong className="text-white tracking-[-1px] text-lg">
                    Minhas Contas
                  </strong>
                </div>

                <button
                  onClick={openNewAccountModal}
                  className="mt-4 h-52 rounded-2xl border-2 border-dashed border-teal-600 flex flex-col items-center justify-center gap-4 text-white"
                >
                  <div className="w-11 h-11 rounded-full border-2 border-dashed flex items-center justify-center">
                    <PlusIcon className="w-6 h-6" />
                  </div>
                  <span className="tracking-[-0.5px] font-medium block w-32 text-center">
                    Cadastre uma nova conta
                  </span>
                </button>
              </>
            )}

            {accounts.length > 0 && (
              <div>
                <Swiper
                  spaceBetween={16}
                  slidesPerView={windowWidth >= 500 ? 2.1 : 1.1}
                  onSlideChange={(swiper) => {
                    setSliderState({
                      isBeginning: swiper.isBeginning,
                      isEnd: swiper.isEnd,
                    });
                  }}
                >
                  <div
                    className="flex items-center justify-between mb-4"
                    slot="container-start"
                  >
                    <strong className="text-white tracking-[-1px] text-lg">
                      Minhas Contas
                    </strong>
                    <AccountsSliderNavigation
                      isBeginning={sliderState.isBeginning}
                      isEnd={sliderState.isEnd}
                    />
                  </div>
                  {accounts.map((account) => (
                    <SwiperSlide key={account.id}>
                      <AccountCard data={account} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
