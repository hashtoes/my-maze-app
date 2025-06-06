import React, { useCallback, useMemo, useState } from 'react';
import MazeGrid from '../components/MazeGrid';
import MoveControls from '../components/MoveControls';
import { generateMaze } from '../features/maze/utils/mazeGenerator';
import { usePlayer } from '../features/maze/hooks/usePlayer';
import './Home.css';
import { playerPointOfViewCell } from '../features/maze/utils/playerMove';
import CurrentView from '../components/CurrentView';

const Home: React.FC = () => {
    const [rows, cols] = useMemo(() => {
        const params = new URLSearchParams(document.location.search);
        return [
            Math.max(
                5,
                Math.min(parseInt(params.get('h') ?? '10'), 100),
            ),
            Math.max(
                5,
                Math.min(parseInt(params.get('w') ?? '10'), 100),
            ),
        ];
    }, []);

    const [maze, setMaze] = useState(() => generateMaze(rows, cols));
    const { playerPos, movePlayer, resetPlayer, isGoalReached } = usePlayer(maze);
    const [showMaze, setShowMaze] = useState(false);

    const handleReset = useCallback(() => {
        const newMaze = generateMaze(rows, cols);
        setMaze(newMaze);
        resetPlayer();
    }, [rows, cols, resetPlayer]);
    const currentCell = maze[playerPos.y][playerPos.x];

    const adjustedCell = useMemo(
        () => playerPointOfViewCell(currentCell, playerPos.dir),
        [currentCell, playerPos.dir],
    );

    return (
        <div>
            <h3>{rows} x {cols}</h3>
            {showMaze && <MazeGrid maze={maze} playerPos={playerPos} />}
            <label style={{ marginBottom: '12px', display: 'block' }}>
                <input
                    type="checkbox"
                    checked={showMaze}
                    onChange={() => setShowMaze(!showMaze)}
                />
                迷路を表示
            </label>
            <CurrentView adjustedCell={adjustedCell} />
            <MoveControls
                onMove={movePlayer}
                adjustedCell={adjustedCell}
                isGoalReached={isGoalReached}
            />
            <div style={{ marginTop: '12px' }}>
                <button className="reset-button" onClick={handleReset}>🔁 リセット</button>
            </div>
        </div>
    );
};

export default Home;
