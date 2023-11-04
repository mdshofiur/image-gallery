"use client";
import React from "react";
import { rectSortingStrategy } from "@dnd-kit/sortable";
import Sortable from "./Sortable";
import { GridContainer } from "./Grid/GridContainer";
import { Props as SortableProps } from "./types";
import productsData from "./data/products.json";

const props: Partial<SortableProps> = {
  adjustScale: true,
  Container: (props: any) => <GridContainer {...props} columns={5} />,
  strategy: rectSortingStrategy,
  wrapperStyle: () => ({
    width: 140,
    height: 140,
  }),
};

const ProductsShowcase = () => (
  <>
    <Sortable
      {...props}
      dataItems={productsData}
      getItemStyles={({ index }) => {
        if (index === 0) {
          return {
            fontSize: "2rem",
            backgroundColor: "blue",
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
          backgroundColor: "red",
        };
      }}
    />
  </>
);

export default ProductsShowcase;
