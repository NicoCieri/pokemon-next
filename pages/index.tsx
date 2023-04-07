import { NextPage, GetStaticProps } from "next";
import { Grid } from "@nextui-org/react";
import { Layout } from "@/components/layout";
import { pokeApi } from "@/api";
import { PokemonListResponse, SmallPokemon } from "@/interfaces";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { pokemonUtils } from "@/utils";

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = (props) => {
  return (
    <Layout>
      <Grid.Container gap={2} justify="flex-start">
        {props.pokemons.map((pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.id} />
        ))}
      </Grid.Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("pokemon?limit=151");
  const pokemons: SmallPokemon[] = data.results.map((pokemon, i) => ({
    ...pokemon,
    id: i + 1,
    img: pokemonUtils.getMainImg(i + 1),
  }));

  return {
    props: {
      pokemons,
    },
  };
};

export default HomePage;
