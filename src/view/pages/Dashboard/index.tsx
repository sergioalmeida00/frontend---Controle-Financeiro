import { useAuth } from "../../../app/hooks/useAuth";
import { Logo } from "../../Components/Logo";

import { UserMenu } from "../../Components/UserMenu";
import { Accounts } from "./components/Accounts/Accounts";
import { DashboardProvider } from "./components/Context";
import { Fab } from "./components/Fab";
import { Transactions } from "./components/Transactions/Transactions";
import { NewAccountModal } from "./modals/NewAccountModal";

export function DashBoard() {
  const { singout } = useAuth();
  return (
    <DashboardProvider>
      <div className=" h-full w-full p-4 md:px-8 md:pb-8 md:pt-6 flex flex-col gap-4">
        <header className="h-12 flex items-center justify-between">
          <Logo className="h-6 text-teal-900" />
          <UserMenu />
        </header>

        <main className="flex-1 flex flex-col md:flex-row gap-4 max-h-full">
          <div className="w-full md:w-1/2">
            <Accounts />
          </div>

          <div className="w-full md:w-1/2">
            <Transactions />
          </div>
        </main>

        <Fab />
        <NewAccountModal />
      </div>
    </DashboardProvider>
  );
}
