import "../../public/styles/globals.css";
import type { AppProps } from "next/app";
import { SettingProvider } from "@/modules/setting";
import MainLayout from "@/components/templates/MainLayout";
import Header from "@/containers/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SettingProvider>
      <MainLayout header={<Header />} content={<Component {...pageProps} />} />
    </SettingProvider>
  );
}
export default MyApp;
