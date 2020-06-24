import { Block } from './Block';
import { Cell } from './Cell';
import { Move } from './Move';

type BoardType = (Block | undefined)[][];
type BlanksType = [Cell, Cell];
type BlocksType = Block[];
export class Board {
  static WIDTH: number = 4;
  static HEIGHT: number = 5;
  //board[y][x]
  readonly board: BoardType;
  readonly blocks: BlocksType;
  readonly blanks: BlanksType;

  constructor({
    blocks,
    blanks,
    board,
  }: {
    blocks: BlocksType;
    blanks: BlanksType;
    board?: BoardType;
  }) {
    this.blocks = blocks;
    this.blanks = blanks;

    if (board) {
      this.board = board;
    } else {
      this.board = [];
      for (let i = 0; i < Board.HEIGHT; i++) this.board[i] = [];
      blocks.forEach((block) => {
        this.board[block.ancher.y][block.ancher.x] = block;
      });
    }
  }

  clone() {
    return new Board({
      blocks: this.blocks.map((x) => Object.assign({}, x)),
      blanks: this.blanks.concat() as BlanksType,
    });
  }

  isValidCell(cell: Cell): boolean {
    return (
      cell.x >= 0 &&
      cell.x < Board.WIDTH &&
      cell.y >= 0 &&
      cell.y < Board.HEIGHT
    );
  }

  isSolved(): boolean {
    const block = this.getBlock(new Cell(1, 3));
    return block !== undefined && block.type === 'target';
  }

  getBlock(cell: Cell): Block | undefined {
    if (this.isValidCell(cell)) return this.board[cell.y][cell.x];
  }

  getBlankIndex(cell: Cell): number {
    return this.blanks.findIndex((x) => cell.equals(x));
  }

  moveBlock(move: Move): Board {
    const new_board = this.clone();
    new_board._bangMoveBlock(move);
    return new_board;
  }

  //make bang changes to member
  _bangMoveBlock(move: Move): void {
    const ancher = move.block.ancher;
    const block = this.getBlock(ancher);
    if (block === undefined) return;

    //move blanks
    switch (block.type) {
      case 'dot':
        const target_blank_index = this.getBlankIndex(
          ancher.add(move.direction)
        );
        this.blanks[target_blank_index] = ancher;
        break;
      case 'horizontal':
        if (move.direction.x === -1) {
          //left
          const target_blank_index = this.getBlankIndex(ancher.left());
          this.blanks[target_blank_index] = ancher.right();
        } else if (move.direction.x === 1) {
          //right
          const target_blank_index = this.getBlankIndex(ancher.right(2));
          this.blanks[target_blank_index] = ancher;
        } else {
          //up
          //down
          this.blanks[0] = ancher;
          this.blanks[1] = this.blanks[0].right();
        }
        break;
      case 'vertical':
        if (move.direction.y === -1) {
          //up
          const target_blank_index = this.getBlankIndex(ancher.upper());
          this.blanks[target_blank_index] = ancher.downer();
        } else if (move.direction.y === 1) {
          //down
          const target_blank_index = this.getBlankIndex(ancher.downer(2));
          this.blanks[target_blank_index] = ancher;
        } else if (move.direction.x === -1) {
          //left
          this.blanks[0] = ancher;
          this.blanks[1] = this.blanks[0].downer();
        } else if (move.direction.x === 1) {
          //right
          this.blanks[0] = ancher;
          this.blanks[1] = this.blanks[0].downer();
        }
        break;
      case 'target':
        if (move.direction.y === -1) {
          //up
          this.blanks[0] = ancher.downer();
          this.blanks[1] = this.blanks[0].right();
        } else if (move.direction.y === 1) {
          //down
          this.blanks[0] = ancher;
          this.blanks[1] = this.blanks[0].right();
        } else if (move.direction.x === -1) {
          //left
          this.blanks[0] = ancher.right();
          this.blanks[1] = this.blanks[0].downer();
        } else if (move.direction.x === 1) {
          //right
          this.blanks[0] = ancher;
          this.blanks[1] = this.blanks[0].downer();
        }
        break;
    }

    //move block
    const dest_ancher = ancher.add(move.direction);
    this.board[ancher.y][ancher.x] = undefined;
    this.board[dest_ancher.y][dest_ancher.x] = block;
    block.ancher = dest_ancher;
  }

  getFlipped(): Board {
    let flipped_blocks: Block[] = this.blocks.map(
      (block): Block => {
        if (block.type === 'dot' || block.type === 'vertical')
          return {
            type: block.type,
            ancher: new Cell(3 - block.ancher.x, block.ancher.y),
          };

        switch (block.ancher.x) {
          case 0:
            return {
              type: block.type,
              ancher: new Cell(2, block.ancher.y),
            };
          case 1:
            return Object.assign({}, block);
          case 2:
            return {
              type: block.type,
              ancher: new Cell(0, block.ancher.y),
            };
          default:
            throw new Error('unexpedted block x coordinate');
        }
      }
    );
    let flipped_blanks: BlanksType = this.blanks.map(
      (blank) => new Cell(3 - blank.x, blank.y)
    ) as [Cell, Cell];

    return new Board({ blocks: flipped_blocks, blanks: flipped_blanks });
  }

  calculateBlankCells(): Cell[] {
    const blanks: Set<string> = new Set(
      [...Array(Board.WIDTH).keys()]
        .map((x) => [...Array(Board.HEIGHT).keys()].map((y) => `${x},${y}`))
        .reduce((s, x) => [...s, ...x])
    );

    const deleteBlank = (cell: Cell): void => {
      blanks.delete(`${cell.x},${cell.y}`);
    };

    this.blocks.forEach((block) => {
      const ancher: Cell = block.ancher;
      switch (block.type) {
        case 'dot':
          deleteBlank(ancher);
          break;
        case 'horizontal':
          deleteBlank(ancher);
          deleteBlank(ancher.right());
          break;
        case 'vertical':
          deleteBlank(ancher);
          deleteBlank(ancher.downer());
          break;
        case 'target':
          deleteBlank(ancher);
          deleteBlank(ancher.right());
          deleteBlank(ancher.downer());
          deleteBlank(ancher.right().downer());
          break;
      }
    });

    return Array.from(blanks.values()).map((cell) => {
      const cells = cell.split(',');
      return new Cell(parseInt(cells[0]), parseInt(cells[1]));
    });
  }

  forEachBlock(
    callback: (block: Block, index: number, self: Block[]) => void
  ): void {
    this.blocks.forEach(callback);
  }
}

export default Board;
