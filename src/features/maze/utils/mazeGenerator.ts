import type { Cell } from "../types";

// Note the Y-direction. y++ => going up. y[0] is the lower boundary.
const DIRS = [
  { dx: 0, dy: 1, wall: 'up', opposite: 'down' },
  { dx: 1, dy: 0, wall: 'right', opposite: 'left' },
  { dx: 0, dy: -1, wall: 'down', opposite: 'up' },
  { dx: -1, dy: 0, wall: 'left', opposite: 'right' },
] as const;

type DirEntry = typeof DIRS[number];

/**
 * Generates a perfect maze using Wilson's Loop-Erased Random Walk algorithm.
 *
 * @param width        Number of columns
 * @param height       Number of rows
 * @param _branchFactor Accepted for API compatibility; unused by Wilson's algorithm
 * @param goalBias     Bias weight toward the goal (top-right: x=width-1, y=0), range 0–1
 */
export const generateMaze = (
  width: number,
  height: number,
  _branchFactor: number = 0.8,
  goalBias: number = 0.2,
): Cell[][] => {
  if (width < 1 || height < 1) {
    throw new Error("Maze dimensions must be at least 1x1");
  }

  const grid: Cell[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      up: true, right: true, down: true, left: true, visited: false,
    }))
  );

  const inBounds = (x: number, y: number) =>
    x >= 0 && x < width && y >= 0 && y < height;

  const weightedRandom = (x: number, y: number): DirEntry => {
    const candidates = DIRS
      .filter(({ dx, dy }) => inBounds(x + dx, y + dy))
      .map(dir => {
        const nx = x + dir.dx;
        const ny = y + dir.dy;
        const toGoal = Math.abs(nx - (width - 1)) + Math.abs(ny - 0);
        const weight = 1 - goalBias * (toGoal / (width + height));
        return { dir, weight };
      });

    const total = candidates.reduce((s, c) => s + c.weight, 0);
    let r = Math.random() * total;
    for (const c of candidates) {
      r -= c.weight;
      if (r <= 0) return c.dir;
    }
    return candidates[candidates.length - 1].dir;
  };

  const carve = (x: number, y: number, dir: DirEntry) => {
    grid[y][x][dir.wall] = false;
    grid[y + dir.dy][x + dir.dx][dir.opposite] = false;
  };

  // Seed the maze with one randomly chosen cell
  const startX = Math.floor(Math.random() * width);
  const startY = Math.floor(Math.random() * height);
  grid[startY][startX].visited = true;
  let visitedCount = 1;
  const total = width * height;

  while (visitedCount < total) {
    // Pick a random unvisited cell as the walk origin
    let wx: number, wy: number;
    do {
      wx = Math.floor(Math.random() * width);
      wy = Math.floor(Math.random() * height);
    } while (grid[wy][wx].visited);

    const path: [number, number][] = [[wx, wy]];
    const pathDir: DirEntry[] = [];
    const pathIndex = new Map<string, number>();
    pathIndex.set(`${wx},${wy}`, 0);

    let cx = wx, cy = wy;

    while (!grid[cy][cx].visited) {
      const dir = weightedRandom(cx, cy);
      const nx = cx + dir.dx;
      const ny = cy + dir.dy;
      const key = `${nx},${ny}`;

      if (pathIndex.has(key)) {
        // Loop detected — erase back to the repeated cell
        const loopAt = pathIndex.get(key)!;
        for (let i = loopAt + 1; i < path.length; i++) {
          pathIndex.delete(`${path[i][0]},${path[i][1]}`);
        }
        path.splice(loopAt + 1);
        pathDir.splice(loopAt);
      } else {
        path.push([nx, ny]);
        pathDir.push(dir);
        pathIndex.set(key, path.length - 1);
      }

      cx = nx;
      cy = ny;
    }

    // Carve the resulting loop-free path into the maze
    for (let i = 0; i < pathDir.length; i++) {
      const [px, py] = path[i];
      carve(px, py, pathDir[i]);
      if (!grid[py][px].visited) {
        grid[py][px].visited = true;
        visitedCount++;
      }
    }
  }

  return grid;
};
