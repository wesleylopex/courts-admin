import { Edit, Plus, Trash } from 'lucide-react'

import Navbar from '../components/Navbar'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const courts = [
  {
    id: '1',
    name: 'Quadra 1',
  },
  {
    id: '2',
    name: 'Quadra 2',
  },
  {
    id: '3',
    name: 'Quadra 3',
  },
  {
    id: '4',
    name: 'Quadra 4',
  },
  {
    id: '5',
    name: 'Quadra 5',
  }
]

export default function Courts() {
  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto mt-10">
        <Card className="rounded-md">
          <CardHeader>
            <CardTitle className="text-xl">Quadras</CardTitle>
            <CardDescription>
              Aqui você pode visualizar, adicionar, editar e remover todas as quadras que deseja disponibilizar para aluguel.
            </CardDescription>
            <CardAction>
              <Button>
                <Plus /> Nova quadra
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>#</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courts.map((court) => (
                  <TableRow key={court.id}>
                    <TableCell>{court.id}</TableCell>
                    <TableCell>{court.name}</TableCell>
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
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
