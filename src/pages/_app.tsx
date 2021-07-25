import "../../public/styles/global.css";
import type { AppProps } from "next/app";

import { UserProvider } from "@/modules/user/providers";
import MainLayout from "@/components/templates/MainLayout";
import Header from "@/containers/Header";

const AppWrapper = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider>
      <MainLayout header={<Header />} content={<Component {...pageProps} />} />
    </UserProvider>
  );
};

export default AppWrapper;
