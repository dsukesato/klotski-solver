import Cell from '../types/Cell';
import Block from '../types/Block';
import Board from '../types/Board';
import Move from '../types/Move';
const zip = require('array-zip');

export const getCellId = (cell: Cell): number => Board.WIDTH * cell.y + cell.x;
export const getBlockId = (block: Block): number => getCellId(block.ancher);
export const getDirectionId = (vector: Cell): number =>
  vector.y === -1
    ? 0
    : vector.x === 1
    ? 1
    : vector.y === 1
    ? 2
    : vector.x === -1
    ? 3
    : -1;
export const getMoveId = (move: Move): number =>
  getCellId(move.block.ancher) * 4 + getDirectionId(move.direction);

export const expectSameCell = (cell1: Cell, cell2: Cell): void => {
  expect(cell1.x).toBe(cell2.x);
  expect(cell1.y).toBe(cell2.y);
};
export const expectSameBlock = (x: Block, y: Block): void => {
  expect(x.type).toBe(y.type);
  expectSameCell(x.ancher, y.ancher);
};
export const expectSameMove = (x: Move, y: Move): void => {
  expectSameBlock(x.block, y.block);
  expectSameCell(x.direction, y.direction);
};

export const expectSameBlanks = (b1: Cell[], b2: Cell[]): void => {
  expect(b1.length).toBe(b2.length);
  const sorted_b1_blanks = b1.sort((x, y) => getCellId(x) - getCellId(y));
  const sorted_b2_blanks = b2.sort((x, y) => getCellId(x) - getCellId(y));
  (zip(sorted_b1_blanks, sorted_b2_blanks) as [Cell, Cell][]).forEach(
    ([x, y]) => {
      expectSameCell(x, y);
    }
  );
};

export const expectSameBoard = (b1: Board, b2: Board): void => {
  //board
  b1.board.forEach((array, y) => {
    array.forEach((b1_block, x) => {
      expect(b1_block).not.toBe(undefined);
      if (b1_block === undefined) return;

      const b2_block = b2.board[y][x];
      expect(b2_block).not.toBe(undefined);
      if (b2_block === undefined) return;

      expectSameBlock(b1_block, b2_block);
    });
  });

  //blocks
  const sorted_b1_blocks = b1.blocks.sort(
    (x, y) => getBlockId(x) - getBlockId(y)
  );
  const sorted_b2_blocks = b2.blocks.sort(
    (x, y) => getBlockId(x) - getBlockId(y)
  );
  (zip(sorted_b1_blocks, sorted_b2_blocks) as [Block, Block][]).forEach(
    ([x, y]) => {
      expectSameBlock(x, y);
    }
  );

  //blanks
  expectSameBlanks(b1.blanks, b2.blanks);
};

export const expectDifferentBoardInstance = (b1: Board, b2: Board): void => {
  expect(Object.is(b1, b2)).not.toBe(true);

  //blocks
  expect(Object.is(b1.blocks, b2.blocks)).not.toBe(true);
  b1.blocks.forEach((block) => {
    expect(b2.blocks.find((x) => Object.is(block, x))).toBe(undefined);
  });

  //board
  expect(Object.is(b1.board, b2.board)).not.toBe(true);
  for (const [y, array] of Object.entries(b1.board)) {
    expect(Object.is(array, b2.board[parseInt(y)])).not.toBe(true);

    for (const [x, block] of Object.entries(array)) {
      expect(Object.is(block, b2.board[parseInt(y)][parseInt(x)])).not.toBe(
        true
      );
    }
  }

  //blanks
  expect(Object.is(b1.blanks, b2.blanks)).not.toBe(true);
};
