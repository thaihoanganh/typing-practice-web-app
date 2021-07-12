import React from "react";
import classNames from "classnames";

import Grid from "@/components/atoms/Grid";
import Text from "@/components/atoms/Text";

export interface ListItemProps {
  className?: string;
  bordered?: boolean;
  description?: string;
  icon?: React.ReactNode;
  title: string;
}

export const ListItem: React.FC<ListItemProps> = ({
  className,
  children,
  bordered,
  icon,
  title,
  description,
}) => {
  return (
    <Grid as="li" className={classNames("flex h-12", className)} bordered={bordered}>
      <div className="flex items-center justify-center w-12 h-full">{icon}</div>
      <div className="flex flex-col justify-center flex-grow h-full">
        <Text variant="headline-3">{title}</Text>
        <Text variant="caption">{description}</Text>
      </div>
      <div className="flex items-center px-md">{children}</div>
    </Grid>
  );
};

export default ListItem;
