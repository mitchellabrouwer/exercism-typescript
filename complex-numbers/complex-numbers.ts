export default class ComplexNumber {
  private _a: number
  private _b: number

  constructor(real: number, imaginary: number) {
    this._a = real
    this._b = imaginary
  }

  get real() {
    return this._a
  }

  get imag() {
    return this._b
  }

  get abs() {
    return Math.sqrt(this._a ** 2 + this._b ** 2)
  }

  get conj() {
    return new ComplexNumber(this._a, this._b === 0 ? 0 : this._b * -1) // avoid returning -0
  }

  get exp() {
    return new ComplexNumber(Math.exp(this._a) * Math.cos(this._b), Math.sin(this._b))
  }

  add({ _a: c, _b: d }: ComplexNumber) {
    return new ComplexNumber(this._a + c, this._b + d)
  }

  sub({ _a: c, _b: d }: ComplexNumber) {
    return new ComplexNumber(this._a - c, this._b - d)
  }

  mul({ _a: c, _b: d }: ComplexNumber) {
    return new ComplexNumber(this._a * c - this._b * d, this._b * c + this._a * d)
  }

  div({ _a: c, _b: d }: ComplexNumber) {
    return new ComplexNumber(
      (this._a * c + this._b * d) / (c ** 2 + d ** 2),
      (this._b * c - this._a * d) / (c ** 2 + d ** 2)
    )
  }
}
