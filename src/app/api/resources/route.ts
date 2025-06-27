import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')
    const learningPathId = searchParams.get('learningPathId')
    const learningPathSlug = searchParams.get('learningPathSlug')
    const type = searchParams.get('type')
    const difficulty = searchParams.get('difficulty')

    const where: any = {}
    
    if (categoryId) {
      where.categoryId = categoryId
    }
    
    if (learningPathId) {
      where.learningPathId = learningPathId
    }
    
    if (learningPathSlug) {
      // Find learning path by slug first, then filter resources
      const learningPath = await prisma.learningPath.findUnique({
        where: { slug: learningPathSlug },
        select: { id: true }
      })
      if (learningPath) {
        where.learningPathId = learningPath.id
      }
    }
    
    if (type) {
      where.type = type
    }
    
    if (difficulty) {
      where.difficulty = difficulty
    }

    const resources = await prisma.resource.findMany({
      where,
      orderBy: { order: 'asc' },
      include: {
        category: true,
        learningPath: true,
        _count: {
          select: {
            progress: true,
          },
        },
      },
    })

    return NextResponse.json(resources)
  } catch (error) {
    console.error('Error fetching resources:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resources' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      title, 
      description, 
      url, 
      type, 
      difficulty, 
      duration, 
      isFree, 
      isExternal, 
      categoryId, 
      learningPathId, 
      order 
    } = body

    if (!title || !type) {
      return NextResponse.json(
        { error: 'Title and type are required' },
        { status: 400 }
      )
    }

    const resource = await prisma.resource.create({
      data: {
        title,
        description,
        url,
        type,
        difficulty: difficulty || 'beginner',
        duration,
        isFree: isFree !== undefined ? isFree : true,
        isExternal: isExternal !== undefined ? isExternal : false,
        categoryId,
        learningPathId,
        order: order || 0,
      },
      include: {
        category: true,
        learningPath: true,
      },
    })

    return NextResponse.json(resource, { status: 201 })
  } catch (error) {
    console.error('Error creating resource:', error)
    return NextResponse.json(
      { error: 'Failed to create resource' },
      { status: 500 }
    )
  }
} 