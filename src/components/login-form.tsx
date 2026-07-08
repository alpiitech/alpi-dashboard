import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/shared/utils/cn"
import { useLoginMutation } from "@/features/auth/auth.mutations"

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required").min(6, "At least 6 characters"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm({ className }: { className?: string }) {
  const [showPassword, setShowPassword] = useState(false)
  const loginMutation = useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">Sign in to your Alpii account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@alpii.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-[11px] text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              className="pr-10"
              aria-invalid={!!errors.password}
              {...register("password")}
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-[11px] text-destructive">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full mt-1"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      {/* Demo credentials hint */}
      <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-[11px] text-muted-foreground">
        <span className="font-medium text-foreground/80">Demo credentials</span>
        <div className="mt-1 space-y-0.5">
          <div>Email: <span className="font-mono text-foreground/70">demo@alpii.com</span></div>
          <div>Password: <span className="font-mono text-foreground/70">demo1234</span></div>
        </div>
      </div>
    </div>
  )
}
