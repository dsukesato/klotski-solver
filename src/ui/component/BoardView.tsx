import React, { FC } from 'react';
import Board from '../../solver/types/Board';
import Move from '../../solver/types/Move';
import Block from '../../solver/types/Block';
import Cell from '../../solver/types/Cell';

const BoardView: FC<{
  board: Board;
  ghost_blocks?: Block[];
  ghost_move?: Move;
  onCellClick?: (cell: Cell) => void;
  onCellEnter?: (cell: Cell) => void;
  onCellLeave?: (cell: Cell) => void;
}> = ({}) => {
  return <div className="board">board</div>;
};

export default BoardView;
