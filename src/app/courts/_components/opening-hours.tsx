'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ClockIcon, MinusCircle, PlusCircle } from 'lucide-react'
import { useState } from 'react'

const defaultOpeningHours = [
  {
    day: 'sunday',
    intervals: []
  },
  {
    day: 'monday',
    intervals: [
      { start: '09:00', end: '12:00' },
      { start: '13:00', end: '23:00' },
      { start: '13:00', end: '23:00' },
    ]
  },
  {
    day: 'tuesday',
    intervals: [
      { start: '13:00', end: '17:00' },
      { start: '19:00', end: '23:00' }
    ]
  },
  {
    day: 'wednesday',
    intervals: [
      { start: '13:00', end: '23:00' },
    ]
  },
  {
    day: 'thursday',
    intervals: [
      { start: '13:00', end: '23:00' },
    ]
  },
  {
    day: 'friday',
    intervals: [
      { start: '13:00', end: '23:00' },
    ]
  },
  {
    day: 'saturday',
    intervals: [
      { start: '13:00', end: '23:00' },
    ]
  }
]

function translateDay (day: string) {
  const days = {
    sunday: 'Domingo',
    monday: 'Segunda',
    tuesday: 'Terça',
    wednesday: 'Quarta',
    thursday: 'Quinta',
    friday: 'Sexta',
    saturday: 'Sábado'
  } as const

  return days[day as keyof typeof days]
}

export default function OpeningHours () {
  const [openingHours, setOpeningHours] = useState(defaultOpeningHours)

  function addInterval (day: string) {
    setOpeningHours(prev => {
      const newOpeningHours = prev.map(openingHour => {
        if (openingHour.day === day) {
          return {
            ...openingHour,
            intervals: [...openingHour.intervals, { start: '', end: '' }]
          }
        }
        return openingHour
      })
      return newOpeningHours
    })
  }

  function deleteInterval (day: string) {
    setOpeningHours(prev => {
      const newOpeningHours = prev.map(openingHour => {
        if (openingHour.day === day) {
          return {
            ...openingHour,
            intervals: openingHour.intervals.slice(0, -1)
          }
        }
        return openingHour
      })
      return newOpeningHours
    })
  }

  function toggleOpeningHour (day: string) {
    const defaultInterval = [{ start: '', end: '' }]
    
    setOpeningHours(prev => {
      const newOpeningHours = prev.map(openingHour => {
        if (openingHour.day === day) {
          return {
            ...openingHour,
            intervals: openingHour.intervals.length === 0 ? defaultInterval : []
          }
        }
        return openingHour
      })
      return newOpeningHours
    })
  }

  return (
    <div>
      <div className="max-w-lg w-full grid gap-2">
        {openingHours.map(openingHour => (
          <div className="flex items-center space-x-4 w-full py-2" key={openingHour.day}>
            <div className="flex items-center gap-2 min-w-32">
              <Checkbox
                id={openingHour.day}
                checked={openingHour.intervals.length > 0}
                onCheckedChange={() => toggleOpeningHour(openingHour.day)}
              />
              <Label htmlFor={openingHour.day} className="capitalize text-base font-medium">
                {translateDay(openingHour.day)}
              </Label>
            </div>
            <div className="flex-1 flex items-center">
              {openingHour.intervals.length === 0 ? (
                <span className="w-full text-center text-muted-foreground italic">Fechado</span>
              ) : (
                <div className="grid gap-2 w-full">
                  {openingHour.intervals.map((interval, index) => (
                    <div className="flex gap-4 items-center w-full" key={index}>
                      <div className="relative w-32">
                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                          <ClockIcon size={16} aria-hidden="true" />
                        </div>
                        <Input
                          id="start"
                          type="time"
                          step="60"
                          defaultValue={interval.start}
                          className="peer appearance-none ps-9 w-full [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                      </div>
                      <span className="text-sm font-medium">até</span>
                      <div className="relative w-32">
                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                          <ClockIcon size={16} aria-hidden="true" />
                        </div>
                        <Input
                          id="end"
                          type="time"
                          step="60"
                          defaultValue={interval.end}
                          className="peer appearance-none ps-9 w-full [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-1 min-w-20">
              {openingHour.intervals.length > 0 && (
                <Button onClick={() => addInterval(openingHour.day)} variant="ghost" type="button" size="icon">
                  <PlusCircle size={16} />
                </Button>
              )}
              {openingHour.intervals.length >= 2 && (
                <Button onClick={() => deleteInterval(openingHour.day)} variant="ghost" type="button" size="icon">
                  <MinusCircle size={16} />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}