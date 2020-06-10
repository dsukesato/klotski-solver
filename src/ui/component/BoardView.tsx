import React, { FC } from 'react';
import Board from '../../solver/types/Board';
import Move from '../../solver/types/Move';
import Block from '../../solver/types/Block';
import Cell from '../../solver/types/Cell';
import styled from '@emotion/styled';

const CELL_SIZE_PX = 50;
const BLOCK_MARGIN_PX = 10;
const BLOCK_COLORS: { [key in Block['type']]: string } = {
  dot: '#35d0ba',
  vertical: '#ffcd3c',
  horizontal: '#ff9234',
  target: '#d92027',
};
const BlockView: FC<{
  block: Block;
  is_ghost?: boolean;
}> = ({ block, is_ghost }) => {
  const type = block.type;
  const width_px =
    type === 'dot' || type === 'vertical'
      ? CELL_SIZE_PX
      : CELL_SIZE_PX * 2 + BLOCK_MARGIN_PX;
  const height_px =
    type === 'dot' || type === 'horizontal'
      ? CELL_SIZE_PX
      : CELL_SIZE_PX * 2 + BLOCK_MARGIN_PX;

  const StyledBlock = styled.div`
    position: absolute;
    top: ${BLOCK_MARGIN_PX +
    (BLOCK_MARGIN_PX + CELL_SIZE_PX) * block.ancher.y}px;
    left: ${BLOCK_MARGIN_PX +
    (BLOCK_MARGIN_PX + CELL_SIZE_PX) * block.ancher.x}px;
    width: ${width_px}px;
    height: ${height_px}px;
    background: ${BLOCK_COLORS[type]};
    box-shadow: 0 3px 5px #0002, 0 1px 5px #0002;
    border-radius: 3px;
    opacity: ${is_ghost ? 0.5 : 1};
  `;
  return <StyledBlock />;
};

const BoardView: FC<{
  board: Board;
  ghost_blocks?: Block[];
  ghost_move?: Move;
  onCellClick?: (cell: Cell) => void;
  onCellEnter?: (cell: Cell) => void;
  onCellLeave?: (cell: Cell) => void;
}> = ({ board, ghost_blocks }) => {
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
      {ghost_blocks
        ? ghost_blocks.map((x) => (
            <BlockView block={x} is_ghost={true} key={getBlockKey(x)} />
          ))
        : null}
    </StyledBoard>
  );
};

export default BoardView;
