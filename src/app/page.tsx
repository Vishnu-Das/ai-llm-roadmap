'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import SearchBar from '@/components/SearchBar'

interface Category {
  id: string
  name: string
  description: string | null
  icon: string | null
  color: string | null
  _count: {
    learningPaths: number
    resources: number
  }
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching categories:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading learning paths...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AI & LLM Roadmap
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Master artificial intelligence and large language models with curated learning paths, 
            resources, and hands-on projects.
          </p>
          
          {/* Search Bar */}
          <SearchBar />
        </div>
      </header>

      {/* Categories Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="group block"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div 
                    className="text-3xl mr-4"
                    style={{ color: category.color || '#3B82F6' }}
                  >
                    {category.icon || '📚'}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {category.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{category._count.learningPaths} learning paths</span>
                      <span>{category._count.resources} resources</span>
                    </div>
                  </div>
                </div>
                
                {category.description && (
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {category.description}
                  </p>
                )}
                
                <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm">
                  Explore category
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Learning Journey Stats
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {categories.length}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {categories.reduce((sum, cat) => sum + cat._count.learningPaths, 0)}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Learning Paths</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {categories.reduce((sum, cat) => sum + cat._count.resources, 0)}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Resources</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>Built with Next.js, Prisma, and Tailwind CSS</p>
          <p className="mt-2">Your journey to AI mastery starts here</p>
        </div>
      </footer>
    </div>
  )
}
