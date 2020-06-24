import React, { FC, useCallback } from 'react';
import Board from '../../solver/types/Board';
import Move from '../../solver/types/Move';
import Block from '../../solver/types/Block';
import Cell from '../../solver/types/Cell';
import styled from '@emotion/styled';
import BlockView from './BlockView';
import { CELL_SIZE_PX, BLOCK_MARGIN_PX } from '../style-const';

const BoardView: FC<{
  board: Board;
  translucent_blocks?: Block[];
  ghost_move?: Move;
  className?: string;
  onMouseUp?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onCellMouseMove?: (cell: Cell) => void;
}> = ({
  board,
  translucent_blocks,
  ghost_move,
  className,
  onMouseUp,
  onCellMouseMove,
}) => {
  const getBlockKey = (block: Block): string => block.type + block.ancher;
  const blocks = board.blocks.map((x) => (
    <BlockView block={x} key={getBlockKey(x)} />
  ));

  const width_px =
    BLOCK_MARGIN_PX + (CELL_SIZE_PX + BLOCK_MARGIN_PX) * Board.WIDTH;
  const height_px =
    BLOCK_MARGIN_PX + (CELL_SIZE_PX + BLOCK_MARGIN_PX) * Board.HEIGHT;
  const StyledBoard = styled.div`
    position: relative;
    width: ${width_px}px;
    height: ${height_px}px;
    border: solid 3px #aaa;
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      top: ${height_px}px;
      left: ${CELL_SIZE_PX + BLOCK_MARGIN_PX}px;
      width: ${BLOCK_MARGIN_PX + (CELL_SIZE_PX + BLOCK_MARGIN_PX) * 2}px;
      height: 3px;
      background: #fff;
    }
  `;

  const on_mouse_move = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (!e.currentTarget.getBoundingClientRect) return;

      const current_target_rect = e.currentTarget.getBoundingClientRect();
      const mouse_pos = {
        x: e.clientX - current_target_rect.x,
        y: e.clientY - current_target_rect.y,
      };
      const cell_x = Math.floor(
        (mouse_pos.x - BLOCK_MARGIN_PX / 2) / (BLOCK_MARGIN_PX + CELL_SIZE_PX)
      );
      const cell_y = Math.floor(
        (mouse_pos.y - BLOCK_MARGIN_PX / 2) / (BLOCK_MARGIN_PX + CELL_SIZE_PX)
      );
      const cell = new Cell(
        cell_x < 0 ? 0 : cell_x > Board.WIDTH - 1 ? Board.WIDTH - 1 : cell_x,
        cell_y < 0 ? 0 : cell_y > Board.HEIGHT - 1 ? Board.HEIGHT - 1 : cell_y
      );
      if (onCellMouseMove !== undefined) onCellMouseMove(cell);
    },
    [onCellMouseMove]
  );

  return (
    <StyledBoard
      className={className ? className : ''}
      onMouseUp={onMouseUp}
      onMouseMove={on_mouse_move}
    >
      {blocks}
      {translucent_blocks
        ? translucent_blocks.map((x) => (
            <BlockView block={x} is_translucent={true} key={getBlockKey(x)} />
          ))
        : null}
      {ghost_move ? (
        <BlockView
          block={ghost_move.block}
          move_animation={ghost_move?.direction}
        />
      ) : null}
    </StyledBoard>
  );
};

export default BoardView;
