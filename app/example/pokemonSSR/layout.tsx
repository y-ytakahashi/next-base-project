import type { ReactNode } from "react";
import ExPokemonCart from "@/components/example/exPokemonCart";

type Props = {
  children: ReactNode;
};
const PokemonExampleLayout = ({ children }: Props) => {
  return (
    <>
      <ExPokemonCart />
      {children}
    </>
  );
};
export default PokemonExampleLayout;
