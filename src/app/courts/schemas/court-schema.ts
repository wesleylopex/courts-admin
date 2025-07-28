import z from 'zod'

export const courtFormSchema = z.object({
  isActive: z.boolean(),
  allowsRecurrence: z.boolean(),
  name: z.string().min(1, 'O nome é obrigatório'),
  pricePerHour: z.number().min(1, 'O preço por hora é obrigatório'),
  sports: z.array(z.string()).min(1, 'Selecione pelo menos um esporte')
})

export type CourtFormData = z.infer<typeof courtFormSchema>