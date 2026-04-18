import { NextResponse } from 'next/server'

export function middleware(req) {
  const auth = req.headers.get('authorization')

  if (!auth) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    })
  }

  const base64 = auth.split(' ')[1]
  const decoded = atob(base64)

  const [user, pass] = decoded.split(':')

  const validUser = process.env.BASIC_USER
  const validPass = process.env.BASIC_PASS

  if (user === validUser && pass === validPass) {
    return NextResponse.next()
  }

  return new NextResponse('Access denied', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}

export const config = {
  matcher: ['/admin/:path*'],
}