import { areConnectedCells, calculatePossibleMoves } from '../BFS';
import Cell from '../types/Cell';
import { questions, possible_moves } from '../sample-data';
import Move from '../types/Move';
import { getMoveId, expectSameMove } from './utils';
const zip = require('array-zip');

describe('BFS', () => {
  test('areConnectedCells', () => {
    expect(areConnectedCells(new Cell(0, 0), new Cell(0, 1))).toBe('vartical');
    expect(areConnectedCells(new Cell(0, 0), new Cell(1, 0))).toBe(
      'horizontal'
    );
    expect(areConnectedCells(new Cell(0, 0), new Cell(1, 1))).toBe(false);
    expect(areConnectedCells(new Cell(0, 0), new Cell(3, 0))).toBe(false);
    expect(areConnectedCells(new Cell(2, 2), new Cell(1, 2))).toBe(
      'horizontal'
    );
    expect(areConnectedCells(new Cell(2, 3), new Cell(2, 2))).toBe('vartical');
    expect(areConnectedCells(new Cell(3, 4), new Cell(3, 3))).toBe('vartical');
    expect(areConnectedCells(new Cell(3, 4), new Cell(2, 4))).toBe(
      'horizontal'
    );
    expect(areConnectedCells(new Cell(3, 4), new Cell(3, 0))).toBe(false);
    expect(areConnectedCells(new Cell(3, 4), new Cell(0, 4))).toBe(false);
  });

  test('calculatePossibleMoves', () => {
    const compareMove = (x: Move, y: Move): number =>
      getMoveId(x) - getMoveId(y);

    const expectSameMoves = (x: Move[], y: Move[]): void => {
      const sorted_x = x.sort(compareMove);
      const sorted_y = y.sort(compareMove);
      expect(sorted_x.length).toBe(sorted_y.length);
      (zip(sorted_x, sorted_y) as [Move, Move][]).forEach(([x, y]) =>
        expectSameMove(x, y)
      );
    };

    expectSameMoves(
      calculatePossibleMoves(questions.basic1),
      possible_moves.basic1
    );
    expectSameMoves(
      calculatePossibleMoves(questions.easy1),
      possible_moves.easy1
    );
    expectSameMoves(
      calculatePossibleMoves(questions.hard1),
      possible_moves.hard1
    );
    expectSameMoves(
      calculatePossibleMoves(questions.impossible1),
      possible_moves.impossible1
    );
  });
});
