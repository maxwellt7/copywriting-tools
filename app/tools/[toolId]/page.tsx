'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { TOOLS } from '@/lib/types';

export default function ToolPage() {
  const params = useParams();
  const router = useRouter();
  const toolId = params.toolId as string;
  
  const tool = TOOLS.find((t) => t.id === toolId);

  const [prompt, setPrompt] = useState('');
  const [audience, setAudience] = useState('');
  const [product, setProduct] = useState('');
  const [tone, setTone] = useState('');
  const [wordCount, setWordCount] = useState('');
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  if (!tool) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Tool not found</h1>
          <Link href="/" className="text-purple-300 hover:text-purple-100">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    setError('');
    setOutput('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: tool.model,
          prompt,
          context: {
            ...(audience && { audience }),
            ...(product && { product }),
            ...(tone && { tone }),
            ...(wordCount && { wordCount: parseInt(wordCount) }),
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate copy');
      }

      setOutput(data.output);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    // Could add a toast notification here
  };

  const handleInsertExample = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-purple-300 hover:text-purple-100 mb-4 inline-flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to tools
          </Link>
          <div className="flex items-center mb-4">
            <span className="text-5xl mr-4">{tool.icon}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {tool.name}
              </h1>
              <p className="text-purple-200">{tool.description}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Column */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Your Prompt</h2>
              
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to create..."
                className="w-full h-48 bg-white/5 border border-white/20 rounded-lg p-4 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />

              <div className="mt-4">
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-sm text-purple-300 hover:text-purple-100 flex items-center"
                >
                  {showAdvanced ? '− Hide' : '+ Show'} advanced options
                </button>
              </div>

              {showAdvanced && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">
                      Target Audience (optional)
                    </label>
                    <input
                      type="text"
                      value={audience}
                      onChange={(e) => setAudience(e.target.value)}
                      placeholder="e.g., entrepreneurs, women 25-40"
                      className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">
                      Product/Service (optional)
                    </label>
                    <input
                      type="text"
                      value={product}
                      onChange={(e) => setProduct(e.target.value)}
                      placeholder="e.g., online course, SaaS product"
                      className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">
                      Tone (optional)
                    </label>
                    <input
                      type="text"
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      placeholder="e.g., professional, casual, urgent"
                      className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">
                      Word Count (optional)
                    </label>
                    <input
                      type="number"
                      value={wordCount}
                      onChange={(e) => setWordCount(e.target.value)}
                      placeholder="e.g., 500"
                      className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                {isGenerating ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  '✨ Generate Copy'
                )}
              </button>

              {error && (
                <div className="mt-4 bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200">
                  {error}
                </div>
              )}
            </div>

            {/* Example Prompts */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                Example Prompts
              </h3>
              <div className="space-y-2">
                {tool.examplePrompts.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => handleInsertExample(example)}
                    className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-3 text-sm text-purple-200 hover:text-white transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Output Column */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Generated Copy</h2>
                {output && (
                  <button
                    onClick={handleCopy}
                    className="text-sm bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Copy
                  </button>
                )}
              </div>

              {!output && !isGenerating && (
                <div className="h-96 flex items-center justify-center text-purple-300">
                  <div className="text-center">
                    <div className="text-5xl mb-4">📝</div>
                    <p>Your generated copy will appear here</p>
                  </div>
                </div>
              )}

              {isGenerating && (
                <div className="h-96 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-pulse text-5xl mb-4">✨</div>
                    <p className="text-purple-200">Creating amazing copy...</p>
                  </div>
                </div>
              )}

              {output && (
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 min-h-[24rem]">
                  <pre className="whitespace-pre-wrap text-white font-sans leading-relaxed">
                    {output}
                  </pre>
                </div>
              )}
            </div>

            {/* About This Tool */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                About This Tool
              </h3>
              <p className="text-purple-200 text-sm mb-4">
                {tool.longDescription}
              </p>
              <h4 className="text-sm font-semibold text-white mb-2">Best For:</h4>
              <ul className="space-y-1">
                {tool.useCases.map((useCase, index) => (
                  <li key={index} className="text-sm text-purple-200 flex items-start">
                    <span className="mr-2">•</span>
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

