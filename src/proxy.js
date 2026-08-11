import { NextResponse } from 'next/server';

export function proxy(request) {
  const { nextUrl, geo, headers, cookies } = request;
  const path = nextUrl.pathname;
  
  // We only want to handle geo-routing for the root "/" path or Indian routes that have US equivalents
  // But to be safe and avoid loops, let's only auto-redirect if they hit the root "/"
  
  if (path === '/') {
    const preferredRegion = cookies.get('preferred_region')?.value;
    
    // If the user explicitly chose IN, let them stay on "/"
    if (preferredRegion === 'IN') {
      return NextResponse.next();
    }
    
    // If the user explicitly chose US, or if they are from the US natively
    const country = geo?.country || headers.get('x-vercel-ip-country');
    
    if (preferredRegion === 'US' || country === 'US' || country === 'CA') {
      const usUrl = nextUrl.clone();
      usUrl.pathname = '/us/dca-calculator';
      return NextResponse.redirect(usUrl);
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Apply to root path only
    '/',
  ],
};
