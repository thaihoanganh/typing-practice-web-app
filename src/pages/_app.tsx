import "../../public/styles/global.css";
import type { AppProps } from "next/app";

import { UserProvider } from "@/modules/user/providers";
import { SettingProvider } from "@/modules/setting/providers";
import MainLayout from "@/components/templates/MainLayout";
import Header from "@/containers/Header";

const AppWrapper = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider>
      <SettingProvider>
        <MainLayout header={<Header />} content={<Component {...pageProps} />} />
      </SettingProvider>
    </UserProvider>
  );
};

export default AppWrapper;
