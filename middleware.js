export default function middleware(request) {
  const auth = request.headers.get("authorization")

  if (!auth) {
    return new Response("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    })
  }

  const base64 = auth.split(" ")[1]
  const decoded = atob(base64)

  const [user, pass] = decoded.split(":")

  const validUser = process.env.BASIC_USER
  const validPass = process.env.BASIC_PASS

  if (user === validUser && pass === validPass) {
    return
  }

  return new Response("Access denied", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  })
}

export const config = {
  matcher: ["/storage/:path*"],
}