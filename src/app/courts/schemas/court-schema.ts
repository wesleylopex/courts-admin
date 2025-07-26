import z from 'zod'

export const courtFormSchema = z.object({
  isActive: z.boolean(),
  allowRecurrence: z.boolean(),
  name: z.string().min(1, 'O nome é obrigatório'),
  pricePerHour: z.number().min(1, 'O preço por hora é obrigatório'),
  sports: z.array(z.string()).min(1, 'Selecione pelo menos um esporte'),
  openingHours: z.array(
    z.object({
      day: z.string(),
      interval: z.array(
        z.object({
          start: z.string(),
          end: z.string()
        })
      )
    })
  ).optional()
})

export type CourtFormData = z.infer<typeof courtFormSchema>