"use client";
import { useState } from "react";
import useSWR, { preload } from "swr";
import { PokemonCard } from "@/components/example/pokemonCard";
import { apiRequest } from "@/lib/axios";
import { PokemonResponse } from "@/types/example_pokemon";

type Direction = "prev" | "next";
const INITIAL_PAGE = 0;

export const PokemonCSRGrid = () => {
  const [page, setPage] = useState(INITIAL_PAGE);
  const { data } = useSWR<PokemonResponse>(`pokemon?limit=20&offset=${page * 20}`);

  console.log({ data });
  const onPrevPage = () => setPage((prev) => prev - 1);
  const onNextPage = () => setPage((prev) => prev + 1);

  const onHover = (direction: Direction) => {
    if (direction === "prev") preload(`pokemonSSR?limit=20&offset=${(page + 1) * 20}`, apiRequest);

    if (direction === "next" && page !== INITIAL_PAGE)
      preload(`pokemonSSR?limit=20&offset=${(page - 1) * 20}`, apiRequest);
  };

  return (
    <div className="p-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-8">
        {data?.results.map(({ name }, index) => <PokemonCard key={name} name={name} index={index + 1 + 20} />)}
      </div>
      <div className="flex justify-center gap-4">
        <button
          className="w-20 rounded bg-slate-500 p-4 hover:bg-black disabled:cursor-not-allowed"
          onClick={onPrevPage}
          disabled={page === INITIAL_PAGE}
          onMouseEnter={() => onHover("prev")}
        >
          prev
        </button>
        <button
          className="w-20 rounded bg-slate-500 p-4 hover:bg-black "
          onClick={onNextPage}
          onMouseEnter={() => onHover("next")}
        >
          Next
        </button>
      </div>
    </div>
  );
};
