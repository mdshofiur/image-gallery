import { useSortable } from "@dnd-kit/sortable";
import Item from "../item";
import { SortableItemProps } from "../types";

export default function SortableItem({
  disabled,
  animateLayoutChanges,
  getNewIndex,
  handle,
  itemData,
  index,
  onRemove,
  style,
  renderItem,
  useDragOverlay,
  wrapperStyle,
}: SortableItemProps) {
  
   /* -------------------------------------------------------------------------- */
   /*                            Get id from item data                           */
   /* -------------------------------------------------------------------------- */
  const { id } = itemData;

   /* -------------------------------------------------------------------------- */
   /*                         Get props from useSortable                         */
   /* -------------------------------------------------------------------------- */
  const {
    active,
    attributes,
    isDragging,
    isSorting,
    listeners,
    overIndex,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    animateLayoutChanges,
    disabled,
    getNewIndex,
  });

  return (
    <Item
      ref={setNodeRef}
      value={itemData}
      disabled={disabled}
      dragging={isDragging}
      sorting={isSorting}
      handle={handle}
      handleProps={
        handle
          ? {
              ref: setActivatorNodeRef,
            }
          : undefined
      }
      renderItem={renderItem}
      index={index}
      style={style({
        index,
        id,
        isDragging,
        isSorting,
        overIndex,
      })}
      onRemove={onRemove ? () => onRemove(id) : undefined}
      transform={transform}
      transition={transition}
      wrapperStyle={wrapperStyle?.({ index, isDragging, active, id })}
      listeners={listeners}
      data-index={index}
      data-id={id}
      dragOverlay={!useDragOverlay && isDragging}
      {...attributes}
    />
  );
}
