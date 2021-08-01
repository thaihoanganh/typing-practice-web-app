import React from "react";

import { SoundSetting, LevelSetting } from ".";
import Grid from "@/components/atoms/Grid";
import Text from "@/components/atoms/Text";

const Setting: React.FC = () => {
  return (
    <Grid className="border rounded" bordered>
      <Grid className="p-md border-b" bordered>
        <Text variant="headline-3">Cài Đặt</Text>
      </Grid>
      <div>
        <div className="m-md">
          <Text variant="headline-3">Âm thanh</Text>
          <SoundSetting />
        </div>
      </div>
      <div className="m-md">
        <Text variant="headline-3">Cấp độ luyện tập</Text>
        <LevelSetting />
      </div>
    </Grid>
  );
};

export default Setting;
