import { DateOrString } from "./data/utils";

/// Original author: fengyuanchen
/// JS source: https://github.com/fengyuanchen/prettydate/blob/master/src/prettydate.js

const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;
const week = 7 * day;
const month = 31 * day;
const year = 365 * day;

const defaults = {
  afterSuffix: "later",
  beforeSuffix: "ago",
  autoUpdate: false,
  date: null,
  dateFormat: "YYYY-MM-DD hh:mm:ss",
  duration: 60000,
  messages: {
    second: "Just now",
    seconds: "%s seconds %s",
    minute: "One minute %s",
    minutes: "%s minutes %s",
    hour: "One hour %s",
    hours: "%s hours %s",
    day: "One day %s",
    days: "%s days %s",
    week: "One week %s",
    weeks: "%s weeks %s",
    month: "One month %s",
    months: "%s months %s",
    year: "One year %s",
    years: "%s years %s",

    yesterday: "Yesterday",
    beforeYesterday: "The day before yesterday",
    tomorrow: "Tomorrow",
    afterTomorrow: "The day after tomorrow"
  }
}

export const prettifyDate = (_date: DateOrString) => {
  let date: Date
  if (typeof _date === 'string') {
    date = new Date(_date)
  }
  else {
    date = _date
  }


  let diff = (new Date()).getTime() - date.getTime()
  const past = diff > 0 ? true : false
  const messages = defaults.messages

  diff = diff < 0 ? (second - diff) : diff;
  let prettyDate = (
    diff < 2 * second ? messages.second :
      diff < minute ? messages.seconds.replace("%s", Math.floor(diff / second).toString()) :
        diff < 2 * minute ? messages.minute :
          diff < hour ? messages.minutes.replace("%s", Math.floor(diff / minute).toString()) :
            diff < 2 * hour ? messages.hour :
              diff < day ? messages.hours.replace("%s", Math.floor(diff / hour).toString()) :
                diff < 2 * day ? (past ? messages.yesterday : messages.tomorrow) :
                  diff < 3 * day ? (past ? messages.beforeYesterday : messages.afterTomorrow) :
                    /* diff < 2 * day ? messages.day : */
                    diff < week ? messages.days.replace("%s", Math.floor(diff / day).toString()) :
                      diff < 2 * week ? messages.week :
                        diff < 4 * week ? messages.weeks.replace("%s", Math.floor(diff / week).toString()) :
                          diff < 2 * month ? messages.month :
                            diff < year ? messages.months.replace("%s", Math.floor(diff / month).toString()) :
                              diff < 2 * year ? messages.year : messages.years.replace("%s", Math.floor(diff / year).toString())
  );

  if (!past) return 'Just now'

  prettyDate = prettyDate.replace("%s", past ? defaults.beforeSuffix : defaults.afterSuffix);

  return prettyDate
}

export const areDatesClose = (_date1: DateOrString, _date2: DateOrString) => {
  let date1, date2: Date

  if (typeof _date1 === 'string')
    date1 = new Date(_date1)
  else
    date1 = _date1

  if (typeof _date2 === 'string')
    date2 = new Date(_date2)
  else
    date2 = _date2



  let diff = date1.getTime() - date2.getTime()

  return (Math.abs(diff) < 10 * minute)
}