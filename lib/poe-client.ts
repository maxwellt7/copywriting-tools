import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.POE_API_KEY,
  baseURL: 'https://api.poe.com/v1',
});

export const POE_MODELS = {
  eugeneSchwartzPro: 'EugeneSchwartzZPRO',
  vslScript: '5MVSLScript',
} as const;

export type PoeModel = typeof POE_MODELS[keyof typeof POE_MODELS];

export interface GenerateRequest {
  model: PoeModel;
  prompt: string;
  context?: {
    audience?: string;
    product?: string;
    tone?: string;
    wordCount?: number;
  };
}

export async function generateCopy(request: GenerateRequest): Promise<string> {
  try {
    const systemPrompt = buildSystemPrompt(request.context);
    
    const completion = await client.chat.completions.create({
      model: request.model,
      messages: [
        ...(systemPrompt ? [{ role: 'system' as const, content: systemPrompt }] : []),
        { role: 'user' as const, content: request.prompt },
      ],
    });

    return completion.choices[0]?.message?.content || 'No response generated';
  } catch (error) {
    console.error('Poe API Error:', error);
    throw new Error('Failed to generate copy. Please try again.');
  }
}

function buildSystemPrompt(context?: GenerateRequest['context']): string | null {
  if (!context) return null;

  const parts: string[] = [];

  if (context.audience) {
    parts.push(`Target Audience: ${context.audience}`);
  }
  if (context.product) {
    parts.push(`Product/Service: ${context.product}`);
  }
  if (context.tone) {
    parts.push(`Tone: ${context.tone}`);
  }
  if (context.wordCount) {
    parts.push(`Target Word Count: approximately ${context.wordCount} words`);
  }

  return parts.length > 0 ? parts.join('\n') : null;
}

export async function streamGenerateCopy(
  request: GenerateRequest,
  onChunk: (chunk: string) => void
): Promise<void> {
  try {
    const systemPrompt = buildSystemPrompt(request.context);
    
    const stream = await client.chat.completions.create({
      model: request.model,
      messages: [
        ...(systemPrompt ? [{ role: 'system' as const, content: systemPrompt }] : []),
        { role: 'user' as const, content: request.prompt },
      ],
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        onChunk(content);
      }
    }
  } catch (error) {
    console.error('Poe API Streaming Error:', error);
    throw new Error('Failed to generate copy. Please try again.');
  }
}

