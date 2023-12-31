"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Announcements,
  closestCenter,
  DragOverlay,
  DndContext,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { List } from "../list";
import { Wrapper } from "../wrapper";
import Item from "../item";
import SortableItem from "../sortable-item";
import { Props } from "../types";
import { dropAnimationConfig, screenReaderInstructions } from "../others";

export default function Sortable({
  animateLayoutChanges,
  adjustScale = false,
  Container = List,
  collisionDetection = closestCenter,
  dropAnimation = dropAnimationConfig,
  getItemStyles = () => ({}),
  getNewIndex,
  handle = false,
  dataItems: initialItems,
  isDisabled = () => false,
  measuring,
  modifiers,
  removable,
  renderItem,
  reorderItems = arrayMove,
  strategy = rectSortingStrategy,
  style,
  useDragOverlay = true,
  wrapperStyle = () => ({}),
}: Props) {
  /* -------------------------------------------------------------------------- */
  /*                                Initial state                               */
  /* -------------------------------------------------------------------------- */
  const [items, setItems] = useState<UniqueIdentifier[]>(initialItems);

  /* -------------------------------------------------------------------------- */
  /*                               Active id Store                              */
  /* -------------------------------------------------------------------------- */
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  /* -------------------------------------------------------------------------- */
  /*                                   Sensors                                  */
  /* -------------------------------------------------------------------------- */
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  /* -------------------------------------------------------------------------- */
  /*                             First announcement                             */
  /* -------------------------------------------------------------------------- */
  const isFirstAnnouncement = useRef(true);

  /* -------------------------------------------------------------------------- */
  /*                             Determine the index                            */
  /* -------------------------------------------------------------------------- */
  const getIndex = (id: UniqueIdentifier) => {
    const foundItem = items.find((item: any) => item.id === id);
    return foundItem ? items.indexOf(foundItem) : -1;
  };

  /* -------------------------------------------------------------------------- */
  /*                           Determine the position                           */
  /* -------------------------------------------------------------------------- */
  const getPosition = (id: UniqueIdentifier) => getIndex(id) + 1;

  /* -------------------------------------------------------------------------- */
  /*                         Determine the active index                         */
  /* -------------------------------------------------------------------------- */
  const activeIndex = activeId ? getIndex(activeId) : -1;

  /* -------------------------------------------------------------------------- */
  /*                           Handle removal of items                          */
  /* -------------------------------------------------------------------------- */
  const handleRemove = removable
    ? (id: UniqueIdentifier) => {
        setItems((items) => items.filter((item: any) => item.id !== id));
      }
    : undefined;

  /* -------------------------------------------------------------------------- */
  /*                            Announcement messages                           */
  /* -------------------------------------------------------------------------- */
  const announcements: Announcements = {
    onDragStart({ active: { id } }) {
      return `Picked up sortable item ${String(
        id
      )}. Sortable item ${id} is in position ${getPosition(id)} of ${
        items.length
      }`;
    },
    onDragOver({ active, over }) {
      if (isFirstAnnouncement.current === true) {
        isFirstAnnouncement.current = false;
        return;
      }

      if (over) {
        return `Sortable item ${
          active.id
        } was moved into position ${getPosition(over.id)} of ${items.length}`;
      }

      return;
    },
    onDragEnd({ active, over }) {
      if (over) {
        return `Sortable item ${
          active.id
        } was dropped at position ${getPosition(over.id)} of ${items.length}`;
      }

      return;
    },
    onDragCancel({ active: { id } }) {
      return `Sorting was cancelled. Sortable item ${id} was dropped and returned to position ${getPosition(
        id
      )} of ${items.length}.`;
    },
  };

  /* -------------------------------------------------------------------------- */
  /*                        Reset the first announcement                        */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    if (!activeId) {
      isFirstAnnouncement.current = true;
    }
  }, [activeId]);

  /* -------------------------------------------------------------------------- */
  /*                               Reset the items                              */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  return (
    <DndContext
      accessibility={{
        announcements,
        screenReaderInstructions,
      }}
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={({ active }) => {
        if (!active) {
          return;
        }

        setActiveId(active.id);
      }}
      onDragEnd={({ over }) => {
        setActiveId(null);
        if (over) {
          const overIndex = getIndex(over.id);
          if (activeIndex !== overIndex) {
            setItems((items) => reorderItems(items, activeIndex, overIndex));
          }
        }
      }}
      onDragCancel={() => setActiveId(null)}
      measuring={measuring}
      modifiers={modifiers}
    >
      <Wrapper style={style}>
        <SortableContext items={items} strategy={strategy}>
          <Container>
            {items.map((value, index) => (
              <SortableItem
                key={index}
                itemData={value}
                handle={handle}
                index={index}
                style={getItemStyles}
                wrapperStyle={wrapperStyle}
                disabled={isDisabled(value)}
                renderItem={renderItem}
                onRemove={handleRemove}
                animateLayoutChanges={animateLayoutChanges}
                useDragOverlay={useDragOverlay}
                getNewIndex={getNewIndex}
              />
            ))}
          </Container>
        </SortableContext>
      </Wrapper>
      {useDragOverlay
        ? createPortal(
            <DragOverlay
              adjustScale={adjustScale}
              dropAnimation={dropAnimation}
            >
              {activeId ? (
                <Item
                  value={items[activeIndex]}
                  handle={handle}
                  renderItem={renderItem}
                  wrapperStyle={wrapperStyle({
                    active: { id: activeId },
                    index: activeIndex,
                    isDragging: true,
                    id: items[activeIndex],
                  })}
                  style={getItemStyles({
                    id: items[activeIndex],
                    index: activeIndex,
                    isSorting: activeId !== null,
                    isDragging: true,
                    overIndex: -1,
                    isDragOverlay: true,
                  })}
                  dragOverlay
                />
              ) : null}
            </DragOverlay>,
            document.body
          )
        : null}
    </DndContext>
  );
}
