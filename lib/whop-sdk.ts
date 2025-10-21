import { headers } from 'next/headers';

export interface WhopUser {
  id: string;
  username: string;
  email?: string;
  name?: string;
}

export async function getWhopUser(): Promise<WhopUser | null> {
  try {
    const headersList = await headers();
    const whopUserId = headersList.get('x-whop-user-id');
    const whopUsername = headersList.get('x-whop-username');
    const whopEmail = headersList.get('x-whop-email');

    if (!whopUserId) {
      // For development/testing, use test credentials
      if (process.env.NODE_ENV === 'development') {
        return {
          id: process.env.WHOP_TEST_USER_ID || 'test-user',
          username: process.env.WHOP_TEST_USERNAME || 'test-user',
          email: 'test@example.com',
          name: 'Test User',
        };
      }
      return null;
    }

    return {
      id: whopUserId,
      username: whopUsername || 'unknown',
      email: whopEmail || undefined,
    };
  } catch (error) {
    console.error('Error getting Whop user:', error);
    return null;
  }
}

export async function requireWhopUser(): Promise<WhopUser> {
  const user = await getWhopUser();
  if (!user) {
    throw new Error('Unauthorized: Whop user not found');
  }
  return user;
}

