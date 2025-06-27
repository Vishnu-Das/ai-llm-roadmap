import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const learningPath = await prisma.learningPath.findUnique({
      where: { slug },
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

    if (!learningPath) {
      return NextResponse.json(
        { error: 'Learning path not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(learningPath)
  } catch (error) {
    console.error('Error fetching learning path:', error)
    return NextResponse.json(
      { error: 'Failed to fetch learning path' },
      { status: 500 }
    )
  }
} 