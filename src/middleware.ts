import { authMiddleware } from '@clerk/nextjs';

// Public routes that don't require authentication
const publicRoutes = [
  '/',  // Home page
  '/sign-in(.*)',
  '/sign-up(.*)'
];

export default authMiddleware({
  publicRoutes,
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};