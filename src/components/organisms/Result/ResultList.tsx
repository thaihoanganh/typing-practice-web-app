import React, { useState, useEffect, Children, isValidElement, cloneElement } from "react";

export interface ResultListProps {
  isLoading: boolean;
}

export const ResultList: React.FC<ResultListProps> = ({ isLoading, children }) => {
  const [state, setState] = useState(() => ({
    totalResults: Children.count(children),
  }));

  useEffect(() => {
    if (isLoading) {
    }
  }, [isLoading]);

  return (
    <div className="desktop:flex m-lg">
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            isLoading: isLoading,
          });
        }
      })}
    </div>
  );
};

export default ResultList;
