"use client";
import React from "react";
import { rectSortingStrategy } from "@dnd-kit/sortable";
import Sortable from "./Sortable";
import { GridContainer } from "./Grid/GridContainer";
import { Props as SortableProps } from "./types";
import { masterItems } from "./data";

const props: Partial<SortableProps> = {
  adjustScale: true,
  Container: (props: any) => <GridContainer {...props} columns={5} />,
  strategy: rectSortingStrategy,
  wrapperStyle: () => ({
    width: 140,
    height: 140,
  }),
};

const LargeFirstTile = () => (
  <>
  <Sortable
    {...props}
    dataItems={masterItems}
    // renderItem={renderItem}
    getItemStyles={({ index }) => {
      if (index === 0) {
        return {
          fontSize: "2rem",
          // padding: "36px 40px",
          backgroundColor: "blue",
        };
      }

      return {};
    }}
    wrapperStyle={({ index }) => {
      if (index === 0) {
        return {
          // height: 288,
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

export default LargeFirstTile;

const items = [1, 2, 3, 4, 5, 6,7,8,9,10,11,12];
