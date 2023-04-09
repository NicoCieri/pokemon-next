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

export const PokemonByIdPage = ({ pokemon }: Props) => (
  <PokemonDetailPage pokemon={pokemon} />
);

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const paths = [...Array(151)].map((_, i) => ({
    params: { id: `${i + 1}` },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const pokemon = await getPokemon(id);

  return {
    props: {
      pokemon,
    },
  };
};

export default PokemonByIdPage;
