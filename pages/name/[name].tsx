import { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import confetti from "canvas-confetti";
import { Layout } from "@/components/layout";
import { pokeApi } from "@/api";
import { Pokemon, PokemonListResponse } from "@/interfaces";
import { getPokemon, localFavorites, pokemonUtils, strings } from "@/utils";
import PokemonDetailPage from "@/scenes/PokemonDetailPage";

interface Props {
  pokemon: Pokemon;
}

export const PokemonByNamePage = ({ pokemon }: Props) => (
  <PokemonDetailPage pokemon={pokemon} />
);

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("pokemon?limit=151");
  const paths = data.results.map(({ name }) => ({ params: { name } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  const pokemon = await getPokemon(name);

  return {
    props: {
      pokemon,
    },
  };
};

export default PokemonByNamePage;
