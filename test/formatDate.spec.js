//import { describe, it, before, after } from 'mocha';
//import { expect } from 'chai';
import formatDate from '../src/formatDate';
import moment from 'moment-timezone';
import sinon from 'sinon';

describe('formatDate specs', () => {
    const timezone = 'America/Chicago';
    const time12Hour = 'h:mma';
    const time24Hour = 'H:mm';
    // 5/4/2017 noon - UTC time
    const date = moment.utc('2017-05-04 12:00:00').tz(timezone).toDate();
    const justNow = moment.utc('2017-05-04 11:59:35').tz(timezone).toDate();
    const minutesAgo = moment.utc('2017-05-04 11:45:00').tz(timezone).toDate();
    const today = moment.utc('2017-05-04 09:15:00').tz(timezone).toDate();
    const yesterdayHoursAgo = moment.utc('2017-05-03 16:10:00').tz(timezone).toDate();
    const oneDayAgo = moment.utc('2017-05-03 10:00:00').tz(timezone).toDate();
    const daysAgo = moment.utc('2017-05-02 10:00:00').tz(timezone).toDate();
    const almostSevenDaysAgo = moment.utc('2017-04-27 13:30:00').tz(timezone).toDate();
    const weekPlusAgo = moment.utc('2017-04-26 16:10:00').tz(timezone).toDate();
    const lastYear = moment.utc('2016-12-24 23:30:00').tz(timezone).toDate();
    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers(date.getTime());
        // "Now" Should be 7AM Central time
        expect(moment.utc().tz(timezone).format('YYYY-MM-DD h:mm:ss')).toBe('2017-05-04 7:00:00');
    });

    afterEach(() => {
        clock.restore();
    });

    const testCases = [
        [justNow, time12Hour, 'Just Now'],
        [justNow, time24Hour, 'Just Now'],
        [minutesAgo, time12Hour, '15 min ago'],
        [minutesAgo, time24Hour, '15 min ago'],
        [today, time12Hour, '4:15am'],
        [today, time24Hour, '4:15'],
        [yesterdayHoursAgo, time12Hour, '19 hours ago'],
        [yesterdayHoursAgo, time24Hour, '19 hours ago'],
        [oneDayAgo, time12Hour, '1 day ago'],
        [oneDayAgo, time24Hour, '1 day ago'],
        [daysAgo, time12Hour, '2 days ago'],
        [daysAgo, time24Hour, '2 days ago'],
        [almostSevenDaysAgo, time12Hour, '6 days ago'],
        [almostSevenDaysAgo, time24Hour, '6 days ago'],
        [weekPlusAgo, time12Hour, 'Apr 26'],
        [weekPlusAgo, time24Hour, 'Apr 26'],
        [lastYear, time12Hour, 'Dec 24, \'16'],
        [lastYear, time24Hour, 'Dec 24, \'16']
    ];
    testCases.forEach((test) => {
        const [dateTime, format, expected] = test;
        it(`should convert ${dateTime} to ${expected} with format ${format}`, () => {
            expect(formatDate(dateTime, timezone, format)).toBe(expected);
        });
    });
});
