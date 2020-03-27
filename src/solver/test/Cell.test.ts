import { Cell } from '../types';

const cellExpectTobe = (cell1: Cell, cell2: Cell): void => {
  expect(cell1.x).toBe(cell2.x);
  expect(cell1.y).toBe(cell2.y);
};
describe('Cell', () => {
  test('basics', () => {
    const cell = new Cell(1, 2);
    expect(cell.x).toBe(1);
    expect(cell.y).toBe(2);
  });

  test('methods', () => {
    const cell = new Cell(1, 2);

    cellExpectTobe(cell.add(new Cell(1, 2)), new Cell(2, 4));

    cellExpectTobe(cell.scalar_mul(1.5), new Cell(1.5, 3));

    cellExpectTobe(cell.upper(), new Cell(1, 1));
    cellExpectTobe(cell.upper(1.5), new Cell(1, 0.5));

    cellExpectTobe(cell.downer(), new Cell(1, 3));
    cellExpectTobe(cell.downer(1.5), new Cell(1, 3.5));

    cellExpectTobe(cell.left(), new Cell(0, 2));
    cellExpectTobe(cell.left(1.5), new Cell(-0.5, 2));

    cellExpectTobe(cell.right(), new Cell(2, 2));
    cellExpectTobe(cell.right(1.5), new Cell(2.5, 2));

    expect(cell.equals(new Cell(1, 2))).toBe(true);
    expect(cell.equals(new Cell(2, 2))).toBe(false);
  });

  test('immutable', () => {
    const cell1 = new Cell(1, 2);
    const cell2 = cell1.add(new Cell(1, 1));
    const cell3 = cell1.scalar_mul(2);
    const cell4 = cell1.upper();

    expect(cell1).not.toBe(cell2);
    expect(cell1).not.toBe(cell3);
    expect(cell1).not.toBe(cell4);
  });
});
