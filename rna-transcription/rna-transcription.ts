type Dna = 'G' | 'C' | 'T' | 'A';
type Rna = 'C' | 'G' | 'A' | 'U';
type DnaSequence = string;
type RnaSequence = string;

const DNA_TO_RNA: { [key in Dna]: Rna } = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

class Transcriptor {
  isDna(character: string): character is Dna {
    return character in DNA_TO_RNA;
  }

  toRna(dnaString: RnaSequence): DnaSequence {
    let rnaString = '';
    for (const character of dnaString.split('')) {
      if (this.isDna(character)) {
        rnaString += DNA_TO_RNA[character];
      } else {
        throw new Error('Invalid input DNA.');
      }
    }
    return rnaString;
  }
}

export default Transcriptor;
