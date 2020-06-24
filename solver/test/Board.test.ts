import { questions } from '../sample-data';
import Cell from '../types/Cell';
import Block from '../types/Block';
import {
  expectDifferentBoardInstance,
  expectSameBlock,
  expectSameBoard,
  expectSameBlanks,
  getBlockId,
} from './utils';
const zip = require('array-zip');

const basic1 = questions.basic1.clone();

describe('Board', () => {
  test('basics', () => {
    expect(basic1.blocks.length).toBe(10);
    expect(basic1.blanks.length).toBe(2);
    expect(
      basic1.board.reduce((s, x) => [...s, ...x]).filter((x) => x !== undefined)
        .length
    ).toBe(10);
    expect(basic1.board[2][1]?.type).toBe('horizontal');
    expect(basic1.board[2][1]?.ancher.x).toBe(1);
    expect(basic1.board[2][1]?.ancher.y).toBe(2);
  });

  test('clone', () => {
    const cloned = basic1.clone();
    const expectSameMaybeBlocks = (
      b1: Block | undefined,
      b2: Block | undefined
    ) => {
      expect(b1).not.toBe(undefined);
      expect(b2).not.toBe(undefined);
      if (b1 === undefined || b2 === undefined) return;
    };

    expectSameMaybeBlocks(
      basic1.getBlock(new Cell(0, 0)),
      cloned.getBlock(new Cell(0, 0))
    );
    expectSameMaybeBlocks(
      basic1.getBlock(new Cell(1, 0)),
      cloned.getBlock(new Cell(1, 0))
    );
    expectSameMaybeBlocks(
      basic1.getBlock(new Cell(1, 2)),
      cloned.getBlock(new Cell(1, 2))
    );
    expect(basic1.getBlock(new Cell(1, 1))).toBe(undefined);
    expect(cloned.getBlock(new Cell(1, 1))).toBe(undefined);

    expect(basic1.getBlankIndex(new Cell(1, 4))).toBe(
      cloned.getBlankIndex(new Cell(1, 4))
    );
    expect(basic1.getBlankIndex(new Cell(2, 4))).toBe(
      cloned.getBlankIndex(new Cell(2, 4))
    );

    expect(basic1.getBlankIndex(new Cell(3, 4))).toBe(-1);
    expect(cloned.getBlankIndex(new Cell(3, 4))).toBe(-1);
  });

  test('isValidCell', () => {
    expect(basic1.isValidCell(new Cell(0, 0))).toBe(true);
    expect(basic1.isValidCell(new Cell(3, 4))).toBe(true);
    expect(basic1.isValidCell(new Cell(-1, 0))).toBe(false);
    expect(basic1.isValidCell(new Cell(0, -1))).toBe(false);
    expect(basic1.isValidCell(new Cell(4, 4))).toBe(false);
    expect(basic1.isValidCell(new Cell(3, 5))).toBe(false);
  });

  test('isSolved', () => {
    expect(questions.basic1.isSolved()).toBe(false);
    expect(questions.easy1.isSolved()).toBe(false);
    expect(questions.easy1flipped.isSolved()).toBe(false);
    expect(questions.hard1.isSolved()).toBe(false);
    expect(questions.hard1flipped.isSolved()).toBe(false);
    expect(questions.impossible1.isSolved()).toBe(false);
    expect(questions.solved1.isSolved()).toBe(true);
  });

  test('getBlock', () => {
    expect(basic1.getBlock(new Cell(3, 0))?.type).toBe('vertical');
    expect(basic1.getBlock(new Cell(1, 0))?.type).toBe('target');
    expect(basic1.getBlock(new Cell(1, 2))?.type).toBe('horizontal');
    expect(basic1.getBlock(new Cell(3, 4))?.type).toBe('dot');
    expect(basic1.getBlock(new Cell(2, 4))).toBe(undefined);
  });

  test('getBlankIndex', () => {
    expect(basic1.getBlankIndex(new Cell(1, 4))).not.toBe(-1);
    expect(basic1.getBlankIndex(new Cell(2, 4))).not.toBe(-1);
    expect(basic1.getBlankIndex(new Cell(0, 0))).toBe(-1);
    expect(basic1.getBlankIndex(new Cell(3, 4))).toBe(-1);
  });

  test('moveBlock1', () => {
    const moved = basic1
      .moveBlock({
        block: { type: 'dot', ancher: new Cell(0, 4) },
        direction: Cell.RIGHT,
      })
      .moveBlock({
        block: { type: 'vertical', ancher: new Cell(0, 2) },
        direction: Cell.DOWN,
      })
      .moveBlock({
        block: { type: 'horizontal', ancher: new Cell(1, 2) },
        direction: Cell.LEFT,
      });

    expect(moved.getBlock(new Cell(1, 4))?.type).toBe('dot');
    expect(moved.getBlock(new Cell(0, 3))?.type).toBe('vertical');
    expect(moved.getBlock(new Cell(0, 2))?.type).toBe('horizontal');
    expect(moved.getBlankIndex(new Cell(2, 2))).not.toBe(-1);
    expect(moved.getBlankIndex(new Cell(2, 4))).not.toBe(-1);
    expect(moved.getBlankIndex(new Cell(1, 4))).toBe(-1);

    const moved_blocks = moved.blocks.sort(
      (x, y) => getBlockId(x) - getBlockId(y)
    );
    const moved_test_blocks = ([
      { type: 'dot', ancher: new Cell(1, 4) },
      { type: 'dot', ancher: new Cell(1, 3) },
      { type: 'dot', ancher: new Cell(2, 3) },
      { type: 'dot', ancher: new Cell(3, 4) },
      { type: 'horizontal', ancher: new Cell(0, 2) },
      { type: 'vertical', ancher: new Cell(0, 0) },
      { type: 'vertical', ancher: new Cell(0, 3) },
      { type: 'vertical', ancher: new Cell(3, 0) },
      { type: 'vertical', ancher: new Cell(3, 2) },
      { type: 'target', ancher: new Cell(1, 0) },
    ] as Block[]).sort((x, y) => getBlockId(x) - getBlockId(y));
    (zip(moved_blocks, moved_test_blocks) as [Block, Block][]).forEach(
      ([x, y]) => {
        expectSameBlock(x, y);
      }
    );
  });

  test('moveBlock2', () => {
    const moved = basic1
      .moveBlock({
        block: { type: 'dot', ancher: new Cell(1, 3) },
        direction: Cell.DOWN,
      })
      .moveBlock({
        block: { type: 'dot', ancher: new Cell(2, 3) },
        direction: Cell.DOWN,
      })
      .moveBlock({
        block: { type: 'horizontal', ancher: new Cell(1, 2) },
        direction: Cell.DOWN,
      })
      .moveBlock({
        block: { type: 'target', ancher: new Cell(1, 0) },
        direction: Cell.DOWN,
      });

    expect(moved.getBlock(new Cell(1, 4))?.type).toBe('dot');
    expect(moved.getBlock(new Cell(2, 4))?.type).toBe('dot');
    expect(moved.getBlock(new Cell(1, 3))?.type).toBe('horizontal');
    expect(moved.getBlock(new Cell(1, 1))?.type).toBe('target');
    expect(moved.getBlankIndex(new Cell(1, 0))).not.toBe(-1);
    expect(moved.getBlankIndex(new Cell(2, 0))).not.toBe(-1);
    expect(moved.getBlankIndex(new Cell(1, 4))).toBe(-1);

    const moved_blocks = moved.blocks.sort(
      (x, y) => getBlockId(x) - getBlockId(y)
    );
    const moved_test_blocks = ([
      { type: 'dot', ancher: new Cell(0, 4) },
      { type: 'dot', ancher: new Cell(1, 4) },
      { type: 'dot', ancher: new Cell(2, 4) },
      { type: 'dot', ancher: new Cell(3, 4) },
      { type: 'horizontal', ancher: new Cell(1, 3) },
      { type: 'vertical', ancher: new Cell(0, 0) },
      { type: 'vertical', ancher: new Cell(0, 2) },
      { type: 'vertical', ancher: new Cell(3, 0) },
      { type: 'vertical', ancher: new Cell(3, 2) },
      { type: 'target', ancher: new Cell(1, 1) },
    ] as Block[]).sort((x, y) => getBlockId(x) - getBlockId(y));
    (zip(moved_blocks, moved_test_blocks) as [Block, Block][]).forEach(
      ([x, y]) => {
        expectSameBlock(x, y);
      }
    );
  });

  test('getFlipped', () => {
    expectSameBoard(questions.easy1.getFlipped(), questions.easy1flipped);
    expectSameBoard(questions.hard1.getFlipped(), questions.hard1flipped);
  });

  test('calculateBlankCells', () => {
    expectSameBlanks(
      questions.basic1.calculateBlankCells(),
      questions.basic1.blanks
    );
    expectSameBlanks(
      questions.easy1.calculateBlankCells(),
      questions.easy1.blanks
    );
    expectSameBlanks(
      questions.hard1.calculateBlankCells(),
      questions.hard1.blanks
    );
    expectSameBlanks(
      questions.impossible1.calculateBlankCells(),
      questions.impossible1.blanks
    );
  });

  test('forEachBlock', () => {
    let blocks: Block[] = [];

    basic1.forEachBlock((block, i, array) => {
      const block_in_array = array[i];
      expect(block_in_array).not.toBe(undefined);
      if (block_in_array === undefined) return;

      expectSameBlock(block, block_in_array);

      const obtained_block = basic1.getBlock(block.ancher);

      expect(obtained_block).not.toBe(undefined);
      if (obtained_block === undefined) return;
      expectSameBlock(block, obtained_block);

      blocks.push(block);
    });

    expect(blocks.length).toBe(10);
  });

  test('immutable', () => {
    expectDifferentBoardInstance(basic1, basic1.clone());
    expectDifferentBoardInstance(
      basic1,
      basic1.moveBlock({
        block: {
          type: 'dot',
          ancher: new Cell(1, 3),
        },
        direction: Cell.DOWN,
      })
    );
    expectDifferentBoardInstance(basic1, basic1.getFlipped());
  });
});
