import { Link, isRouteErrorResponse, useRouteError } from "react-router"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Caption, H3, Text } from "@/components/ui/typography"

function getErrorMessage(error: unknown) {
  if (isRouteErrorResponse(error)) {
    return error.statusText || "A route error occurred."
  }

  if (error instanceof Error) {
    return error.message
  }

  return "Something went wrong while rendering this page."
}

function getErrorTitle(error: unknown) {
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) return "Page not found"
    if (error.status >= 500) return "Server error"
    return `Request failed (${error.status})`
  }

  if (error instanceof TypeError && error.message.includes("Importing a module script failed")) {
    return "Failed to load page"
  }

  return "Unexpected application error"
}

export function RouteErrorBoundary() {
  const error = useRouteError()
  const title = getErrorTitle(error)
  const message = getErrorMessage(error)
  const isChunkError = error instanceof TypeError && error.message.includes("Importing a module script failed")

  return (
    <div className="flex min-h-[60dvh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-[0_1px_1px_oklch(0_0_0/0.03)]">
        <div className="flex items-start gap-4">
          <div className="grid size-10 shrink-0 place-items-center rounded-[var(--radius-button)] bg-danger/10 text-danger">
            <AlertTriangle size={18} />
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <H3 as="h1">{title}</H3>
            <Text className="text-muted-foreground">{message}</Text>
            {isChunkError ? (
              <Caption className="block text-muted-foreground">
                This usually happens after a large refactor when the dev server cache is stale. Try refreshing the page or restarting the dev server.
              </Caption>
            ) : null}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Button size="sm" onClick={() => window.location.reload()}>
            <RefreshCw size={14} />
            Refresh page
          </Button>
          <Button size="sm" variant="outline" asChild>
            <Link to="/dashboard">
              <Home size={14} />
              Back to dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
