import type { PartnerActivity } from "@/features/activities/activities.types"

function createActivity(
  activity: Omit<
    PartnerActivity,
    | "description"
    | "partnerEmail"
    | "submittedAt"
    | "duration"
    | "groupSize"
    | "language"
    | "meetingPoint"
    | "coverImage"
    | "highlights"
    | "itinerary"
    | "included"
    | "notIncluded"
    | "reviewNotes"
    | "operationalChecks"
  > &
    Partial<PartnerActivity>,
): PartnerActivity {
  return {
    description:
      "Partner-submitted marketplace activity prepared for operational review and storefront readiness checks.",
    partnerEmail: "operations@example.com",
    submittedAt: activity.updatedAt,
    duration: "3 hours",
    groupSize: "Up to 12 guests",
    language: "English",
    meetingPoint: `${activity.city} central meeting point`,
    coverImage:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1400&q=80",
    highlights: [
      "Guided local route with curated stops",
      "Partner-managed guest experience",
      "Marketplace-ready itinerary draft",
    ],
    itinerary: [
      {
        time: "09:00",
        title: "Guest meetup",
        description: "Guide checks booking details and briefs guests before the route starts.",
      },
      {
        time: "10:00",
        title: "Core activity route",
        description: "Main experience route with partner-provided commentary and operational checkpoints.",
      },
      {
        time: "12:00",
        title: "Wrap-up",
        description: "Guide closes the session and shares next-step recommendations.",
      },
    ],
    included: ["Licensed local guide", "Curated walking route", "Partner support"],
    notIncluded: ["Hotel pickup", "Meals", "Personal expenses"],
    reviewNotes: ["Confirm final storefront copy.", "Validate meeting point accuracy."],
    operationalChecks: [
      { label: "Content completeness", status: "ready" },
      { label: "Partner documents", status: "ready" },
      { label: "Map metadata", status: "needs_review" },
    ],
    ...activity,
  }
}

export const mockPartnerActivities: PartnerActivity[] = [
  createActivity({
    id: "act_1001",
    title: "London Royal Landmarks & Hidden Alleys Walk",
    slug: "london-royal-landmarks-hidden-alleys-walk",
    description:
      "A partner-led walking experience through Westminster landmarks, royal ceremonial routes, and quieter alleys that connect London's headline sights with local stories.",
    partnerName: "London Local Moments",
    partnerEmail: "ops@londonlocalmoments.co.uk",
    city: "London",
    category: "City Highlights",
    status: "published",
    price: 89,
    currency: "USD",
    updatedAt: "2026-06-30",
    submittedAt: "2026-06-12",
    duration: "3.5 hours",
    groupSize: "Up to 10 guests",
    language: "English",
    meetingPoint: "Westminster Station, Exit 4",
    coverImage:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1400&q=80",
    highlights: [
      "Walk past Westminster Abbey, St James's Park, and Buckingham Palace",
      "Explore quiet lanes and courtyards between major landmarks",
      "Hear partner-curated stories about royal ceremonies and local routines",
      "End near Covent Garden with onward route suggestions",
    ],
    itinerary: [
      {
        time: "09:30",
        title: "Meet at Westminster",
        description:
          "Guide verifies booking codes, introduces the route, and sets expectations for pace and accessibility.",
      },
      {
        time: "10:00",
        title: "Royal landmarks route",
        description:
          "Guests move through Westminster Abbey, Parliament Square, St James's Park, and ceremonial viewpoints.",
      },
      {
        time: "11:15",
        title: "Hidden alleys and local passages",
        description:
          "The route shifts into quieter streets, courtyards, and overlooked connectors between busy landmarks.",
      },
      {
        time: "12:30",
        title: "Covent Garden close",
        description:
          "Guide wraps the experience with recommendations and confirms no operational incidents occurred.",
      },
    ],
    included: [
      "Local guide",
      "Curated walking route",
      "Digital route notes",
      "Marketplace support contact",
    ],
    notIncluded: ["Food and drinks", "Public transport", "Hotel pickup", "Entry tickets"],
    reviewNotes: [
      "Published copy is ready for marketplace preview.",
      "Map pin needs final verification around Westminster Station Exit 4.",
      "Partner insurance document was checked during onboarding.",
    ],
    operationalChecks: [
      { label: "Storefront content", status: "ready" },
      { label: "Partner verification", status: "ready" },
      { label: "Pricing setup", status: "ready" },
      { label: "Map metadata", status: "needs_review" },
    ],
  }),
  createActivity({
    id: "act_1002",
    title: "Bali Sunrise Temple and Rice Terrace Route",
    slug: "bali-sunrise-temple-rice-terrace-route",
    partnerName: "Ubud Field Collective",
    partnerEmail: "hello@ubudfield.co",
    city: "Bali",
    category: "Nature & Culture",
    status: "published",
    price: 72,
    currency: "USD",
    updatedAt: "2026-06-28",
  }),
  createActivity({
    id: "act_1003",
    title: "Tokyo Backstreet Izakaya Tasting Trail",
    slug: "tokyo-backstreet-izakaya-tasting-trail",
    partnerName: "Tokyo Table Stories",
    partnerEmail: "partners@tokyotablestories.jp",
    city: "Tokyo",
    category: "Food Experience",
    status: "published",
    price: 118,
    currency: "USD",
    updatedAt: "2026-06-26",
  }),
  createActivity({
    id: "act_1004",
    title: "Paris Seine Evening Photography Walk",
    slug: "paris-seine-evening-photography-walk",
    partnerName: "Paris Frame Studio",
    partnerEmail: "ops@parisframe.studio",
    city: "Paris",
    category: "Creative Tour",
    status: "pending_review",
    price: 96,
    currency: "USD",
    updatedAt: "2026-06-24",
  }),
  createActivity({
    id: "act_1005",
    title: "Singapore Marina Food and Skyline Circuit",
    slug: "singapore-marina-food-skyline-circuit",
    partnerName: "Lion City Guides",
    partnerEmail: "team@lioncityguides.sg",
    city: "Singapore",
    category: "City Highlights",
    status: "revision_requested",
    price: 64,
    currency: "USD",
    updatedAt: "2026-06-21",
  }),
]
