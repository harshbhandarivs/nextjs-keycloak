import { createHash } from 'crypto';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';


function getCsrfTokenCookie() {
  const baseUrl = new URL(process.env.NEXTAUTH_URL).origin;
  const useSecureCookies = baseUrl.startsWith('https://');
  const csrfProp = `${useSecureCookies ? '__Host-' : ''}next-auth.csrf-token`;
  return cookies().get(csrfProp);
}

export default async function verifyCsrfToken(req: NextRequest) {
  const csrfMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
  const secret = process.env.NEXTAUTH_SECRET;
  try {
    const {
      csrfToken: csrfTokenFromBody
    } = await req.json();
      const csrfCookie = getCsrfTokenCookie();
      if (csrfCookie?.value) {
        const [csrfTokenValue, csrfTokenHash] = csrfCookie.value.split('|');
        if (csrfTokenHash === createHash('sha256').update(`${csrfTokenValue}${secret}`).digest('hex')) {
            if (csrfMethods.includes(req.method) && csrfTokenValue === csrfTokenFromBody) return true;
        }
      }
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
