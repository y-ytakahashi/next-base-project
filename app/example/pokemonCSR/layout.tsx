"use client";
import { SWRConfig } from "swr";
import type { ReactNode } from "react";
import ExPokemonCart from "@/components/example/exPokemonCart";
import { apiRequest } from "@/lib/axios";

type Props = {
  children: ReactNode;
};
const PokemonExampleLayout = ({ children }: Props) => {
  return (
    <>
      <ExPokemonCart />
      <SWRConfig
        value={{
          fetcher: apiRequest,
          refreshInterval: 3000
        }}
      >
        {children}
      </SWRConfig>
    </>
  );
};
export default PokemonExampleLayout;
