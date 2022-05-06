// const t = (d:string) => new Date(d).getTime();

// const daysBetween = (from: string, to: string):number => (t(to) - t(from)) / day;

const TIME = {
  // JavaScript dates are calculated in milliseconds as a base
  ms: 1,

  get second() {
    return this.ms;
  },

  get minute() {
    return 60 * this.second;
  },

  get hour() {
    return 60 * this.minute;
  },

  get day() {
    return 24 * this.hour;
  },

  get week() {
    return 7 * this.day;
  },

  get fortnight() {
    return 14 * this.day;
  },

  // there is no "standard" month length, but I am rounding to 30 days
  get month() {
    return 30 * this.day;
  },

  get year() {
    return 365 * this.day;
  },

  get leapYear() {
    return 366 * this.day;
  },

  get olympiad() {
    return 4 * this.year;
  },

  get decade() {
    return 10 * this.year;
  },

  get jubilee() {
    return 50 * this.year;
  },

  get century() {
    return 100 * this.year;
  },
};

export default TIME;
