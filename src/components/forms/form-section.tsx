import type { ReactNode } from "react"
import { H5, Text } from "@/components/ui/typography"

export function FormSection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section className="space-y-4 border-b border-border pb-5 last:border-b-0 last:pb-0">
      <div>
        <H5 as="h3">{title}</H5>
        {description ? (
          <Text className="mt-1 text-muted-foreground">{description}</Text>
        ) : null}
      </div>
      {children}
    </section>
  )
}
