'use client'

import { useEffect, useRef, useState } from 'react'
import { Edit, Plus, SearchIcon, Trash } from 'lucide-react'

import Navbar from '../components/navbar'

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

const allCourts = [
  {
    id: '1',
    name: 'Quadra 1',
    isActive: true
  },
  {
    id: '2',
    name: 'Quadra 2',
    isActive: true
  },
  {
    id: '3',
    name: 'Quadra 3',
    isActive: true
  },
  {
    id: '4',
    name: 'Quadra 4',
    isActive: false
  },
  {
    id: '5',
    name: 'Quadra 5',
    isActive: true
  }
]

export default function Courts() {
  const [search, setSearch] = useState('')
  const [filteredCourts, setFilteredCourts] = useState(allCourts)
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }

    debounceTimeout.current = setTimeout(() => {
      const q = search.trim().toLowerCase()

      if (!q) {
        setFilteredCourts(allCourts)
      } else {
        setFilteredCourts(allCourts.filter(court => court.name.toLowerCase().includes(q)))
      }
    }, 300)

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
    }
  }, [search])

  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto mt-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Quadras</h1>
          <Button>
            <Plus /> Nova quadra
          </Button>
        </div>
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
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourts.map((court) => (
              <TableRow key={court.id}>
                <TableCell>{court.id}</TableCell>
                <TableCell>{court.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{court.isActive ? 'Ativa' : 'Inativa'}</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="secondary" size="icon" className="mr-2 size-8">
                    <Edit />
                  </Button>
                  <Button variant="secondary" size="icon" className="size-8">
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  )
}
