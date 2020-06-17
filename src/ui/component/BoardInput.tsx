import React, { FC, useState, useCallback } from 'react';
import Board from '../../solver/types/Board';
import BlockTypeButtons from './BlockTypeButtons';
import Block from '../../solver/types/Block';
import Cell from '../../solver/types/Cell';
import BoardView from './BoardView';

import { throttle } from 'throttle-debounce';
import styled from '@emotion/styled';
import Button from '@material-ui/core/Button';

const BoardInput: FC<{
  className?: string;
  onBoardInput: (board: Board) => void;
}> = ({ className, onBoardInput }) => {
  const [board, setBoard] = useState<Board>(
    new Board({
      blocks: [],
      blanks: [new Cell(0, 0), new Cell(0, 0)],
    })
  );
  const [selected_type, setSelectedType] = useState<Block['type']>('dot');
  const [hovered_cell, setHoveredCell] = useState<Cell>(new Cell(0, 0));

  const InputView = styled.div`
    display: flex;
    justify-content: center;
  `;

  const SubmitButton = styled(Button)`
    margin: 20px auto 0 !important;
  `;

  return (
    <div className={`board_input ${className}`}>
      <InputView>
        <BlockTypeButtons
          type={selected_type}
          onTypeSelect={useCallback((type) => {
            setSelectedType(type);
          }, [])}
        />
        <BoardView
          onMouseUp={() => {
            console.log(hovered_cell);

            setBoard(
              new Board({
                blocks: [
                  ...board.blocks,
                  { type: selected_type, ancher: hovered_cell },
                ],
                blanks: board.blanks,
              })
            );
          }}
          onCellMouseMove={useCallback(throttle(100, setHoveredCell), [])}
          board={board}
          translucent_blocks={[{ type: selected_type, ancher: hovered_cell }]}
        />
      </InputView>
      <SubmitButton variant="contained">solve!</SubmitButton>
    </div>
  );
};

const StyledBoardInput = styled(BoardInput)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default StyledBoardInput;
