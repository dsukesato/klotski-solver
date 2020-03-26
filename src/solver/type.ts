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
  cells: [Cell];
};
export type BlockHorizontal = {
  type: 'horizontal';
  cells: [Cell, Cell];
};
export type BlockVertical = {
  type: 'vertical';
  cells: [Cell, Cell];
};
export type BlockTarget = {
  type: 'target';
  cells: [Cell, Cell, Cell, Cell];
};

export type Block = BlockDot | BlockHorizontal | BlockVertical | BlockTarget;

export type Board = { blocks: Block[]; blanks: [Cell, Cell] };

// Move's direction is ancher's coordinate after movement
type Vector = Cell;
export type Move = {
  block_index: number;
  direction: Vector;
};
