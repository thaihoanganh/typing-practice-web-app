import React from "react";

export const LayoutContent: React.FC = ({ children }) => {
  return <div className="flex-grow w-full desktop:w-960 h-full mx-auto">{children}</div>;
};

export default LayoutContent;
