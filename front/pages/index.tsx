import Head from "next/head";
import LandingPage from "./landingPage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Monggeul!</title>
        <meta name="description" content="Monggeul! Monggeul!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingPage />
    </>
  );
}
