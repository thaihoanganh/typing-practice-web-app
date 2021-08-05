import "../../public/styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";

import MainLayout from "@/components/templates/MainLayout";
import Header from "@/containers/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <MainLayout header={<Header />} content={<Component {...pageProps} />} />
    </React.Fragment>
  );
}
export default MyApp;
