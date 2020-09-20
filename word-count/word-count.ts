type Tally = Map<string, number>;

class Words {
  parse(phrase: string): string[] {
    return phrase.trim().toLowerCase().split(/\s+/);
  }

  count(phrase: string): Tally {
    const tally: Tally = new Map<string, number>();
    for (const word of this.parse(phrase)) {
      tally.set(word, (tally.get(word) || 0) + 1);
    }
    return tally;
  }
}

export default Words;
