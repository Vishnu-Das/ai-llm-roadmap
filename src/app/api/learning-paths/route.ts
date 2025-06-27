import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')
    const published = searchParams.get('published')

    const where: any = {}
    
    if (categoryId) {
      where.categoryId = categoryId
    }
    
    if (published !== null) {
      where.isPublished = published === 'true'
    }

    const learningPaths = await prisma.learningPath.findMany({
      where,
      orderBy: { order: 'asc' },
      include: {
        category: true,
        _count: {
          select: {
            resources: true,
            progress: true,
          },
        },
      },
    })

    return NextResponse.json(learningPaths)
  } catch (error) {
    console.error('Error fetching learning paths:', error)
    return NextResponse.json(
      { error: 'Failed to fetch learning paths' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, slug, difficulty, estimatedHours, categoryId, order } = body

    if (!title || !categoryId) {
      return NextResponse.json(
        { error: 'Title and category are required' },
        { status: 400 }
      )
    }

    const learningPath = await prisma.learningPath.create({
      data: {
        title,
        description,
        slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
        difficulty: difficulty || 'beginner',
        estimatedHours,
        categoryId,
        order: order || 0,
      },
      include: {
        category: true,
      },
    })

    return NextResponse.json(learningPath, { status: 201 })
  } catch (error) {
    console.error('Error creating learning path:', error)
    return NextResponse.json(
      { error: 'Failed to create learning path' },
      { status: 500 }
    )
  }
} 