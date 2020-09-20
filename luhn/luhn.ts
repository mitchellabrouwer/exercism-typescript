const TWO_OR_MORE_DIGITS = /[0-9\s]{2,}/g;

const chunk = (array: any[], count: number) => {
  const result: any[] = [];
  for (let i = 0; i < array.length; i += count) {
    result.push(array.slice(i, i + count));
  }
  return result;
};

export default class Luhn {
  static reverseDigits = (card: string) => card.replace(/\s/g, '').split('').map(Number).reverse();

  static luhnDoubleSum = (digits: number[]) =>
    chunk(digits, 2)
      .flatMap(([even, odd]) => (odd ? [even, odd * 2] : [even]))
      .map((digit) => (digit > 9 ? digit - 9 : digit))
      .reduce((a, b) => a + b);

  static valid(card: string) {
    if (!TWO_OR_MORE_DIGITS.test(card.trim())) return false;

    return this.luhnDoubleSum(this.reverseDigits(card)) % 10 === 0;
  }
}
