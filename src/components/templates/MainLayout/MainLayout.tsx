import React from "react";
import classes from "./style.module.css";

export interface MainLayoutProps {
  header: React.ReactNode;
  content: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ header, content }) => {
  return (
    <div className="min-h-screen bg-secondary">
      <div className={classes.header}>
        <div className="desktop:w-960 h-full mx-auto">{header}</div>
      </div>
      <div className={classes.content}>
        <div className="desktop:w-960 mx-auto">{content}</div>
      </div>
    </div>
  );
};

export default MainLayout;
