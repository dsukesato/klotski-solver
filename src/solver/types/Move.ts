import { Cell } from './Cell';
import Block from './Block';

type Vector = Cell;
export type Move = {
  block: Block; // block is coordinates(座標) before movement
  direction: Vector;
};

export default Move;
