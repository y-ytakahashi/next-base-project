import type { AxiosRequestConfig } from "axios";
import { apiRequest } from "@/lib/axios";
import { PokemonDetails, PokemonResponse } from "@/types/example_pokemon";

// 一覧取得
export const getPokemonGrid = async (): Promise<PokemonResponse> => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "pokemon?limit=20&offset=20"
  };
  return await apiRequest<PokemonResponse>(config);
};

// 詳細取得
export const getPokemonDetail = async (id: number): Promise<PokemonDetails> => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `pokemon/${id}`
  };
  return await apiRequest<PokemonDetails>(config);
};
