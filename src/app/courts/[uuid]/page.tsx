'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import Navbar from '@/components/navbar'
import BreadcrumbHelper from '@/components/breadcrumb'

import CourtForm from '../_components/court-form'
import { CourtFormData } from '../schemas/court-schema'

import { getCourt } from '@/services/court-service'
import { Court } from '@/types/court'

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
    href: '/courts/update',
    label: 'Editar quadra',
    isCurrent: true
  }
]

export default function UpdateCourt () {
  const { uuid } = useParams()
  const courtId = uuid as string

  const [court, setCourt] = useState<Court | null>(null)

  useEffect(() => {
    const fetchCourt = async () => {
      const court = await getCourt(courtId)
      setCourt(court)
    }

    if (courtId) {
      fetchCourt()
    }
  }, [courtId])

  function onSubmit (data: CourtFormData) {
    console.log('update court: ', data)
  }

  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto mt-10">
        <div className="flex justify-end">
          <BreadcrumbHelper links={breadcrumbs} />
        </div>
        
        <CourtForm onSubmit={onSubmit} court={court} />
      </main>
    </div>
  )
}