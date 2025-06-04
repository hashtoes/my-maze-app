import type { Cell, Direction } from '../types';
import { DIRECTIONS } from '../constants';

const deltas = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

export const newPos = (
  x: number,
  y: number,
  playerDirection: Direction,
  move: Direction,
  cell: Cell,
  rows: number,
  cols: number,
): [number, number, Direction] => {
  let newX = x;
  let newY = y;

  const [dy, dx] = deltas[(DIRECTIONS[playerDirection] + DIRECTIONS[move]) % 4];

  // if (direction === 'up' && !cell.top && y < rows - 1) newY++;
  // if (direction === 'down' && !cell.bottom && y > 0) newY--;
  // if (direction === 'left' && !cell.left && x > 0) newX--;
  // if (direction === 'right' && !cell.right && x < cols - 1) newX++;

  return [0, 0, move]; // kohhh
};
