'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Navbar from '@/app/components/navbar'
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import BreadcrumbHelper from '@/app/components/breadcrumb'

const formSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  isActive: z.boolean()
})

type FormData = z.infer<typeof formSchema>

export default function NewCourt () {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      isActive: true
    }
  })

  function onSubmit (data: z.infer<typeof formSchema>) {
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
        <Card className="mt-10">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Nova quadra</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
                    <Checkbox
                      id=""
                      {...form.register('isActive')}
                      className="order-1 after:absolute after:inset-0"
                      aria-describedby="is-active"
                    />
                    <div className="grid grow gap-2">
                      <Label htmlFor="is-active">
                        Ativa / Inativa
                      </Label>
                      <p id="is-active" className="text-muted-foreground text-xs">
                        Defina se a quadra estará visível para os usuários
                      </p>
                    </div>
                  </div>
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
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}