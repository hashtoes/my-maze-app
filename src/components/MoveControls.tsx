import React from 'react';
import './MoveControls.css';
import type { Direction } from '../features/maze/types';
import { DIRECTIONS } from '../features/maze/constants';
import { numToDirection } from '../features/maze/utils/playerMove';

type Props = {
    onMove: (dir: Direction) => void;
    currentCell: {
        up: boolean;
        right: boolean;
        down: boolean;
        left: boolean;
    };
    playerDir: Direction;
    isGoalReached: boolean;
};

const MoveControls: React.FC<Props> = ({ onMove, currentCell, playerDir, isGoalReached }) => {
    const buttonClass = isGoalReached ? 'move-button goal' : 'move-button';
    const directionNum = DIRECTIONS[playerDir];

    return (
        <div className="controller">
            <div>
                <button
                    className={buttonClass}
                    onClick={() => onMove('up')}
                    disabled={currentCell[numToDirection(directionNum)]}
                >
                    ↑ 上
                </button>
            </div>
            <div>
                <button
                    className={buttonClass}
                    onClick={() => onMove('left')}
                    disabled={currentCell[numToDirection(directionNum + 3)]}
                >
                    ← 左
                </button>
                <button
                    className={buttonClass}
                    onClick={() => onMove('down')}
                    disabled={currentCell[numToDirection(directionNum + 2)]}
                >
                    ↓ 下
                </button>
                <button
                    className={buttonClass}
                    onClick={() => onMove('right')}
                    disabled={currentCell[numToDirection(directionNum + 1)]}
                >
                    → 右
                </button>
            </div>
        </div>
    );
};

export default MoveControls;
