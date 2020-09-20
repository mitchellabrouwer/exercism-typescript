export type Range = [number, number]

export default class Grid<T> {
  height: number
  width: number

  constructor(public grid: T[][]) {
    this.grid = grid
    this.height = this.grid.length
    this.width = this.grid[0].length
  }

  static fromString(gridString: string) {
    return new Grid(gridString.split('\n').map((row) => row.split('')))
  }

  static createEmpty(height: number, width: number) {
    return new Grid([...Array(height)].map((_) => Array(width).fill('')))
  }

  get rows() {
    return this.grid.map((row) => row.join(''))
  }

  map(callback: (x: number, y: number) => any) {
    return new Grid(this.grid.map((row, y) => row.map((_, x) => callback(x, y))))
  }

  stringify() {
    return this.grid.map((row) => row.join('')).join('')
  }

  subgrid([[startY, endY], [startX, endX]]: [Range, Range]) {
    return new Grid(this.grid.slice(startY, endY).map((row) => row.slice(startX, endX)))
  }
}
