"use client";
import React, { Fragment, useState, useEffect } from "react";
import { rectSortingStrategy } from "@dnd-kit/sortable";
import Sortable from "./sortable";
import { GridContainer } from "./grid/GridContainer";
import { Props as SortableProps } from "./types";
import { useProductContext } from "../../context/product-provider";
import {HeaderContents} from "./header-contents";

/* -------------------------------------------------------------------------- */
/*                                Initial Props                               */
/* -------------------------------------------------------------------------- */
const props: Partial<SortableProps> = {
  adjustScale: true,
  Container: (props: any) => <GridContainer {...props} columns={5} />,
  strategy: rectSortingStrategy,
  wrapperStyle: () => ({}),
};

export default function ProductsShowcase() {
  /* -------------------------------------------------------------------------- */
  /*                               Product Context                              */
  /* -------------------------------------------------------------------------- */
  const { products } = useProductContext();

  /* -------------------------------------------------------------------------- */
  /*                      Declare State For Hydration mismatch                  */
  /* -------------------------------------------------------------------------- */
  const [isClient, setIsClient] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                           Fix Hydration mismatch                           */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Fragment>
      {/* Page Header Component */}
      <HeaderContents />
      {/* Sortable Component  */}
      {isClient ? (
        <Sortable
          {...props}
          dataItems={products}
          getItemStyles={({ index }) => {
            if (index === 0) {
              return {
                fontSize: "2rem",
              };
            }
            return {};
          }}
          wrapperStyle={({ index }) => {
            if (index === 0) {
              return {
                gridRowStart: "span 2",
                gridColumnStart: "span 2",
              };
            }
            return {
              width: "100%",
              height: "100%",
            };
          }}
        />
      ) : null}
    </Fragment>
  );
}
