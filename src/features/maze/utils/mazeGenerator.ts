import type { Cell } from "../types";

export const generateMaze = (
  width: number,
  height: number,
  branchFactor: number = 0.8,
  goalBias: number = 0.2,
): Cell[][] => {
  const grid: Cell[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      up: true,
      right: true,
      down: true,
      left: true,
      visited: false,
    }))
  );

  const inBounds = (x: number, y: number) => x >= 0 && x < width && y >= 0 && y < height;

  const directions = [
    { dx: 0, dy: 1, wall: 'up', opposite: 'down' },
    { dx: 1, dy: 0, wall: 'right', opposite: 'left' },
    { dx: 0, dy: -1, wall: 'down', opposite: 'up' },
    { dx: -1, dy: 0, wall: 'left', opposite: 'right' },
  ] as const;

  const frontier: [number, number][] = [[0, 0]];
  grid[0][0].visited = true;

  while (frontier.length > 0) {
    const index =
      Math.random() < branchFactor
        ? frontier.length - 1
        : Math.floor(Math.random() * frontier.length);
    const [x, y] = frontier[index];

    // Get unvisited neighbors
    const neighbors = directions
      .map(({ dx, dy, wall, opposite }) => {
        const nx = x + dx;
        const ny = y + dy;
        if (inBounds(nx, ny) && !grid[ny][nx].visited) {
          return { x: nx, y: ny, dx, dy, wall, opposite };
        }
        return null;
      })
      .filter((n): n is NonNullable<typeof n> => n !== null);

    if (neighbors.length === 0) {
      frontier.splice(index, 1);
      continue;
    }

    // Optional: bias against going toward the goal
    const biasedNeighbors = neighbors.map(n => {
      const toGoal =
        Math.abs(n.x - (width - 1)) + Math.abs(n.y - 0); // y=0 is top
      return { ...n, weight: 1 - goalBias * (toGoal / (width + height)) };
    });

    // Weighted random selection
    const totalWeight = biasedNeighbors.reduce((sum, n) => sum + n.weight, 0);
    let r = Math.random() * totalWeight;
    let chosen: typeof biasedNeighbors[0] = biasedNeighbors[0];
    for (const n of biasedNeighbors) {
      r -= n.weight;
      if (r <= 0) {
        chosen = n;
        break;
      }
    }

    // Carve passage
    grid[y][x][chosen.wall] = false;
    grid[chosen.y][chosen.x][chosen.opposite] = false;
    grid[chosen.y][chosen.x].visited = true;
    frontier.push([chosen.x, chosen.y]);
  }

  return grid;
}
