import 'server-only';
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
      // Allow testing in both development and when NEXT_PUBLIC_WHOP_AGENT_USER_ID is set
      const agentUserId = process.env.NEXT_PUBLIC_WHOP_AGENT_USER_ID;
      const testUsername = process.env.WHOP_TEST_USERNAME;
      
      if (agentUserId) {
        console.log('Using test credentials for Whop user');
        return {
          id: agentUserId,
          username: testUsername || 'test-user',
          email: 'test@copywritingmastery.com',
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

