import {
  startOfWeek,
  addDays,
  differenceInDays,
  getYear,
  getMonth,
  format,
  isBefore,
} from 'date-fns'
import { zhTW } from 'date-fns/locale'

export const getStartDateOfWeek = (date: Date) => {
  return startOfWeek(date)
}

export const addDaysToDate = (date: Date, days: number) => {
  return addDays(date, days)
}

export const isDateLeftBeforeDateRight = (dateToCompare: Date, date: Date) => {
  return isBefore(dateToCompare, date)
}

export const getDifferenceInDays = (startDate: Date, endDate: Date): Number => {
  return differenceInDays(endDate, startDate)
}

export const getDateRangeText = (startDate: Date, endDate: Date): String => {
  const yearOfStartDate = getYear(startDate)
  const yearOfEndDate = getYear(endDate)
  const monthOfStartDate = getMonth(startDate)
  const monthOfEndDate = getMonth(endDate)

  const startDateOfWeekText = formatDate(startDate, 'yyyy/MM/dd')
  let endDateText;
  if (yearOfStartDate !== yearOfEndDate) {
    endDateText = formatDate(endDate, 'yyyy/MM/dd')
  } else if (monthOfStartDate !== monthOfEndDate) {
    endDateText = formatDate(endDate, 'MM/dd')
  } else {
    endDateText = formatDate(endDate, 'dd')
  }
  return `${startDateOfWeekText} - ${endDateText}`
}

export const formatDate = (date: Date, pattern: string) => {
  return format(date, pattern)
}