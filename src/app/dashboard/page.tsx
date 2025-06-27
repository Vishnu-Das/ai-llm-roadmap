'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Progress {
  id: string
  status: string
  completedAt?: string
  notes?: string
  rating?: number
  learningPath?: {
    id: string
    title: string
    slug: string
    category: {
      name: string
      icon: string
      color: string
    }
  }
  resource?: {
    id: string
    title: string
    type: string
  }
}

interface LearningPath {
  id: string
  title: string
  slug: string
  difficulty: string
  estimatedHours: number
  category: {
    name: string
    icon: string
    color: string
  }
  _count: {
    resources: number
  }
}

export default function DashboardPage() {
  const [progress, setProgress] = useState<Progress[]>([])
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch user progress
    fetch('/api/progress?userId=demo-user-123')
      .then(res => res.json())
      .then(data => setProgress(data))
      .catch(error => console.error('Error fetching progress:', error))

    // Fetch all learning paths
    fetch('/api/learning-paths?published=true')
      .then(res => res.json())
      .then(data => {
        setLearningPaths(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching learning paths:', error)
        setLoading(false)
      })
  }, [])

  const getProgressStats = () => {
    const total = progress.length
    const completed = progress.filter(p => p.status === 'completed').length
    const inProgress = progress.filter(p => p.status === 'in_progress').length
    const notStarted = progress.filter(p => p.status === 'not_started').length

    return { total, completed, inProgress, notStarted }
  }

  const getRecentProgress = () => {
    return progress
      .filter(p => p.status === 'completed' || p.status === 'in_progress')
      .sort((a, b) => new Date(b.completedAt || '').getTime() - new Date(a.completedAt || '').getTime())
      .slice(0, 5)
  }

  const getRecommendedPaths = () => {
    const completedCategories = new Set(
      progress
        .filter(p => p.status === 'completed' && p.learningPath)
        .map(p => p.learningPath!.category.name)
    )

    return learningPaths
      .filter(path => !completedCategories.has(path.category.name))
      .slice(0, 3)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  const stats = getProgressStats()

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
        
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Your Learning Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Track your progress and discover new learning opportunities
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Stats */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Your Progress
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Items</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Completed</span>
                  <span className="text-2xl font-bold text-green-600">{stats.completed}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">In Progress</span>
                  <span className="text-2xl font-bold text-blue-600">{stats.inProgress}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Not Started</span>
                  <span className="text-2xl font-bold text-gray-400">{stats.notStarted}</span>
                </div>
              </div>

              {stats.total > 0 && (
                <div className="mt-6">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
                    {Math.round((stats.completed / stats.total) * 100)}% Complete
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Recent Activity
              </h2>
              
              {getRecentProgress().length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🎯</div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Start your learning journey by exploring our categories!
                  </p>
                  <Link 
                    href="/"
                    className="inline-block mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Explore Categories
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {getRecentProgress().map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex-shrink-0">
                        {item.status === 'completed' ? (
                          <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                            <span className="text-green-600 dark:text-green-400">✅</span>
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 dark:text-blue-400">🔄</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {item.learningPath?.title || item.resource?.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.learningPath?.category.name || item.resource?.type}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {item.completedAt ? new Date(item.completedAt).toLocaleDateString() : 'In Progress'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recommended Learning Paths */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Recommended for You
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getRecommendedPaths().map((path) => (
              <Link
                key={path.id}
                href={`/learning-path/${path.slug}`}
                className="group block"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 border border-gray-200 dark:border-gray-700 h-full">
                  <div className="flex items-center mb-4">
                    <div 
                      className="text-2xl mr-3"
                      style={{ color: path.category.color }}
                    >
                      {path.category.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {path.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {path.category.name}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span className="capitalize">{path.difficulty}</span>
                    <span>{path._count.resources} resources</span>
                  </div>
                  
                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm">
                    Start learning
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
} 