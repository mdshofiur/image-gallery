import React, { forwardRef } from "react";
import classNames from "classnames";
import { ListProps } from "../types";

// eslint-disable-next-line react/display-name
export const List = forwardRef<HTMLDivElement, ListProps>(
  ({ children, columns = 1, horizontal, style }: ListProps, ref) => {
    return (
      <div
        ref={ref}
        style={
          {
            ...style,
            "--columns": columns,
          } as React.CSSProperties
        }
        className={classNames(horizontal)}
      >
        {children}
      </div>
    );
  }
);
