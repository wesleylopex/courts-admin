'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Navbar from '@/app/components/navbar'
import { Card, CardContent, CardTitle, CardHeader, CardFooter } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

import BreadcrumbHelper from '@/app/components/breadcrumb'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
  isActive: z.boolean(),
  allowRecurring: z.boolean(),
  name: z.string().min(1, 'O nome é obrigatório'),
})

type FormData = z.infer<typeof formSchema>

export default function NewCourt () {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isActive: true,
      allowRecurring: true,
      name: ''
    }
  })

  function onSubmit (data: FormData) {
    console.log(data)
  }

  const breadcrumbs = [
    {
      href: '/',
      label: 'Home'
    },
    {
      href: '/courts',
      label: 'Quadras'
    },
    {
      href: '/courts/new',
      label: 'Nova quadra',
      isCurrent: true
    }
  ]

  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto mt-10">
        <div className="flex justify-end">
          <BreadcrumbHelper links={breadcrumbs} />
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="mt-10 w-full">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Nova quadra</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="isActive"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div>
                              <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-white dark:has-[[aria-checked=true]]:border-white">
                                <Checkbox
                                  id="is-active"
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                                <div className="grid gap-1.5 font-normal">
                                  <p className="text-sm leading-none font-medium">
                                    Ativa / Inativa
                                  </p>
                                  <p className="text-muted-foreground text-sm">
                                    Defina se a quadra estará visível para os usuários
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
                      name="allowRecurring"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div>
                              <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-white dark:has-[[aria-checked=true]]:border-white">
                                <Checkbox
                                  id="allow-recurring"
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                                <div className="grid gap-1.5 font-normal">
                                  <p className="text-sm leading-none font-medium">
                                    Permitir recorrência
                                  </p>
                                  <p className="text-muted-foreground text-sm">
                                    Defina se a quadra pode ser reservada com recorrência
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
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-end gap-2">
                <Button type="button" variant="secondary">
                  Cancelar
                </Button>
                <Button type="submit">
                  Pronto
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </main>
    </div>
  )
}