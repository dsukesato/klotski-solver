import Zobrist from '../Zobrist';
import { questions } from '../sample-data';
import Cell from '../types/Cell';
import Block from '../types/Block';
import Move from '../types/Move';

const basic1 = questions.basic1.clone();

describe('Zobrist', () => {
  test('getRandomsIndex', () => {
    const zobrist = new Zobrist();
    expect(
      zobrist.getRandomsIndex({ type: 'dot', ancher: new Cell(0, 0) })
    ).toBe(0);
    expect(
      zobrist.getRandomsIndex({ type: 'horizontal', ancher: new Cell(2, 2) })
    ).toBe(41);
    expect(
      zobrist.getRandomsIndex({ type: 'vertical', ancher: new Cell(1, 3) })
    ).toBe(54);
    expect(
      zobrist.getRandomsIndex({ type: 'target', ancher: new Cell(3, 4) })
    ).toBe(79);
  });

  test('getHash', () => {
    const zobrist = new Zobrist();
    const b1 = basic1;
    const b2 = b1.moveBlock({
      block: { type: 'dot', ancher: new Cell(0, 4) },
      direction: Cell.RIGHT,
    });

    const b1_hash = zobrist.getHash(b1);
    const b2_hash = zobrist.getHash(b2);

    // this test maybe fail because Zobrist hash depends on random values.
    expect(b1_hash).not.toBe(b2_hash);
  });

  test('getMovedHash', () => {
    const move1: Move = {
      block: { type: 'dot', ancher: new Cell(3, 4) },
      direction: Cell.LEFT,
    };
    const move2: Move = {
      block: { type: 'vertical', ancher: new Cell(3, 2) },
      direction: Cell.DOWN,
    };
    const move3: Move = {
      block: { type: 'vertical', ancher: new Cell(3, 3) },
      direction: Cell.UP,
    };
    const move4: Move = {
      block: { type: 'dot', ancher: new Cell(2, 4) },
      direction: Cell.RIGHT,
    };

    const zobrist = new Zobrist();
    const hash1 = zobrist.getHash(basic1);

    const hash2 = zobrist.getMovedHash(hash1, move1);
    expect(hash2).not.toBe(undefined);
    if (hash2 === undefined) return;

    const hash3 = zobrist.getMovedHash(hash2, move2);
    expect(hash3).not.toBe(undefined);
    if (hash3 === undefined) return;

    const hash4 = zobrist.getMovedHash(hash3, move3);
    expect(hash4).not.toBe(undefined);
    if (hash4 === undefined) return;

    const hash5 = zobrist.getMovedHash(hash4, move4);
    expect(hash5).not.toBe(undefined);
    if (hash5 === undefined) return;

    expect(hash1).toBe(hash5);
    expect(hash2).toBe(hash4);
  });

  test('add and has', () => {
    const zobrist = new Zobrist();
    zobrist.add(88);
    zobrist.add(2);
    zobrist.add(99);
    zobrist.add(3.1415);
    zobrist.add(103.5);
    expect(zobrist.has(88)).toBe(true);
    expect(zobrist.has(2)).toBe(true);
    expect(zobrist.has(99)).toBe(true);
    expect(zobrist.has(3.1415)).toBe(true);
    expect(zobrist.has(103.5)).toBe(true);
  });
});
