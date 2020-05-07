import fakeDataSet from './fake-schedule-data'
import { formatDate } from '@/utils/date'

const fakeDelay = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 300)
  })
}

export const fetchScheduleData = async (startDate: Date) => {
  console.log(startDate)
  const stamp = formatDate(startDate, 'MMdd')

  await fakeDelay()
  
  switch (stamp) {
    case '0503':
      return fakeDataSet['0503']
    case '0510':
      return fakeDataSet['0510']
    case '0517':
      return fakeDataSet['0517']
    case '0524':
      return fakeDataSet['0524']
    default:
      return { available: [], booked: [] }
  }
}
