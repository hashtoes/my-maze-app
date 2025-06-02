// components/MazeGrid.tsx
import React from 'react';
import type { Cell } from '../features/maze/types';
import './MazeGrid.css';

interface MazeGridProps {
    maze: Cell[][];
}

const MazeGrid: React.FC<MazeGridProps> = ({ maze }) => {
    return (
        <div className="maze-grid">
            {[...maze].reverse().map((row, rowIndex) => (
                <div className="maze-row" key={maze.length - 1 - rowIndex}>
                    {row.map((cell, colIndex) => {
                        const style = {
                            borderTop: cell.top ? '2px solid #333' : '2px solid transparent',
                            borderRight: cell.right ? '2px solid #333' : '2px solid transparent',
                            borderBottom: cell.bottom ? '2px solid #333' : '2px solid transparent',
                            borderLeft: cell.left ? '2px solid #333' : '2px solid transparent',
                        };
                        return (
                            <div
                                key={`${maze.length - 1 - rowIndex}-${colIndex}`}
                                className="maze-cell"
                                style={style}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default MazeGrid;
