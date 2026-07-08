import { LoginForm } from "@/components/login-form"

export function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left — branding panel */}
      <div className="relative hidden lg:flex flex-col justify-between bg-muted p-10 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop&q=80)",
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-white/90 text-sm font-bold text-foreground">
            A
          </div>
          <span className="text-sm font-semibold text-white">Alpii</span>
        </div>

        {/* Quote */}
        <div className="relative z-10">
          <blockquote className="space-y-2">
            <p className="text-lg font-medium leading-snug text-white">
              "The best way to manage your business is to have all the data in one place."
            </p>
            <footer className="text-sm text-white/60">Alpii Dashboard</footer>
          </blockquote>
        </div>
      </div>

      {/* Right — form panel */}
      <div className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              A
            </div>
            <span className="text-sm font-semibold">Alpii</span>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  )
}
