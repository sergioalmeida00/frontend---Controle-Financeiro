import React, { createContext, useCallback, useEffect, useState } from "react";
import { localStorageKeys } from "../config/localStorageKeys";
import { useQuery } from "@tanstack/react-query";
import { usersService } from "../services/usersService";
import toast from "react-hot-toast";
import { PageLoader } from "../../view/Components/PageLoader";
import { User } from "../entities/User";

interface AuthContextValue {
  signedIn: boolean;
  signin(accessToken: string): void;
  singout(): void;
  user: User | undefined;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storageAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN
    );
    return !!storageAccessToken;
  });

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);

    setSignedIn(true);
  }, []);

  const singout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    setSignedIn(false);
  }, []);

  const { isError, isFetching, isSuccess, data } = useQuery({
    queryKey: ["users", "me"],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Sua sessão expirou!");
      singout();
    }
  }, [isError, singout]);

  if (isFetching) {
    return <PageLoader />;
  }

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        signin,
        singout,
        user: data,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
