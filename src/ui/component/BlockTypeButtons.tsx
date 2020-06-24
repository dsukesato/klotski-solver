import React, { FC, useCallback } from 'react';
import Block from '../../solver/types/Block';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  BLOCK_MARGIN_PX,
  BUTTON_CELL_SIZE_PX,
  BLOCK_COLORS,
} from '../style-const';

type BlockType = Block['type'];

const BlockIcon: FC<{ type: BlockType }> = ({ type }) => {
  const width_px =
    type === 'dot' || type === 'vertical'
      ? BUTTON_CELL_SIZE_PX
      : BUTTON_CELL_SIZE_PX * 2 + BLOCK_MARGIN_PX;
  const height_px =
    type === 'dot' || type === 'horizontal'
      ? BUTTON_CELL_SIZE_PX
      : BUTTON_CELL_SIZE_PX * 2 + BLOCK_MARGIN_PX;

  const StyledIcon = styled.div`
    width: ${width_px}px;
    height: ${height_px}px;
    background: ${BLOCK_COLORS[type]};
  `;
  return <StyledIcon />;
};

const BUTTON_WIDTH = BUTTON_CELL_SIZE_PX * 6;
const BlockTypeButton: FC<{
  type: BlockType;
  is_active: boolean;
  onClick: (type: BlockType) => void;
}> = ({ onClick, type, is_active }) => {
  const StyledButton = styled(Button)`
    width: ${BUTTON_WIDTH}px;
    height: ${BUTTON_CELL_SIZE_PX * 4}px;

    ${is_active
      ? css`
          background: #0002 !important;
        `
      : null}
  `;

  return (
    <StyledButton
      variant="outlined"
      onClick={useCallback(() => onClick(type), [type])}
    >
      <BlockIcon type={type} />
    </StyledButton>
  );
};

export const BlockTypeButtons: FC<{
  type: BlockType;
  onTypeSelect: (type: BlockType) => void;
}> = ({ type, onTypeSelect }) => {
  const block_types: BlockType[] = ['dot', 'horizontal', 'vertical', 'target'];
  const buttons = block_types.map((x) => (
    <BlockTypeButton
      type={x}
      is_active={type === x}
      onClick={onTypeSelect}
      key={x}
    />
  ));

  return (
    <ButtonGroup
      orientation="vertical"
      variant="text"
      aria-label="vertical outlined primary button group"
    >
      {buttons}
    </ButtonGroup>
  );
};

export default BlockTypeButtons;
