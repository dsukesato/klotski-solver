import React, { FC, useState, useMemo } from 'react';
import Board from '../../solver/types/Board';
import Move from '../../solver/types/Move';
import BoardView from './BoardView';
import { Button } from '@material-ui/core';
import styled from '@emotion/styled';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

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
    [board, moves, current_move_index]
  );

  const AnswerBoard = styled(BoardView)`
    margin: 0 auto;
  `;

  const AnswerController = styled.div`
    text-align: center;
  `;

  return (
    <div className="answer">
      <AnswerBoard
        board={current_board}
        ghost_move={moves[current_move_index]}
      />
      <AnswerController>
        <Button
          disabled={current_move_index <= 0}
          onClick={() => setCurrentMoveIndex(current_move_index - 1)}
        >
          <ArrowBackIosIcon />
        </Button>
        <span>
          {current_move_index + 1} / {moves.length}
        </span>
        <Button
          disabled={current_move_index >= moves.length - 1}
          onClick={() => setCurrentMoveIndex(current_move_index + 1)}
        >
          <ArrowForwardIosIcon />
        </Button>
      </AnswerController>
    </div>
  );
};

export default Answer;
