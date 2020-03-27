export class Cell {
  static UP: Cell = new Cell(0, -1);
  static DOWN: Cell = new Cell(0, 1);
  static RIGHT: Cell = new Cell(-1, 0);
  static LEFT: Cell = new Cell(1, 0);

  x: number;
  y: number;

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

export type Blanks = [Cell, Cell];
export class Board {
  static WIDTH: number = 4;
  static HEIGHT: number = 5;
  //board[y][x]
  board: Block[][];
  blocks: Block[];
  blanks: Blanks;

  constructor({ blocks, blanks }: { blocks: Block[]; blanks: Blanks }) {
    this.blocks = blocks;

    this.board = [];
    for (let i = 0; i < Board.HEIGHT; i++) this.board[i] = [];
    blocks.forEach(block => {
      this.board[block.ancher.y][block.ancher.x] = block;
    });

    this.blanks = blanks;
  }

  isValidCell(cell: Cell): boolean {
    return (
      cell.x >= 0 &&
      cell.x < Board.WIDTH &&
      cell.y >= 0 &&
      cell.y < Board.HEIGHT
    );
  }

  getBlock(cell: Cell): Block | null {
    try {
      return this.board[cell.y][cell.x];
    } catch (e) {
      return null;
    }
  }

  getBlankIndex(cell: Cell): number {
    return this.blanks.findIndex(x => cell.equals(x));
  }

  moveBlock(move: Move): void {
    //alias vars
    const ancher = move.ancher;
    const block = this.getBlock(ancher);

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

  forEachBlock(callback: (block: Block) => void) {
    this.blocks.forEach(callback);
  }
}
