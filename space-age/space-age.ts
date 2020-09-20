type Planet =
  | 'Earth'
  | 'Mercury'
  | 'Venus'
  | 'Earth'
  | 'Mars'
  | 'Jupiter'
  | 'Saturn'
  | 'Uranus'
  | 'Neptune';

const EARTH_YEAR_SECONDS: number = 365.25 * 24 * 60 * 60;
const ORBITAL_PERIOD: { [key in Planet]: number } = {
  Earth: 1,
  Mercury: 0.2408467,
  Venus: 0.61519726,
  Mars: 1.8808158,
  Jupiter: 11.862615,
  Saturn: 29.447498,
  Uranus: 84.016846,
  Neptune: 164.79132,
};

class SpaceAge {
  constructor(public seconds: number) {}

  getAge(planet: Planet): number {
    return Math.round((this.seconds / (ORBITAL_PERIOD[planet] * EARTH_YEAR_SECONDS)) * 1e2) / 1e2;
  }

  onEarth(): number {
    return this.getAge('Earth');
  }

  onMercury = (): number => this.getAge('Mercury');

  onVenus(): number {
    return this.getAge('Venus');
  }

  onMars(): number {
    return this.getAge('Mars');
  }

  onJupiter(): number {
    return this.getAge('Jupiter');
  }

  onSaturn(): number {
    return this.getAge('Saturn');
  }

  onUranus(): number {
    return this.getAge('Uranus');
  }

  onNeptune(): number {
    return this.getAge('Neptune');
  }
}

export default SpaceAge;
