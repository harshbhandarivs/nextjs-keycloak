import verifyCsrfToken from '@/utils/verifyCsrfToken'
import { JWT, getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

function logoutParams(token: JWT): Record<string, string> {
  return {
    id_token_hint: token.idToken as string,
    post_logout_redirect_uri: process.env.NEXTAUTH_URL,
  };
}

function handleEmptyToken() {
  const response = { error: "No session present" };
  const responseHeaders = { status: 400 };
  return NextResponse.json(response, responseHeaders);
}

function redirectToEndSessionEndpointToURL(token: JWT) {
  const endSessionEndPoint = new URL(
    `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout`
  );
  const params: Record<string, string> = logoutParams(token);
  const endSessionParams = new URLSearchParams(params);
  const response = { url: `${endSessionEndPoint.href}/?${endSessionParams}` };
  return NextResponse.json(response);
}

function handleInvalidCSRFToken() {
  const response = { error: "Invalid CSRF token" };
  const responseHeaders = { status: 400 };
  return NextResponse.json(response, responseHeaders);
}

export async function POST(req: NextRequest) {
  try {
    let validateCsrfToken = await verifyCsrfToken(req);
    if (validateCsrfToken) {
      const token = await getToken({ req })
      if (token) {
        return redirectToEndSessionEndpointToURL(token);
      }
      return handleEmptyToken();
    }
    return handleInvalidCSRFToken();
  } catch (error) {
    console.error(error);
    const response = {
      error: "Unable to logout from the session",
    };
    const responseHeaders = {
      status: 500,
    };
    return NextResponse.json(response, responseHeaders);
  }
}
