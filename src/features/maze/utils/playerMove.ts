import type { Cell, Direction } from '../types';
import { DIRECTIONS } from '../constants';

const deltas = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

export const numToDirection = (() => {
  const reversedDirection = Object.fromEntries<Direction>(
    Object.entries(DIRECTIONS).map(([key, value]) => [value, key as Direction]),
  );
  return (num: number) => reversedDirection[num % 4];
})()

export const playerPointOfViewCell = (cell: Cell, dir: Direction): Omit<Cell, 'visited'> => {
  return {
    up: cell[numToDirection(DIRECTIONS[dir])],
    right: cell[numToDirection(DIRECTIONS[dir] + 1)],
    down: cell[numToDirection(DIRECTIONS[dir] + 2)],
    left: cell[numToDirection(DIRECTIONS[dir] + 3)],
  }
}

export const newPos = (
  x: number,
  y: number,
  playerDirection: Direction,
  move: Direction,
  cell: Cell,
  rows: number,
  cols: number,
): [number, number, Direction] => {
  const realDirNum = (DIRECTIONS[playerDirection] + DIRECTIONS[move]) % 4;
  const realMove = numToDirection(realDirNum);

  if (cell[realMove]) {
    return [x, y, realMove];
  }

  const [dy, dx] = deltas[realDirNum];
  const newX = x + dx;
  const newY = y + dy;

  if (newX < 0 || newX >= cols || newY < 0 || newY >= rows) {
    return [x, y, realMove];
  }

  return [newX, newY, realMove];
}
