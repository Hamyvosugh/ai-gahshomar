// app/login/page.tsx
import { AuthForm } from '@/components/user/AuthForm'

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 p-4" dir="rtl">
      <AuthForm />
    </main>
  )
}