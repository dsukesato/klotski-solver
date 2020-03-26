import { Board, Move, Block, Cell } from './type';

const isConnectedBlank = (cells: Board['blanks']): boolean =>
  cells[0].upper().equals(cells[1]) ||
  cells[0].downer().equals(cells[1]) ||
  cells[0].right().equals(cells[1]) ||
  cells[0].left().equals(cells[1]);

const calculatePossibleMoves = (board: Board): Move[] => {
  let moves: Move[];

  if (isConnectedBlank(board.blanks)) {
    //blank connected
  } else {
    //blank separated
    for (const blank of board.blanks) {
      const dot_upper_ancher = blank.upper();
      const dot_downer_ancher = blank.downer();
      const dot_right_ancher = blank.right();
      const dot_left_ancher = blank.left();
      const vertical_upper_ancher = blank.upper(2);
      const vertical_downer_ancher = blank.downer();
      const horizontal_right_ancher = blank.right();
      const horizontal_left_ancher = blank.left(2);

      board.blocks.forEach((block, i) => {
        switch (block.type) {
          case 'dot':
            //vertival
            if (dot_upper_ancher.equals(block.cells[0]))
              moves.push({ block_index: i, direction: Cell.DOWN });
            if (dot_downer_ancher.equals(block.cells[0]))
              moves.push({ block_index: i, direction: Cell.UP });
            //horizontal
            if (dot_right_ancher.equals(block.cells[0]))
              moves.push({ block_index: i, direction: Cell.LEFT });
            if (dot_left_ancher.equals(block.cells[0]))
              moves.push({ block_index: i, direction: Cell.RIGHT });
            break;
          case 'vertical':
            //vertival
            if (vertical_upper_ancher.equals(block.cells[0]))
              moves.push({ block_index: i, direction: Cell.DOWN });
            if (vertical_downer_ancher.equals(block.cells[0]))
              moves.push({ block_index: i, direction: Cell.UP });
            break;
          case 'horizontal':
            //horizontal
            if (horizontal_right_ancher.equals(block.cells[0]))
              moves.push({ block_index: i, direction: Cell.LEFT });
            if (horizontal_left_ancher.equals(block.cells[0]))
              moves.push({ block_index: i, direction: Cell.RIGHT });
            break;
          default:
        }
      });
    }
  }
  return moves;
};
