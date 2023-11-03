"use client";

import { Button } from "@mui/material";
import { useExPokemonStore } from "@/store/ex_pokemon";

type Props = {
  pokemonName: string;
};
const ExPokemonAddCart = ({ pokemonName }: Props) => {
  const { add: handleAddToCart } = useExPokemonStore();
  const addCart = (name: string) => {
    handleAddToCart(name);
  };

  return <Button onClick={() => addCart(pokemonName)}>Add to Cart</Button>;
};
export default ExPokemonAddCart;
