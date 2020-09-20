type NucleotideTriple =
  | 'AUG'
  | 'UUU'
  | 'UUC'
  | 'UUA'
  | 'UUG'
  | 'UCU'
  | 'UCC'
  | 'UCA'
  | 'UCG'
  | 'UAU'
  | 'UAC'
  | 'UGU'
  | 'UGC'
  | 'UGG'
  | 'UAA'
  | 'UAG'
  | 'UGA'

type Terminator = 'UAA' | 'UAG' | 'UGA'

type TranslatableCodon = Exclude<NucleotideTriple, Terminator>

type Polypeptide =
  | 'Methionine'
  | 'Phenylalanine'
  | 'Leucine'
  | 'Serine'
  | 'Tyrosine'
  | 'Cysteine'
  | 'Tryptophan'

const PROTEINS: { [key in TranslatableCodon]: Polypeptide } = {
  AUG: 'Methionine',
  UUU: 'Phenylalanine',
  UUC: 'Phenylalanine',
  UUA: 'Leucine',
  UUG: 'Leucine',
  UCU: 'Serine',
  UCC: 'Serine',
  UCA: 'Serine',
  UCG: 'Serine',
  UAU: 'Tyrosine',
  UAC: 'Tyrosine',
  UGU: 'Cysteine',
  UGC: 'Cysteine',
  UGG: 'Tryptophan',
}

const TERMINATORS: Terminator[] = ['UAA', 'UAG', 'UGA']

class Codon {
  codon: NucleotideTriple
  static size = 3

  constructor(sequence: NucleotideTriple) {
    this.codon = sequence
  }

  static isValid(string: string): string is NucleotideTriple {
    return string in PROTEINS || TERMINATORS.includes(string as Terminator)
  }

  isTranslatable(codon: NucleotideTriple): codon is TranslatableCodon {
    return codon in PROTEINS
  }

  isTerminating() {
    return TERMINATORS.includes(this.codon as Terminator)
  }

  protein() {
    if (this.isTranslatable(this.codon)) return PROTEINS[this.codon]
  }
}

export default class ProteinTranslation {
  static codons(strand: string) {
    const codons = new RegExp(`\\w{1,${Codon.size}}`, 'g')
    return strand.match(codons) || []
  }

  static proteins(strand: string) {
    const proteins = []

    for (const potentialCodon of ProteinTranslation.codons(strand)) {
      const codon = Codon.isValid(potentialCodon) && new Codon(potentialCodon)

      if (!codon) {
        throw new Error('Invalid codon')
      } else if (codon.isTerminating()) {
        break
      } else {
        proteins.push(codon.protein())
      }
    }

    return proteins
  }
}
