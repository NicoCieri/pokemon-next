import { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import confetti from "canvas-confetti";
import { Layout } from "@/components/layout";
import { pokeApi } from "@/api";
import { Pokemon, PokemonListResponse } from "@/interfaces";
import { getPokemon, localFavorites, pokemonUtils, strings } from "@/utils";

interface Props {
  pokemon: Pokemon;
}

const PokemonDetailPage = ({ pokemon }: Props) => {
  const [isInfavorites, setIsInFavorites] = useState(false);

  const onToggleFavorite = () => {
    localFavorites.toggleFavorites(pokemon.id);
    setIsInFavorites(!isInfavorites);

    if (isInfavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };

  useEffect(() => {
    setIsInFavorites(localFavorites.existsInFavorites(pokemon.id));
  }, [pokemon.id]);

  return (
    <Layout title={strings.capitalize(pokemon.name)}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: "0px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "no-image.png"
                }
                alt="pokemon.name"
                width="100%"
                height={250}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>

              <Button
                onPress={onToggleFavorite}
                color="gradient"
                ghost={!isInfavorites}
              >
                {isInfavorites ? "In Favorites" : "Add to Favorites"}
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites</Text>
              <Container direction="row" display="flex">
                <Image
                  src={pokemonUtils.getFrontSprite(pokemon)}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemonUtils.getBackSprite(pokemon)}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemonUtils.getFrontShinySprite(pokemon)}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemonUtils.getBackShinySprite(pokemon)}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export default PokemonDetailPage;
