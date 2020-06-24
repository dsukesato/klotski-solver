import React, { FC, useState } from 'react';
import BoardInput from './BoardInput';
import Answer from './Answer';
import Board from '../../solver/types/Board';
import Move from '../../solver/types/Move';
import BFS from '../../solver/BFS';
import { Alert } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';

const App: FC<{}> = () => {
  const [bfs_result, setBFSResult] = useState<{
    board: Board;
    moves: Move[];
  } | null>(null);

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="App">
      <h2>Board Input</h2>
      <BoardInput
        onBoardInput={(board) => {
          const result = BFS(board);
          result !== 'no answer'
            ? setBFSResult({ board, moves: result })
            : handleClick();
        }}
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          NO ANSWER!
        </Alert>
      </Snackbar>
      <h2>Answer</h2>
      {bfs_result ? (
        <Answer board={bfs_result.board} moves={bfs_result.moves} />
      ) : null}
    </div>
  );
};

export default App;
