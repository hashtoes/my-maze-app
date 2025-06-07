import React from 'react';
import './MoveControls.css';
import type { Direction } from '../features/maze/types';

type Props = {
    onMove: (dir: Direction) => void;
    adjustedCell: {
        up: boolean;
        right: boolean;
        down: boolean;
        left: boolean;
    };
    isGoalReached: boolean;
};

const MoveControls: React.FC<Props> = ({ onMove, adjustedCell, isGoalReached }) => {
    const buttonClass = isGoalReached ? 'move-button goal' : 'move-button';

    return (
        <div className="controller">
            <div>
                <button
                    className={buttonClass}
                    onClick={() => onMove('up')}
                    disabled={adjustedCell.up}
                >
                    ↑ 上
                </button>
            </div>
            <div>
                <button
                    className={buttonClass}
                    onClick={() => onMove('left')}
                    disabled={adjustedCell.left}
                >
                    ← 左
                </button>
                <button
                    className={buttonClass}
                    onClick={() => onMove('down')}
                    disabled={adjustedCell.down}
                >
                    ↓ 下
                </button>
                <button
                    className={buttonClass}
                    onClick={() => onMove('right')}
                    disabled={adjustedCell.right}
                >
                    → 右
                </button>
            </div>
        </div>
    );
};

export default MoveControls;
