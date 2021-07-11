import React from "react";

import Grid from "@/components/atoms/Grid";

export const LayoutHeader: React.FC = ({ children }) => {
  return (
    <Grid className="h-14 border-b" color="primary" bordered>
      <div className="w-full desktop:w-960 h-full mx-auto">{children}</div>
    </Grid>
  );
};

export default LayoutHeader;
