import { Card, Dropdown, Grid, Row, Text } from "@nextui-org/react";
import { SmallPokemon } from "@/interfaces";
import { useRouter } from "next/router";

interface PokemonCardProps {
  pokemon: SmallPokemon;
  actionsOptions?: {
    actions: {
      label: string;
      color?:
        | "default"
        | "primary"
        | "secondary"
        | "success"
        | "warning"
        | "error";
    }[];
    onAction: (key: number | string) => void;
  };
}

export const PokemonCard = ({ pokemon, actionsOptions }: PokemonCardProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/name/${pokemon.name}`);
  };

  return (
    <Grid key={pokemon.id} xs={6} sm={3} md={2} xl={1}>
      <Card onPress={onClick} isHoverable isPressable>
        <Card.Header css={{ justifyContent: "flex-end", padding: 0 }}>
          {!!actionsOptions?.actions.length && (
            <Dropdown isBordered shouldCloseOnBlur>
              <Dropdown.Button color="default" light />
              <Dropdown.Menu
                aria-label="Static Actions"
                onAction={actionsOptions.onAction}
              >
                {actionsOptions.actions.map((action) => (
                  <Dropdown.Item
                    key={action.label}
                    color={action.color || "default"}
                  >
                    {action.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Card.Header>
        <Card.Body css={{ p: 10 }}>
          <Card.Image src={pokemon.img} width="100%" height={140} />
        </Card.Body>
        <Card.Footer>
          <Row justify="space-between">
            <Text transform="capitalize">{pokemon.name}</Text>
            <Text>#{pokemon.id}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
