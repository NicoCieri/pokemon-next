import { useEffect, useState } from "react";
import { Card, Grid, Image, Text } from "@nextui-org/react";
import { Layout } from "@/components/layout";
import { NoFavorites } from "@/components/ui";
import { localFavorites, pokemonUtils } from "@/utils";
import { GetStaticProps } from "next";
import { pokeApi } from "@/api";
import {
  PokemonListResponse,
  SmallPokemon,
  SmallPokemonsById,
} from "@/interfaces";
import { PokemonCard } from "@/components/pokemon/PokemonCard";

interface FavoritesPageProps {
  pokemons: SmallPokemonsById;
}

const FavoritesPage = ({ pokemons }: FavoritesPageProps) => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons(localFavorites.getPokemons());
  }, []);

  const actions = [
    {
      label: "Remove",
    },
  ];

  const onRemove = (id: number) => () => {
    localFavorites.toggleFavorites(id);
    setFavoritePokemons(localFavorites.getPokemons());
  };

  const getActionOptions = (id: number) => ({
    actions,
    onAction: onRemove(id),
  });

  return (
    <Layout title="Favorites">
      {!favoritePokemons.length && <NoFavorites />}

      {!!favoritePokemons.length && (
        <Grid.Container gap={2} justify="flex-start">
          {favoritePokemons.map((id) => (
            <PokemonCard
              pokemon={pokemons[id]}
              key={id}
              actionsOptions={getActionOptions(id)}
            />
          ))}
        </Grid.Container>
      )}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("pokemon?limit=1000");

  const pokemons: SmallPokemonsById = data.results.reduce<SmallPokemonsById>(
    (acc, pokemon, i) => {
      const id = i + 1;
      if (!acc[id]) {
        acc[id] = {
          ...pokemon,
          id: id,
          img: pokemonUtils.getMainImg(id),
        };
      }
      return acc;
    },
    {}
  );

  return {
    props: {
      pokemons,
    },
  };
};

export default FavoritesPage;
