import { Badge } from "@/components/ui/badge"

export type StatusTone = "success" | "warning" | "danger" | "info" | "neutral"

export type StatusBadgeConfig = {
  label: string
  tone: StatusTone
}

export type StatusBadgeProps = {
  label: string
  tone: StatusTone
}

export function StatusBadge({ label, tone }: StatusBadgeProps) {
  return <Badge variant={tone}>{label}</Badge>
}
