import { pokeApi } from "@/api";
import { FullPokemon } from "@/interfaces";

export const getPokemon = async (nameOrId: string) => {
  const {
    data: { id, name, sprites },
  } = await pokeApi.get<FullPokemon>(`pokemon/${nameOrId}`);

  return {
    id,
    name,
    sprites,
  };
};
