const CORNER = '+'
const VERTICAL = /\||\+/
const HORIZONTAL = /^\+(-|\+)*\+$/

type Line = [number, number]
type Square = [Line, Line]
type Grid = string[]
type Row = string

class Rectangle {
  public rectangle: Grid

  constructor(grid: Grid, [[x1, y1], [x2, y2]]: Square) {
    this.rectangle = this.buildRectangle(grid, [
      [x1, y1],
      [x2, y2],
    ])
  }

  buildRectangle(grid: Grid, [[x1, y1], [x2, y2]]: Square) {
    return grid.slice(y1, y1 + y2 + 1).map((val) => val.slice(x1, x2 + x1 + 1))
  }

  hasHorizontals() {
    return (
      HORIZONTAL.test(this.rectangle[0]) &&
      HORIZONTAL.test(this.rectangle[this.rectangle.length - 1])
    )
  }

  hasVerticals() {
    return this.rectangle.every(
      (row) => VERTICAL.test(row[0]) && VERTICAL.test(row[row.length - 1])
    )
  }

  isValid() {
    return this.hasHorizontals() && this.hasVerticals()
  }
}

export default class Rectangles {
  static numberOfRectangles(grid: Grid, row: Row, [x1, y1]: Line, y2: number) {
    return [...row]
      .map((_, x2) =>
        new Rectangle(grid, [
          [x1, x2],
          [y1, y2],
        ]).isValid()
      )
      .reduce((sum, hasRectangle) => (hasRectangle ? sum + 1 : sum), 0)
  }

  static countFromLocation(grid: Grid, y1: number, x1: number) {
    return grid
      .slice(y1)
      .map((row) => row.slice(x1))
      .map((row, y2) => this.numberOfRectangles(grid, row, [x1, y1], y2))
      .reduce((a, b) => a + b)
  }

  static count(grid: string[]) {
    let count = 0
    grid.forEach((row, y) =>
      [...row].forEach((elm, x) =>
        elm === CORNER ? (count += this.countFromLocation(grid, y, x)) : count
      )
    )
    return count
  }
}
