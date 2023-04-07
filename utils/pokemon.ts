import { Pokemon } from "@/interfaces";

const getMainImg = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;

const getFrontSprite = (pokemon: Pokemon) =>
  pokemon.sprites.versions?.["generation-v"]["black-white"].animated!
    .front_default || pokemon.sprites.front_default;

const getBackSprite = (pokemon: Pokemon) =>
  pokemon.sprites.versions?.["generation-v"]["black-white"].animated!
    .back_default || pokemon.sprites.back_default;

const getFrontShinySprite = (pokemon: Pokemon) =>
  pokemon.sprites.versions?.["generation-v"]["black-white"].animated!
    .front_shiny || pokemon.sprites.front_shiny;

const getBackShinySprite = (pokemon: Pokemon) =>
  pokemon.sprites.versions?.["generation-v"]["black-white"].animated!
    .back_shiny || pokemon.sprites.back_shiny;

const exportedFunctions = {
  getMainImg,
  getFrontSprite,
  getBackSprite,
  getFrontShinySprite,
  getBackShinySprite,
};

export default exportedFunctions;
