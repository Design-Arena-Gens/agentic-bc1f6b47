'use client'

import { useState } from 'react'
import { Search, Scissors, Download, Plus } from 'lucide-react'

interface VideoClip {
  id: number
  title: string
  creator: string
  duration: string
  thumbnail: string
}

const mockVideos: VideoClip[] = [
  { id: 1, title: 'Top Business Tips', creator: 'MrBeast', duration: '15:30', thumbnail: '/placeholder1.jpg' },
  { id: 2, title: 'Podcast Highlights', creator: 'Joe Rogan', duration: '45:12', thumbnail: '/placeholder2.jpg' },
  { id: 3, title: 'Tech Review', creator: 'MKBHD', duration: '12:45', thumbnail: '/placeholder3.jpg' },
]

export default function VideoClipping() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedVideo, setSelectedVideo] = useState<VideoClip | null>(null)
  const [startTime, setStartTime] = useState('0:00')
  const [endTime, setEndTime] = useState('0:30')
  const [captions, setCaptions] = useState(true)

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Video Clipping</h2>
        <p className="text-gray-600">Extract and edit short clips from popular videos</p>
      </header>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <label htmlFor="video-search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Videos
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} aria-hidden="true" />
            <input
              id="video-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for videos by creator, title, or keyword..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {mockVideos.map((video) => (
            <button
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className={`text-left p-4 rounded-lg border-2 transition-all ${
                selectedVideo?.id === video.id
                  ? 'border-primary bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              aria-label={`Select video: ${video.title}`}
              aria-pressed={selectedVideo?.id === video.id}
            >
              <div className="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Thumbnail</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{video.title}</h4>
              <p className="text-sm text-gray-600">{video.creator}</p>
              <p className="text-xs text-gray-500 mt-1">{video.duration}</p>
            </button>
          ))}
        </div>

        {selectedVideo && (
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Edit Clip</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="aspect-video bg-gray-900 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center text-white">
                    <p className="mb-2">{selectedVideo.title}</p>
                    <p className="text-sm text-gray-400">by {selectedVideo.creator}</p>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded relative">
                    <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium">
                      Waveform Visualization
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                    aria-label="Play preview"
                  >
                    Play Preview
                  </button>
                  <button
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label="Reset selection"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="start-time" className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time
                  </label>
                  <input
                    id="start-time"
                    type="text"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    placeholder="0:00"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="end-time" className="block text-sm font-medium text-gray-700 mb-2">
                    End Time
                  </label>
                  <input
                    id="end-time"
                    type="text"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    placeholder="0:30"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="captions-toggle"
                    type="checkbox"
                    checked={captions}
                    onChange={(e) => setCaptions(e.target.checked)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="captions-toggle" className="ml-2 text-sm text-gray-700">
                    Add Auto Captions
                  </label>
                </div>

                <div>
                  <label htmlFor="effects-select" className="block text-sm font-medium text-gray-700 mb-2">
                    Visual Effects
                  </label>
                  <select
                    id="effects-select"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                  >
                    <option value="none">None</option>
                    <option value="zoom">Zoom Effect</option>
                    <option value="blur">Background Blur</option>
                    <option value="overlay">Text Overlay</option>
                  </select>
                </div>

                <div className="pt-4 space-y-2">
                  <button
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-white rounded-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                    aria-label="Create clip"
                  >
                    <Scissors size={20} aria-hidden="true" />
                    Create Clip
                  </button>
                  <button
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                    aria-label="Download clip"
                  >
                    <Download size={20} aria-hidden="true" />
                    Download Clip
                  </button>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm">
                  <p className="font-semibold text-yellow-800 mb-1">Attribution Required</p>
                  <p className="text-yellow-700">
                    Please ensure proper attribution and comply with content usage policies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Created Clips</h3>
        <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
          <Plus size={48} className="mx-auto mb-2 opacity-50" aria-hidden="true" />
          <p>Your created clips will appear here</p>
        </div>
      </div>
    </div>
  )
}
