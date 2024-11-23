import React from 'react';
import { isFragment } from 'react-is';

export const traverseReactNode = (children: React.ReactNode, fn: (child: React.ReactNode, index: number) => void) => {
  const handle = (target: React.ReactNode) => {
    let i = 0;
    React.Children.forEach(target, (child) => {
      if (!isFragment(child)) {
        fn(child, i);
        i++;
      } else {
        handle(child.props.children);
      }
    });
  };

  handle(children);
};
