import { questions } from '../sample-data';
import Cell from '../types/Cell';

const basic1 = questions.basic1.clone();
describe('Board', () => {
  test('basics', () => {
    expect(basic1.blocks.length).toBe(10);
    expect(basic1.blanks.length).toBe(2);
    expect(
      basic1.board.reduce((s, x) => [...s, ...x]).filter(x => x !== undefined)
        .length
    ).toBe(10);
    expect(basic1.board[2][1]?.type).toBe('horizontal');
    expect(basic1.board[2][1]?.ancher.x).toBe(1);
    expect(basic1.board[2][1]?.ancher.y).toBe(2);
  });

  test('clone', () => {
    const cloned = basic1.clone();
    expect(basic1.getBlock(new Cell(0, 0))).toBe(
      cloned.getBlock(new Cell(0, 0))
    );
    expect(basic1.getBlock(new Cell(1, 0))).toBe(
      cloned.getBlock(new Cell(1, 0))
    );
    expect(basic1.getBlock(new Cell(1, 2))).toBe(
      cloned.getBlock(new Cell(1, 2))
    );
    expect(basic1.getBlock(new Cell(1, 1))).toBe(
      cloned.getBlock(new Cell(1, 1))
    );
    expect(basic1.getBlankIndex(new Cell(1, 4))).toBe(
      cloned.getBlankIndex(new Cell(1, 4))
    );
    expect(basic1.getBlankIndex(new Cell(2, 4))).toBe(
      cloned.getBlankIndex(new Cell(2, 4))
    );
    expect(basic1.getBlankIndex(new Cell(3, 4))).toBe(
      cloned.getBlankIndex(new Cell(3, 4))
    );
  });

  test('isValidCell', () => {
    expect(basic1.isValidCell(new Cell(0, 0))).toBe(true);
    expect(basic1.isValidCell(new Cell(3, 4))).toBe(true);
    expect(basic1.isValidCell(new Cell(-1, 0))).toBe(false);
    expect(basic1.isValidCell(new Cell(0, -1))).toBe(false);
    expect(basic1.isValidCell(new Cell(4, 4))).toBe(false);
    expect(basic1.isValidCell(new Cell(3, 5))).toBe(false);
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

  test('forEachBlock', () => {});

  test('moveBlock1', () => {
    const moved = basic1
      .moveBlock({ ancher: new Cell(0, 4), direction: Cell.RIGHT })
      .moveBlock({ ancher: new Cell(0, 2), direction: Cell.DOWN })
      .moveBlock({ ancher: new Cell(1, 2), direction: Cell.LEFT });

    expect(moved.getBlock(new Cell(1, 4))?.type).toBe('dot');
    expect(moved.getBlock(new Cell(0, 3))?.type).toBe('vertical');
    expect(moved.getBlock(new Cell(0, 2))?.type).toBe('horizontal');
    expect(moved.getBlankIndex(new Cell(2, 2))).not.toBe(-1);
    expect(moved.getBlankIndex(new Cell(2, 4))).not.toBe(-1);
    expect(moved.getBlankIndex(new Cell(1, 4))).toBe(-1);
  });

  test('moveBlock2', () => {
    const moved = basic1
      .moveBlock({ ancher: new Cell(1, 3), direction: Cell.DOWN })
      .moveBlock({ ancher: new Cell(2, 3), direction: Cell.DOWN })
      .moveBlock({ ancher: new Cell(1, 2), direction: Cell.DOWN })
      .moveBlock({ ancher: new Cell(1, 0), direction: Cell.DOWN });

    expect(moved.getBlock(new Cell(1, 4))?.type).toBe('dot');
    expect(moved.getBlock(new Cell(2, 4))?.type).toBe('dot');
    expect(moved.getBlock(new Cell(1, 3))?.type).toBe('horizontal');
    expect(moved.getBlock(new Cell(1, 1))?.type).toBe('target');
    expect(moved.getBlankIndex(new Cell(1, 0))).not.toBe(-1);
    expect(moved.getBlankIndex(new Cell(2, 0))).not.toBe(-1);
    expect(moved.getBlankIndex(new Cell(1, 4))).toBe(-1);
  });

  test('immutable', () => {
    const cloned = basic1.clone();
    const moved = basic1.moveBlock({
      ancher: new Cell(1, 3),
      direction: Cell.DOWN,
    });

    expect(Object.is(basic1, cloned)).not.toBe(true);
    expect(Object.is(basic1.blocks, cloned.blocks)).not.toBe(true);
    expect(Object.is(basic1.board, cloned.board)).not.toBe(true);
    for (const [i, e] of Object.entries(basic1.board)) {
      expect(Object.is(e, cloned.board[parseInt(i)])).not.toBe(true);
    }
    expect(Object.is(basic1.blanks, cloned.blanks)).not.toBe(true);

    expect(Object.is(basic1, moved)).not.toBe(true);
    expect(Object.is(basic1.blocks, moved.blocks)).not.toBe(true);
    expect(Object.is(basic1.board, moved.board)).not.toBe(true);
    for (const [i, e] of Object.entries(basic1.board)) {
      expect(Object.is(e, moved.board[parseInt(i)])).not.toBe(true);
    }
    expect(Object.is(basic1.blanks, moved.blanks)).not.toBe(true);
  });
});
