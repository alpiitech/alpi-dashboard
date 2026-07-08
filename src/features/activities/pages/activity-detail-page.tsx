import { Link, useParams } from "react-router"
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  DollarSign,
  Languages,
  MapPin,
  Navigation,
  UsersRound,
  XCircle,
} from "lucide-react"
import { ApiErrorNote } from "@/components/dashboard/api-error-note"
import { ErrorState } from "@/components/dashboard/error-state"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Caption, H4, Strong, Text } from "@/components/ui/typography"
import {
  formatActivityDate,
  formatActivityMoney,
} from "@/features/activities/activities.format"
import { useActivityQuery } from "@/features/activities/activities.queries"
import { ActivityStatusBadge } from "@/features/activities/components/activity-status-badge"

export function ActivityDetailPage() {
  const { activityId } = useParams()
  const activityQuery = useActivityQuery(activityId)
  const activity = activityQuery.data?.data

  if (activityQuery.isLoading) {
    return (
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-6 w-48" />
        </div>
        <Skeleton className="h-64 w-full rounded-[var(--radius-card)]" />
        <div className="grid gap-5 lg:grid-cols-[1fr_20rem]">
          <div className="space-y-4">
            <Skeleton className="h-40" />
            <Skeleton className="h-56" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-40" />
            <Skeleton className="h-24" />
          </div>
        </div>
      </div>
    )
  }

  if (activityQuery.isError || !activity) {
    return (
      <div className="space-y-5">
        <Button asChild className="w-fit">
          <Link to="/activities">
            <ArrowLeft size={15} />
            Back to activities
          </Link>
        </Button>
        <div className="rounded-[var(--radius-card)] border border-border bg-surface">
          <ErrorState
            title="We could not open this activity."
            description="The activity may not exist, or the preview data could not be loaded."
            action={
              <Button asChild>
                <Link to="/activities">Back to activities</Link>
              </Button>
            }
          />
          <div className="px-6 pb-6 text-center">
            <ApiErrorNote error={activityQuery.error} />
          </div>
        </div>
      </div>
    )
  }

  const allChecksReady = activity.operationalChecks.every(
    (c) => c.status === "ready",
  )

  return (
    <div className="space-y-5">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button asChild className="w-fit -ml-2">
          <Link to="/activities">
            <ArrowLeft size={15} />
            Back to activities
          </Link>
        </Button>
        <div className="grid w-full grid-cols-1 gap-2 sm:flex sm:w-auto sm:items-center">
          <Button variant="outline" size="lg">
            Request revision
          </Button>
          <Button size="lg">Approve & publish</Button>
        </div>
      </div>

      {/* Cover image */}
      <div className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface-muted">
        <div className="aspect-[16/9] w-full sm:aspect-[21/6]">
          <img
            src={activity.coverImage}
            alt={activity.title}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Title + meta row */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <ActivityStatusBadge status={activity.status} />
            <Caption className="text-muted-foreground">{activity.slug}</Caption>
          </div>
          <h1 className="text-xl font-semibold text-foreground leading-snug">
            {activity.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} />
              {activity.city}
            </span>
            <span className="text-border">·</span>
            <span>{activity.category}</span>
            <span className="text-border">·</span>
            <span className="flex items-center gap-1.5">
              <Clock3 size={13} />
              {activity.duration}
            </span>
            <span className="text-border">·</span>
            <span className="flex items-center gap-1.5">
              <UsersRound size={13} />
              {activity.groupSize}
            </span>
            <span className="text-border">·</span>
            <span className="flex items-center gap-1.5">
              <Languages size={13} />
              {activity.language}
            </span>
          </div>
        </div>
        <div className="w-full text-left sm:w-auto sm:text-right">
          <Caption className="text-muted-foreground">Price per person</Caption>
          <p className="text-lg font-semibold text-foreground">
            {formatActivityMoney(activity.price, activity.currency)}
          </p>
        </div>
      </div>

      {/* Main content + sidebar */}
      <div className="grid gap-5 lg:grid-cols-[1fr_20rem]">
        {/* Left — content */}
        <div className="space-y-4">
          {/* Description */}
          <section className="rounded-[var(--radius-card)] border border-border bg-surface p-5">
            <H4 as="h2">About this activity</H4>
            <Text className="mt-3 text-muted-foreground leading-relaxed">
              {activity.description}
            </Text>
          </section>

          {/* Highlights */}
          <section className="rounded-[var(--radius-card)] border border-border bg-surface p-5">
            <H4 as="h2">Highlights</H4>
            <ul className="mt-3 space-y-2">
              {activity.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={15}
                    className="mt-0.5 shrink-0 text-success"
                  />
                  <Text>{highlight}</Text>
                </li>
              ))}
            </ul>
          </section>

          {/* Itinerary */}
          <section className="rounded-[var(--radius-card)] border border-border bg-surface p-5">
            <H4 as="h2">Itinerary</H4>
            <div className="mt-4 space-y-5 border-l-2 border-border pl-4">
              {activity.itinerary.map((item) => (
                <div key={`${item.time}-${item.title}`} className="relative">
                  <span className="absolute -left-[1.3rem] top-1.5 size-2.5 rounded-full border-2 border-primary bg-surface" />
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-xs font-semibold text-primary">
                      {item.time}
                    </span>
                    <Strong className="text-sm">{item.title}</Strong>
                  </div>
                  <Text className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </Text>
                </div>
              ))}
            </div>
          </section>

          {/* Included / Not included */}
          <section className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[var(--radius-card)] border border-border bg-surface p-5">
              <H4 as="h2">Included</H4>
              <ul className="mt-3 space-y-2">
                {activity.included.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2
                      size={14}
                      className="mt-0.5 shrink-0 text-success"
                    />
                    <Text className="text-sm">{item}</Text>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[var(--radius-card)] border border-border bg-surface p-5">
              <H4 as="h2">Not included</H4>
              <ul className="mt-3 space-y-2">
                {activity.notIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <XCircle
                      size={14}
                      className="mt-0.5 shrink-0 text-muted-foreground"
                    />
                    <Text className="text-sm text-muted-foreground">
                      {item}
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Operational review */}
          <section className="rounded-[var(--radius-card)] border border-border bg-surface p-5">
            <div className="flex items-center justify-between gap-3">
              <H4 as="h2">Operational review</H4>
              {allChecksReady ? (
                <Badge
                  variant="outline"
                  className="text-success border-success/30 bg-success/5"
                >
                  All ready
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="text-warning border-warning/30 bg-warning/5"
                >
                  Needs attention
                </Badge>
              )}
            </div>
            <div className="mt-4 space-y-2">
              {activity.operationalChecks.map((check) => (
                <div
                  key={check.label}
                  className="flex flex-col items-start justify-between gap-2 rounded-[var(--radius-sm)] border border-border bg-surface-muted px-3 py-2.5 sm:flex-row sm:items-center sm:gap-3"
                >
                  <Text className="text-sm">{check.label}</Text>
                  <span
                    className={`flex items-center gap-1.5 text-xs font-medium ${check.status === "ready" ? "text-success" : "text-warning-foreground"}`}
                  >
                    {check.status === "ready" ? (
                      <CheckCircle2 size={13} />
                    ) : (
                      <Circle size={13} />
                    )}
                    {check.status === "ready" ? "Ready" : "Needs review"}
                  </span>
                </div>
              ))}
            </div>
            {activity.reviewNotes.length > 0 && (
              <div className="mt-4 space-y-2">
                <Caption className="font-medium">Review notes</Caption>
                {activity.reviewNotes.map((note) => (
                  <Text
                    key={note}
                    className="rounded-[var(--radius-sm)] bg-surface-muted px-3 py-2 text-sm text-muted-foreground"
                  >
                    {note}
                  </Text>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right — sidebar */}
        <div className="space-y-4">
          {/* Partner info */}
          <section className="rounded-[var(--radius-card)] border border-border bg-surface p-4">
            <H4>Partner</H4>
            <div className="mt-3 space-y-3">
              <div>
                <Caption className="text-muted-foreground">Name</Caption>
                <Strong as="div" className="mt-0.5 text-sm">
                  {activity.partnerName}
                </Strong>
              </div>
              <div>
                <Caption className="text-muted-foreground">Email</Caption>
                <Text className="mt-0.5 text-sm text-muted-foreground break-all">
                  {activity.partnerEmail}
                </Text>
              </div>
            </div>
          </section>

          {/* Activity info */}
          <section className="rounded-[var(--radius-card)] border border-border bg-surface p-4 space-y-3">
            <H4>Details</H4>
            <div className="space-y-2.5 mt-1">
              <div className="flex items-start gap-2.5">
                <DollarSign
                  size={14}
                  className="mt-0.5 shrink-0 text-muted-foreground"
                />
                <div>
                  <Caption className="text-muted-foreground">Price</Caption>
                  <Strong className="text-sm">
                    {formatActivityMoney(activity.price, activity.currency)}
                  </Strong>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Navigation
                  size={14}
                  className="mt-0.5 shrink-0 text-muted-foreground"
                />
                <div>
                  <Caption className="text-muted-foreground">
                    Meeting point
                  </Caption>
                  <Text className="text-sm text-muted-foreground">
                    {activity.meetingPoint}
                  </Text>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CalendarDays
                  size={14}
                  className="mt-0.5 shrink-0 text-muted-foreground"
                />
                <div>
                  <Caption className="text-muted-foreground">Submitted</Caption>
                  <Text className="text-sm text-muted-foreground">
                    {formatActivityDate(activity.submittedAt)}
                  </Text>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CalendarDays
                  size={14}
                  className="mt-0.5 shrink-0 text-muted-foreground"
                />
                <div>
                  <Caption className="text-muted-foreground">
                    Last updated
                  </Caption>
                  <Text className="text-sm text-muted-foreground">
                    {formatActivityDate(activity.updatedAt)}
                  </Text>
                </div>
              </div>
            </div>
          </section>

          {/* Quick actions */}
          <section className="rounded-[var(--radius-card)] border border-border bg-surface p-4">
            <H4>Actions</H4>
            <div className="mt-3 space-y-2">
              <Button className="w-full" size="lg">
                Approve & publish
              </Button>
              <Button className="w-full" variant="outline" size="lg">
                Request revision
              </Button>
              <Button
                className="w-full"
                variant="destructiveSubtle"
                size="lg"
              >
                Archive activity
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
