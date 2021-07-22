import React from "react";

import Grid from "@/components/atoms/Grid";

export const TextDataWrapper: React.FC = ({ children }) => {
  return (
    <Grid style={{ height: 200 }} className="overflow-hidden relative m-lg border rounded font-roboto-mono" bordered>
      {children}
    </Grid>
  );
};

export default TextDataWrapper;
