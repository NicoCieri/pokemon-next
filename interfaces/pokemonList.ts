export interface PokemonListResponse {
  count: number;
  next?: string;
  previous?: string;
  results: SmallPokemon[];
}

export interface SmallPokemon {
  name: string;
  id: number;
  url: string;
  img: string;
}

export interface SmallPokemonsById {
  [id: number]: SmallPokemon;
}
