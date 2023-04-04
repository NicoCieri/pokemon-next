import NextLink from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Navbar as NavbarComponent, Text, Link, Grid } from "@nextui-org/react";

const Navbar = () => {
  return (
    <div>
      <NavbarComponent variant="static" isBordered>
        <NavbarComponent.Brand>
          <NextLink href="/" legacyBehavior>
            <Link>
              {/* <Grid css={{ display: "flex" }} alignItems="center"> */}
              <Image
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
                alt="Icono de la app"
                width={70}
                height={70}
              />
              <Text h2 css={{ marginBottom: 0 }}>
                P
              </Text>
              <Text h3 css={{ marginBottom: 0 }}>
                okémon
              </Text>
              {/* </Grid> */}
            </Link>
          </NextLink>
        </NavbarComponent.Brand>

        <NavbarComponent.Content>
          <NextLink href="/favorites" legacyBehavior>
            <NavbarComponent.Link>Favoritos</NavbarComponent.Link>
          </NextLink>
        </NavbarComponent.Content>
      </NavbarComponent>
    </div>
  );
};

// export default Navbar;
export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
