import React from 'react';
import {rectSortingStrategy} from '@dnd-kit/sortable';
import {Sortable, Props as SortableProps} from './Sortable/Sortable';
import { GridContainer } from './Grid/GridContainer';

const props: Partial<SortableProps> = {
  adjustScale: true,
  Container: (props: any) => <GridContainer {...props} columns={5} />,
  strategy: rectSortingStrategy,
  wrapperStyle: () => ({
    width: 140,
    height: 140,
  }),
};

export const LargeFirstTile = () => (
  <Sortable
    {...props}
    getItemStyles={({index}) => {
      if (index === 0) {
        return {
          fontSize: '2rem',
          padding: '36px 40px',
        };
      }

      return {};
    }}
    wrapperStyle={({index}) => {
      if (index === 0) {
        return {
          height: 288,
          gridRowStart: 'span 2',
          gridColumnStart: 'span 2',
        };
      }

      return {
        width: 140,
        height: 140,
      };
    }}
  />
);
