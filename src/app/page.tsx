import Navbar from './components/navbar'
import { SectionCards } from './components/section-cards'

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 md:px-6 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <SectionCards />
        </div>
      </main>
    </div>
  )
}
