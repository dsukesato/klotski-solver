import { Cell } from './Cell';
import Block from './Block';

type Vector = Cell;
export type Move = {
  block: Block;
  direction: Vector;
};

export default Move;
