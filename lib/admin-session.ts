import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
export const ADMIN_COOKIE = 'booyah_admin_session';
export function createSessionToken() {
 const secret = process.env.ADMIN_SESSION_SECRET;
 if (!secret || secret.length < 32) throw new Error('ADMIN_SESSION_SECRET must be at least 32 characters.');
 return 'admin.' + createHmac('sha256', secret).update('booyah-admin-v1').digest('hex');
}
export function isValidToken(token?: string) {
 if (!token) return false;
 const a = Buffer.from(token), b = Buffer.from(createSessionToken());
 return a.length === b.length && timingSafeEqual(a, b);
}
export async function isAdminRequest() { const jar = await cookies(); return isValidToken(jar.get(ADMIN_COOKIE)?.value); }
