import Head from "next/head";
import React, { useState } from "react";

// import { actionChangeAppSound } from "@/modules/settings";

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <button onClick={() => actionChangeAppSound({ soundSelected: "HAT001002" })}>Click</button> */}
    </React.Fragment>
  );
}
