import "../../public/styles/global.css";
import type { AppProps } from "next/app";

import { UserProvider } from "@/modules/user/providers";
import { SettingProvider } from "@/modules/setting";
import Layout, { LayoutContent, LayoutHeader } from "@/components/templates/Layout";
import Header from "@/containers/Header";

const AppWrapper = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider>
      <SettingProvider>
        <Layout>
          <LayoutHeader>
            <Header />
          </LayoutHeader>
          <LayoutContent>
            <Component {...pageProps} />
          </LayoutContent>
        </Layout>
      </SettingProvider>
    </UserProvider>
  );
};

export default AppWrapper;
