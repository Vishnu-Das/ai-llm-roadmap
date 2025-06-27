'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import ProgressTracker from '@/components/ProgressTracker'

interface Resource {
  id: string
  title: string
  description: string | null
  url: string | null
  type: string
  difficulty: string
  duration: number | null
  isFree: boolean
  isExternal: boolean
  order: number
  category: {
    id: string
    name: string
  } | null
}

interface LearningPath {
  id: string
  title: string
  description: string | null
  slug: string
  difficulty: string
  estimatedHours: number | null
  isPublished: boolean
  category: {
    id: string
    name: string
    icon: string | null
    color: string | null
  }
  _count: {
    resources: number
    progress: number
  }
}

export default function LearningPathPage() {
  const params = useParams()
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null)
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const slug = params.slug as string
    
    // Fetch learning path details
    fetch(`/api/learning-paths/${slug}`)
      .then(res => res.json())
      .then(data => {
        setLearningPath(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching learning path:', error)
        setLoading(false)
      })

    // Fetch resources for this learning path
    fetch(`/api/resources?learningPathSlug=${slug}`)
      .then(res => res.json())
      .then(data => setResources(data))
      .catch(error => console.error('Error fetching resources:', error))
  }, [params.slug])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return '🎥'
      case 'article':
        return '📄'
      case 'book':
        return '📚'
      case 'course':
        return '🎓'
      case 'tutorial':
        return '🔧'
      case 'tool':
        return '⚙️'
      case 'paper':
        return '📊'
      default:
        return '📖'
    }
  }

  const formatDuration = (minutes: number | null) => {
    if (!minutes) return null
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading learning path...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!learningPath) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Learning path not found</h1>
            <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link href={`/category/${learningPath.category.id}`} className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to {learningPath.category.name}
          </Link>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div 
              className="text-4xl mr-4"
              style={{ color: learningPath.category.color || '#3B82F6' }}
            >
              {learningPath.category.icon || '📚'}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              {learningPath.title}
            </h1>
          </div>
          
          {learningPath.description && (
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
              {learningPath.description}
            </p>
          )}
          
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <span className={`px-3 py-1 rounded-full font-medium ${getDifficultyColor(learningPath.difficulty)}`}>
              {learningPath.difficulty}
            </span>
            <span>{learningPath._count.resources} resources</span>
            {learningPath.estimatedHours && (
              <span>~{learningPath.estimatedHours} hours</span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Tracker */}
          <div className="lg:col-span-1">
            <ProgressTracker 
              learningPathId={learningPath.id}
              onProgressUpdate={(progress) => {
                console.log('Progress updated:', progress)
                // You could add a toast notification here
              }}
            />
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            {resources.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  No resources yet
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Resources for this learning path are coming soon!
                </p>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Learning Resources
                </h2>
                
                <div className="space-y-4">
                  {resources.map((resource, index) => (
                    <div
                      key={resource.id}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="text-2xl">{getTypeIcon(resource.type)}</div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {index + 1}. {resource.title}
                              </h3>
                              <div className="flex items-center space-x-2">
                                {!resource.isFree && (
                                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-xs font-medium">
                                    Paid
                                  </span>
                                )}
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                                  {resource.difficulty}
                                </span>
                              </div>
                            </div>
                            
                            {resource.description && (
                              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                                {resource.description}
                              </p>
                            )}
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                              <span className="capitalize">{resource.type}</span>
                              {resource.duration && (
                                <span>{formatDuration(resource.duration)}</span>
                              )}
                              {resource.isExternal && (
                                <span>External link</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {resource.url && (
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors flex items-center"
                          >
                            {resource.isExternal ? 'Visit' : 'Open'}
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>Complete {resources.length} resources to master {learningPath.title}</p>
        </div>
      </footer>
    </div>
  )
} 