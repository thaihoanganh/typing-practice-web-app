import React from "react";

export const Layout: React.FC = ({ children }) => {
  return <div className="flex flex-col min-h-screen">{children}</div>;
};

export default Layout;
