type Grid = Readonly<number[][]>;

class Matrix {
  public _rows?: Grid;
  public _columns?: Grid;

  constructor(private input: string) {}

  createMatrix(string: string) {
    return string.split('\n').map((arr) => arr.split(' ').map((n) => Number(n)));
  }

  transposeMatrix(string: string) {
    const matrix = this.createMatrix(string);
    return matrix[0].map((_, i) => matrix.map((row) => row[i]));
  }

  get rows(): Grid {
    if (!this._rows) this._rows = this.createMatrix(this.input);
    return this._rows;
  }

  get columns(): Grid {
    if (!this._columns) this._columns = this.transposeMatrix(this.input);
    return this._columns;
  }
}

export default Matrix;
