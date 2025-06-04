// components/MazeGrid.tsx
import React from 'react';
import type { Cell } from '../features/maze/types';
import './MazeGrid.css';

interface MazeGridProps {
    maze: Cell[][];
    playerPos: { x: number; y: number };
}
const MazeGrid: React.FC<MazeGridProps> = ({ maze, playerPos }) => {
    const height = maze.length;

    return (
        <div className="maze-grid">
            {[...maze].reverse().map((row, rowIndexReversed) => {
                const y = height - 1 - rowIndexReversed;
                return (
                    <div className="maze-row" key={y}>
                        {row.map((cell, x) => {
                            const style = {
                                borderTop: cell.up ? '2px solid #333' : '2px solid transparent',
                                borderRight: cell.right ? '2px solid #333' : '2px solid transparent',
                                borderBottom: cell.down ? '2px solid #333' : '2px solid transparent',
                                borderLeft: cell.left ? '2px solid #333' : '2px solid transparent',
                            };

                            const isPlayer = playerPos.x === x && playerPos.y === y;

                            return (
                                <div
                                    key={`${x}-${y}`}
                                    className="maze-cell"
                                    style={{
                                        ...style,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {isPlayer ? 'x' : ''}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default MazeGrid;
