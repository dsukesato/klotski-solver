import Board from './types/Board';
import Cell from './types/Cell';
import Move from './types/Move';

//see also: https://www.npmjs.com/package/klotski
export const questions = {
  //横刀立马 81moves
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
  //前呼后拥 22moves
  easy1: new Board({
    blocks: [
      { type: 'dot', ancher: new Cell(0, 0) },
      { type: 'dot', ancher: new Cell(1, 0) },
      { type: 'dot', ancher: new Cell(2, 4) },
      { type: 'dot', ancher: new Cell(3, 4) },
      { type: 'horizontal', ancher: new Cell(0, 1) },
      { type: 'horizontal', ancher: new Cell(0, 2) },
      { type: 'horizontal', ancher: new Cell(0, 3) },
      { type: 'horizontal', ancher: new Cell(2, 2) },
      { type: 'horizontal', ancher: new Cell(2, 3) },
      { type: 'target', ancher: new Cell(2, 0) },
    ],
    blanks: [new Cell(0, 4), new Cell(1, 4)],
  }),
  //前呼后拥 flipped 22moves
  easy1flipped: new Board({
    blocks: [
      { type: 'dot', ancher: new Cell(2, 0) },
      { type: 'dot', ancher: new Cell(3, 0) },
      { type: 'dot', ancher: new Cell(0, 4) },
      { type: 'dot', ancher: new Cell(1, 4) },
      { type: 'horizontal', ancher: new Cell(2, 1) },
      { type: 'horizontal', ancher: new Cell(0, 2) },
      { type: 'horizontal', ancher: new Cell(0, 3) },
      { type: 'horizontal', ancher: new Cell(2, 2) },
      { type: 'horizontal', ancher: new Cell(2, 3) },
      { type: 'target', ancher: new Cell(0, 0) },
    ],
    blanks: [new Cell(2, 4), new Cell(3, 4)],
  }),
  //峰回路转 140moves
  hard1: new Board({
    blocks: [
      { type: 'dot', ancher: new Cell(0, 0) },
      { type: 'dot', ancher: new Cell(1, 0) },
      { type: 'dot', ancher: new Cell(2, 0) },
      { type: 'dot', ancher: new Cell(1, 4) },
      { type: 'horizontal', ancher: new Cell(1, 3) },
      { type: 'horizontal', ancher: new Cell(2, 4) },
      { type: 'vertical', ancher: new Cell(3, 0) },
      { type: 'vertical', ancher: new Cell(2, 1) },
      { type: 'vertical', ancher: new Cell(3, 2) },
      { type: 'target', ancher: new Cell(0, 1) },
    ],
    blanks: [new Cell(0, 3), new Cell(0, 4)],
  }),
  //峰回路转 flipped 140moves
  hard1flipped: new Board({
    blocks: [
      { type: 'dot', ancher: new Cell(1, 0) },
      { type: 'dot', ancher: new Cell(2, 0) },
      { type: 'dot', ancher: new Cell(3, 0) },
      { type: 'dot', ancher: new Cell(2, 4) },
      { type: 'horizontal', ancher: new Cell(1, 3) },
      { type: 'horizontal', ancher: new Cell(0, 4) },
      { type: 'vertical', ancher: new Cell(0, 0) },
      { type: 'vertical', ancher: new Cell(1, 1) },
      { type: 'vertical', ancher: new Cell(0, 2) },
      { type: 'target', ancher: new Cell(2, 1) },
    ],
    blanks: [new Cell(3, 3), new Cell(3, 4)],
  }),
  //走投无路
  impossible1: new Board({
    blocks: [
      { type: 'dot', ancher: new Cell(2, 2) },
      { type: 'dot', ancher: new Cell(2, 3) },
      { type: 'dot', ancher: new Cell(0, 4) },
      { type: 'dot', ancher: new Cell(3, 4) },
      { type: 'vertical', ancher: new Cell(0, 0) },
      { type: 'vertical', ancher: new Cell(0, 2) },
      { type: 'vertical', ancher: new Cell(3, 0) },
      { type: 'vertical', ancher: new Cell(3, 2) },
      { type: 'target', ancher: new Cell(1, 0) },
    ],
    blanks: [new Cell(1, 4), new Cell(2, 4)],
  }),
};

export const possible_moves: {
  [key in 'basic1' | 'easy1' | 'hard1' | 'impossible1']: Move[];
} = {
  basic1: [
    {
      block: { type: 'dot' as const, ancher: new Cell(0, 4) },
      direction: Cell.RIGHT,
    },
    {
      block: { type: 'dot' as const, ancher: new Cell(1, 3) },
      direction: Cell.DOWN,
    },
    {
      block: { type: 'dot' as const, ancher: new Cell(2, 3) },
      direction: Cell.DOWN,
    },
    {
      block: { type: 'dot' as const, ancher: new Cell(3, 4) },
      direction: Cell.LEFT,
    },
  ],
  easy1: [
    {
      block: { type: 'vertical' as const, ancher: new Cell(0, 3) },
      direction: Cell.DOWN,
    },
    {
      block: { type: 'dot' as const, ancher: new Cell(2, 4) },
      direction: Cell.LEFT,
    },
  ],
  hard1: [
    {
      block: { type: 'horizontal' as const, ancher: new Cell(1, 3) },
      direction: Cell.LEFT,
    },
    {
      block: { type: 'dot' as const, ancher: new Cell(1, 4) },
      direction: Cell.LEFT,
    },
  ],
  impossible1: [
    {
      block: { type: 'dot' as const, ancher: new Cell(0, 4) },
      direction: Cell.RIGHT,
    },
    {
      block: { type: 'vertical' as const, ancher: new Cell(1, 2) },
      direction: Cell.DOWN,
    },
    {
      block: { type: 'dot' as const, ancher: new Cell(2, 3) },
      direction: Cell.DOWN,
    },
    {
      block: { type: 'dot' as const, ancher: new Cell(3, 4) },
      direction: Cell.LEFT,
    },
  ],
};
