import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { UserRole } from '../context/AuthContext';

interface AuthenticatedRequest extends NextRequest {
  user?: {
    role: UserRole;
  };
}

const publicPaths = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
];

const roleBasedPaths: Record<string, UserRole[]> = {
  '/employee-directory': ['HR', 'PROJECT_MANAGER', 'TEAM_LEADER'],
  '/onboarding': ['HR'],
  '/offboarding': ['HR'],
  '/leave-management': ['HR', 'PROJECT_MANAGER', 'TEAM_LEADER', 'TEAM_MEMBER'],
  '/attendance': ['HR', 'PROJECT_MANAGER', 'TEAM_LEADER', 'TEAM_MEMBER'],
  '/social-connect': ['HR', 'PROJECT_MANAGER', 'TEAM_LEADER', 'TEAM_MEMBER'],
};

export async function middleware(request: AuthenticatedRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check if user is authenticated
  const authToken = request.cookies.get('authToken')?.value;
  if (!authToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Get user role from token or session
  // This is a placeholder - implement actual token verification
  const userRole = 'HR' as UserRole; // Replace with actual role from token

  // Check role-based access
  for (const [path, allowedRoles] of Object.entries(roleBasedPaths)) {
    if (pathname.startsWith(path) && !allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};