import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed with real course data...')

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Machine Learning Fundamentals',
        description: 'Core concepts and algorithms in machine learning',
        icon: '🧠',
        color: '#3B82F6',
        order: 1,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Deep Learning',
        description: 'Neural networks, transformers, and advanced architectures',
        icon: '⚡',
        color: '#8B5CF6',
        order: 2,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Natural Language Processing',
        description: 'Text processing, language models, and NLP techniques',
        icon: '💬',
        color: '#10B981',
        order: 3,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Computer Vision',
        description: 'Image recognition, object detection, and visual AI',
        icon: '👁️',
        color: '#F59E0B',
        order: 4,
      },
    }),
    prisma.category.create({
      data: {
        name: 'AI Tools & Frameworks',
        description: 'Practical tools, libraries, and frameworks for AI development',
        icon: '🛠️',
        color: '#EF4444',
        order: 5,
      },
    }),
  ])

  console.log('✅ Categories created')

  // Create learning paths
  const learningPaths = await Promise.all([
    // Machine Learning Fundamentals
    prisma.learningPath.create({
      data: {
        title: 'Machine Learning Basics',
        description: 'Start your ML journey with fundamental concepts and algorithms',
        slug: 'machine-learning-basics',
        difficulty: 'beginner',
        estimatedHours: 40,
        isPublished: true,
        order: 1,
        categoryId: categories[0].id,
      },
    }),
    prisma.learningPath.create({
      data: {
        title: 'Advanced Machine Learning',
        description: 'Advanced ML techniques and real-world applications',
        slug: 'advanced-machine-learning',
        difficulty: 'intermediate',
        estimatedHours: 60,
        isPublished: true,
        order: 2,
        categoryId: categories[0].id,
      },
    }),

    // Deep Learning
    prisma.learningPath.create({
      data: {
        title: 'Deep Learning Fundamentals',
        description: 'Learn deep learning using popular frameworks',
        slug: 'deep-learning-fundamentals',
        difficulty: 'intermediate',
        estimatedHours: 80,
        isPublished: true,
        order: 1,
        categoryId: categories[1].id,
      },
    }),
    prisma.learningPath.create({
      data: {
        title: 'Transformer Architecture',
        description: 'Understanding the revolutionary transformer model',
        slug: 'transformer-architecture',
        difficulty: 'advanced',
        estimatedHours: 30,
        isPublished: true,
        order: 2,
        categoryId: categories[1].id,
      },
    }),

    // NLP
    prisma.learningPath.create({
      data: {
        title: 'NLP Fundamentals',
        description: 'Core concepts in natural language processing',
        slug: 'nlp-fundamentals',
        difficulty: 'beginner',
        estimatedHours: 35,
        isPublished: true,
        order: 1,
        categoryId: categories[2].id,
      },
    }),
    prisma.learningPath.create({
      data: {
        title: 'Advanced NLP with Transformers',
        description: 'Advanced NLP techniques using transformer models',
        slug: 'advanced-nlp-transformers',
        difficulty: 'advanced',
        estimatedHours: 50,
        isPublished: true,
        order: 2,
        categoryId: categories[2].id,
      },
    }),

    // Computer Vision
    prisma.learningPath.create({
      data: {
        title: 'Computer Vision Basics',
        description: 'Introduction to computer vision and image processing',
        slug: 'computer-vision-basics',
        difficulty: 'beginner',
        estimatedHours: 45,
        isPublished: true,
        order: 1,
        categoryId: categories[3].id,
      },
    }),

    // AI Tools & Frameworks
    prisma.learningPath.create({
      data: {
        title: 'AI Development Tools',
        description: 'Essential tools and frameworks for AI development',
        slug: 'ai-development-tools',
        difficulty: 'beginner',
        estimatedHours: 25,
        isPublished: true,
        order: 1,
        categoryId: categories[4].id,
      },
    }),
  ])

  console.log('✅ Learning paths created')

  // Create resources with real course data
  const resources = await Promise.all([
    // Machine Learning Basics Resources
    prisma.resource.create({
      data: {
        title: 'Machine Learning by Andrew Ng (Coursera)',
        description: 'The most popular ML course by Stanford professor Andrew Ng',
        url: 'https://www.coursera.org/learn/machine-learning',
        type: 'course',
        difficulty: 'beginner',
        duration: 60,
        isFree: false,
        isExternal: true,
        order: 1,
        learningPathId: learningPaths[0].id,
      },
    }),
    prisma.resource.create({
      data: {
        title: 'Introduction to Machine Learning with Python',
        description: 'Hands-on ML course using scikit-learn',
        url: 'https://www.coursera.org/learn/machine-learning-with-python',
        type: 'course',
        difficulty: 'beginner',
        duration: 45,
        isFree: false,
        isExternal: true,
        order: 2,
        learningPathId: learningPaths[0].id,
      },
    }),
    prisma.resource.create({
      data: {
        title: 'Machine Learning Crash Course (Google)',
        description: 'Fast-paced, practical introduction to machine learning',
        url: 'https://developers.google.com/machine-learning/crash-course',
        type: 'course',
        difficulty: 'beginner',
        duration: 15,
        isFree: true,
        isExternal: true,
        order: 3,
        learningPathId: learningPaths[0].id,
      },
    }),
    prisma.resource.create({
      data: {
        title: 'Hands-On Machine Learning with Scikit-Learn & TensorFlow',
        description: 'Comprehensive book by Aurélien Géron',
        url: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/',
        type: 'book',
        difficulty: 'intermediate',
        duration: 600,
        isFree: false,
        isExternal: true,
        order: 4,
        learningPathId: learningPaths[0].id,
      },
    }),

    // Advanced Machine Learning Resources
    prisma.resource.create({
      data: {
        title: 'Advanced Machine Learning Specialization (Coursera)',
        description: 'Advanced ML techniques by HSE University',
        url: 'https://www.coursera.org/specializations/aml',
        type: 'course',
        difficulty: 'intermediate',
        duration: 120,
        isFree: false,
        isExternal: true,
        order: 1,
        learningPathId: learningPaths[1].id,
      },
    }),
    prisma.resource.create({
      data: {
        title: 'Pattern Recognition and Machine Learning',
        description: 'Classic textbook by Christopher Bishop',
        url: 'https://www.microsoft.com/en-us/research/people/cmbishop/prml-book/',
        type: 'book',
        difficulty: 'advanced',
        duration: 800,
        isFree: false,
        isExternal: true,
        order: 2,
        learningPathId: learningPaths[1].id,
      },
    }),

    // Deep Learning Fundamentals Resources
    prisma.resource.create({
      data: {
        title: 'Deep Learning Specialization (Coursera)',
        description: 'Comprehensive deep learning course by Andrew Ng',
        url: 'https://www.coursera.org/specializations/deep-learning',
        type: 'course',
        difficulty: 'intermediate',
        duration: 100,
        isFree: false,
        isExternal: true,
        order: 1,
        learningPathId: learningPaths[2].id,
      },
    }),
    prisma.resource.create({
      data: {
        title: 'Deep Learning with PyTorch',
        description: 'Official PyTorch tutorials and documentation',
        url: 'https://pytorch.org/tutorials/',
        type: 'tutorial',
        difficulty: 'intermediate',
        duration: 120,
        isFree: true,
        isExternal: true,
        order: 2,
        learningPathId: learningPaths[2].id,
      },
    }),
    prisma.resource.create({
      data: {
        title: 'TensorFlow Developer Certificate',
        description: 'Official TensorFlow certification program',
        url: 'https://www.tensorflow.org/certificate',
        type: 'course',
        difficulty: 'intermediate',
        duration: 80,
        isFree: false,
        isExternal: true,
        order: 3,
        learningPathId: learningPaths[2].id,
      },
    }),
    prisma.resource.create({
      data: {
        title: 'Deep Learning Book',
        description: 'Comprehensive deep learning textbook by Ian Goodfellow',
        url: 'https://www.deeplearningbook.org/',
        type: 'book',
        difficulty: 'advanced',
        duration: 1000,
        isFree: true,
        isExternal: true,
        order: 4,
        learningPathId: learningPaths[2].id,
      },
    }),

    // Transformer Architecture Resources
    prisma.resource.create({
      data: {
        title: 'Attention Is All You Need (Original Paper)',
        description: 'The original transformer paper that revolutionized NLP',
        url: 'https://arxiv.org/abs/1706.03762',
        type: 'paper',
        difficulty: 'advanced',
        duration: 60,
        isFree: true,
        isExternal: true,
        order: 1,
        learningPathId: learningPaths[3].id,
      },
    }),
    prisma.resource.create({
      data: {
        title: 'The Illustrated Transformer',
        description: 'Visual explanation of transformer architecture',
        url: 'http://jalammar.github.io/illustrated-transformer/',
        type: 'article',
        difficulty: 'intermediate',
        duration: 20,
        isFree: true,
        isExternal: true,
        order: 2,
        learningPathId: learningPaths[3].id,
      },
    }),
    prisma.resource.create({
      data: {
        title: 'Transformers for Natural Language Processing',
        description: 'Comprehensive course on transformers',
        url: 'https://www.udemy.com/course/transformers-for-natural-language-processing/',
        type: 'course',
        difficulty: 'advanced',
        duration: 90,
        isFree: false,
        isExternal: true,
        order: 3,
        learningPathId: learningPaths[3].id,
      },
    }),

    // NLP Fundamentals Resources
    prisma.resource.create({
      data: {
        title: 'Natural Language Processing Specialization (Coursera)',
        description: 'Comprehensive NLP course by deeplearning.ai',
        url: 'https://www.coursera.org/specializations/natural-language-processing',
        type: 'course',
        difficulty: 'intermediate',
        duration: 70,
        isFree: false,
        isExternal: true,
        order: 1,
        learningPathId: learningPaths[4].id,
      },
    }),
    prisma.resource.create({
      data: {
        title: 'Natural Language Processing with Python (NLTK)',
        description: 'NLTK library tutorial and examples',
        url: 'https://www.nltk.org/book/',
        type: 'book',
        difficulty: 'beginner',
        duration: 300,
        isFree: true,
        isExternal: true,
        order: 2,
        learningPathId: learningPaths[4].id,
      },
    }),
    prisma.resource.create({
      data: {
        title: 'Hugging Face Transformers Course',
        description: 'Learn to use state-of-the-art NLP models',
        url: 'https://huggingface.co/course',
        type: 'course',
        difficulty: 'intermediate',
        duration: 40,
        isFree: true,
        isExternal: true,
        order: 3,
        learningPathId: learningPaths[4].id,
      },
    }),

    // Advanced NLP Resources
    prisma.resource.create({
      data: {
        title: 'Advanced NLP with spaCy',
        description: 'Advanced NLP techniques using spaCy library',
        url: 'https://course.spacy.io/',
        type: 'course',
        difficulty: 'advanced',
        duration: 60,
        isFree: true,
        isExternal: true,
        order: 1,
        learningPathId: learningPaths[5].id,
      },
    }),
    prisma.resource.create({
      data: {
        title: 'BERT: Pre-training of Deep Bidirectional Transformers',
        description: 'Original BERT paper',
        url: 'https://arxiv.org/abs/1810.04805',
        type: 'paper',
        difficulty: 'advanced',
        duration: 45,
        isFree: true,
        isExternal: true,
        order: 2,
        learningPathId: learningPaths[5].id,
      },
    }),

    // Computer Vision Resources
    prisma.resource.create({
      data: {
        title: 'Computer Vision Specialization (Coursera)',
        description: 'Comprehensive computer vision course',
        url: 'https://www.coursera.org/specializations/computer-vision',
        type: 'course',
        difficulty: 'intermediate',
        duration: 90,
        isFree: false,
        isExternal: true,
        order: 1,
        learningPathId: learningPaths[6].id,
      },
    }),
    prisma.resource.create({
      data: {
        title: 'OpenCV-Python Tutorials',
        description: 'Official OpenCV Python tutorials',
        url: 'https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html',
        type: 'tutorial',
        difficulty: 'beginner',
        duration: 120,
        isFree: true,
        isExternal: true,
        order: 2,
        learningPathId: learningPaths[6].id,
      },
    }),
    prisma.resource.create({
      data: {
        title: 'Fast.ai Practical Deep Learning for Coders',
        description: 'Practical deep learning course with computer vision focus',
        url: 'https://course.fast.ai/',
        type: 'course',
        difficulty: 'intermediate',
        duration: 80,
        isFree: true,
        isExternal: true,
        order: 3,
        learningPathId: learningPaths[6].id,
      },
    }),

    // AI Development Tools Resources
    prisma.resource.create({
      data: {
        title: 'Jupyter Notebook Tutorial',
        description: 'Learn to use Jupyter notebooks for data science',
        url: 'https://jupyter.org/try',
        type: 'tutorial',
        difficulty: 'beginner',
        duration: 30,
        isFree: true,
        isExternal: true,
        order: 1,
        learningPathId: learningPaths[7].id,
      },
    }),
    prisma.resource.create({
      data: {
        title: 'GitHub Copilot Tutorial',
        description: 'Learn to use AI-powered code completion',
        url: 'https://github.com/features/copilot',
        type: 'tutorial',
        difficulty: 'beginner',
        duration: 20,
        isFree: false,
        isExternal: true,
        order: 2,
        learningPathId: learningPaths[7].id,
      },
    }),
    prisma.resource.create({
      data: {
        title: 'Google Colab Tutorial',
        description: 'Free cloud-based Jupyter notebook environment',
        url: 'https://colab.research.google.com/',
        type: 'tutorial',
        difficulty: 'beginner',
        duration: 15,
        isFree: true,
        isExternal: true,
        order: 3,
        learningPathId: learningPaths[7].id,
      },
    }),
    prisma.resource.create({
      data: {
        title: 'Weights & Biases Tutorial',
        description: 'ML experiment tracking and model management',
        url: 'https://wandb.ai/',
        type: 'tutorial',
        difficulty: 'intermediate',
        duration: 45,
        isFree: true,
        isExternal: true,
        order: 4,
        learningPathId: learningPaths[7].id,
      },
    }),
  ])

  console.log('✅ Resources created')

  // Create tags
  const tags = await Promise.all([
    prisma.tag.create({
      data: {
        name: 'Python',
        color: '#3776AB',
      },
    }),
    prisma.tag.create({
      data: {
        name: 'Mathematics',
        color: '#FF6B6B',
      },
    }),
    prisma.tag.create({
      data: {
        name: 'Statistics',
        color: '#4ECDC4',
      },
    }),
    prisma.tag.create({
      data: {
        name: 'Neural Networks',
        color: '#45B7D1',
      },
    }),
    prisma.tag.create({
      data: {
        name: 'Computer Vision',
        color: '#96CEB4',
      },
    }),
    prisma.tag.create({
      data: {
        name: 'Text Processing',
        color: '#FFEAA7',
      },
    }),
    prisma.tag.create({
      data: {
        name: 'Coursera',
        color: '#0056D2',
      },
    }),
    prisma.tag.create({
      data: {
        name: 'Free',
        color: '#10B981',
      },
    }),
    prisma.tag.create({
      data: {
        name: 'Paid',
        color: '#F59E0B',
      },
    }),
  ])

  console.log('✅ Tags created')

  console.log('🎉 Database seeding completed with real course data!')
  console.log(`📊 Created ${categories.length} categories`)
  console.log(`📚 Created ${learningPaths.length} learning paths`)
  console.log(`🔗 Created ${resources.length} resources`)
  console.log(`🏷️ Created ${tags.length} tags`)
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 