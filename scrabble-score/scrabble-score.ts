const POINTS: { [key: string]: number } = {
  A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1, R: 1, S: 1, T: 1,
  D: 2, G: 2,
  B: 3, C: 3, M: 3, P: 3,
  F: 4, H: 4, V: 4, W: 4, Y: 4,
  K: 5,
  J: 8, X: 8,
  Q: 10, Z: 10,
};
const LETTER_BONUS = /\w\**/g;
const WORD_BONUS = /!/g;

function readTilePoints(tile: string) {
  const [letter, bonus] = tile.match(/\w|\*+/g) ?? [];
  return POINTS[letter] * (bonus?.length || 1);
}

function score(word: string | undefined) {
  if (!word) return 0;

  const wordBonus = word.match(WORD_BONUS)?.length ?? 1;
  const tiles = word.toUpperCase().match(LETTER_BONUS) ?? [];

  let score = 0;
  for (const tile of tiles) {
    score += readTilePoints(tile);
  }

  return score * wordBonus;
}

export default score;
