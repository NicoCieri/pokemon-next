import { FC, PropsWithChildren } from "react";
import Head from "next/head";
import { Navbar } from "../ui";

interface LayoutProps extends PropsWithChildren {
  title?: string;
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

export const Layout: FC<LayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title ? `Pokemons | ${title}` : "Pokemons"}</title>
        <meta name="author" content="Nicolas Cieri" />
        <meta name="description" content={`Info about ${title}`} />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />

        <meta property="og:title" content={`Info about ${title}`} />
        <meta
          property="og:description"
          content={`This is the page about ${title}`}
        />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>

      <Navbar />

      <main>{children}</main>
    </>
  );
};
