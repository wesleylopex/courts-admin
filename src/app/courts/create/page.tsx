'use client'

import Navbar from '@/components/navbar'

import BreadcrumbHelper from '@/components/breadcrumb'
import CourtForm from '../_components/court-form'
import { CourtFormData } from '../schemas/court-schema'

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

export default function NewCourt () {
  function onSubmit (data: CourtFormData) {
    console.log('create court: ', data)
  }

  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto mt-10">
        <div className="flex justify-end">
          <BreadcrumbHelper links={breadcrumbs} />
        </div>
        
        <CourtForm onSubmit={onSubmit} />
      </main>
    </div>
  )
}