import { Cell } from './Cell';

//blocks
export type BlockDot = {
  type: 'dot';
  ancher: Cell;
};
export type BlockHorizontal = {
  type: 'horizontal';
  ancher: Cell;
};
export type BlockVertical = {
  type: 'vertical';
  ancher: Cell;
};
export type BlockTarget = {
  type: 'target';
  ancher: Cell;
};

export type Block = BlockDot | BlockHorizontal | BlockVertical | BlockTarget;

export default Block;
