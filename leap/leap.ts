const isDivisible = (divisor: number, dividend: number): boolean =>
  dividend % divisor === 0;

const isLeapYear = (year: number): boolean =>
  (isDivisible(4, year) && !isDivisible(100, year)) || isDivisible(400, year);

export default isLeapYear;
