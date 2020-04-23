import { areConnectedCells, calculatePossibleMoves, BFS } from '../BFS';
import Cell from '../types/Cell';
import { questions, possible_moves } from '../sample-data';
import Move from '../types/Move';
import { getMoveId, expectSameMove } from './utils';
import Board from '../types/Board';
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
    expectSameMoves(
      calculatePossibleMoves(questions.easy2),
      possible_moves.easy2
    );
  });

  test('bfs', () => {
    const expectSolvingQuestion = (question: Board): void => {
      const answer = BFS(question);
      expect(answer).toBeInstanceOf(Array);
      if (!(answer instanceof Array)) return;

      expect(answer.length).not.toBe(0);
      const cell_to_string = (x: any) => `{x: ${x.x}, y: ${x.y}}`;
      const directionToString = (direction: Cell): String => {
        if (direction.x === 1) return 'RIGHT';
        if (direction.x === -1) return 'LEFT';
        if (direction.y === 1) return 'DOWN';
        if (direction.y === -1) return 'UP';
        return '';
      };
      console.log(
        answer.length,
        answer
          .map(
            (x) =>
              `[${x.block.type}] ${cell_to_string(
                x.block.ancher
              )} ${directionToString(x.direction)}`
          )
          .reduce((s, x) => `${s}\n${x}`)
      );

      let moved_board: Board = question;
      for (const move of answer) {
        moved_board = moved_board.moveBlock(move);
      }

      expect(moved_board.isSolved()).toBe(true);
    };

    expectSolvingQuestion(questions.basic1);
    expectSolvingQuestion(questions.easy1);
    expectSolvingQuestion(questions.easy1flipped);
    expectSolvingQuestion(questions.easy2);
    expectSolvingQuestion(questions.hard1);
    expectSolvingQuestion(questions.hard1flipped);
    expect(BFS(questions.impossible1)).toBe('no answer');

    const solved_moves = BFS(questions.solved1);
    expect(solved_moves).toBeInstanceOf(Array);
    if (!(solved_moves instanceof Array)) return;
    console.log(solved_moves);

    expect(solved_moves.length).toBe(0);
  });
});
