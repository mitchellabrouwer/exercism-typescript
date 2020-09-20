import Grid from './grid'
import type { Range } from './grid'

const CHARACTER_HEIGHT = 4
const CHARACTER_WIDTH = 3
const NUMBERS = [
  ' _ | ||_|   ', // 0
  '     |  |   ', // 1
  ' _  _||_    ', // 2
  ' _  _| _|   ', // 3
  '   |_|  |   ', // 4
  ' _ |_  _|   ', // 5
  ' _ |_ |_|   ', // 6
  ' _   |  |   ', // 7
  ' _ |_||_|   ', // 8
  ' _ |_| _|   ', // 9
]

export default class OcrParser {
  static identify = (grid: string) => {
    const number = NUMBERS.indexOf(grid)
    return number !== -1 ? number : '?'
  }

  static letterBoundsAt = (x: number, y: number) => {
    return [
      [y * CHARACTER_HEIGHT, y * CHARACTER_HEIGHT + CHARACTER_HEIGHT],
      [x * CHARACTER_WIDTH, x * CHARACTER_WIDTH + CHARACTER_WIDTH],
    ] as [Range, Range]
  }

  static convert(ocrData: string) {
    const rawOCRGrid = Grid.fromString(ocrData)
    const finalHeight = rawOCRGrid.height / CHARACTER_HEIGHT
    const finalWidth = rawOCRGrid.width / CHARACTER_WIDTH
    const grid = Grid.createEmpty(finalHeight, finalWidth)

    const numberGrid = grid.map((x, y) => {
      const box = rawOCRGrid.subgrid(OcrParser.letterBoundsAt(x, y))
      return OcrParser.identify(box.stringify())
    })

    return numberGrid.rows.join(',')
  }
}
