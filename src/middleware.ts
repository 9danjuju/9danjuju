import type { NextRequest } from 'next/server';
import { updateSession } from './utils/supabase/middleware';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // return NextResponse.redirect(new URL('/', request.url));
  return await updateSession(request);
}

export const config = {
  matcher: ['/community/write', '/mypage']
};
