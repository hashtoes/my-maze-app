import type { Cell } from "../types";

export const generateMaze = (width: number, height: number): Cell[][] => {
  const maze: Cell[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      top: true,
      right: true,
      bottom: true,
      left: true,
      visited: false,
    }))
  );

  const directions = [
    { dx: 0, dy: 1, wall: 'top', opposite: 'bottom' },
    { dx: 1, dy: 0, wall: 'right', opposite: 'left' },
    { dx: 0, dy: -1, wall: 'bottom', opposite: 'top' },
    { dx: -1, dy: 0, wall: 'left', opposite: 'right' },
  ];

  function shuffle<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }

  function carve(x: number, y: number) {
    maze[y][x].visited = true;

    for (const dir of shuffle(directions)) {
      const nx = x + dir.dx;
      const ny = y + dir.dy;

      if (ny >= 0 && ny < height && nx >= 0 && nx < width && !maze[ny][nx].visited) {
        maze[y][x][dir.wall as keyof Cell] = false;
        maze[ny][nx][dir.opposite as keyof Cell] = false;
        carve(nx, ny);
      }
    }
  }

  carve(0, 0);

  // maze[0][0].top = false;
  // maze[width - 1][height - 1].bottom = false;

  return maze;
}
