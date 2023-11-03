import Image from "next/image";
import React from "react";
import { getPokemonDetail } from "@/api/example/example";
import ExPokemonAddCart from "@/components/example/exPokemonAddCart";

const ExPokemonDetail = async ({ params }: { params: { slug: number } }) => {
  const data = await getPokemonDetail(params.slug);
  return (
    <div className="flex flex-col items-center p-2 h-screen">
      <h1 className="text-2xl capitalize">{data?.name}</h1>

      <Image alt={"ポケモン表"} src={data?.sprites.front_default} className="w-[200px]" width={500} height={500} />
      <Image alt={"ポケモン裏"} src={data?.sprites.back_default} className="w-[200px]" width={500} height={500} />
      <ExPokemonAddCart pokemonName={data.name} />
    </div>
  );
};
export default ExPokemonDetail;
