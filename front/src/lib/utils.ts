import {
  differenceInDays,
  differenceInYears,
  format,
  formatDistanceToNowStrict,
} from 'date-fns'

export const dateView = (date: string) => {
  let currentDate = new Date(date)
  if (differenceInDays(new Date(), currentDate) < 1)
    return formatDistanceToNowStrict(currentDate)
  else if (differenceInYears(new Date(), currentDate) < 1)
    return format(currentDate, 'LLL d')
  else return format(currentDate, 'LLL d, y')
}
