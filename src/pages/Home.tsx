import React, { useCallback, useMemo, useState } from 'react';
import MazeGrid from '../components/MazeGrid';
import { generateMaze } from '../features/maze/utils/mazeGenerator';
import { usePlayer } from '../features/maze/hooks/usePlayer';
import './Home.css';

const Home: React.FC = () => {
    const [rows, cols] = useMemo(() => {
        const parts = document.location.pathname.split('/');
        const r = parseInt(parts[2] || '10', 10);
        const c = parseInt(parts[3] || '10', 10);
        return [Math.max(5, Math.min(r, 100)), Math.max(5, Math.min(c, 100))];
    }, []);

    const [maze, setMaze] = useState(() => generateMaze(rows, cols));
    const { playerPos, movePlayer, resetPlayer, isGoalReached } = usePlayer(maze);
    const [showMaze, setShowMaze] = useState(true);

    const handleReset = useCallback(() => {
        const newMaze = generateMaze(rows, cols);
        setMaze(newMaze);
        resetPlayer();
    }, [rows, cols, resetPlayer]);
    const buttonClass = isGoalReached ? 'move-button goal' : 'move-button';

    return (
        <div>
            <h1>{rows}行 x {cols}列の迷路</h1>
            <label style={{ marginBottom: '12px', display: 'block' }}>
                <input
                    type="checkbox"
                    checked={showMaze}
                    onChange={() => setShowMaze(!showMaze)}
                />
                迷路を表示
            </label>
            {showMaze && <MazeGrid maze={maze} playerPos={playerPos} />}
            <div className="controller">
                <div>
                    <button className={buttonClass} onClick={() => movePlayer('up')}>↑ 上</button>
                </div>
                <div>
                    <button className={buttonClass} onClick={() => movePlayer('left')}>← 左</button>
                    <button className={buttonClass} onClick={() => movePlayer('down')}>↓ 下</button>
                    <button className={buttonClass} onClick={() => movePlayer('right')}>→ 右</button>
                </div>
            </div>
            <div style={{ marginTop: '12px' }}>
                <button className="reset-button" onClick={handleReset}>🔁 リセット</button>
            </div>
        </div>
    );
};

export default Home;
