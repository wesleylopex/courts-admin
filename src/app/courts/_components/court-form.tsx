'use client'

import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { NumericFormat } from 'react-number-format'
import { CircleDollarSign } from 'lucide-react'

import { Card, CardContent, CardTitle, CardHeader, CardFooter } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import MultipleSelector from '@/components/ui/multiselect'
import { Separator } from '@/components/ui/separator'

import OpeningHours from '../_components/opening-hours'
import { CourtFormData, courtFormSchema } from '../schemas/court-schema'

type CourtFormProps = {
  onSubmit: (data: CourtFormData) => void
}

const sports = [
  {
    value: 'Futebol',
    label: 'Futebol',
  },
  {
    value: 'Vôlei',
    label: 'Vôlei',
  },
  {
    value: 'Basquete',
    label: 'Basquete',
  },
  {
    value: 'Handebol',
    label: 'Handebol',
  },
  {
    value: 'Vôlei de praia',
    label: 'Vôlei de praia'
  },
  {
    value: 'Beach tênis',
    label: 'Beach tênis'
  }
]

export default function CourtForm ({ onSubmit }: CourtFormProps) {
  const form = useForm<CourtFormData>({
    resolver: zodResolver(courtFormSchema),
    defaultValues: {
      isActive: true,
      allowRecurrence: true,
      name: '',
      pricePerHour: 0,
      sports: [],
      openingHours: []
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mt-10 w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Nova quadra</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-start">
              <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div>
                          <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 dark:has-[[aria-checked=true]]:border-white">
                            <Checkbox
                              id="is-active"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <div className="grid gap-1.5 font-normal">
                              <p className="text-sm leading-none font-medium">
                                Ocultar
                              </p>
                              <p className="text-muted-foreground text-sm">
                                Marque esta opção para ocultar esta quadra do site
                              </p>
                            </div>
                          </Label>
                          <FormMessage />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="allowRecurrence"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div>
                          <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 dark:has-[[aria-checked=true]]:border-white">
                            <Checkbox
                              id="allow-recurrence"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <div className="grid gap-1.5 font-normal">
                              <p className="text-sm leading-none font-medium">
                                Permitir recorrência
                              </p>
                              <p className="text-muted-foreground text-sm">
                                Marque esta opção para permitir recorrência de reservas
                              </p>
                            </div>
                          </Label>
                          <FormMessage />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da quadra" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              >
              </FormField>

              <FormField
                control={form.control}
                name="pricePerHour"
                render={() => (
                  <FormItem>
                    <FormLabel>Preço por hora</FormLabel>
                    <FormControl>
                      <Controller
                        control={form.control}
                        name="pricePerHour"
                        render={({ field: controllerField }) => (
                          <div className="relative flex items-center">
                            <span className="absolute left-3 text-muted-foreground">
                              <CircleDollarSign className="w-5 h-5" />
                            </span>
                            <NumericFormat
                              value={controllerField.value / 100 || ''}
                              thousandSeparator="."
                              decimalSeparator="," 
                              decimalScale={2}
                              fixedDecimalScale
                              allowNegative={false}
                              prefix="R$ "
                              customInput={Input}
                              className="pl-10"
                              placeholder="Preço por hora"
                              onValueChange={(values: { floatValue?: number }) => {
                                controllerField.onChange(values.floatValue ? Math.round(values.floatValue * 100) : 0)
                              }}
                              onBlur={controllerField.onBlur}
                            />
                          </div>
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sports"
                render={() => (
                  <FormItem>
                    <FormLabel>Esporte</FormLabel>
                    <FormControl>
                      <Controller
                        control={form.control}
                        name="sports"
                        render={({ field: controllerField }) => (
                          <MultipleSelector
                            commandProps={{
                              label: 'Select frameworks',
                            }}
                            value={sports.filter(option => controllerField.value.includes(option.value))}
                            onChange={(selectedOptions) => controllerField.onChange(selectedOptions.map(opt => opt.value))}
                            defaultOptions={sports}
                            placeholder="Selecione os esportes disponíveis"
                            hideClearAllButton
                            hidePlaceholderWhenSelected
                            emptyIndicator={<p className="text-center text-sm">No results found</p>}
                          />
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-full">
                <Separator className="mt-4" />
                <h1 className="mt-8 font-semibold">Horários disponíveis</h1>
              </div>

              <div className="col-span-full">
                <OpeningHours />
              </div>

            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-end gap-2">
            <Link href="/courts">
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </Link>
            <Button type="submit">
              Pronto
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}