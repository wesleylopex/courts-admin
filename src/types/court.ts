export interface Court {
  id: string
  name: string
  pricePerHour: number
  isActive: boolean
  allowsRecurrence: boolean
  sports: string[]
}