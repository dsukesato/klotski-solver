import React, { FC } from 'react';
import Board from '../../solver/types/Board';
import Move from '../../solver/types/Move';
import Block from '../../solver/types/Block';
import Cell from '../../solver/types/Cell';
import styled from '@emotion/styled';
import BlockView from './BlockView';

const BoardView: FC<{
  board: Board;
  translucent_blocks?: Block[];
  ghost_move?: Move;
  onCellClick?: (cell: Cell) => void;
  onCellEnter?: (cell: Cell) => void;
  onCellLeave?: (cell: Cell) => void;
}> = ({ board, translucent_blocks, ghost_move }) => {
  const getBlockKey = (block: Block): string => block.type + block.ancher;
  const blocks = board.blocks.map((x) => (
    <BlockView block={x} key={getBlockKey(x)} />
  ));

  const CELL_SIZE_PX = 50;
  const BLOCK_MARGIN_PX = 10;

  const width_px =
    BLOCK_MARGIN_PX + (CELL_SIZE_PX + BLOCK_MARGIN_PX) * Board.WIDTH;
  const height_px =
    BLOCK_MARGIN_PX + (CELL_SIZE_PX + BLOCK_MARGIN_PX) * Board.HEIGHT;
  const StyledBoard = styled.div`
    position: relative;
    width: ${width_px}px;
    height: ${height_px}px;
    margin-top: 20px;
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

  return (
    <StyledBoard>
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
