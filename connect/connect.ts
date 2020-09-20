const PO = 'O';
const PX = 'X';

const MOVES: Direction[] = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
  [1, -1],
  [-1, 1],
  // [-1, -1], illegal
  // [1, 1], illegal
];

type Player = 'O' | 'X';
type Square = [number, number];
type Direction = [number, number];
type GameBoard = string[][];

interface MoveOnPath {
  square: Square;
  path?: Path;
}

class Path {
  public path: Square[];

  constructor(square: Square[]) {
    this.path = square;
  }

  add(square: Square) {
    return new Path(this.path.concat([square]));
  }

  visited([y, x]: Square) {
    return this.path.find(([py, px]) => py === y && px === x);
  }
}

class PathFinder {
  constructor(private connect: ConnectBoard) {}

  hasWon(player: Player, [y, x]: Square) {
    return (
      (player === PO && y === this.connect.height - 1) ||
      (player === PX && x === this.connect.width - 1)
    );
  }

  validMove(player: Player, [y, x]: Square, path: Path) {
    return this.connect.getSquare([y, x]) === player && !path.visited([y, x]);
  }

  canMoveToEnd(player: Player, { square, path = new Path([square]) }: MoveOnPath): boolean {
    if (this.hasWon(player, square)) return true;

    for (const [dy, dx] of MOVES) {
      const [y, x] = square;
      const newSquare: Square = [y + dy, x + dx];

      if (this.validMove(player, newSquare, path)) {
        return this.canMoveToEnd(player, { square: newSquare, path: path.add(newSquare) });
      }
    }

    return false;
  }

  startingSquares(player: Player): Square[] {
    const length = player === PO ? this.connect.width : this.connect.height;
    return [...Array(length)]
      .map((_, idx) => (player === PO ? ([0, idx] as Square) : ([idx, 0] as Square)))
      .filter(([y, x]) => this.connect.board[y][x] === player);
  }

  canWin(player: Player) {
    return this.startingSquares(player).find(([py, px]) =>
      this.canMoveToEnd(player, { square: [py, px] as Square })
    );
  }
}

export default class ConnectBoard {
  public board: GameBoard;
  public height: number;
  public width: number;

  constructor(rawBoard: string[]) {
    this.board = rawBoard.map((row) => [...row.replace(/\s/g, '')]);
    this.height = this.board.length;
    this.width = this.board[0].length;
  }

  inBoard([y, x]: Square) {
    return y > -1 && y < this.height && x > -1 && x < this.width;
  }

  getSquare([y, x]: Square) {
    return this.inBoard([y, x]) ? this.board[y][x] : undefined;
  }

  winner() {
    const finder = new PathFinder(this);

    if (finder.canWin(PO)) {
      return PO;
    } else if (finder.canWin(PX)) {
      return PX;
    } else {
      return '';
    }
  }
}


export function multiply(a: number, b: number): number 
return a+b
}