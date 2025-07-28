import { OpeningHour } from '@/types/opening-hour'

export const getOpeningHours = async (courtId: string): Promise<OpeningHour[]> => {
  await new Promise(resolve => setTimeout(resolve, 800))

  console.log('courtId: ', courtId)

  const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

  const openingHours = Array.from({ length: 7 }).map((_, index) => ({
    day: days[index],
    intervals: [
      { start: '08:00', end: '12:00' },
      { start: '14:00', end: '18:00' }
    ]
  }))

  return openingHours
}