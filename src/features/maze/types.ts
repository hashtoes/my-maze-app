import type { DIRECTIONS } from './constants';

export type Cell = {
  [key in Direction]: boolean; // true => wall, false => no wall
} & {
  visited: boolean;
};

export type Direction = keyof typeof DIRECTIONS;
