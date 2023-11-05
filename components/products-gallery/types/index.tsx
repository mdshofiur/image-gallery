import React, {ReactNode } from "react";
import {
  Active,
  CollisionDetection,
  DropAnimation,
  KeyboardCoordinateGetter,
  Modifiers,
  MeasuringConfiguration,
  PointerActivationConstraint,
  UniqueIdentifier,
  DraggableSyntheticListeners
} from "@dnd-kit/core";
import {
  arrayMove,
  SortingStrategy,
  AnimateLayoutChanges,
  NewIndexGetter,
} from "@dnd-kit/sortable";
import type { Transform } from "@dnd-kit/utilities";

/* -------------------------------------------------------------------------- */
/*               Props for the sortable list container component              */
/* -------------------------------------------------------------------------- */
export interface Props {
  activationConstraint?: PointerActivationConstraint;
  animateLayoutChanges?: AnimateLayoutChanges;
  adjustScale?: boolean;
  collisionDetection?: CollisionDetection;
  coordinateGetter?: KeyboardCoordinateGetter;
  Container?: any; // To-do: Fix me - Note: This property is marked as "To-do: Fix me," and may need further clarification or modification.
  dropAnimation?: DropAnimation | null;
  getNewIndex?: NewIndexGetter;
  handle?: boolean;
  itemCount?: number;
  dataItems?: any;
  measuring?: MeasuringConfiguration;
  modifiers?: Modifiers;
  renderItem?: any;
  removable?: boolean;
  reorderItems?: typeof arrayMove;
  strategy?: SortingStrategy;
  style?: React.CSSProperties;
  useDragOverlay?: boolean;
  getItemStyles?(args: {
    id: UniqueIdentifier;
    index: number;
    isSorting: boolean;
    isDragOverlay: boolean;
    overIndex: number;
    isDragging: boolean;
  }): React.CSSProperties;
  wrapperStyle?(args: {
    active: Pick<Active, "id"> | null;
    index: number;
    isDragging: boolean;
    id: UniqueIdentifier;
  }): React.CSSProperties;
  isDisabled?(id: UniqueIdentifier): boolean;
}

 /* -------------------------------------------------------------------------- */
 /*             Props for individual items within the sortable list            */
 /* -------------------------------------------------------------------------- */
export interface ItemProps {
  dragOverlay?: boolean;
  color?: string;
  disabled?: boolean;
  dragging?: boolean;
  handle?: boolean;
  handleProps?: any;
  height?: number;
  index?: number;
  fadeIn?: boolean;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  style?: React.CSSProperties;
  transition?: string | null;
  wrapperStyle?: React.CSSProperties;
  value: any;
  onRemove?(): void;
  renderItem?(args: {
    dragOverlay: boolean;
    dragging: boolean;
    sorting: boolean;
    index: number | undefined;
    fadeIn: boolean;
    listeners: DraggableSyntheticListeners;
    ref: React.Ref<HTMLElement>;
    style: React.CSSProperties | undefined;
    transform: ItemProps["transform"];
    transition: ItemProps["transition"];
    value: ItemProps["value"];
  }): React.ReactElement;
}

/* -------------------------------------------------------------------------- */
/*                     Props for individual sortable items                    */
/* -------------------------------------------------------------------------- */
export interface SortableItemProps {
  animateLayoutChanges?: AnimateLayoutChanges;
  disabled?: boolean;
  getNewIndex?: NewIndexGetter;
  itemData:any;
  index: number;
  handle: boolean;
  useDragOverlay?: boolean;
  onRemove?(id: UniqueIdentifier): void;
  style(values: any): React.CSSProperties;
  renderItem?(args: any): React.ReactElement;
  wrapperStyle: Props["wrapperStyle"];
}

/* -------------------------------------------------------------------------- */
/*                    Props for a grid container component                    */
/* -------------------------------------------------------------------------- */
export interface GridContainerProps {
  children: React.ReactNode;
  columns: number;
}

/* -------------------------------------------------------------------------- */
/*                        Props for a wrapper component                       */
/* -------------------------------------------------------------------------- */
export interface WrapperProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

/* -------------------------------------------------------------------------- */
/*                    Props for a list container component                    */
/* -------------------------------------------------------------------------- */
export interface ListProps {
  children: React.ReactNode;
  columns?: number;
  style?: React.CSSProperties;
  horizontal?: boolean;
}


/* -------------------------------------------------------------------------- */
/*                   Props for the ProductProvider component                  */
/* -------------------------------------------------------------------------- */
export interface ProductProviderProps {
  children: ReactNode;
}


 /* -------------------------------------------------------------------------- */
 /*              Represents a product with an ID, name, and image              */
 /* -------------------------------------------------------------------------- */
export interface Product {
  id: number;
  name: string;
  image: string;
}

/* -------------------------------------------------------------------------- */
/*       Context for managing a list of products and selected checkboxes      */
/* -------------------------------------------------------------------------- */
export interface ProductContextType {
  products: Product[];
  deleteProduct: (productId: number) => void;
  selectedCheckboxes: number[];
  toggleCheckbox: (productId: number) => void;
  handleDeleteSelected: () => void;
}


