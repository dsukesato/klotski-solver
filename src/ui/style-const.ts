import Block from '../solver/types/Block';

export const CELL_SIZE_PX = 50;
export const BLOCK_MARGIN_PX = 10;
export const BLOCK_COLORS: { [key in Block['type']]: string } = {
  dot: '#35d0ba',
  vertical: '#ffcd3c',
  horizontal: '#ff9234',
  target: '#d92027',
};

export const BUTTON_CELL_SIZE_PX = CELL_SIZE_PX * 0.25;
