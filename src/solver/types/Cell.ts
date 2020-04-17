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

export default Cell;
