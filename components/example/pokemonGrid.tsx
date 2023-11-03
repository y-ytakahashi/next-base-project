import { getPokemonGrid } from "@/api/example/example";
import { PokemonCard } from "@/components/example/pokemonCard";

export const PokemonGrid = async () => {
  const data = await getPokemonGrid();
  console.log("SSR Component");
  console.log({ data });

  return (
    <div className="p-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-8">
        {data?.results.map(({ name }, index) => <PokemonCard key={name} name={name} index={index + 1 + 20} />)}
      </div>
      <div className="flex justify-center gap-4">
        <button className="w-20 rounded bg-slate-500 p-4 hover:bg-black disabled:cursor-not-allowed">prev</button>
        <button className="w-20 rounded bg-slate-500 p-4 hover:bg-black ">Next</button>
      </div>
    </div>
  );
};
