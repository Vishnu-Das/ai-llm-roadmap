import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const learningPathId = searchParams.get('learningPathId')
    const resourceId = searchParams.get('resourceId')

    const where: any = {}
    
    if (userId) {
      where.userId = userId
    }
    
    if (learningPathId) {
      where.learningPathId = learningPathId
    }
    
    if (resourceId) {
      where.resourceId = resourceId
    }

    const progress = await prisma.progress.findMany({
      where,
      include: {
        learningPath: true,
        resource: true,
      },
      orderBy: { updatedAt: 'desc' },
    })

    return NextResponse.json(progress)
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { status, notes, rating, learningPathId, resourceId } = body

    // For demo purposes, using a default user ID
    // In a real app, this would come from authentication
    const userId = 'demo-user-123'

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      )
    }

    // Check if progress already exists
    const existingProgress = await prisma.progress.findFirst({
      where: {
        userId,
        learningPathId: learningPathId || null,
        resourceId: resourceId || null,
      },
    })

    let progress
    if (existingProgress) {
      // Update existing progress
      progress = await prisma.progress.update({
        where: { id: existingProgress.id },
        data: {
          status,
          notes,
          rating,
          completedAt: status === 'completed' ? new Date() : null,
        },
        include: {
          learningPath: true,
          resource: true,
        },
      })
    } else {
      // Create new progress
      progress = await prisma.progress.create({
        data: {
          userId,
          status,
          notes,
          rating,
          completedAt: status === 'completed' ? new Date() : null,
          learningPathId: learningPathId || null,
          resourceId: resourceId || null,
        },
        include: {
          learningPath: true,
          resource: true,
        },
      })
    }

    return NextResponse.json(progress, { status: 201 })
  } catch (error) {
    console.error('Error creating/updating progress:', error)
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    )
  }
} 