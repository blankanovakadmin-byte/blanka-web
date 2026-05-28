import { cookies } from 'next/headers';

const SESSION_COOKIE = 'blanka_admin_session';
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days

export function verifyAdminToken(token: string): boolean {
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken || adminToken.length < 32) return false;
  return token === adminToken;
}

export async function getAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  if (!session) return false;
  return verifyAdminToken(session.value);
}

export async function setAdminSession(token: string): Promise<boolean> {
  if (!verifyAdminToken(token)) return false;
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION,
    path: '/',
  });
  return true;
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
