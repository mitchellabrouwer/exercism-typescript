const ALPHABET_LENGTH = 26;

class Pangram {
  constructor(private string: string) {
    this.string = string.toLowerCase();
  }

  isPangram(): boolean {
    return new Set(this.string.match(/[a-z]/g)).size === ALPHABET_LENGTH;
  }
}

export default Pangram;
