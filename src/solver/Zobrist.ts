import { Cell, Block, Board, Move } from './types';

export class Zobrist {
  readonly randoms: number[];
  readonly hashes: Set<number>;

  constructor() {
    // init random_table
    this.randoms = [];
    this.hashes = new Set();
  }

  getRandomsIndex(cell: Cell, block: Block): number {
    return 0;
  }

  registerBoard(board: Board): number {
    return 0;
  }

  registerMovedBoard(pre_hash: number, move: Move): number {
    return 0;
  }

  has(hash: number): boolean {
    return false;
  }
}

export default Zobrist;
