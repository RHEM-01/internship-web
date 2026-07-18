import { LoginForm } from "@/components/web/auth/login/login-form"
import { fetchAuthQuery } from "@/lib/auth-server"
import { api } from "@/convex/_generated/api"
import { redirect } from "next/navigation"

/**
 * Renders the login page for unauthenticated users and redirects authenticated users to the home page.
 *
 * @returns The login page content.
 */
export default async function Page() {
  const user = await fetchAuthQuery(api.auth.getCurrentUser);
  if (user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
