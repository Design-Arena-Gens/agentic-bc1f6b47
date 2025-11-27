'use client'

import { useState } from 'react'
import { Wand2, Play } from 'lucide-react'

export default function ContentCreation() {
  const [trend, setTrend] = useState('')
  const [tone, setTone] = useState('casual')
  const [length, setLength] = useState('60')
  const [audience, setAudience] = useState('general')
  const [generatedScript, setGeneratedScript] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const generateScript = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setGeneratedScript(`[HOOK - 0:00]
Hey everyone! You won't believe what's trending right now...

[INTRODUCTION - 0:05]
Today we're diving into ${trend}, and I'm going to show you exactly why this is taking over the internet.

[MAIN CONTENT - 0:15]
Let me break this down for you in the simplest way possible. This trend started when...
- Point 1: The key factor driving this trend
- Point 2: Why people are so engaged with this
- Point 3: What makes it different from previous trends

[DEMONSTRATION - 0:35]
Now let me show you some real examples of this in action...

[CALL TO ACTION - 0:50]
If you found this helpful, make sure to like and follow for more trend breakdowns!

[OUTRO - 0:55]
See you in the next one!`)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Content Creation</h2>
        <p className="text-gray-600">Generate video scripts using AI and create automated videos</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Script Generator</h3>

          <div className="space-y-4">
            <div>
              <label htmlFor="trend-input" className="block text-sm font-medium text-gray-700 mb-2">
                Selected Trend
              </label>
              <input
                id="trend-input"
                type="text"
                value={trend}
                onChange={(e) => setTrend(e.target.value)}
                placeholder="Enter trend topic..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="tone-select" className="block text-sm font-medium text-gray-700 mb-2">
                Tone
              </label>
              <select
                id="tone-select"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
              >
                <option value="casual">Casual</option>
                <option value="professional">Professional</option>
                <option value="energetic">Energetic</option>
                <option value="educational">Educational</option>
              </select>
            </div>

            <div>
              <label htmlFor="length-input" className="block text-sm font-medium text-gray-700 mb-2">
                Length (seconds): {length}s
              </label>
              <input
                id="length-input"
                type="range"
                min="30"
                max="180"
                step="15"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full"
                aria-label="Video length in seconds"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>30s</span>
                <span>180s</span>
              </div>
            </div>

            <div>
              <label htmlFor="audience-select" className="block text-sm font-medium text-gray-700 mb-2">
                Target Audience
              </label>
              <select
                id="audience-select"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
              >
                <option value="general">General Audience</option>
                <option value="teens">Teens (13-17)</option>
                <option value="young-adults">Young Adults (18-24)</option>
                <option value="adults">Adults (25-44)</option>
                <option value="seniors">Seniors (45+)</option>
              </select>
            </div>

            <button
              onClick={generateScript}
              disabled={!trend || isGenerating}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Generate script"
            >
              <Wand2 size={20} aria-hidden="true" />
              {isGenerating ? 'Generating...' : 'Generate Script'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Generated Script</h3>

          {generatedScript ? (
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 h-96 overflow-y-auto">
                <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                  {generatedScript}
                </pre>
              </div>

              <div className="flex gap-2">
                <button
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                  aria-label="Copy script to clipboard"
                >
                  Copy Script
                </button>
                <button
                  className="flex-1 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                  aria-label="Export script"
                >
                  Export
                </button>
              </div>
            </div>
          ) : (
            <div className="h-96 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
              <div className="text-center">
                <Wand2 size={48} className="mx-auto mb-2 opacity-50" aria-hidden="true" />
                <p>Generated script will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">LovoArt Video Creation</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Video Settings</h4>
            <div className="space-y-4">
              <div>
                <label htmlFor="style-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Visual Style
                </label>
                <select
                  id="style-select"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                >
                  <option value="modern">Modern</option>
                  <option value="minimal">Minimal</option>
                  <option value="vibrant">Vibrant</option>
                  <option value="professional">Professional</option>
                </select>
              </div>

              <div>
                <label htmlFor="voice-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Voice Selection
                </label>
                <select
                  id="voice-select"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                >
                  <option value="male1">Male Voice 1</option>
                  <option value="male2">Male Voice 2</option>
                  <option value="female1">Female Voice 1</option>
                  <option value="female2">Female Voice 2</option>
                </select>
              </div>

              <div>
                <label htmlFor="music-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Background Music
                </label>
                <select
                  id="music-select"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                >
                  <option value="upbeat">Upbeat</option>
                  <option value="chill">Chill</option>
                  <option value="dramatic">Dramatic</option>
                  <option value="none">No Music</option>
                </select>
              </div>

              <button
                disabled={!generatedScript}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                aria-label="Create video"
              >
                <Play size={20} aria-hidden="true" />
                Create Video
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Video Preview</h4>
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-400">
                <Play size={64} className="mx-auto mb-2 opacity-50" aria-hidden="true" />
                <p>Video preview will appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
