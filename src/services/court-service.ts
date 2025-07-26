'use client'

import { faker } from '@faker-js/faker'
import { Court } from '@/types/court'

export const getCourts = (): Court[] => {
  const courts = Array.from({ length: 10 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    pricePerHour: Number(faker.finance.amount({ min: 50, max: 200 }))*100,
    isActive: faker.datatype.boolean(),
    allowsRecurrence: faker.datatype.boolean(),
  }))

  return courts
}