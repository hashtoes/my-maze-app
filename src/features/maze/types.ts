import type { DIRECTIONS } from './constants';

export type Cell = {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
  visited: boolean;
};

export type Direction = keyof typeof DIRECTIONS;
