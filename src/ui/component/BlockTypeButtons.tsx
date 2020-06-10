import React, { FC, useState } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import WidgetsIcon from '@material-ui/icons/Widgets';
import Block from '../../solver/types/Block';

type BlockType = Block['type'];
export const BlockTypeButtons: FC<{
  type: BlockType;
  onTypeSelect: (type: BlockType) => void;
}> = () => {
  return <div className={'block_type_buttons'}></div>;
};

export default BlockTypeButtons;
