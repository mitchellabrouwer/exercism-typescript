export default class BinarySearch {
  private _array: number[];

  constructor(array: number[]) {
    this._array = array;
  }

  get array() {
    return this.isSorted(this._array) ? this._array : undefined;
  }

  isSorted(array: number[]) {
    return array.every((number, index) => !index || number >= array[index - 1]);
  }

  indexOf(target: number) {
    if (!this.array) throw new Error("sorted array must first be set");

    let start = 0;
    let end = this.array.length - 1;
    let middle;

    while (start <= end) {
      middle = Math.floor((start + end) / 2);
      const value = this.array[middle];
      if (target === value) {
        return middle;
      } else if (target < value) {
        end = middle - 1;
      } else if (target > value) {
        start = middle + 1;
      }
    }

    return -1;
  }
}
