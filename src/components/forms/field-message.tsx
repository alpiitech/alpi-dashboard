import { cn } from "@/shared/utils/cn"

export function FieldMessage({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  if (!children) {
    return null
  }

  return (
    <p className={cn("mt-1.5 text-xs leading-5 text-danger", className)}>
      {children}
    </p>
  )
}
