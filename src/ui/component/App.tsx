import React, { FC, useState } from 'react';
import BoardInput from './BoardInput';
import Answer from './Answer';
import Board from '../../solver/types/Board';
import Move from '../../solver/types/Move';
import BFS from '../../solver/BFS';
import { questions } from '../../solver/sample-data';

const App: FC<{}> = () => {
  const [bfs_result, setBFSResult] = useState<{
    board: Board;
    moves: Move[];
  } | null>({
    board: questions.basic1,
    moves: BFS(questions.basic1) as Move[],
  });

  return (
    <div className="App">
      <h2>Board Input</h2>
      <BoardInput
        onBoardInput={(board) => {
          const result = BFS(board);
          if (result !== 'no answer') setBFSResult({ board, moves: result });
        }}
      />
      <h2>Answer</h2>
      {bfs_result ? (
        <Answer board={bfs_result.board} moves={bfs_result.moves} />
      ) : null}
    </div>
  );
};

export default App;
