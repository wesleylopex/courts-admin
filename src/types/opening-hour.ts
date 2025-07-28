interface Interval {
  start: string,
  end: string
}

export interface OpeningHour {
  day: string,
  intervals: Interval[]
}