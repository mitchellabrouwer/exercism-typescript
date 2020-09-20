const HOUR_MINUTES = 60;
const DAY_HOURS = 24;
const DAY_MINUTES = HOUR_MINUTES * DAY_HOURS;

const padZero = (digit: number) => digit.toString().padStart(2, '0');
const modulo = (num: number, mod: number) => ((num % mod) + mod) % mod;

export default class Clock {
  private totalInMinutes: number;

  constructor(hoursInput = 0, minutesInput = 0) {
    this.totalInMinutes = this.normalisedMinutes(hoursInput, minutesInput);
  }

  get hours() {
    return Math.floor(this.totalInMinutes / HOUR_MINUTES);
  }

  get minutes() {
    return this.totalInMinutes % HOUR_MINUTES;
  }

  normalisedMinutes(hours: number, minutes: number) {
    return modulo(hours * HOUR_MINUTES + minutes, DAY_MINUTES);
  }

  plus(minutes: number) {
    return new Clock(0, this.totalInMinutes + minutes);
  }

  minus(minutes: number) {
    return this.plus(-minutes);
  }

  equals(clock: Clock) {
    return this.totalInMinutes === clock.totalInMinutes;
  }

  toString() {
    return `${padZero(this.hours)}:` + `${padZero(this.minutes)}`;
  }
}
