// components/MazeGrid.tsx
import React from 'react';
import type { Cell } from '../features/maze/types';
import './MazeGrid.css';

interface MazeGridProps {
    maze: Cell[][];
}
const MazeGrid: React.FC<MazeGridProps> = ({ maze }) => {
    const height = maze.length;

    return (
        <div className="maze-grid">
            {[...maze].reverse().map((row, rowIndexReversed) => {
                const y = height - 1 - rowIndexReversed;
                return (
                    <div className="maze-row" key={y}>
                        {row.map((cell, x) => {
                            const style = {
                                borderTop: cell.top ? '2px solid #333' : '2px solid transparent',
                                borderRight: cell.right ? '2px solid #333' : '2px solid transparent',
                                borderBottom: cell.bottom ? '2px solid #333' : '2px solid transparent',
                                borderLeft: cell.left ? '2px solid #333' : '2px solid transparent',
                            };

                            const isPlayer = x === 0 && y === 0;

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
