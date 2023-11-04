"use client";
import React, { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./Item.module.css";
import Image from "next/image";
import { ItemProps } from "../types";
import { useProductContext } from "@/components/context/product-provider";

const Item = React.memo(
  React.forwardRef<HTMLDivElement, ItemProps>(
    (
      {
        color,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        handle,
        handleProps,
        height,
        index,
        listeners,
        onRemove,
        renderItem,
        sorting,
        style,
        transition,
        transform,
        value,
        wrapperStyle,
        ...props
      },
      ref
    ) => {
      // Drag Overlay Effect
      useEffect(() => {
        if (!dragOverlay) {
          return;
        }

        document.body.style.cursor = "grabbing";

        return () => {
          document.body.style.cursor = "";
        };
      }, [dragOverlay]);

      //  Product Context
      const { selectedCheckboxes, toggleCheckbox } = useProductContext();

      return renderItem ? (
        renderItem({
          dragOverlay: Boolean(dragOverlay),
          dragging: Boolean(dragging),
          sorting: Boolean(sorting),
          index,
          fadeIn: Boolean(fadeIn),
          listeners,
          ref,
          style,
          transform,
          transition,
          value,
        })
      ) : (
        <div
          className={classNames(
            styles.Wrapper,
            fadeIn && styles.fadeIn,
            sorting && styles.sorting,
            dragOverlay && styles.dragOverlay
          )}
          style={
            {
              ...wrapperStyle,
              transition: [transition, wrapperStyle?.transition]
                .filter(Boolean)
                .join(", "),
              "--translate-x": transform
                ? `${Math.round(transform.x)}px`
                : undefined,
              "--translate-y": transform
                ? `${Math.round(transform.y)}px`
                : undefined,
              "--scale-x": transform?.scaleX
                ? `${transform.scaleX}`
                : undefined,
              "--scale-y": transform?.scaleY
                ? `${transform.scaleY}`
                : undefined,
              "--index": index,
              "--color": color,
            } as React.CSSProperties
          }
          ref={ref}
        >
          <div
            className={`w-full h-full relative flex grow ${classNames(
              dragging && styles.dragging,
              handle && styles.withHandle,
              dragOverlay && styles.dragOverlay,
              disabled && styles.disabled,
              color && styles.color
            )}`}
            style={style}
            {...(!handle ? listeners : undefined)}
            {...props}
            tabIndex={!handle ? 0 : undefined}
          >
            {/* Product Card Here */}
            <div className="w-full h-full relative group bg-white border border-gray-500 rounded-xl">
              <Image
                src={`${value?.image}`}
                alt={`${value?.name} Image`}
                width={200}
                height={200}
                priority={true}
                className="w-full h-full object-cover object-center rounded-xl"
              />

              {/* Card Overlay for checkbox */}
              {!dragging && !dragOverlay && (
                <div
                  className={`absolute left-0 right-0 top-0 bottom-0 group-hover:visible  
                  group-hover:opacity-100 transition-opacity rounded-xl duration-500 ease-in-out 
                   ${
                     selectedCheckboxes.includes(value.id)
                       ? "bg-custom visible opacity-100"
                       : "bg-custom invisible opacity-0"
                   }`}
                >
                  <input
                    type="checkbox"
                    className="w-3 md:w-5 h-3 md:h-5 ml-3 md:ml-5 mt-3 md:mt-5"
                    checked={selectedCheckboxes.includes(value.id)}
                    onChange={() => toggleCheckbox(value.id)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
  )
);

export default Item;
