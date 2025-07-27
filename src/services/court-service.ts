'use client'

import { faker } from '@faker-js/faker'
import { Court } from '@/types/court'

export const getCourts = async (): Promise<Court[]> => {
  await new Promise(resolve => setTimeout(resolve, 800))
  const courts = Array.from({ length: 10 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    pricePerHour: Number(faker.finance.amount({ min: 50, max: 200 }))*100,
    isActive: faker.datatype.boolean(),
    allowsRecurrence: faker.datatype.boolean(),
    sports: ['Futebol', 'Vôlei', 'Basquete', 'Handebol']
  }))

  return courts
}

export const getCourt = async (courtId: string): Promise<Court> => {
  await new Promise(resolve => setTimeout(resolve, 800))
  return {
    id: courtId,
    name: faker.company.name(),
    pricePerHour: Number(faker.finance.amount({ min: 50, max: 200 }))*100,
    isActive: true,
    allowsRecurrence: true,
    sports: ['Futebol', 'Vôlei', 'Basquete', 'Handebol']
  }
}
