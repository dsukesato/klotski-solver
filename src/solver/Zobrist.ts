import Block from './types/Block';
import Board from './types/Board';
import Cell from './types/Cell';
import Move from './types/Move';

export class Zobrist {
  readonly randoms: number[];
  readonly hashes: Set<number>;

  constructor() {
    // init random_table
    this.randoms = [...Array(80).keys()].map(_ =>
      parseInt((Math.random() * Math.pow(2, 32)) as any)
    );
    this.hashes = new Set();
  }

  // cellの座標とblockのtypeを引数として受け取り、
  // 配列ramdoms[]の添字（どこにランダム生成した値が格納されているか）を返すメソッド
  getRandomsIndex(cell: Cell, block: Block): number {
    const block_index = {
      dot: 0,
      horizontal: 1,
      vertical: 2,
      target: 3,
    }[block.type];
    const cell_index = cell.y * Board.WIDTH + cell.x;

    return cell_index * 4 + block_index;
  }

  // boardのデータを引数として受け取り、そのデータを表すハッシュ値を返すメソッド
  // 最初の一回のみ使用する
  registerBoard(board: Board): number {
    let hash = 0;
    board.forEachBlock(
      (block, cell) => (hash ^= this.randoms[this.getRandomsIndex(cell, block)])
    );
    this.hashes.add(hash);
    return hash;
  }

  registerMovedBoard(
    pre_hash: number,
    board: Board,
    move: Move
  ): number | undefined {
    const block = board.getBlock(move.ancher);
    if (block === undefined) return undefined;
    const current_cell = move.ancher;
    const destination_cell = current_cell.add(move.direction);
    const hash =
      pre_hash ^
      this.randoms[this.getRandomsIndex(current_cell, block)] ^
      this.randoms[this.getRandomsIndex(destination_cell, block)];
    this.hashes.add(hash);
    return hash;
  }

  has(hash: number): boolean {
    return this.hashes.has(hash);
  }
}

export default Zobrist;
