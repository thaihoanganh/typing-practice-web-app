import React from "react";
import Grid from "@/components/atoms/Grid";

export interface MainLayoutProps {
  header: React.ReactNode;
  content: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ header, content }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Grid className="h-14 border-b" color="primary" bordered>
        <div className="w-full desktop:w-960 h-full mx-auto">{header}</div>
      </Grid>
      <div className="flex-grow w-full desktop:w-960 h-full mx-auto">{content}</div>
    </div>
  );
};

export default MainLayout;
