import React from 'react';
import styles from './GridContainer.module.css';
import { GridContainerProps } from '../types';

export function GridContainer({children, columns}: GridContainerProps) {
  return (
    <div
      className={styles.GridContainer}
      style={
        {
          '--col-count': columns,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
