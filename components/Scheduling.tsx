'use client'

import { useState } from 'react'
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns'
import { ChevronLeft, ChevronRight, Upload, FileSpreadsheet } from 'lucide-react'

interface ScheduledVideo {
  date: Date
  time: string
  title: string
  platform: 'TikTok' | 'YouTube'
}

export default function Scheduling() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [scheduledVideos, setScheduledVideos] = useState<ScheduledVideo[]>([
    { date: new Date(), time: '09:00', title: 'AI Trends Video', platform: 'TikTok' },
    { date: new Date(), time: '18:00', title: 'Tech Review', platform: 'YouTube' },
  ])

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const getVideosForDate = (date: Date) => {
    return scheduledVideos.filter(video => isSameDay(video.date, date))
  }

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Scheduling & Uploading</h2>
        <p className="text-gray-600">Schedule and manage your video uploads to TikTok and YouTube Shorts</p>
      </header>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Google Sheets Integration</h3>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            aria-label="Connect to Google Sheets"
          >
            <FileSpreadsheet size={20} aria-hidden="true" />
            Connect Sheets
          </button>
        </div>
        <p className="text-sm text-gray-600">
          Sync your content calendar with Google Sheets for easy collaboration and organization.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            {format(currentDate, 'MMMM yyyy')}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Previous month"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Next month"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="text-center font-semibold text-gray-700 py-2"
            >
              {day}
            </div>
          ))}

          {Array.from({ length: monthStart.getDay() }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}

          {daysInMonth.map((day) => {
            const videos = getVideosForDate(day)
            const isToday = isSameDay(day, new Date())
            const isSelected = selectedDate && isSameDay(day, selectedDate)

            return (
              <button
                key={day.toISOString()}
                onClick={() => setSelectedDate(day)}
                className={`aspect-square p-2 rounded-lg border transition-all ${
                  isToday
                    ? 'border-primary bg-blue-50'
                    : isSelected
                    ? 'border-secondary bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                aria-label={`${format(day, 'MMMM d, yyyy')} - ${videos.length} videos scheduled`}
              >
                <div className="text-sm font-medium text-gray-900">
                  {format(day, 'd')}
                </div>
                {videos.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1 justify-center">
                    {videos.map((video, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full ${
                          video.platform === 'TikTok'
                            ? 'bg-pink-500'
                            : 'bg-red-500'
                        }`}
                        aria-label={`${video.platform} video scheduled`}
                      />
                    ))}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <div className="mt-4 flex gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-pink-500" aria-hidden="true" />
            <span>TikTok</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" aria-hidden="true" />
            <span>YouTube Shorts</span>
          </div>
        </div>
      </div>

      {selectedDate && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Schedule for {format(selectedDate, 'MMMM d, yyyy')}
          </h3>

          <div className="space-y-4 mb-6">
            {getVideosForDate(selectedDate).map((video, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div>
                  <h4 className="font-semibold text-gray-900">{video.title}</h4>
                  <p className="text-sm text-gray-600">
                    {video.time} - {video.platform}
                  </p>
                </div>
                <button
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  aria-label={`Delete ${video.title}`}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <div className="border-t pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Add New Upload</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="video-title" className="block text-sm font-medium text-gray-700 mb-2">
                  Video Title
                </label>
                <input
                  id="video-title"
                  type="text"
                  placeholder="Enter video title..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="upload-time" className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Time
                </label>
                <input
                  id="upload-time"
                  type="time"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="platform-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Platform
                </label>
                <select
                  id="platform-select"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                >
                  <option value="TikTok">TikTok</option>
                  <option value="YouTube">YouTube Shorts</option>
                </select>
              </div>

              <div>
                <label htmlFor="frequency-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Frequency
                </label>
                <select
                  id="frequency-select"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                >
                  <option value="once">Once</option>
                  <option value="daily">Daily</option>
                  <option value="twice-daily">Twice Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  placeholder="Enter video description..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  id="tags"
                  type="text"
                  placeholder="Enter tags separated by commas..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-2">
                  Thumbnail
                </label>
                <div className="flex items-center gap-4">
                  <input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                    aria-label="Upload thumbnail"
                  >
                    Upload
                  </button>
                </div>
              </div>

              <div className="md:col-span-2">
                <button
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Schedule upload"
                >
                  <Upload size={20} aria-hidden="true" />
                  Schedule Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
