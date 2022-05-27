const CONSTANTS = {
  humanOffset: 1,
};

/**
 * T is an object containing precalculated number of milliseconds
 * of various time measurements
 */
export const T = {
  second: 1000,
  minute: 60000,
  hour: 3.6e6,
  day: 8.64e7,
  week: 6.048e8,
  fortnight: 12.096e8,
  month: 2.592e9,
  year: 3.1536e10,
  leapYear: 3.16224e10,
  olympiad: 1.26144e11,
  decade: 3.1536e11,
  jubilee: 1.5768e12,
  century: 3.1536e12,
};

/**
 * invalidDateString tests the validity of a date string used to create
 * a JavaScript date.
 *
 * @example
 *  invalidDateString("20 APR 1969 04:20:00Z"); // false
 *  invalidDateString("not a valid date string"); // true
 *
 * @function
 * @name invalidDateString
 * @param datestring RFC 2822 timestamp
 * @returns {boolean} A boolean value representing if the string is a valid timestamp
 */
export const invalidDateString = (datestring: string) =>
  isNaN(Date.parse(datestring));

/**
 * "d" is shorthand for creating a new Date. This function takes a date string
 * and returns a Date object or null if the string is an invalid date string;
 *
 * @function
 * @name d
 * @param datestring RFC 2822 timestamp
 * @returns {Date | null} Date object or null if invalid datestring
 */
export const d = (datestring: string): Date | null =>
  invalidDateString(datestring) ? null : new Date(datestring);

/**
 * "t" takes a valid date string, creates a date, and returns the value of
 * Date.getTime. Which is the number of milliseconds since the ECMAScript
 * epoch (also the UNIX epoch).
 *
 * @function
 * @name t
 * @param {string} datestring a valid javascript date string
 * @returns {number | undefined} Date in milliseconds or null if invalid datestring
 */
export const t = (date: string): number | undefined => d(date)?.getTime();

/**
 * timeDiff is a curried function that takes an number representing "now" in the first call
 * and takes a Date object in the second call to return the difference in milliseconds between
 * "now" and the given date. As a curried function, this allows for "now" to be partially applied
 * for testing or getting the difference between a fixed date.
 * @example
 *  timeDiff(new Date().getTime())(new Date("10 SEP 1991 00:00:00Z"));
 *
 *  const episodeIV = d("25 MAY 1977") || new Date();
 *  const episodeV = d("21 MAY 1980") || new Date();
 *  timeDiff(episodeV.getTime())(episodeIV); // 94348800000
 *
 * @function
 * @name timeDiff
 * @param {Date} historicDate
 * @return {number} Number of milliseconds difference between historicDate and now
 */
export const timeDiff = (now: number) => (historicDate: Date) =>
  now - historicDate.getTime();

/**
 * @function
 * @name daysSince
 * @param {Date} when
 * @param {number} [now=Date.now()]
 * @returns {number} Number of days since supplied date
 */
export const daysSince = (when: Date, now: number = Date.now()) =>
  Math.floor(timeDiff(now)(when) / T.day) + CONSTANTS.humanOffset;

/**
 * @function
 * @name daysFrom
 * @param {Date} when Date to calculate from now
 * @returns {number} Number of days until "when" date
 */
export const daysFrom = (when: Date) => Math.abs(daysSince(when));

/**
 * @function
 * @name daysBetween
 * @param {string} from RFC 2822 timestamp
 * @param {string} to RFC 2822 timestamp
 * @returns {number} Number of days between "from" date and "to" date
 */
export const daysBetween = (from: string, to: string): number | null => {
  if (invalidDateString(from) || invalidDateString(to)) {
    return null;
  }
  // using nullish coalescing since t can return "undefined". This seems very
  // unlikely since we are peforming the check for invalidDateStrings above.
  return (t(to) ?? 0 - (t(from) ?? 0)) / T.day;
};

const TIME = Object.assign(T, {
  invalidDateString,
  t,
  timeFromString: t,
  d,
  dateFromString: d,
  timeDiff,
  daysSince,
  daysFrom,
  daysBetween,
});

export default TIME;
