// src/pages/Home.tsx
import React, { useMemo } from 'react';
import MazeGrid from '../components/MazeGrid';
import { generateMaze } from '../features/maze/utils/mazeGenerator';

const Home: React.FC = () => {
    const [rows, cols] = useMemo(() => {
        const parts = document.location.pathname.split('/');
        const r = parseInt(parts[2] || '10', 10);
        const c = parseInt(parts[3] || '10', 10);
        const safeR = Math.max(5, Math.min(r, 100));
        const safeC = Math.max(5, Math.min(c, 100));
        return [safeR, safeC];
    }, []);

    const maze = useMemo(() => generateMaze(rows, cols), [rows, cols]);

    return (
        <div>
            <h1>{rows}行 x {cols}列の迷路</h1>
            <MazeGrid maze={maze} />
        </div>
    );
};

export default Home;
