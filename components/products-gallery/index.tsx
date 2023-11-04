"use client";
import React, { Fragment, useState, useEffect } from "react";
import { rectSortingStrategy } from "@dnd-kit/sortable";
import Sortable from "./sortable";
import { GridContainer } from "./grid/GridContainer";
import { Props as SortableProps } from "./types";
import { useProductContext } from "../context/product-provider";

// Initial Props
const props: Partial<SortableProps> = {
  adjustScale: true,
  Container: (props: any) => <GridContainer {...props} columns={5} />,
  strategy: rectSortingStrategy,
  wrapperStyle: () => ({}),
};

export default function ProductsShowcase() {

  //  Product Context
  const { products, handleDeleteSelected, selectedCheckboxes } =
    useProductContext();

  // Declare State For Hydration mismatch
  const [isClient, setIsClient] = useState(false);

  // Fix Hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Fragment>
      {/* Header here */}
      <section className="flex items-center justify-between pb-10">
        <h3 className="text-2xl font-bold capitalize">
          {selectedCheckboxes.length > 0
            ? `${selectedCheckboxes.length} Files Selected`
            : "Gallery"}
        </h3>
        <button
          className="px-3 py-2 text-sm text-white bg-red-500 rounded hover:bg-opacity-60 transition-all"
          onClick={handleDeleteSelected}
        >
          Delete Files
        </button>
      </section>
      {/* Sortable  */}
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
