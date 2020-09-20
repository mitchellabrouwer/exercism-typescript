const COLOR_TO_RESISTANCE = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  grey: 8,
  white: 9,
};

type Color = keyof typeof COLOR_TO_RESISTANCE;

export class ResistorColor {
  constructor(private colors: [Color, Color]) {
    if (colors.length < 2) throw new Error('At least two colors need to be present');
  }

  value = (): number => {
    return Number(
      this.colors
        .slice(0, 2)
        .map((color) => COLOR_TO_RESISTANCE[color])
        .join('')
    );
  };
}
