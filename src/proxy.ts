import { auth } from "@/auth"
 
export const proxy = auth((req) => {
  // req.auth
})
 
// Optionally, don't invoke Proxy on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}