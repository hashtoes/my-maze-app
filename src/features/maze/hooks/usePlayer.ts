import { useState, useEffect } from 'react';
import type { Cell, Direction } from '../types';
import { newPos } from '../utils/playerMove';

export function usePlayer(maze: Cell[][]) {
  const [playerPos, setPlayerPos] = useState<{ x: number, y: number, dir: Direction }>({ x: 0, y: 0, dir: 'up' });
  const [isGoalReached, setGoalReached] = useState(false);

  const rows = maze.length;
  const cols = maze[0]?.length || 0;

  const goal = { x: cols - 1, y: rows - 1 };

  const movePlayer = (direction: Direction) => {
    if (isGoalReached) return;

    const { x, y } = playerPos;
    const cell = maze[y][x];

    const [newX, newY, newDir] = newPos(x, y, playerPos.dir, direction, cell, rows, cols);
    setPlayerPos({ x: newX, y: newY, dir: newDir });
  };

  useEffect(() => {
    if (playerPos.x === goal.x && playerPos.y === goal.y) {
      setGoalReached(true);
    }
  }, [playerPos, goal]);

  const resetPlayer = () => {
    setPlayerPos({ x: 0, y: 0, dir: 'up' });
    setGoalReached(false);
  };

  return { playerPos, movePlayer, isGoalReached, resetPlayer };
}
