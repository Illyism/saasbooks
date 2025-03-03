import {
  deleteSessionTokenCookie,
  getCurrentSession,
  invalidateSession,
} from '@/lib/auth';

export async function GET(): Promise<Response> {
  const { session } = await getCurrentSession();

  if (session) {
    await invalidateSession(session.id);
  }

  await deleteSessionTokenCookie();

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/',
    },
  });
}
