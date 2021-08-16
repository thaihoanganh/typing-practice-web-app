import "../../public/styles/globals.css";
import type { AppProps } from "next/app";
import { SettingsProvider } from "@/modules/settings";
import MainLayout from "@/components/templates/MainLayout";
import Header from "@/containers/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SettingsProvider>
      <MainLayout header={<Header />} content={<Component {...pageProps} />} />
    </SettingsProvider>
  );
}
export default MyApp;
