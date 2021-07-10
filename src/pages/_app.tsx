import "../assets/styles/globals.css";
import type { AppProps } from "next/app";

const AppWrapper = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};
export default AppWrapper;
