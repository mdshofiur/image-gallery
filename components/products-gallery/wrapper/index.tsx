import React from "react";
import { WrapperProps } from "../types";

/* -------------------------------------------------------------------------- */
/*                               Wrapper component                            */
/* -------------------------------------------------------------------------- */
export function Wrapper({ children, style }: WrapperProps) {
  return <div style={style}>{children}</div>;
}
