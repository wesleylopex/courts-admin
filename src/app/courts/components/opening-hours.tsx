'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ClockIcon, PlusCircle } from 'lucide-react'

const openingHours = [
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

export default function OpeningHours () {
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

  return (
    <div>
      <div className="max-w-lg w-full flex flex-col gap-2">
        {openingHours.map(openingHour => (
          <div className="flex items-center gap-4 w-full py-2" key={openingHour.day}>
            <div className="flex items-center gap-2 min-w-[120px]">
              <Checkbox id={openingHour.day} />
              <Label htmlFor={openingHour.day} className="capitalize text-base font-medium">
                {translateDay(openingHour.day)}
              </Label>
            </div>
            <div className="flex-1 flex items-center">
              {openingHour.intervals.length === 0 ? (
                <span className="w-full text-center text-muted-foreground italic">Fechado</span>
              ) : (
                <div className="flex flex-col gap-2 w-full">
                  {openingHour.intervals.map(interval => (
                    <div className="flex gap-4 items-center w-full" key={interval.start}>
                      <div className="relative w-[120px]">
                        <Input
                          id="start"
                          type="time"
                          step="60"
                          defaultValue={interval.start}
                          className="peer appearance-none ps-9 w-full [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                          <ClockIcon size={16} aria-hidden="true" />
                        </div>
                      </div>
                      <span className="text-sm font-medium">até</span>
                      <div className="relative w-[120px]">
                        <Input
                          id="end"
                          type="time"
                          step="60"
                          defaultValue={interval.end}
                          className="peer appearance-none ps-9 w-full [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                          <ClockIcon size={16} aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center justify-center min-w-[40px]">
              <Button variant="ghost" type="button" size="icon">
                <PlusCircle size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}