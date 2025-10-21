import { POE_MODELS } from './poe-client';

export interface Tool {
  id: string;
  name: string;
  model: typeof POE_MODELS[keyof typeof POE_MODELS];
  description: string;
  category: string;
  icon: string;
  longDescription: string;
  useCases: string[];
  examplePrompts: string[];
}

export interface Generation {
  id: string;
  userId: string;
  toolId: string;
  input: {
    prompt: string;
    audience?: string;
    product?: string;
    tone?: string;
    wordCount?: number;
  };
  output: string;
  createdAt: string;
  isSaved: boolean;
}

export const TOOLS: Tool[] = [
  {
    id: 'eugene-schwartz-pro',
    name: 'Eugene Schwartz Pro',
    model: POE_MODELS.eugeneSchwartzPro,
    description: 'Master copywriter persona for breakthrough advertising and sales copy',
    category: 'Sales Copy',
    icon: '✍️',
    longDescription:
      'Channel the legendary Eugene Schwartz, author of "Breakthrough Advertising". This tool specializes in creating compelling sales copy that taps into mass desire and creates breakthrough advertising campaigns.',
    useCases: [
      'Long-form sales letters',
      'Email sequences',
      'Ad copy that breaks through market sophistication',
      'Product launch campaigns',
      'Direct response marketing',
    ],
    examplePrompts: [
      'Write a sales letter for a weight loss supplement targeting women over 40',
      'Create an email sequence for launching a new online course',
      'Generate breakthrough ad copy for a revolutionary tech product',
    ],
  },
  {
    id: 'vsl-script',
    name: '5-Minute VSL Script',
    model: POE_MODELS.vslScript,
    description: 'Create compelling 5-minute Video Sales Letter scripts optimized for conversions',
    category: 'Video Scripts',
    icon: '🎬',
    longDescription:
      'Generate professional Video Sales Letter scripts designed to captivate viewers and drive conversions in exactly 5 minutes. Perfect for webinars, product launches, and sales videos.',
    useCases: [
      '5-minute explainer videos',
      'Product demo scripts',
      'Webinar opening scripts',
      'Sales funnel videos',
      'YouTube ad scripts',
    ],
    examplePrompts: [
      'Create a VSL script for a productivity app targeting entrepreneurs',
      'Write a webinar script introducing a new coaching program',
      'Generate a video sales script for a high-ticket consulting service',
    ],
  },
];

