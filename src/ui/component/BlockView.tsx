import React, { FC } from 'react';
import Block from '../../solver/types/Block';
import styled from '@emotion/styled';

import { keyframes, css } from '@emotion/core';
import Cell from '../../solver/types/Cell';

const getMoveKeyFlame = (direction: Cell) => keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(${
      direction.x * (CELL_SIZE_PX + BLOCK_MARGIN_PX)
    }px, ${direction.y * (CELL_SIZE_PX + BLOCK_MARGIN_PX)}px, 0); 
    opacity: 0;
  }
`;

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
  is_translucent?: boolean;
  move_animation?: Cell;
}> = ({ block, is_translucent, move_animation }) => {
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
    opacity: ${is_translucent ? 0.5 : 1};
    ${move_animation
      ? css`
          animation: ${getMoveKeyFlame(move_animation)} 1s ease infinite;
        `
      : null}
  `;
  return <StyledBlock />;
};

export default BlockView;
