'use client'

import { useState, useEffect } from 'react'

interface Progress {
  id: string
  status: 'not_started' | 'in_progress' | 'completed' | 'skipped'
  completedAt?: string
  notes?: string
  rating?: number
}

interface ProgressTrackerProps {
  learningPathId?: string
  resourceId?: string
  onProgressUpdate?: (progress: Progress) => void
}

export default function ProgressTracker({ learningPathId, resourceId, onProgressUpdate }: ProgressTrackerProps) {
  const [status, setStatus] = useState<'not_started' | 'in_progress' | 'completed' | 'skipped'>('not_started')
  const [notes, setNotes] = useState('')
  const [rating, setRating] = useState<number>(0)
  const [isEditing, setIsEditing] = useState(false)

  const updateProgress = async () => {
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          notes: notes || undefined,
          rating: rating || undefined,
          learningPathId,
          resourceId,
        }),
      })

      if (response.ok) {
        const progress = await response.json()
        onProgressUpdate?.(progress)
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Error updating progress:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'skipped':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Track Your Progress
      </h3>

      {/* Status Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Status
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[
            { value: 'not_started', label: 'Not Started', icon: '⏳' },
            { value: 'in_progress', label: 'In Progress', icon: '🔄' },
            { value: 'completed', label: 'Completed', icon: '✅' },
            { value: 'skipped', label: 'Skipped', icon: '⏭️' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setStatus(option.value as any)}
              className={`p-3 rounded-lg border-2 transition-all ${
                status === option.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <div className="text-2xl mb-1">{option.icon}</div>
              <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {option.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Rating (Optional)
        </label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-2xl transition-colors ${
                star <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Notes (Optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add your thoughts, key takeaways, or notes..."
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          rows={3}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={updateProgress}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Update Progress
        </button>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {/* Current Status Display */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Current Status:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
        {rating > 0 && (
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Your Rating:</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-sm ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 