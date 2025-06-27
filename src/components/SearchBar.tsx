'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface SearchFilters {
  difficulty: string
  type: string
  isFree: boolean | null
  duration: string
}

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [filters, setFilters] = useState<SearchFilters>({
    difficulty: searchParams.get('difficulty') || '',
    type: searchParams.get('type') || '',
    isFree: searchParams.get('isFree') ? searchParams.get('isFree') === 'true' : null,
    duration: searchParams.get('duration') || '',
  })
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (filters.difficulty) params.set('difficulty', filters.difficulty)
    if (filters.type) params.set('type', filters.type)
    if (filters.isFree !== null) params.set('isFree', filters.isFree.toString())
    if (filters.duration) params.set('duration', filters.duration)
    
    router.push(`/search?${params.toString()}`)
  }

  const clearFilters = () => {
    setFilters({
      difficulty: '',
      type: '',
      isFree: null,
      duration: '',
    })
    setQuery('')
    router.push('/search')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Search Bar */}
      <div className="relative">
        <div className="flex items-center bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for courses, topics, or resources..."
              className="w-full px-6 py-4 text-gray-900 dark:text-white bg-transparent border-none outline-none text-lg"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {/* Filter Toggle */}
      <div className="mt-4 text-center">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center mx-auto"
        >
          <span>Advanced Filters</span>
          <svg 
            className={`w-4 h-4 ml-1 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Difficulty
              </label>
              <select
                value={filters.difficulty}
                onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Types</option>
                <option value="course">Course</option>
                <option value="tutorial">Tutorial</option>
                <option value="book">Book</option>
                <option value="article">Article</option>
                <option value="video">Video</option>
                <option value="paper">Paper</option>
                <option value="tool">Tool</option>
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price
              </label>
              <select
                value={filters.isFree === null ? '' : filters.isFree.toString()}
                onChange={(e) => setFilters({ ...filters, isFree: e.target.value === '' ? null : e.target.value === 'true' })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Prices</option>
                <option value="true">Free</option>
                <option value="false">Paid</option>
              </select>
            </div>

            {/* Duration Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duration
              </label>
              <select
                value={filters.duration}
                onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">Any Duration</option>
                <option value="short">Short (&lt; 1 hour)</option>
                <option value="medium">Medium (1-5 hours)</option>
                <option value="long">Long (&gt; 5 hours)</option>
              </select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={clearFilters}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Clear All Filters
            </button>
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 