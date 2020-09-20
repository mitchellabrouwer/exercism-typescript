/* eslint-disable @typescript-eslint/no-use-before-define */

const isInteger = (number: number) => number % 1 === 0

type TripletLimits = {
  maxFactor: number
  minFactor: number
  sum?: number
}

class PythagoreanTripletBuilder {
  maxFactor: number
  minFactor: number
  sum?: number

  constructor({ maxFactor, minFactor = 2, sum }: TripletLimits) {
    if (!maxFactor) throw new Error("max factor required")

    this.maxFactor = maxFactor
    this.minFactor = minFactor
    this.sum = sum
  }

  sumEquals(triplet: Triplet) {
    return !this.sum || this.sum === triplet.sum()
  }

  hypotenuseOf(a: number, b: number) {
    return Math.sqrt(a ** 2 + b ** 2)
  }

  *generate() {
    for (let a = this.minFactor; a < this.maxFactor + 1; a++) {
      for (let b = a + 1; b < this.maxFactor; b++) {
        const c = this.hypotenuseOf(a, b)
        const triplet = new Triplet(a, b, c)

        if (isInteger(c) && this.sumEquals(triplet) && triplet.isPythagorean()) {
          yield triplet
        }
      }
    }
  }
}

export default class Triplet {
  private a: number
  private b: number
  private c: number

  constructor(a: number, b: number, c: number) {
    this.a = a
    this.b = b
    this.c = c
  }

  sum() {
    return this.a + this.b + this.c
  }

  product() {
    return this.a * this.b * this.c
  }

  isPythagorean() {
    return this.a ** 2 + this.b ** 2 === this.c ** 2
  }

  static where(maxFactor: number, minFactor: number = 2, sum?: number) {
    return [...new PythagoreanTripletBuilder({ maxFactor, minFactor, sum }).generate()]
  }
}
