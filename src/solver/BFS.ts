import Block from './types/Block';
import Board from './types/Board';
import Cell from './types/Cell';
import Move from './types/Move';

const isConnectedBlank = (cells: Board['blanks']): boolean =>
  ancher.upper().equals(cells[1]) ||
  ancher.downer().equals(cells[1]) ||
  ancher.right().equals(cells[1]) ||
  ancher.left().equals(cells[1]);

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
            if (dot_upper_ancher.equals(block.ancher))
              moves.push({ block_index: i, direction: Cell.DOWN });
            if (dot_downer_ancher.equals(block.ancher))
              moves.push({ block_index: i, direction: Cell.UP });
            //horizontal
            if (dot_right_ancher.equals(block.ancher))
              moves.push({ block_index: i, direction: Cell.LEFT });
            if (dot_left_ancher.equals(block.ancher))
              moves.push({ block_index: i, direction: Cell.RIGHT });
            break;
          case 'vertical':
            //vertival
            if (vertical_upper_ancher.equals(block.ancher))
              moves.push({ block_index: i, direction: Cell.DOWN });
            if (vertical_downer_ancher.equals(block.ancher))
              moves.push({ block_index: i, direction: Cell.UP });
            break;
          case 'horizontal':
            //horizontal
            if (horizontal_right_ancher.equals(block.ancher))
              moves.push({ block_index: i, direction: Cell.LEFT });
            if (horizontal_left_ancher.equals(block.ancher))
              moves.push({ block_index: i, direction: Cell.RIGHT });
            break;
          default:
        }
      });
    }
  }
  return moves;
};
