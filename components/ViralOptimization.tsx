'use client'

import { useState } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { TrendingUp, Hash, Lightbulb, CheckCircle } from 'lucide-react'

const performanceData = [
  { date: 'Mon', views: 15000, likes: 1200, shares: 340 },
  { date: 'Tue', views: 22000, likes: 1800, shares: 520 },
  { date: 'Wed', views: 18000, likes: 1450, shares: 410 },
  { date: 'Thu', views: 28000, likes: 2300, shares: 680 },
  { date: 'Fri', views: 35000, likes: 3100, shares: 920 },
  { date: 'Sat', views: 42000, likes: 3800, shares: 1150 },
  { date: 'Sun', views: 38000, likes: 3400, shares: 980 },
]

const hashtagData = [
  { hashtag: '#trending', engagement: 89 },
  { hashtag: '#viral', engagement: 85 },
  { hashtag: '#fyp', engagement: 82 },
  { hashtag: '#tech', engagement: 76 },
  { hashtag: '#2024', engagement: 71 },
]

interface Recommendation {
  id: number
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  implemented: boolean
}

export default function ViralOptimization() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: 1,
      title: 'Optimize Upload Time',
      description: 'Post between 6-9 PM for maximum engagement based on your audience activity',
      impact: 'high',
      implemented: false,
    },
    {
      id: 2,
      title: 'Add Trending Hashtags',
      description: 'Include #fyp, #trending, and #viral to increase discoverability',
      impact: 'high',
      implemented: false,
    },
    {
      id: 3,
      title: 'Improve Thumbnail Contrast',
      description: 'Use brighter colors and larger text for better click-through rates',
      impact: 'medium',
      implemented: false,
    },
    {
      id: 4,
      title: 'Shorten Video Length',
      description: 'Videos under 60 seconds have 35% higher completion rates',
      impact: 'medium',
      implemented: false,
    },
    {
      id: 5,
      title: 'Add Captions',
      description: 'Videos with captions see 40% more engagement',
      impact: 'high',
      implemented: false,
    },
  ])

  const toggleImplementation = (id: number) => {
    setRecommendations(
      recommendations.map((rec) =>
        rec.id === id ? { ...rec, implemented: !rec.implemented } : rec
      )
    )
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-600 bg-red-100'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100'
      case 'low':
        return 'text-green-600 bg-green-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Viral Optimization</h2>
        <p className="text-gray-600">Optimize your content for maximum reach and engagement</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Views</h3>
            <TrendingUp className="text-primary" size={20} aria-hidden="true" />
          </div>
          <p className="text-3xl font-bold text-gray-900">198K</p>
          <p className="text-sm text-secondary mt-1">↑ 23% from last week</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Engagement Rate</h3>
            <TrendingUp className="text-primary" size={20} aria-hidden="true" />
          </div>
          <p className="text-3xl font-bold text-gray-900">8.4%</p>
          <p className="text-sm text-secondary mt-1">↑ 12% from last week</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Viral Score</h3>
            <TrendingUp className="text-primary" size={20} aria-hidden="true" />
          </div>
          <p className="text-3xl font-bold text-gray-900">87/100</p>
          <p className="text-sm text-secondary mt-1">↑ 5 points this week</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Performance Metrics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="views" stroke="#3498db" strokeWidth={2} name="Views" />
            <Line type="monotone" dataKey="likes" stroke="#2ecc71" strokeWidth={2} name="Likes" />
            <Line type="monotone" dataKey="shares" stroke="#e74c3c" strokeWidth={2} name="Shares" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Hash className="text-primary" size={24} aria-hidden="true" />
            <h3 className="text-xl font-semibold text-gray-900">Hashtag Performance</h3>
          </div>
          <div className="space-y-3">
            {hashtagData.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.hashtag}</span>
                  <span className="text-sm text-gray-600">{item.engagement}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${item.engagement}%` }}
                    role="progressbar"
                    aria-valuenow={item.engagement}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${item.hashtag} engagement: ${item.engagement}%`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="text-primary" size={24} aria-hidden="true" />
            <h3 className="text-xl font-semibold text-gray-900">Keyword Suggestions</h3>
          </div>
          <div className="space-y-2">
            {[
              'AI content creation',
              'viral video tips',
              'trending topics 2024',
              'social media growth',
              'video marketing strategy',
            ].map((keyword, index) => (
              <button
                key={index}
                className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label={`Add keyword: ${keyword}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{keyword}</span>
                  <span className="text-xs text-gray-500">Add</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Optimization Recommendations</h3>
        <div className="space-y-3">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                rec.implemented
                  ? 'border-secondary bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${getImpactColor(
                        rec.impact
                      )}`}
                    >
                      {rec.impact} impact
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{rec.description}</p>
                </div>
                <button
                  onClick={() => toggleImplementation(rec.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    rec.implemented
                      ? 'bg-secondary text-white hover:bg-green-600 focus:ring-secondary'
                      : 'bg-primary text-white hover:bg-blue-600 focus:ring-primary'
                  }`}
                  aria-label={rec.implemented ? 'Mark as not implemented' : 'Mark as implemented'}
                  aria-pressed={rec.implemented}
                >
                  {rec.implemented ? (
                    <>
                      <CheckCircle size={16} aria-hidden="true" />
                      Done
                    </>
                  ) : (
                    'Implement'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">A/B Testing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Title A</h4>
            <p className="text-sm text-gray-600 mb-4">
              "5 AI Tools That Will Change Your Life in 2024"
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Click-through Rate:</span>
                <span className="font-semibold text-gray-900">6.8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Engagement:</span>
                <span className="font-semibold text-gray-900">8.2%</span>
              </div>
            </div>
          </div>

          <div className="border border-secondary rounded-lg p-4 bg-green-50">
            <h4 className="font-semibold text-gray-900 mb-2">Title B (Winner)</h4>
            <p className="text-sm text-gray-600 mb-4">
              "These AI Tools Will 10X Your Productivity (Proven Results)"
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Click-through Rate:</span>
                <span className="font-semibold text-secondary">9.4%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Engagement:</span>
                <span className="font-semibold text-secondary">11.7%</span>
              </div>
            </div>
          </div>
        </div>

        <button
          className="w-full mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Create new A/B test"
        >
          Create New A/B Test
        </button>
      </div>
    </div>
  )
}
