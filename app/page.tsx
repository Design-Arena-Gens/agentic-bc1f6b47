'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import TrendIdentification from '@/components/TrendIdentification'
import ContentCreation from '@/components/ContentCreation'
import VideoClipping from '@/components/VideoClipping'
import Scheduling from '@/components/Scheduling'
import ViralOptimization from '@/components/ViralOptimization'

export default function Home() {
  const [activeSection, setActiveSection] = useState('trends')

  return (
    <main className="flex min-h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 ml-64">
        <div className="p-8">
          {activeSection === 'trends' && <TrendIdentification />}
          {activeSection === 'content' && <ContentCreation />}
          {activeSection === 'clipping' && <VideoClipping />}
          {activeSection === 'scheduling' && <Scheduling />}
          {activeSection === 'optimization' && <ViralOptimization />}
        </div>
      </div>
    </main>
  )
}
