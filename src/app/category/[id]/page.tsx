'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface LearningPath {
  id: string
  title: string
  description: string | null
  slug: string
  difficulty: string
  estimatedHours: number | null
  isPublished: boolean
  _count: {
    resources: number
    progress: number
  }
}

interface Category {
  id: string
  name: string
  description: string | null
  icon: string | null
  color: string | null
}

export default function CategoryPage() {
  const params = useParams()
  const [category, setCategory] = useState<Category | null>(null)
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const categoryId = params.id as string
    
    // Fetch category details
    fetch(`/api/categories/${categoryId}`)
      .then(res => res.json())
      .then(data => setCategory(data))
      .catch(error => console.error('Error fetching category:', error))

    // Fetch learning paths for this category
    fetch(`/api/learning-paths?categoryId=${categoryId}&published=true`)
      .then(res => res.json())
      .then(data => {
        setLearningPaths(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching learning paths:', error)
        setLoading(false)
      })
  }, [params.id])

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading category...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Category not found</h1>
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
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to categories
          </Link>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div 
              className="text-4xl mr-4"
              style={{ color: category.color || '#3B82F6' }}
            >
              {category.icon || '📚'}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              {category.name}
            </h1>
          </div>
          
          {category.description && (
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {category.description}
            </p>
          )}
        </div>
      </header>

      {/* Learning Paths */}
      <main className="container mx-auto px-4 py-12">
        {learningPaths.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No learning paths yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Learning paths for this category are coming soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningPaths.map((path) => (
              <Link
                key={path.id}
                href={`/learning-path/${path.slug}`}
                className="group block"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 border border-gray-200 dark:border-gray-700 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {path.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(path.difficulty)}`}>
                      {path.difficulty}
                    </span>
                  </div>
                  
                  {path.description && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                      {path.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span>{path._count.resources} resources</span>
                    {path.estimatedHours && (
                      <span>~{path.estimatedHours}h</span>
                    )}
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
        )}
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>Explore {learningPaths.length} learning paths in {category.name}</p>
        </div>
      </footer>
    </div>
  )
} 