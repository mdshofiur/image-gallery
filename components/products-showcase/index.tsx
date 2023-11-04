"use client";
import React, {Fragment } from "react";
import { rectSortingStrategy } from "@dnd-kit/sortable";
import Sortable from "./Sortable";
import { GridContainer } from "./Grid/GridContainer";
import { Props as SortableProps } from "./types";
import { useProductContext } from "../context/product-provider";

const props: Partial<SortableProps> = {
  adjustScale: true,
  Container: (props: any) => <GridContainer {...props} columns={5} />,
  strategy: rectSortingStrategy,
  wrapperStyle: () => ({}),
};

export default function ProductsShowcase() {
  const { products, handleDeleteSelected } = useProductContext();


  return (
    <Fragment>
      {/* Header here */}
      <section className="flex items-center justify-between py-10">
        <h3 className="text-3xl font-bold">Products</h3>
        <button
          className="px-3 py-2 text-sm text-white bg-red-500 rounded hover:bg-opacity-60 transition-all"
          onClick={handleDeleteSelected}
        >
          Delete
        </button>
      </section>
      {/* Sortable  */}
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
    </Fragment>
  );
}
