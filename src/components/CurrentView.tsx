import type { Direction } from "../features/maze/types";
import './CurrentView.css';

type Props = {
    adjustedCell: {
        [key in Exclude<Direction, 'down'>]: boolean;
    }
};

const FORWARD_WALL = new Map<boolean, string>([
    [true, '/////||\\\\\\\\\\'],
    [false, '/////\u00A0\u00A0\\\\\\\\\\'],
]);

const LEFT_WALL = new Map<boolean, string>([
    [true, '///'],
    [false, '\u00A0\u00A0\u00A0'],
]);

const RIGHT_WALL = new Map<boolean, string>([
    [true, '\\\\\\'],
    [false, '\u00A0\u00A0\u00A0'],
]);

const CENTER = '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0';
const HERE = '/\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\\';

const CurrentView: React.FC<Props> = ({ adjustedCell: { up, left, right } }) => (
    <div className="current-view">
        <div>{FORWARD_WALL.get(up)}</div>
        <div>
            <span>{LEFT_WALL.get(left)}</span>
            <span>{CENTER}</span>
            <span>{RIGHT_WALL.get(right)}</span>
        </div>
        <div>{HERE}</div>
    </div>
);

export default CurrentView;
