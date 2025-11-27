'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Search, Filter } from 'lucide-react'

interface Trend {
  id: number
  title: string
  searchVolume: number
  platform: string
  region: string
}

const mockTrends: Trend[] = [
  { id: 1, title: 'AI Generated Content', searchVolume: 125000, platform: 'YouTube', region: 'US' },
  { id: 2, title: 'Productivity Hacks 2024', searchVolume: 98000, platform: 'TikTok', region: 'Global' },
  { id: 3, title: 'Best Budget Tech', searchVolume: 87500, platform: 'Google Trends', region: 'EU' },
  { id: 4, title: 'Fitness Transformation', searchVolume: 76000, platform: 'YouTube', region: 'US' },
  { id: 5, title: 'Cooking Quick Recipes', searchVolume: 65000, platform: 'TikTok', region: 'Global' },
  { id: 6, title: 'Gaming PC Build Guide', searchVolume: 54000, platform: 'YouTube', region: 'EU' },
]

export default function TrendIdentification() {
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'volume' | 'title'>('volume')

  const filteredTrends = mockTrends
    .filter(trend =>
      (selectedRegion === 'All' || trend.region === selectedRegion) &&
      trend.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'volume') {
        return b.searchVolume - a.searchVolume
      }
      return a.title.localeCompare(b.title)
    })

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Trend Identification</h2>
        <p className="text-gray-600">Discover trending topics across Google Trends, TikTok, and YouTube</p>
      </header>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} aria-hidden="true" />
            <input
              type="search"
              placeholder="Search trends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              aria-label="Search trends"
            />
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} aria-hidden="true" />
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                aria-label="Filter by region"
              >
                <option value="All">All Regions</option>
                <option value="US">United States</option>
                <option value="EU">European Union</option>
                <option value="Global">Global</option>
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'volume' | 'title')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
              aria-label="Sort trends"
            >
              <option value="volume">Sort by Volume</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full" role="table" aria-label="Trending topics">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700" scope="col">Trend Title</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700" scope="col">Search Volume</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700" scope="col">Platform</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700" scope="col">Region</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700" scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrends.map((trend) => (
                <tr key={trend.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-900">{trend.title}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-xs">
                        <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${(trend.searchVolume / 125000) * 100}%` }}
                            role="progressbar"
                            aria-valuenow={trend.searchVolume}
                            aria-valuemin={0}
                            aria-valuemax={125000}
                            aria-label={`Search volume: ${trend.searchVolume.toLocaleString()}`}
                          />
                        </div>
                      </div>
                      <span className="text-sm text-gray-600 whitespace-nowrap">
                        {trend.searchVolume.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {trend.platform}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{trend.region}</td>
                  <td className="py-3 px-4">
                    <button
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      aria-label={`Analyze trend: ${trend.title}`}
                    >
                      Analyze
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTrends.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No trends found matching your criteria.
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Search Volume Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="searchVolume" fill="#3498db" name="Search Volume" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
