'use client'

import { TrendingUp, FileText, Scissors, Calendar, Zap } from 'lucide-react'

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const menuItems = [
    { id: 'trends', label: 'Trend Identification', icon: TrendingUp },
    { id: 'content', label: 'Content Creation', icon: FileText },
    { id: 'clipping', label: 'Video Clipping', icon: Scissors },
    { id: 'scheduling', label: 'Scheduling & Uploading', icon: Calendar },
    { id: 'optimization', label: 'Viral Optimization', icon: Zap },
  ]

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 shadow-sm"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary mb-8">
          Video Automation
        </h1>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                    aria-label={`Navigate to ${item.label}`}
                  >
                    <Icon size={20} aria-hidden="true" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
