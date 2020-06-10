import React, { FC, useState, useMemo } from 'react';
import Board from '../../solver/types/Board';
import Move from '../../solver/types/Move';
import BoardView from './BoardView';

const getCurrentBoard = (
  board: Board,
  moves: Move[],
  current_index: number
): Board =>
  moves
    .filter((_, i) => i < current_index)
    .reduce((board: Board, move: Move): Board => board.moveBlock(move), board);

const Answer: FC<{ board: Board; moves: Move[] }> = ({ board, moves }) => {
  const [current_move_index, setCurrentMoveIndex] = useState(0);
  const current_board = useMemo(
    () => getCurrentBoard(board, moves, current_move_index),
    [current_move_index]
  );

  return (
    <div className="answer">
      Answer
      <BoardView board={current_board} ghost_move={moves[current_move_index]} />
    </div>
  );
};

export default Answer;
