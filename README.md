# AI & LLM Roadmap 🚀

A comprehensive learning platform for mastering artificial intelligence and large language models. Built with Next.js, Prisma, and Tailwind CSS.

## ✨ Features

- **📚 Curated Learning Paths**: Structured learning journeys for different AI/ML topics
- **🎯 Resource Management**: Videos, articles, courses, books, and tools
- **🏷️ Smart Categorization**: Organized by difficulty, type, and topic
- **📊 Progress Tracking**: Monitor your learning journey
- **🎨 Modern UI**: Beautiful, responsive design with dark mode support
- **⚡ Fast Performance**: Built with Next.js 15 and optimized for speed

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: SQLite with Prisma ORM
- **Deployment**: Ready for Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ai-llm-roadmap.git
   cd ai-llm-roadmap
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Seed the database with initial data**
   ```bash
   npm run seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ai-llm-roadmap/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts           # Seed data
├── src/
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── category/     # Category pages
│   │   ├── learning-path/ # Learning path pages
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Homepage
│   ├── components/       # React components
│   ├── generated/        # Prisma client
│   └── lib/             # Utilities
└── public/              # Static assets
```

## 🗄️ Database Schema

The application uses a comprehensive database schema with the following main entities:

- **Categories**: Organize learning content by topic
- **Learning Paths**: Structured learning journeys
- **Resources**: Individual learning materials (videos, articles, etc.)
- **Users**: User accounts and preferences
- **Progress**: Track learning progress
- **Tags**: Flexible categorization system

## 🎯 Learning Categories

1. **Machine Learning Fundamentals** 🧠
   - Core concepts and algorithms
   - Statistical foundations
   - Practical implementations

2. **Deep Learning** ⚡
   - Neural networks
   - Transformer architecture
   - Advanced models

3. **Natural Language Processing** 💬
   - Text processing
   - Language models
   - NLP techniques

4. **Computer Vision** 👁️
   - Image recognition
   - Object detection
   - Visual AI

5. **AI Tools & Frameworks** 🛠️
   - Practical tools
   - Libraries
   - Development frameworks

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database with initial data

## 🌟 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database powered by [Prisma](https://prisma.io/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from various open-source libraries

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or reach out to the maintainers.

---

**Happy Learning! 🎓**
