'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import SearchBar from '@/components/SearchBar'

interface SearchResult {
  resultType: 'category' | 'learningPath' | 'resource'
  id: string
  title: string
  description?: string
  url?: string
  difficulty?: string
  resourceType?: string
  isFree?: boolean
  duration?: number
  category?: {
    name: string
    icon: string
    color: string
  }
  slug?: string
}

function SearchPageContent() {
  const searchParams = useSearchParams()
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)

  const performSearch = async () => {
    const query = searchParams.get('q')
    const difficulty = searchParams.get('difficulty')
    const type = searchParams.get('type')
    const isFree = searchParams.get('isFree')
    const duration = searchParams.get('duration')

    if (!query && !difficulty && !type && !isFree && !duration) {
      setResults([])
      return
    }

    setLoading(true)

    try {
      // Search across categories, learning paths, and resources
      const [categoriesRes, learningPathsRes, resourcesRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/learning-paths?published=true'),
        fetch('/api/resources')
      ])

      const [categories, learningPaths, resources] = await Promise.all([
        categoriesRes.json(),
        learningPathsRes.json(),
        resourcesRes.json()
      ])

      const filteredResults: SearchResult[] = []

      // Filter categories
      if (query) {
        const filteredCategories = categories.filter((cat: any) =>
          cat.name.toLowerCase().includes(query.toLowerCase()) ||
          cat.description?.toLowerCase().includes(query.toLowerCase())
        )
        filteredResults.push(...filteredCategories.map((cat: any) => ({
          resultType: 'category' as const,
          id: cat.id,
          title: cat.name,
          description: cat.description,
          category: cat
        })))
      }

      // Filter learning paths
      let filteredLearningPaths = learningPaths
      if (query) {
        filteredLearningPaths = filteredLearningPaths.filter((path: any) =>
          path.title.toLowerCase().includes(query.toLowerCase()) ||
          path.description?.toLowerCase().includes(query.toLowerCase())
        )
      }
      if (difficulty) {
        filteredLearningPaths = filteredLearningPaths.filter((path: any) =>
          path.difficulty === difficulty
        )
      }
      if (duration) {
        filteredLearningPaths = filteredLearningPaths.filter((path: any) => {
          if (!path.estimatedHours) return false
          switch (duration) {
            case 'short': return path.estimatedHours < 1
            case 'medium': return path.estimatedHours >= 1 && path.estimatedHours <= 5
            case 'long': return path.estimatedHours > 5
            default: return true
          }
        })
      }

      filteredResults.push(...filteredLearningPaths.map((path: any) => ({
        resultType: 'learningPath' as const,
        id: path.id,
        title: path.title,
        description: path.description,
        difficulty: path.difficulty,
        slug: path.slug,
        category: path.category
      })))

      // Filter resources
      let filteredResources = resources
      if (query) {
        filteredResources = filteredResources.filter((resource: any) =>
          resource.title.toLowerCase().includes(query.toLowerCase()) ||
          resource.description?.toLowerCase().includes(query.toLowerCase())
        )
      }
      if (difficulty) {
        filteredResources = filteredResources.filter((resource: any) =>
          resource.difficulty === difficulty
        )
      }
      if (type) {
        filteredResources = filteredResources.filter((resource: any) =>
          resource.type === type
        )
      }
      if (isFree !== null) {
        filteredResources = filteredResources.filter((resource: any) =>
          resource.isFree === (isFree === 'true')
        )
      }
      if (duration) {
        filteredResources = filteredResources.filter((resource: any) => {
          if (!resource.duration) return false
          const hours = resource.duration / 60
          switch (duration) {
            case 'short': return hours < 1
            case 'medium': return hours >= 1 && hours <= 5
            case 'long': return hours > 5
            default: return true
          }
        })
      }

      filteredResults.push(...filteredResources.map((resource: any) => ({
        resultType: 'resource' as const,
        id: resource.id,
        title: resource.title,
        description: resource.description,
        url: resource.url,
        difficulty: resource.difficulty,
        resourceType: resource.type,
        isFree: resource.isFree,
        duration: resource.duration
      })))

      setResults(filteredResults)
    } catch (error) {
      console.error('Error performing search:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    performSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥'
      case 'article': return '📄'
      case 'book': return '📚'
      case 'course': return '🎓'
      case 'tutorial': return '🔧'
      case 'tool': return '⚙️'
      case 'paper': return '📊'
      default: return '📖'
    }
  }

  const formatDuration = (minutes: number | null) => {
    if (!minutes) return null
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Search Learning Resources
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Find the perfect courses, tutorials, and resources for your AI learning journey
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar />
      </header>

      {/* Search Results */}
      <main className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Searching...</p>
          </div>
        ) : (
          <div>
            {results.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  No results found
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search criteria or browse our categories
                </p>
                <Link 
                  href="/"
                  className="inline-block mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Browse Categories
                </Link>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Search Results ({results.length})
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((result) => (
                    <div
                      key={`${result.resultType}-${result.id}`}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 border border-gray-200 dark:border-gray-700 h-full"
                    >
                      {/* Result Type Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          result.resultType === 'category' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                          result.resultType === 'learningPath' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                          {result.resultType === 'category' ? 'Category' :
                           result.resultType === 'learningPath' ? 'Learning Path' : 'Resource'}
                        </span>
                        {result.resultType === 'resource' && result.isFree && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs font-medium">
                            Free
                          </span>
                        )}
                      </div>

                      {/* Icon */}
                      <div className="text-3xl mb-4">
                        {result.resultType === 'category' ? (result.category?.icon || '📚') :
                         result.resultType === 'learningPath' ? (result.category?.icon || '🎯') :
                         getTypeIcon(result.resourceType || '')}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {result.title}
                      </h3>

                      {/* Description */}
                      {result.description && (
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                          {result.description}
                        </p>
                      )}

                      {/* Meta Info */}
                      <div className="space-y-2 mb-4">
                        {result.difficulty && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(result.difficulty)}`}>
                            {result.difficulty}
                          </span>
                        )}
                        {result.resourceType && result.resultType === 'resource' && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-full text-xs font-medium">
                            {result.resourceType}
                          </span>
                        )}
                        {result.duration && (
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDuration(result.duration)}
                          </span>
                        )}
                      </div>

                      {/* Action Button */}
                      <div className="mt-auto">
                        {result.resultType === 'category' ? (
                          <Link
                            href={`/category/${result.id}`}
                            className="block w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                          >
                            Explore Category
                          </Link>
                        ) : result.resultType === 'learningPath' ? (
                          <Link
                            href={`/learning-path/${result.slug}`}
                            className="block w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                          >
                            View Learning Path
                          </Link>
                        ) : (
                          <a
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                          >
                            Open Resource
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div><p className="mt-4 text-gray-600 dark:text-gray-400">Loading search...</p></div>}>
      <SearchPageContent />
    </Suspense>
  )
} 