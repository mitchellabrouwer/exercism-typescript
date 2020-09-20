const multiples = (num: number, limit: number, result: number[] = [], i = 1): number[] =>
  num * i >= limit ? result : multiples(num, limit, [...result, num * i], i + 1);

const deDupe = (num: number, index: number, array: number[]): boolean =>
  array.indexOf(num) === index;

export default function SumOfMultiples(numbers: number[]) {
  return {
    to: (limit: number) =>
      numbers
        .flatMap((number) => multiples(number, limit))
        .filter(deDupe)
        .reduce((a, b) => a + b, 0),
  };
}
