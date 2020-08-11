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

  const suppression_control = useCallback(
    (block: Block): Block => {
      let fix_cell: Cell = block.ancher;
      if (block.ancher.x === Board.WIDTH - 1 && block.ancher.y === Board.HEIGHT - 1) {
        switch (block.type) {
          case 'vertical':
            fix_cell = fix_cell.upper();
            break;
          case 'horizontal':
            fix_cell = fix_cell.left();
            break;
          case 'target':
            fix_cell = fix_cell.left();
            fix_cell = fix_cell.upper();
            break;
        }
      }
      else if (block.ancher.x === Board.WIDTH - 1) {
        if (block.type === 'horizontal' || block.type === 'target') {
          fix_cell = fix_cell.left();
        }
      }
      else if (block.ancher.y === Board.HEIGHT - 1) {
        if (block.type === 'vertical' || block.type === 'target') {
          fix_cell = fix_cell.upper();
        }
      }
      const new_block: Block = {
        type: block.type,
        ancher: fix_cell
      }
      return new_block;
    },
    []
  );

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
            setBoard(
              new Board({
                blocks: [
                  ...board.blocks,
                  suppression_control({ type: selected_type, ancher: hovered_cell }),
                ],
                blanks: board.blanks,
              })
            );
          }}
          onCellMouseMove={useCallback(throttle(100, setHoveredCell), [])}
          board={board}
          translucent_blocks={[suppression_control({ type: selected_type, ancher: hovered_cell })]}
        />
      </InputView>
      <SubmitButton
        disabled={board.calculateBlankCells().length !== 2}
        variant="contained"
        onClick={() => {
          onBoardInput(
            new Board({
              blocks: board.blocks,
              blanks: board.calculateBlankCells() as [Cell, Cell],
            })
          );
        }}
      >
        solve!
      </SubmitButton>
    </div>
  );
};

const StyledBoardInput = styled(BoardInput)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default StyledBoardInput;
