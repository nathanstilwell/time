import TIME, { invalidDateString, d, t, timeDiff, daysSince } from "./index";

const { dateFromString, timeFromString } = TIME;

const CHECK = {
  // JavaScript dates are calculated in milliseconds as a base
  ms: 1,

  get second() {
    return 1000 * this.ms;
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

const hasProperty = (obj: object | null, prop: string) =>
  Object.prototype.hasOwnProperty.call(obj, prop);

describe("TIME object", () => {
  test("should be an object", () => {
    expect(typeof TIME).toBe("object");
  });

  describe("should calculate correct values for constants", () => {
    test("second", () => expect(CHECK.second).toEqual(TIME.second));
    test("minute", () => expect(CHECK.minute).toEqual(TIME.minute));
    test("hour", () => expect(CHECK.hour).toEqual(TIME.hour));
    test("day", () => expect(CHECK.day).toEqual(TIME.day));
    test("week", () => expect(CHECK.week).toEqual(TIME.week));
    test("fortnight", () => expect(CHECK.fortnight).toEqual(TIME.fortnight));
    test("month", () => expect(CHECK.month).toEqual(TIME.month));
    test("year", () => expect(CHECK.year).toEqual(TIME.year));
    test("leapYear", () => expect(CHECK.leapYear).toEqual(TIME.leapYear));
    test("olympiad", () => expect(CHECK.olympiad).toEqual(TIME.olympiad));
    test("decade", () => expect(CHECK.decade).toEqual(TIME.decade));
    test("jubilee", () => expect(CHECK.jubilee).toEqual(TIME.jubilee));
    test("century", () => expect(CHECK.century).toEqual(TIME.century));
  });

  test("has expected methods", () => {
    expect(hasProperty(TIME, "invalidDateString")).toBe(true);
    expect(hasProperty(TIME, "t")).toBe(true);
    expect(hasProperty(TIME, "timeFromString")).toBe(true);
    expect(hasProperty(TIME, "d")).toBe(true);
    expect(hasProperty(TIME, "dateFromString")).toBe(true);
    expect(hasProperty(TIME, "timeDiff")).toBe(true);
    expect(hasProperty(TIME, "daysSince")).toBe(true);
    expect(hasProperty(TIME, "daysFrom")).toBe(true);
    expect(hasProperty(TIME, "daysBetween")).toBe(true);
  });
});

describe("utility methods", () => {
  test("invalidDateString", () => {
    // RFC 2822
    expect(invalidDateString("Sun Apr 20 1969 04:20:00 GMT-0400")).toBe(false);
    // ISO 8601
    expect(invalidDateString("1969-04-20T04:20:00+05:00")).toBe(false);
    // short
    expect(invalidDateString("04/20/1969")).toBe(false);
    // long
    expect(invalidDateString("20 APR 1969")).toBe(false);
    expect(invalidDateString("20APR1969")).toBe(false);
    expect(invalidDateString("20-APR-1969")).toBe(false);
    expect(invalidDateString("20-APR 1969")).toBe(false);
    //
    // invalid strings
    //
    expect(invalidDateString("-22088400000")).toBe(true);
    expect(invalidDateString("20/04/1969")).toBe(true);
    expect(invalidDateString("6969 69 69 69:69:69")).toBe(true);
    expect(invalidDateString("foo bar baz 4/20 1969 LOL")).toBe(true);
    expect(invalidDateString("nope")).toBe(true);
  });

  describe("d or dateFromString", () => {
    test("are the same function", () => {
      expect(d).toEqual(dateFromString);
    });
    test("returns an object given a valid date string", () => {
      const test = d("06 JUNE 2006");
      expect(typeof test).toBe("object");
      expect(test?.getTime()).toBe(1149566400000);
    });
    test("returns null given and invalid date string", () =>
      expect(d("6969 69 69 69:69:69")).toEqual(null));
  });

  describe("t or timeFromString", () => {
    test("are the same function", () => expect(t).toEqual(timeFromString));
    test("returns a number of milliseconds given a valid date string", () =>
      expect(t("6/6/6")).toBe(1149566400000));
    test("returns undefined given an invalid date string", () =>
      expect(t("nope")).toBe(undefined));
  });

  describe("timeDiff", () => {
    const now = t("2022-06-30T00:00:00+05:00") || 0;
    const diff = timeDiff(now);

    test('returns the difference in milliseconds between a historic date and "now"', () => {
      const diffDate = d("2022-05-22T00:00:00+05:00") || new Date();
      const result = diff(diffDate);
      const expected = 3369600000;
      expect(result).toBe(expected);
    });

    test('returns a negative number for a date after "now"', () => {
      const diffDate = d("2022-07-01T00:00:00+05:00") || new Date();
      const result = diff(diffDate);
      const expected = -86400000;
      expect(result).toBe(expected);
    });
  });
});

describe("Comparing functions", () => {
  describe("daysSince fn", () => {
    const now = t("26 MAY 2022") || 0;

    test("should calculate days between two valid dates", () => {
      const then = d("05 SEP 1979") || new Date(); // 15629
      const result = daysSince(then, now);
      const expected = 15605;
      expect(result).toBe(expected);
    });

    test("should return negative days for a future date", () => {
      const then = d("30 JUN 2022") || new Date();
      const result = daysSince(then, now);
      const expected = -34;
      expect(result).toBe(expected);
    });
  });

  // describe("daysFrom fn", () => {});
  // describe("daysBetween fn", () => {});
});
