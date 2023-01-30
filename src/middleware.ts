import { NextRequest, NextResponse } from 'next/server';
import { pocktbase_api } from './services/pocktbase_api';
import { isTokenExpired } from './utils/auth';

export async function middleware(request: NextRequest) {
    if (request.cookies.has('token')) {
        let cookie = request.cookies.get('token')?.value
        pocktbase_api.defaults.headers.common['Authorization'] = `Bearer ${cookie}`
        if (isTokenExpired(cookie || '')) {
            return NextResponse.redirect(new URL('/auth/singin', request.url))
        }

    } else {
        return NextResponse.redirect(new URL('/auth/singin', request.url))
    }
}

export const config = {
    matcher: '/app/:path*',
}
