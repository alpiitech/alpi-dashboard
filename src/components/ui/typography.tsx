import type { ElementType, HTMLAttributes, LabelHTMLAttributes, ReactNode } from "react"
import { cn } from "@/shared/utils/cn"

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "body"
  | "caption"
  | "strong"

export type TypographyProps = HTMLAttributes<HTMLElement> &
  Pick<LabelHTMLAttributes<HTMLLabelElement>, "htmlFor"> & {
  as?: ElementType
  variant: TypographyVariant
  children: ReactNode
}

const typographyVariants: Record<TypographyVariant, string> = {
  h1: "font-heading text-2xl font-semibold leading-tight tracking-normal text-foreground",
  h2: "font-heading text-xl font-semibold leading-tight tracking-normal text-foreground",
  h3: "font-heading text-lg font-semibold leading-snug tracking-normal text-foreground",
  h4: "font-heading text-base font-semibold leading-snug tracking-normal text-foreground",
  h5: "font-heading text-sm font-semibold leading-5 tracking-normal text-foreground",
  body: "text-sm leading-6 text-foreground",
  caption: "text-xs leading-5 text-muted-foreground",
  strong: "font-semibold text-foreground",
}

const defaultElementByVariant: Record<TypographyVariant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  body: "p",
  caption: "p",
  strong: "strong",
}

export function Typography({
  as,
  variant,
  className,
  children,
  ...props
}: TypographyProps) {
  const Component = as ?? defaultElementByVariant[variant]

  return (
    <Component className={cn(typographyVariants[variant], className)} {...props}>
      {children}
    </Component>
  )
}

type SemanticTypographyProps = Omit<TypographyProps, "variant">

export function H1(props: SemanticTypographyProps) {
  return <Typography variant="h1" {...props} />
}

export function H2(props: SemanticTypographyProps) {
  return <Typography variant="h2" {...props} />
}

export function H3(props: SemanticTypographyProps) {
  return <Typography variant="h3" {...props} />
}

export function H4(props: SemanticTypographyProps) {
  return <Typography variant="h4" {...props} />
}

export function H5(props: SemanticTypographyProps) {
  return <Typography variant="h5" {...props} />
}

export function Text(props: SemanticTypographyProps) {
  return <Typography variant="body" {...props} />
}

export function Caption(props: SemanticTypographyProps) {
  return <Typography variant="caption" {...props} />
}

export function Strong(props: SemanticTypographyProps) {
  return <Typography variant="strong" {...props} />
}
