/* eslint-disable @typescript-eslint/no-extra-semi */
const DIRECTIONS = [
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
]

type Square = [number, number]
type Coords = { start: Square; end: Square }
type Word = { [key: string]: Coords }

class Grid {
  private grid: string[][]

  constructor(gridRaw: string[]) {
    this.grid = gridRaw.map((string) => string.split(""))
  }

  moveCoords([x, y]: Square, [dx, dy]: [number, number]) {
    return [x + dx, y + dy]
  }

  inGrid([x, y]: Square) {
    return y >= 0 && y < this.grid.length && x >= 0 && x < this.grid[0].length
  }

  locationOfWord(word: string, [startX, startY]: Square) {
    const location: Word = {}

    for (const [dy, dx] of DIRECTIONS) {
      let [endX, endY] = [startX, startY]
      let cursor = 0

      while (this.inGrid([endX, endY]) && this.grid[endY][endX] === word[cursor]) {
        if (cursor === word.length - 1) {
          location[word] = {
            start: [startY + 1, startX + 1],
            end: [endY + 1, endX + 1],
          }
        }

        ;[endX, endY] = this.moveCoords([endX, endY], [dx, dy])
        cursor += 1
      }
    }

    return location
  }

  find(string: string): Word | void {
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        const word: Word = this.locationOfWord(string, [x, y])
        if (word[string]) return word
      }
    }
  }
}

export default class WordsSearch {
  private grid: Grid

  constructor(wordPuzzle: string[]) {
    this.grid = new Grid(wordPuzzle)
  }

  find(words: string[]) {
    return words.reduce((found, word) => Object.assign(found, this.grid.find(word)), {})
  }
}
