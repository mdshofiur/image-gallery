import {
  DropAnimation,
  ScreenReaderInstructions,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";

/* -------------------------------------------------------------------------- */
/*                               Drop Animation                               */
/* -------------------------------------------------------------------------- */
export const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

/* -------------------------------------------------------------------------- */
/*                         Screen Reader Instructions                         */
/* -------------------------------------------------------------------------- */
export const screenReaderInstructions: ScreenReaderInstructions = {
  draggable: `
      To pick up a sortable item, press the space bar.
      While sorting, use the arrow keys to move the item.
      Press space again to drop the item in its new position, or press escape to cancel.
    `,
};
