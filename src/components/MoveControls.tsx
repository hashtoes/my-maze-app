import React from 'react';
import './MoveControls.css';
import type { Direction } from '../features/maze/types';

type Props = {
    onMove: (dir: Direction) => void;
    currentCell: {
        top: boolean;
        right: boolean;
        bottom: boolean;
        left: boolean;
    };
    isGoalReached: boolean;
};

const MoveControls: React.FC<Props> = ({ onMove, currentCell, isGoalReached }) => {
    const buttonClass = isGoalReached ? 'move-button goal' : 'move-button';

    return (
        <div className="controller">
            <div>
                <button
                    className={buttonClass}
                    onClick={() => onMove('up')}
                    disabled={currentCell.top}
                >
                    ↑ 上
                </button>
            </div>
            <div>
                <button
                    className={buttonClass}
                    onClick={() => onMove('left')}
                    disabled={currentCell.left}
                >
                    ← 左
                </button>
                <button
                    className={buttonClass}
                    onClick={() => onMove('down')}
                    disabled={currentCell.bottom}
                >
                    ↓ 下
                </button>
                <button
                    className={buttonClass}
                    onClick={() => onMove('right')}
                    disabled={currentCell.right}
                >
                    → 右
                </button>
            </div>
        </div>
    );
};

export default MoveControls;
