import { Cell } from './Cell';

type Vector = Cell;
export type Move = {
  ancher: Cell;
  direction: Vector;
};

export default Move;
