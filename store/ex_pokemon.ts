import { create } from "zustand";

type ExPokemonStore = {
  store: { name: string };
  add: (name: string) => void;
  remove: () => void;
  removeAll: () => void;
};

export const useExPokemonStore = create<ExPokemonStore>((set) => ({
  store: { name: "this store pokemonSSR" },
  // ローカルストレージもしくはサーバーに保存する必要がある
  // 動作確認のために一時的にstoreに保存している
  add: (name) => set((state) => ({ ...state, store: { name } })),
  remove: () => set((state) => ({ store: state.store })),
  removeAll: () => set((state) => ({ store: state.store }))
}));
