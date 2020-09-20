export default class Rational {
  constructor(private a: number, private b: number) {
    this.a = a
    this.b = b
    this.reduce()
  }

  greatestCommonFactor(a: number, b: number): number {
    return b === 0 ? a : Math.abs(this.greatestCommonFactor(b, a % b))
  }

  reduce() {
    const gcf = this.greatestCommonFactor(this.a, this.b) * Math.sign(this.b)
    this.a = this.a / gcf
    this.b = this.b / gcf
    return this
  }

  abs() {
    return new Rational(Math.abs(this.a), Math.abs(this.b))
  }

  add({ a: a2, b: b2 }: Rational) {
    return new Rational(this.a * b2 + a2 * this.b, this.b * b2)
  }

  sub({ a: a2, b: b2 }: Rational) {
    return new Rational(this.a * b2 - a2 * this.b, this.b * b2)
  }

  mul({ a: a2, b: b2 }: Rational) {
    return new Rational(this.a * a2, this.b * b2)
  }

  div({ a: a2, b: b2 }: Rational) {
    return new Rational(this.a * b2, a2 * this.b)
  }

  exprational(x: number) {
    return new Rational(this.a ** Math.abs(x), this.b ** Math.abs(x))
  }

  expreal(x: number) {
    return Number(Math.pow(x ** this.a, 1 / this.b).toPrecision(15))
  }
}
