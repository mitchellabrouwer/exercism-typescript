import score from './scrabble-score';

describe('Scrabble', () => {
  it('scores an empty word as zero', () => expect(score('')).toEqual(0));

  it('scores a null as zero', () => expect(score(undefined)).toEqual(0));

  it('scores a very short word', () => expect(score('a')).toEqual(1));

  it('scores the word by the number of letters', () => expect(score('street')).toEqual(6));

  it('scores more complicated words with more', () => expect(score('quirky')).toEqual(22));

  it('scores case insensitive words', () => expect(score('OXYPHENBUTAZONE')).toEqual(41));

  it('scores double letter', () => expect(score('stre**et')).toEqual(7));

  it('scores double word', () => expect(score('street!!')).toEqual(12));

  it('scores triple letter', () => expect(score('stre***et')).toEqual(8));

  it('scores triple word', () => expect(score('street!!!')).toEqual(18));

  it('scores multiple bonuses', () => expect(score('str**ee***t!!!')).toEqual(27));

  it('letter bonuses go after letter', () => expect(score('q***uirky')).toEqual(42));

  it('ignores random symbols', () => expect(score('str#@eet')).toEqual(6));
});
