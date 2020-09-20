const isEven = (n: number) => n % 2 === 0;

export default class CollatzConjecture {
  static steps(n: number) {
    if (n <= 0) throw new Error('Only positive numbers are allowed');

    let steps = 0;

    while (n !== 1) {
      n = isEven(n) ? n / 2 : n * 3 + 1;
      steps++;
    }

    return steps;
  }
}
