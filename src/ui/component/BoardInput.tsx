import React, { FC, useState, useCallback } from 'react';
import Board from '../../solver/types/Board';
import BlockTypeButtons from './BlockTypeButtons';
import Block from '../../solver/types/Block';
import Cell from '../../solver/types/Cell';
import BoardView from './BoardView';

const BoardInput: FC<{ onBoardInput: (board: Board) => void }> = ({
  onBoardInput,
}) => {
  const [board, setBoard] = useState<Board>(
    new Board({
      blocks: [],
      blanks: [new Cell(0, 0), new Cell(0, 0)],
    })
  );
  const [selected_type, setSelectedType] = useState<Block['type']>('dot');

  return (
    <div className="board_input">
      <BlockTypeButtons
        type={selected_type}
        onTypeSelect={useCallback((type) => {
          setSelectedType(type);
        }, [])}
      />
      <BoardView board={board} />
    </div>
  );
};

export default BoardInput;
