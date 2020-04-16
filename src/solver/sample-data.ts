import Board from './types/Board';
import Cell from './types/Cell';

export const questions = {
  basic1: new Board({
    blocks: [
      { type: 'dot', ancher: new Cell(0, 4) },
      { type: 'dot', ancher: new Cell(1, 3) },
      { type: 'dot', ancher: new Cell(2, 3) },
      { type: 'dot', ancher: new Cell(3, 4) },
      { type: 'horizontal', ancher: new Cell(1, 2) },
      { type: 'vertical', ancher: new Cell(0, 0) },
      { type: 'vertical', ancher: new Cell(0, 2) },
      { type: 'vertical', ancher: new Cell(3, 0) },
      { type: 'vertical', ancher: new Cell(3, 2) },
      { type: 'target', ancher: new Cell(1, 0) },
    ],
    blanks: [new Cell(1, 4), new Cell(2, 4)],
  }),
};
