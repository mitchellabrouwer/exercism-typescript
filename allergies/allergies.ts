const ALLERGEN_TO_BITMASK: { [key: string]: number } = {
  eggs: 1,
  peanuts: 2,
  shellfish: 4,
  strawberries: 8,
  tomatoes: 16,
  chocolate: 32,
  pollen: 64,
  cats: 128,
};

export default class Allergies {
  constructor(private bitmask: number) {
    this.bitmask = bitmask;
  }

  allergicTo(allergen: string) {
    const flag = ALLERGEN_TO_BITMASK[allergen];
    if (!flag) throw new Error('Incorrect allergen entered');
    return flag & this.bitmask;
  }

  list() {
    return Object.keys(ALLERGEN_TO_BITMASK).filter((allergy) => this.allergicTo(allergy));
  }
}
