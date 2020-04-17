import Block from './types/Block';
import Board from './types/Board';
import Cell from './types/Cell';
import Move from './types/Move';

const areConnectedCells = (
  cell1: Cell,
  cell2: Cell
): 'horizontal' | 'vartical' | false => {
  if (cell1.upper().equals(cell2) || cell1.downer().equals(cell2)) {
    return 'vartical';
  } else if (cell1.right().equals(cell2) || cell1.left().equals(cell2)) {
    return 'vartical';
  } else {
    return false;
  }
};

const calculatePossibleMoves = (board: Board): Move[] => {
  let moves: Move[] = [];
  const connectedCells = areConnectedCells(board.blanks[0], board.blanks[1]);
  let blank1 = board.blanks[0],
    blank2 = board.blanks[1];
  if (board.blanks[0].x === board.blanks[1].x) {
    if (board.blanks[0].y < board.blanks[1].y) {
      blank1 = board.blanks[0];
      blank2 = board.blanks[1];
    } else if (board.blanks[0].y > board.blanks[1].y) {
      blank1 = board.blanks[1];
      blank2 = board.blanks[0];
    }
  } else if (board.blanks[0].x < board.blanks[1].x) {
    blank1 = board.blanks[0];
    blank2 = board.blanks[1];
  } else if (board.blanks[0].x > board.blanks[1].x) {
    blank1 = board.blanks[1];
    blank2 = board.blanks[0];
  }
  if (connectedCells) {
    //blank connected
    if (connectedCells === 'horizontal') {
      let block: Block | undefined;
      // blank1のancherを基準に周りのcellを調べる
      // 1
      block = board.getBlock(blank1.left(2));
      if (block !== undefined && block.type === 'horizontal') {
        // ...push({block,})のblockは、block: block,...の略
        moves.push({ block, direction: Cell.RIGHT });
      }
      // 2
      block = board.getBlock(blank1.left(1));
      if (block !== undefined && block.type === 'dot')
        moves.push({ block, direction: Cell.RIGHT });
      // 3
      block = board.getBlock(blank1.upper(2));
      if (
        (block !== undefined && block.type === 'vertical') ||
        (block !== undefined && block.type === 'target')
      )
        moves.push({ block, direction: Cell.DOWN });
      // 4
      block = board.getBlock(blank1.upper(1));
      if (
        (block !== undefined && block.type === 'dot') ||
        (block !== undefined && block.type === 'horizontal')
      )
        moves.push({ block, direction: Cell.DOWN });
      // 5
      block = board.getBlock(blank1.downer(1));
      if (
        (block !== undefined && block.type === 'dot') ||
        (block !== undefined && block.type === 'horizontal') ||
        (block !== undefined && block.type === 'vertical') ||
        (block !== undefined && block.type === 'target')
      )
        moves.push({ block, direction: Cell.RIGHT });
      // 6
      block = board.getBlock(blank2.upper(2));
      if (block !== undefined && block.type === 'vertical')
        moves.push({ block, direction: Cell.DOWN });
      // 7
      block = board.getBlock(blank2.upper(1));
      if (block !== undefined && block.type === 'dot')
        moves.push({ block, direction: Cell.DOWN });
      // 8
      block = board.getBlock(blank2.downer(1));
      if (
        (block !== undefined && block.type === 'dot') ||
        (block !== undefined && block.type === 'vertical')
      )
        moves.push({ block, direction: Cell.UP });
      // 9
      block = board.getBlock(blank2.right(1));
      if (
        (block !== undefined && block.type === 'dot') ||
        (block !== undefined && block.type === 'horizontal')
      )
        moves.push({ block, direction: Cell.LEFT });
    } else if (connectedCells === 'vartical') {
      let block: Block | undefined;
      // 1
      block = board.getBlock(blank1.left(2));
      if (
        (block !== undefined && block.type === 'horizontal') ||
        (block !== undefined && block.type === 'target')
      ) {
        moves.push({ block, direction: Cell.RIGHT });
      }
      // 2
      block = board.getBlock(blank1.left(1));
      if (
        (block !== undefined && block.type === 'dot') ||
        (block !== undefined && block.type === 'vertical')
      )
        moves.push({ block, direction: Cell.RIGHT });
      // 3
      block = board.getBlock(blank2.left(2));
      if (block !== undefined && block.type === 'horizontal')
        moves.push({ block, direction: Cell.RIGHT });
      // 4
      block = board.getBlock(blank2.left(1));
      if (block !== undefined && block.type === 'dot')
        moves.push({ block, direction: Cell.RIGHT });
      // 5
      block = board.getBlock(blank1.upper(2));
      if (block !== undefined && block.type === 'vertical')
        moves.push({ block, direction: Cell.DOWN });
      // 6
      block = board.getBlock(blank1.upper(1));
      if (block !== undefined && block.type === 'dot')
        moves.push({ block, direction: Cell.DOWN });
      // 7
      block = board.getBlock(blank2.downer(1));
      if (
        (block !== undefined && block.type === 'dot') ||
        (block !== undefined && block.type === 'vertical')
      )
        moves.push({ block, direction: Cell.UP });
      // 8
      block = board.getBlock(blank1.right(1));
      if (
        (block !== undefined && block.type === 'dot') ||
        (block !== undefined && block.type === 'horizontal') ||
        (block !== undefined && block.type === 'vertical') ||
        (block !== undefined && block.type === 'target')
      )
        moves.push({ block, direction: Cell.LEFT });
      // 9
      block = board.getBlock(blank2.right(1));
      if (
        (block !== undefined && block.type === 'dot') ||
        (block !== undefined && block.type === 'horizontal')
      )
        moves.push({ block, direction: Cell.LEFT });
    }
  } else {
    //blank separated
    for (const blank of board.blanks) {
      let block: Block | undefined;
      // 1
      block = board.getBlock(blank.left(2));
      if (block !== undefined && block.type === 'horizontal') {
        moves.push({ block, direction: Cell.RIGHT });
      }
      // 2
      block = board.getBlock(blank.left(1));
      if (block !== undefined && block.type === 'dot')
        moves.push({ block, direction: Cell.RIGHT });
      // 3
      block = board.getBlock(blank.upper(2));
      if (block !== undefined && block.type === 'vertical')
        moves.push({ block, direction: Cell.DOWN });
      // 4
      block = board.getBlock(blank.upper(1));
      if (block !== undefined && block.type === 'dot')
        moves.push({ block, direction: Cell.DOWN });
      // 5
      block = board.getBlock(blank.downer(1));
      if (
        (block !== undefined && block.type === 'dot') ||
        (block !== undefined && block.type === 'vertical')
      )
        moves.push({ block, direction: Cell.UP });
      // 6
      block = board.getBlock(blank.right(1));
      if (
        (block !== undefined && block.type === 'dot') ||
        (block !== undefined && block.type === 'horizontal')
      )
        moves.push({ block, direction: Cell.LEFT });
    }
  }
  return moves;
};
