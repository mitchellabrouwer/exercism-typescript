const LETTER = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
const NUMBER = [...'0246813579'];
const FORMAT = [LETTER, LETTER, NUMBER, NUMBER, NUMBER];

const random = (max: number) => Math.floor(Math.random() * (max - 1));
const shuffle = (array: number[]) => {
  array.forEach((_, i) => {
    const j = random(i);
    [array[j], array[i]] = [array[i], array[j]];
  });
  return array;
};

class NameBuilder {
  constructor(public format: string[][]) {
    this.format = format;
  }

  create = (dividend: number) => {
    let name = '';
    for (const characterOptions of this.format) {
      const [quotient, remainder] = this.divide(dividend, characterOptions.length);
      name += characterOptions[remainder];
      dividend = quotient;
    }
    return name;
  };

  divide = (dividend: number, divisor: number) => [
    Math.floor(dividend / divisor),
    dividend % divisor,
  ];
}

class NameRepository {
  private totalPossible = this.builder.format.reduce((total, option) => total * option.length, 1);
  private shuffledDividends = shuffle([...Array(this.totalPossible)].map((_, i) => i));
  private cursor = -1;

  constructor(private builder: NameBuilder) {
    this.builder = builder;
  }

  generate() {
    return this.builder.create(this.shuffledDividends[++this.cursor]);
  }

  reset() {
    this.cursor = -1;
  }
}

const robotNames = new NameRepository(new NameBuilder(FORMAT));

class Robot {
  private _name: string;

  constructor() {
    this._name = '';
    this.resetName();
  }

  get name() {
    return this._name;
  }

  resetAll() {
    robotNames.reset();
  }

  resetName() {
    this._name = robotNames.generate();
  }
}

export default Robot;
