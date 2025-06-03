import { useState, useEffect } from 'react';
import type { Cell } from '../types';

export function usePlayer(maze: Cell[][]) {
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [isGoalReached, setGoalReached] = useState(false);

  const rows = maze.length;
  const cols = maze[0]?.length || 0;

  const goal = { x: cols - 1, y: rows - 1 };

  const movePlayer = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (isGoalReached) return;

    const { x, y } = playerPos;
    const cell = maze[y][x];

    let newX = x;
    let newY = y;

    if (direction === 'up' && !cell.top && y < rows - 1) newY++;
    if (direction === 'down' && !cell.bottom && y > 0) newY--;
    if (direction === 'left' && !cell.left && x > 0) newX--;
    if (direction === 'right' && !cell.right && x < cols - 1) newX++;

    if (newX !== x || newY !== y) {
      setPlayerPos({ x: newX, y: newY });
    }
  };

  useEffect(() => {
    if (playerPos.x === goal.x && playerPos.y === goal.y) {
      setGoalReached(true);
    }
  }, [playerPos, goal]);

  const resetPlayer = () => {
    setPlayerPos({ x: 0, y: 0 });
    setGoalReached(false);
  };

  return { playerPos, movePlayer, isGoalReached, resetPlayer };
}
