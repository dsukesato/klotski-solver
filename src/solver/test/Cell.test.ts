import Cell from '../types/Cell';
import { expectSameCell } from './utils';

describe('Cell', () => {
  test('basics', () => {
    const cell = new Cell(1, 2);
    expect(cell.x).toBe(1);
    expect(cell.y).toBe(2);
  });

  test('methods', () => {
    const cell = new Cell(1, 2);

    expectSameCell(cell.add(new Cell(1, 2)), new Cell(2, 4));

    expectSameCell(cell.scalar_mul(1.5), new Cell(1.5, 3));

    expectSameCell(cell.upper(), new Cell(1, 1));
    expectSameCell(cell.upper(1.5), new Cell(1, 0.5));

    expectSameCell(cell.downer(), new Cell(1, 3));
    expectSameCell(cell.downer(1.5), new Cell(1, 3.5));

    expectSameCell(cell.left(), new Cell(0, 2));
    expectSameCell(cell.left(1.5), new Cell(-0.5, 2));

    expectSameCell(cell.right(), new Cell(2, 2));
    expectSameCell(cell.right(1.5), new Cell(2.5, 2));

    expect(cell.equals(new Cell(1, 2))).toBe(true);
    expect(cell.equals(new Cell(2, 2))).toBe(false);
  });

  test('immutable', () => {
    const cell1 = new Cell(1, 2);
    const cell2 = cell1.add(new Cell(1, 1));
    const cell3 = cell1.scalar_mul(2);
    const cell4 = cell1.upper();

    expect(Object.is(cell1, cell2)).not.toBe(true);
    expect(Object.is(cell1, cell3)).not.toBe(true);
    expect(Object.is(cell1, cell4)).not.toBe(true);
  });
});
