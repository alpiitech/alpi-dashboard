import { useState } from "react"
import {
  AlertCircle,
  Bell,
  CheckCircle,
  Clock,
  File,
  FileUp,
  Image,
  Info,
  Loader2,
  MoreHorizontal,
  Paperclip,
  Plus,
  Search,
  Settings,
  Trash2,
  Upload,
  User,
  X,
} from "lucide-react"
import { toast } from "sonner"
import { PageHeader } from "@/components/dashboard/page-header"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/components/ui/attachment"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Textarea } from "@/components/ui/textarea"
import { Caption, H1, H2, H3, H4, H5, Strong, Text } from "@/components/ui/typography"
import { cn } from "@/shared/utils/cn"

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ id, title, description, children }: {
  id: string
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-6">
      <div className="mb-3">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="rounded-[var(--radius-card)] border border-border bg-surface p-5">
        {children}
      </div>
    </section>
  )
}

// ─── Preview row ──────────────────────────────────────────────────────────────
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Caption className="font-medium text-muted-foreground">{label}</Caption>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  )
}

// ─── Divider ──────────────────────────────────────────────────────────────────
function Divider() {
  return <div className="my-4 border-t border-border" />
}

export function DesignSystemPage() {
  const [inputValue, setInputValue] = useState("")
  const [switchOn, setSwitchOn] = useState(false)
  const [switchOn2, setSwitchOn2] = useState(true)

  return (
    <div className="space-y-8">
      <PageHeader
        title="Component Library"
        description="Visual reference for all UI components used in this dashboard."
      />

      {/* ── Typography ───────────────────────────────────────────────────────── */}
      <Section id="typography" title="Typography" description="Semantic text components. Always use these instead of arbitrary heading sizes.">
        <div className="space-y-3">
          <div className="flex items-baseline gap-4">
            <Caption className="w-24 shrink-0 text-muted-foreground">H1</Caption>
            <H1>The quick brown fox</H1>
          </div>
          <div className="flex items-baseline gap-4">
            <Caption className="w-24 shrink-0 text-muted-foreground">H2</Caption>
            <H2>The quick brown fox</H2>
          </div>
          <div className="flex items-baseline gap-4">
            <Caption className="w-24 shrink-0 text-muted-foreground">H3</Caption>
            <H3>The quick brown fox</H3>
          </div>
          <div className="flex items-baseline gap-4">
            <Caption className="w-24 shrink-0 text-muted-foreground">H4</Caption>
            <H4>The quick brown fox</H4>
          </div>
          <div className="flex items-baseline gap-4">
            <Caption className="w-24 shrink-0 text-muted-foreground">H5</Caption>
            <H5>The quick brown fox</H5>
          </div>
          <div className="flex items-baseline gap-4">
            <Caption className="w-24 shrink-0 text-muted-foreground">Text</Caption>
            <Text>The quick brown fox jumps over the lazy dog</Text>
          </div>
          <div className="flex items-baseline gap-4">
            <Caption className="w-24 shrink-0 text-muted-foreground">Strong</Caption>
            <Strong>The quick brown fox jumps over the lazy dog</Strong>
          </div>
          <div className="flex items-baseline gap-4">
            <Caption className="w-24 shrink-0 text-muted-foreground">Caption</Caption>
            <Caption>The quick brown fox jumps over the lazy dog</Caption>
          </div>
        </div>
      </Section>

      {/* ── Buttons ──────────────────────────────────────────────────────────── */}
      <Section id="buttons" title="Button" description="All button variants available in the dashboard. All buttons use the same large size for consistency.">
        <div className="space-y-4">
          <Row label="Variant">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </Row>
          <Divider />
          <Row label="With icon">
            <Button><Plus size={15} />Create new</Button>
            <Button variant="outline"><Upload size={15} />Upload</Button>
            <Button variant="secondary"><Search size={15} />Search</Button>
          </Row>
          <Divider />
          <Row label="State">
            <Button disabled>Disabled</Button>
            <Button disabled>
              <Loader2 size={15} className="animate-spin" />
              Loading
            </Button>
          </Row>
        </div>
      </Section>

      {/* ── Badge ────────────────────────────────────────────────────────────── */}
      <Section id="badges" title="Badge" description="Status and label badges for tables, cards, and inline use.">
        <div className="space-y-4">
          <Row label="Variant">
            <Badge>Default</Badge>
            <Badge variant="neutral">Neutral</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
          </Row>
        </div>
      </Section>

      {/* ── Input ────────────────────────────────────────────────────────────── */}
      <Section id="inputs" title="Input" description="Text inputs for forms and search.">
        <div className="space-y-4 max-w-sm">
          <Row label="Default">
            <Input
              placeholder="Enter a value…"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full"
            />
          </Row>
          <Divider />
          <Row label="With icon">
            <div className="relative w-full">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search…" className="pl-8 w-full" />
            </div>
          </Row>
          <Divider />
          <Row label="Disabled">
            <Input placeholder="Not editable" disabled className="w-full" />
          </Row>
        </div>
      </Section>

      {/* ── Toast ────────────────────────────────────────────────────────────── */}
      <Section id="toast" title="Toast" description="Notification toasts via Sonner. Used for action feedback.">
        <Row label="Trigger">
          <Button variant="outline" size="sm" onClick={() => toast.success("Saved successfully.", { description: "Changes have been applied." })}>
            <CheckCircle size={14} />
            Success
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.error("Something went wrong.", { description: "Please try again." })}>
            <AlertCircle size={14} />
            Error
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.warning("Heads up.", { description: "This action may have side effects." })}>
            <Bell size={14} />
            Warning
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.info("Just so you know.", { description: "This is an informational message." })}>
            <Info size={14} />
            Info
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.loading("Processing…")}>
            <Loader2 size={14} />
            Loading
          </Button>
        </Row>
      </Section>

      {/* ── Upload / Attachment ──────────────────────────────────────────────── */}
      <Section id="upload" title="Upload / Attachment" description="File upload states using the Attachment composition. All upload UI must use this pattern.">
        <div className="space-y-4">
          <Caption className="font-medium text-muted-foreground">States</Caption>
          <AttachmentGroup tabIndex={0} role="group" aria-label="Attachment states">

            <Attachment state="idle" className="w-52 shrink-0">
              <AttachmentTrigger
                type="button"
                aria-label="Choose file"
                onClick={() => toast.info("Upload picker is deferred.", { description: "Attachment UI is ready; secure upload flow remains backend-gated." })}
              />
              <AttachmentMedia>
                <File size={18} />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>Choose file</AttachmentTitle>
                <AttachmentDescription>Click to upload</AttachmentDescription>
              </AttachmentContent>
            </Attachment>

            <Attachment state="uploading" className="w-52 shrink-0">
              <AttachmentMedia>
                <FileUp size={18} />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>report-q1.pdf</AttachmentTitle>
                <AttachmentDescription>Uploading · 64%</AttachmentDescription>
              </AttachmentContent>
            </Attachment>

            <Attachment state="processing" className="w-52 shrink-0">
              <AttachmentMedia>
                <Clock size={18} />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>data-import.csv</AttachmentTitle>
                <AttachmentDescription>Processing…</AttachmentDescription>
              </AttachmentContent>
            </Attachment>

            <Attachment state="done" orientation="vertical" className="w-36 shrink-0">
              <AttachmentMedia variant="image">
                <div className="grid size-full place-items-center bg-[linear-gradient(135deg,var(--surface-muted),var(--secondary))]">
                  <Image size={24} className="text-muted-foreground" />
                </div>
              </AttachmentMedia>
              <AttachmentContent className="mt-2">
                <AttachmentTitle>cover.png</AttachmentTitle>
                <AttachmentDescription>PNG · 820 KB</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions className="absolute right-2 top-2">
                <AttachmentAction aria-label="Remove">
                  <X size={13} />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>

            <Attachment state="error" className="w-52 shrink-0">
              <AttachmentMedia>
                <Paperclip size={18} />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>payload.exe</AttachmentTitle>
                <AttachmentDescription>Rejected. File type not allowed.</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction aria-label="Remove">
                  <X size={13} />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>

          </AttachmentGroup>
        </div>
      </Section>

      {/* ── Colors ───────────────────────────────────────────────────────────── */}
      <Section id="colors" title="Color tokens" description="Semantic color tokens used across the dashboard. Always use tokens, never hardcode hex values.">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { token: "bg-primary", label: "primary", text: "text-primary-foreground" },
            { token: "bg-secondary", label: "secondary", text: "text-secondary-foreground" },
            { token: "bg-surface", label: "surface", text: "text-foreground", border: true },
            { token: "bg-surface-muted", label: "surface-muted", text: "text-foreground", border: true },
            { token: "bg-success/15", label: "success", text: "text-success" },
            { token: "bg-warning/15", label: "warning", text: "text-warning-foreground" },
            { token: "bg-destructive/15", label: "destructive", text: "text-destructive" },
            { token: "bg-info/15", label: "info", text: "text-info" },
            { token: "bg-muted", label: "muted", text: "text-muted-foreground", border: true },
          ].map(({ token, label, text, border }) => (
            <div
              key={token}
              className={cn(
                "flex items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5",
                token,
                border && "border border-border",
              )}
            >
              <div className={cn("size-3 rounded-full", token.replace("bg-", "bg-").replace("/15", "").replace("bg-muted", "bg-muted-foreground"), border ? "border border-border" : "")} />
              <Caption className={cn("font-mono", text)}>{label}</Caption>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Spacing / Radius ─────────────────────────────────────────────────── */}
      <Section id="radius" title="Border radius" description="Two presets controlled via Appearance settings: None and Default.">
        <div className="flex flex-wrap gap-4">
          {[
            { token: "var(--radius-sm)", label: "radius-sm", desc: "badges, tags" },
            { token: "var(--radius-button)", label: "radius-button", desc: "buttons, inputs" },
            { token: "var(--radius-card)", label: "radius-card", desc: "cards, panels" },
            { token: "var(--radius-dialog)", label: "radius-dialog", desc: "modals, popovers" },
          ].map(({ token, label, desc }) => (
            <div key={token} className="flex flex-col items-center gap-2">
              <div
                className="size-16 border-2 border-primary bg-primary/10"
                style={{ borderRadius: token }}
              />
              <Caption className="text-center font-mono text-[10px]">{label}</Caption>
              <Caption className="text-center text-muted-foreground text-[10px]">{desc}</Caption>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Separator ───────────────────────────────────────────────────────── */}
      <Section id="separator" title="Separator" description="Horizontal divider line.">
        <div className="w-full">
          <Text className="text-sm">Above</Text>
          <Separator className="my-3" />
          <Text className="text-sm text-muted-foreground">Below</Text>
        </div>
      </Section>

      {/* ── Avatar ──────────────────────────────────────────────────────────── */}
      <Section id="avatar" title="Avatar" description="User profile image with fallback initials.">
        <Row label="Sizes">
          <Avatar className="size-8"><AvatarFallback className="text-[10px]">PD</AvatarFallback></Avatar>
          <Avatar className="size-9"><AvatarFallback className="text-xs">PD</AvatarFallback></Avatar>
          <Avatar className="size-12"><AvatarFallback className="text-sm">PD</AvatarFallback></Avatar>
          <Avatar className="size-16">
            <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=PD" />
            <AvatarFallback>PD</AvatarFallback>
          </Avatar>
        </Row>
      </Section>

      {/* ── Label ───────────────────────────────────────────────────────────── */}
      <Section id="label" title="Label" description="Accessible form label. Always pair with an input.">
        <div className="max-w-xs space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="demo-email">Email address</Label>
            <Input id="demo-email" type="email" placeholder="you@alpii.com" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="demo-name">Full name <span className="text-destructive">*</span></Label>
            <Input id="demo-name" placeholder="John Doe" />
          </div>
        </div>
      </Section>

      {/* ── Select ──────────────────────────────────────────────────────────── */}
      <Section id="select" title="Select" description="Native select for choosing from a list.">
        <div className="max-w-xs space-y-4">
          <Row label="Default">
            <Select className="w-full">
              <option value="">Choose an option</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </Select>
          </Row>
          <Divider />
          <Row label="Disabled">
            <Select className="w-full" disabled><option>Not selectable</option></Select>
          </Row>
        </div>
      </Section>

      {/* ── Textarea ────────────────────────────────────────────────────────── */}
      <Section id="textarea" title="Textarea" description="Multi-line text input.">
        <div className="max-w-sm space-y-4">
          <Row label="Default">
            <Textarea placeholder="Type something here…" className="w-full" rows={3} />
          </Row>
          <Divider />
          <Row label="Disabled">
            <Textarea placeholder="Not editable" disabled className="w-full" rows={2} />
          </Row>
        </div>
      </Section>

      {/* ── Switch ──────────────────────────────────────────────────────────── */}
      <Section id="switch" title="Switch" description="Toggle on/off. Used in Appearance settings.">
        <div className="space-y-4">
          <Row label="States">
            <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
            <Switch checked={switchOn2} onCheckedChange={setSwitchOn2} />
          </Row>
          <Divider />
          <Row label="With label">
            <label className="flex items-center gap-2 cursor-pointer">
              <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
              <span className="text-sm">{switchOn ? "Enabled" : "Disabled"}</span>
            </label>
          </Row>
          <Divider />
          <Row label="Disabled">
            <Switch disabled checked={false} />
            <Switch disabled checked={true} />
          </Row>
        </div>
      </Section>

      {/* ── Skeleton ────────────────────────────────────────────────────────── */}
      <Section id="skeleton" title="Skeleton" description="Loading placeholder while data is fetching.">
        <div className="max-w-sm space-y-4">
          <Row label="Lines">
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </Row>
          <Divider />
          <Row label="Card">
            <div className="w-full rounded-[var(--radius-card)] border border-border p-4 space-y-3">
              <Skeleton className="h-32 w-full rounded-md" />
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </Row>
        </div>
      </Section>

      {/* ── Card ────────────────────────────────────────────────────────────── */}
      <Section id="card" title="Card" description="Surface container with header, content, and footer slots.">
        <div className="max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle>Card title</CardTitle>
              <CardDescription>Optional description for the card.</CardDescription>
            </CardHeader>
            <CardContent>
              <Text className="text-sm text-muted-foreground">
                Card body. Use cards for grouped information panels.
              </Text>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* ── Tooltip ─────────────────────────────────────────────────────────── */}
      <Section id="tooltip" title="Tooltip" description="Contextual hint on hover.">
        <Row label="Default">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>This is a tooltip</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon"><Settings size={16} /></Button>
              </TooltipTrigger>
              <TooltipContent>Settings</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon"><Trash2 size={16} /></Button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Row>
      </Section>

      {/* ── Dropdown Menu ───────────────────────────────────────────────────── */}
      <Section id="dropdown" title="Dropdown Menu" description="Contextual action menu. Used in header profile and table row actions.">
        <Row label="Examples">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">Open menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuLabel>My account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><User size={14} />Profile</DropdownMenuItem>
              <DropdownMenuItem><Settings size={14} />Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash2 size={14} />Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon"><MoreHorizontal size={16} /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-40">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Row>
      </Section>

      {/* ── Dialog ──────────────────────────────────────────────────────────── */}
      <Section id="dialog" title="Dialog" description="Modal for confirmations and focused workflows.">
        <Row label="Trigger">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">Open dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <div className="p-6">
                <DialogTitle className="text-base font-semibold">Confirm action</DialogTitle>
                <DialogDescription className="mt-1.5 text-sm text-muted-foreground">
                  This is the dialog body. Use dialogs for focused tasks or confirmations.
                </DialogDescription>
                <div className="mt-6 flex justify-end gap-2">
                  <Button variant="outline" size="sm">Cancel</Button>
                  <Button size="sm">Confirm</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </Row>
      </Section>

      {/* ── Sheet ───────────────────────────────────────────────────────────── */}
      <Section id="sheet" title="Sheet" description="Slide-in panel. Used for detail drawers like Booking detail.">
        <Row label="Trigger">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">Open sheet</Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="p-5">
                <H4>Sheet panel</H4>
                <Text className="mt-2 text-sm text-muted-foreground">
                  Sheet content. Used for booking details, filters, and secondary forms.
                </Text>
              </div>
            </SheetContent>
          </Sheet>
        </Row>
      </Section>

      {/* ── Button Group ────────────────────────────────────────────────────── */}
      <Section id="button-group" title="Button Group" description="Group related buttons together into a single connected control.">
        <div className="space-y-4">
          <Row label="Default (horizontal)">
            <ButtonGroup>
              <Button variant="outline" size="sm">Left</Button>
              <Button variant="outline" size="sm">Center</Button>
              <Button variant="outline" size="sm">Right</Button>
            </ButtonGroup>
          </Row>
          <Divider />
          <Row label="Vertical">
            <ButtonGroup orientation="vertical">
              <Button variant="outline" size="sm">Top</Button>
              <Button variant="outline" size="sm">Middle</Button>
              <Button variant="outline" size="sm">Bottom</Button>
            </ButtonGroup>
          </Row>
          <Divider />
          <Row label="With separator">
            <ButtonGroup>
              <Button variant="outline" size="sm">Edit</Button>
              <ButtonGroupSeparator />
              <Button variant="outline" size="sm">Preview</Button>
              <ButtonGroupSeparator />
              <Button variant="outline" size="sm">Share</Button>
            </ButtonGroup>
          </Row>
          <Divider />
          <Row label="Mixed variants">
            <ButtonGroup>
              <Button size="sm">Save</Button>
              <Button variant="outline" size="sm">Discard</Button>
            </ButtonGroup>
          </Row>
        </div>
      </Section>

    </div>
  )
}
