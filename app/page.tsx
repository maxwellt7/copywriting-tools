import Link from 'next/link';
import { TOOLS } from '@/lib/types';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            ✍️ Copywriting Mastery
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Perfect your copywriting with AI-powered tools trained on legendary copywriters.
            Select a tool, provide context, and get breakthrough copy in seconds.
          </p>
        </header>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {TOOLS.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.id}`}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="text-5xl mb-4">{tool.icon}</div>
                <h2 className="text-2xl font-bold text-white mb-2">{tool.name}</h2>
                <p className="text-purple-200 mb-4">{tool.description}</p>
                <div className="flex items-center text-purple-300 group-hover:text-purple-100 transition-colors">
                  <span className="text-sm font-medium">Get Started</span>
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold text-white mb-2">Lightning Fast</h3>
            <p className="text-purple-200 text-sm">
              Generate professional copy in seconds, not hours
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-lg font-semibold text-white mb-2">Targeted</h3>
            <p className="text-purple-200 text-sm">
              Customize for your audience, product, and tone
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">💎</div>
            <h3 className="text-lg font-semibold text-white mb-2">Expert Quality</h3>
            <p className="text-purple-200 text-sm">
              Trained on legendary copywriting principles
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
