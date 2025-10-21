import { NextRequest, NextResponse } from 'next/server';
import { generateCopy, POE_MODELS } from '@/lib/poe-client';
import { requireWhopUser } from '@/lib/whop-sdk';
import { z } from 'zod';

const generateSchema = z.object({
  model: z.enum([POE_MODELS.eugeneSchwartzPro, POE_MODELS.vslScript]),
  prompt: z.string().min(10, 'Prompt must be at least 10 characters'),
  context: z
    .object({
      audience: z.string().optional(),
      product: z.string().optional(),
      tone: z.string().optional(),
      wordCount: z.number().positive().optional(),
    })
    .optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const user = await requireWhopUser();

    // Parse and validate request body
    const body = await request.json();
    const validation = generateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.error.issues },
        { status: 400 }
      );
    }

    const { model, prompt, context } = validation.data;

    // Generate copy
    const output = await generateCopy({
      model,
      prompt,
      context,
    });

    // Return generated copy
    return NextResponse.json({
      success: true,
      output,
      metadata: {
        userId: user.id,
        model,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Generation error:', error);
    
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate copy. Please try again.' },
      { status: 500 }
    );
  }
}

