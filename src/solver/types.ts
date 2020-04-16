export class Cell {
  static UP: Cell = new Cell(0, -1);
  static DOWN: Cell = new Cell(0, 1);
  static RIGHT: Cell = new Cell(1, 0);
  static LEFT: Cell = new Cell(-1, 0);

  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(cell: Cell): Cell {
    return new Cell(this.x + cell.x, this.y + cell.y);
  }

  scalar_mul(scalar: number): Cell {
    return new Cell(this.x * scalar, this.y * scalar);
  }

  equals(cell: Cell): boolean {
    return this.x === cell.x && this.y === cell.y;
  }

  upper(num = 1): Cell {
    return this.add(Cell.UP.scalar_mul(num));
  }
  downer(num = 1): Cell {
    return this.add(Cell.DOWN.scalar_mul(num));
  }
  right(num = 1): Cell {
    return this.add(Cell.RIGHT.scalar_mul(num));
  }
  left(num = 1): Cell {
    return this.add(Cell.LEFT.scalar_mul(num));
  }
}

//blocks
export type BlockDot = {
  type: 'dot';
  ancher: Cell;
};
export type BlockHorizontal = {
  type: 'horizontal';
  ancher: Cell;
};
export type BlockVertical = {
  type: 'vertical';
  ancher: Cell;
};
export type BlockTarget = {
  type: 'target';
  ancher: Cell;
};

export type Block = BlockDot | BlockHorizontal | BlockVertical | BlockTarget;

type Vector = Cell;
export type Move = {
  ancher: Cell;
  direction: Vector;
};

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
      blocks.forEach(block => {
        this.board[block.ancher.y][block.ancher.x] = block;
      });
    }
  }

  clone() {
    return new Board({
      blocks: this.blocks.concat(),
      blanks: this.blanks.concat() as BlanksType,
      board: this.board.map(x => x.concat()),
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

  getBlock(cell: Cell): Block | undefined {
    return this.board[cell.y][cell.x];
  }

  getBlankIndex(cell: Cell): number {
    return this.blanks.findIndex(x => cell.equals(x));
  }

  moveBlock(move: Move): Board {
    const new_board = this.clone();
    new_board._bangMoveBlock(move);
    return new_board;
  }

  //make bang changes to member
  _bangMoveBlock(move: Move): void {
    const ancher = move.ancher;
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

  forEachBlock(callback: (block: Block, cell: Cell) => void): void {
    this.board.forEach((array, y) =>
      array.forEach((block, x) => {
        if (block === undefined) return;
        callback(block, new Cell(x, y));
      })
    );
  }
}
