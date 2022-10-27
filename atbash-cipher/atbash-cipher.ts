const ALPHABET = [...'abcdefghijklmnopqrstuvwxyz']
const SPACE = /(.{5})/g
const SPECIAL = /[^a-zA-Z0-9]/g
const CHARACTER = /([a-zA-Z])/g

export default class AtbashCipher {
  normalise(message: string) {
    return message.toLowerCase().replace(SPECIAL, '')
  }

  space(message: string) {
    return message.replace(SPACE, '$1 ').trimEnd()
  }

  shift(_match: string, letter: string) {
    return ALPHABET[ALPHABET.length - 1 - ALPHABET.indexOf(letter)]
  }

  encode(message: string) {
    return this.space(this.normalise(message).replace(CHARACTER, this.shift))
  }

  decode(message: string) {
    return this.normalise(message).replace(CHARACTER, this.shift)
  }
}
