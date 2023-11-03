"use client";
import { Box } from "@mui/material";
import React from "react";
import { useExPokemonStore } from "@/store/ex_pokemon";

const ExPokemonCart = () => {
  const { store } = useExPokemonStore();
  return (
    <>
      <div>ExPokemonCart</div>
      <Box>{store.name}</Box>
    </>
  );
};
export default ExPokemonCart;
