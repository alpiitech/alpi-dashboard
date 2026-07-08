export type AuthRole = "admin" | "ops" | "finance" | "support" | "viewer"

export type AuthUser = {
  id: string
  name: string
  email: string
  role: AuthRole
  permissions: string[]
  avatarInitials?: string
}

export type LoginCredentials = {
  email: string
  password: string
}

export type AuthSession = {
  user: AuthUser
  expiresAt: string
}
