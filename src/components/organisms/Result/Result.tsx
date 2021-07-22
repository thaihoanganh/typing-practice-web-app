import React from "react";
import classNames from "classnames";

import Grid from "@/components/atoms/Grid";
import Text from "@/components/atoms/Text";

export interface ResultProps {
  isLoading?: boolean;
  value: string;
  ratio: number;
  title: string;
}

export const Result: React.FC<ResultProps> = ({ isLoading, value, ratio, title }) => {
  return (
    <Grid
      className="desktop:flex-grow my-sm desktop:my-0 desktop:mx-md first:ml-0 last:mr-0 p-sm border rounded"
      bordered
    >
      <div className="flex mb-sm">
        <div className="flex-grow">
          <Text variant="subtitle-2">{title}</Text>
        </div>
        <div className="ml-sm">
          <Text variant="subtitle-2">{!isLoading && value}</Text>
        </div>
      </div>
      <Grid
        className={classNames("rounded", isLoading ? "bg-opacity-36 animate-pulse" : "bg-opacity-12")}
        color="contrast"
      >
        <Grid
          style={{ width: `${isLoading ? 0 : ratio * 100}%` }}
          className={classNames("h-1 rounded duration-500")}
          color="contrast"
        />
      </Grid>
    </Grid>
  );
};

export default Result;
