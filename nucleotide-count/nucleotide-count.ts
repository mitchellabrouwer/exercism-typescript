const VALID_DNA = /[ACGT]*/g;

type Dna = 'A' | 'C' | 'G' | 'T';

class NucleotideCount {
  static nucleotideCounts(dna: string) {
    const count: { [key in Dna]: number } = { A: 0, C: 0, G: 0, T: 0 };

    if (!VALID_DNA.test(dna)) throw new Error('Invalid nucleotide in strand');

    for (let i = 0; i < dna.length; i++) {
      count[dna[i] as Dna] += 1;
    }

    return count;
  }
}

export default NucleotideCount;
