import Head from "next/head";

import Setting from "@/containers/setting";
import React from "react";

const SettingPage: React.FC = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Cài đặt</title>
      </Head>
      <div className="m-lg">
        <Setting />
      </div>
    </React.Fragment>
  );
};

export default SettingPage;
