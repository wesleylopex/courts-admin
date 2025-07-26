'use client'

import { useState } from 'react'
import { Edit, Plus, SearchIcon, Trash } from 'lucide-react'
import Link from 'next/link'

import { useQuery } from '@tanstack/react-query'

import Navbar from '@/components/navbar'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import BreadcrumbHelper from '@/components/breadcrumb'

import { getCourts } from '@/services/court-service'
import { CourtSkeletonLoader } from './_components/court-skeleton-loader'

const breadcrumbs = [
  {
    href: '/',
    label: 'Home'
  },
  {
    href: '/courts',
    label: 'Quadras',
    isCurrent: true
  }
]

export default function Courts () {
  const [search, setSearch] = useState('')

  const { data: courts, isLoading: courtsLoading } = useQuery({
    queryKey: ['courts'],
    queryFn: getCourts
  })

  const id = crypto.randomUUID()

  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto mt-10">
        <div className="flex justify-end">
          <BreadcrumbHelper links={breadcrumbs} />
        </div>
        <Card className="mt-10">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Quadras</CardTitle>
            <CardDescription>
              <span className="text-muted-foreground">
                Gerencie e visualize as quadras cadastradas no sistema.
              </span>
            </CardDescription>
            <CardAction>
              <Link href="/courts/create">
                <Button>
                  <Plus /> Nova quadra
                </Button>
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="mt-6">
              <div className="relative w-full max-w-xs">
                <Input
                  className="peer ps-9 pe-9"
                  placeholder="Pesquisar quadras..."
                  type="search"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                  <SearchIcon size={16} />
                </div>
              </div>
            </div>
            <Table className="mt-10">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>#</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Valor/Hora</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Recorrência</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courtsLoading
                ? <CourtSkeletonLoader />
                : courts?.map((court) => (
                  <TableRow key={court.id}>
                    <TableCell>{court.id}</TableCell>
                    <TableCell>{court.name}</TableCell>
                    <TableCell>{
                      (court.pricePerHour / 100).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        minimumFractionDigits: 2
                      })
                    }</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{court.isActive ? 'Ativa' : 'Inativa'}</Badge>
                    </TableCell>
                    <TableCell>
                      {court.allowsRecurrence && (
                        <Badge variant="secondary">Sim</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Link href={`/courts/${id}`}>
                        <Button variant="secondary" size="icon" className="mr-2 size-8">
                          <Edit />
                        </Button>
                      </Link>
                      <Button variant="secondary" size="icon" className="size-8">
                        <Trash />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
