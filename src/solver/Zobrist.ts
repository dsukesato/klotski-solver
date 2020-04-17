import Block from './types/Block';
import Board from './types/Board';
import Move from './types/Move';

export class Zobrist {
  readonly randoms: number[];
  readonly hashes: Set<number>;

  constructor() {
    // init random_table
    this.randoms = [...Array(80).keys()].map((_) =>
      parseInt((Math.random() * Math.pow(2, 32)) as any)
    );
    this.hashes = new Set();
  }

  // cellの座標とblockのtypeを引数として受け取り、
  // 配列ramdoms[]の添字（どこにランダム生成した値が格納されているか）を返すメソッド
  getRandomsIndex(block: Block): number {
    const block_index = {
      dot: 0,
      horizontal: 1,
      vertical: 2,
      target: 3,
    }[block.type];
    const cell_index = block.ancher.y * Board.WIDTH + block.ancher.x;

    return cell_index * 4 + block_index;
  }

  // boardのデータを引数として受け取り、そのデータを表すハッシュ値を返すメソッド
  // 最初の一回のみ使用する
  registerBoard(board: Board): number {
    let hash = 0;
    board.forEachBlock((block) => {
      hash ^= this.randoms[this.getRandomsIndex(block)];
    });
    this.hashes.add(hash);
    return hash;
  }

  registerMovedBoard(pre_hash: number, move: Move): number | undefined {
    const current_block = move.block;
    if (current_block === undefined) return undefined;
    const moved_block: Block = {
      ...current_block,
      ancher: current_block.ancher.add(move.direction),
    };
    const hash =
      pre_hash ^
      this.randoms[this.getRandomsIndex(current_block)] ^
      this.randoms[this.getRandomsIndex(moved_block)];

    this.hashes.add(hash);
    return hash;
  }

  has(hash: number): boolean {
    return this.hashes.has(hash);
  }
}

export default Zobrist;
