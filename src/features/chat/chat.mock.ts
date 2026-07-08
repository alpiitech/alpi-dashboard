import type { Conversation, MessageSender } from "./chat.types"

export const CHAT_USERS: Record<string, MessageSender> = {
  me: {
    id: "me",
    name: "You",
    role: "support",
  },
  alice: {
    id: "alice",
    name: "Alice Tan",
    role: "partner",
  },
  bob: {
    id: "bob",
    name: "Bob Rahman",
    role: "agent",
  },
  sarah: {
    id: "sarah",
    name: "Sarah Mitchell",
    role: "partner",
  },
  system: {
    id: "system",
    name: "Alpii System",
    role: "system",
  },
}

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    title: "London Royal Landmarks — Revision Request",
    tag: "partner",
    participants: [CHAT_USERS.me, CHAT_USERS.alice],
    unreadCount: 2,
    lastActivity: new Date("2026-07-07T10:32:00"),
    messages: [
      {
        id: "m1",
        senderId: "alice",
        content:
          "Hi, I submitted the revision for the London Royal Landmarks walk. The pricing has been updated and the itinerary now includes the new Southwark section. Can you review?",
        timestamp: new Date("2026-07-07T09:10:00"),
        status: "read",
      },
      {
        id: "m2",
        senderId: "me",
        content:
          "Thanks Alice, I can see the submission. Let me review the itinerary and pricing first.",
        timestamp: new Date("2026-07-07T09:18:00"),
        status: "read",
      },
      {
        id: "m3",
        senderId: "me",
        content:
          "The itinerary looks good. One concern — the price for the private group tier jumped from £45 to £72. Can you add a note explaining the cost breakdown?",
        timestamp: new Date("2026-07-07T09:45:00"),
        status: "read",
      },
      {
        id: "m4",
        senderId: "alice",
        content:
          "Sure! The increase is due to the new licensed guide we brought in for the Southwark section. I'll add a breakdown in the notes field now.",
        timestamp: new Date("2026-07-07T10:05:00"),
        status: "read",
      },
      {
        id: "m5",
        senderId: "alice",
        content:
          "Done — notes updated. Also, I attached the new media assets for the Southwark section. Let me know if the resolution is sufficient.",
        timestamp: new Date("2026-07-07T10:12:00"),
        status: "read",
        attachments: [
          { name: "southwark-guide-photo.jpg", size: "2.4 MB", type: "image" },
          { name: "southwark-map.pdf", size: "840 KB", type: "pdf" },
        ],
      },
      {
        id: "m6",
        senderId: "me",
        content:
          "Images look great, resolution is fine. I'll push this to Published once the finance team signs off on the pricing.",
        timestamp: new Date("2026-07-07T10:28:00"),
        status: "delivered",
      },
      {
        id: "m7",
        senderId: "alice",
        content: "Perfect, thanks! Let me know if anything else is needed.",
        timestamp: new Date("2026-07-07T10:32:00"),
        status: "delivered",
      },
    ],
  },
  {
    id: "conv-2",
    title: "Agent Onboarding — Bob Rahman",
    tag: "agent",
    participants: [CHAT_USERS.me, CHAT_USERS.bob],
    unreadCount: 0,
    lastActivity: new Date("2026-07-06T16:44:00"),
    messages: [
      {
        id: "m1",
        senderId: "bob",
        content:
          "Hello, I just completed uploading my documents for the agent verification process. Are there any other steps I need to take?",
        timestamp: new Date("2026-07-06T14:00:00"),
        status: "read",
      },
      {
        id: "m2",
        senderId: "me",
        content:
          "Hi Bob, welcome! Yes — we received your documents. The next step is a short video call with our compliance team. I'll send you a calendar invite shortly.",
        timestamp: new Date("2026-07-06T14:22:00"),
        status: "read",
      },
      {
        id: "m3",
        senderId: "bob",
        content: "Great, I'm available most mornings GMT. Will Thursday work?",
        timestamp: new Date("2026-07-06T14:35:00"),
        status: "read",
      },
      {
        id: "m4",
        senderId: "me",
        content:
          "Thursday 10:00 AM GMT works perfectly. Invite sent to your registered email. Please have your ID ready for the call.",
        timestamp: new Date("2026-07-06T15:10:00"),
        status: "read",
      },
      {
        id: "m5",
        senderId: "bob",
        content: "Got it, confirmed. See you Thursday!",
        timestamp: new Date("2026-07-06T15:14:00"),
        status: "read",
      },
      {
        id: "m6",
        senderId: "system",
        content:
          "Agent verification call scheduled: Thursday 10:00 AM GMT. Participants: Bob Rahman, Compliance Team.",
        timestamp: new Date("2026-07-06T15:15:00"),
        status: "delivered",
      },
      {
        id: "m7",
        senderId: "bob",
        content:
          "One more thing — do I need to submit proof of travel insurance as well?",
        timestamp: new Date("2026-07-06T16:40:00"),
        status: "read",
      },
      {
        id: "m8",
        senderId: "me",
        content:
          "Yes, travel insurance is required if you plan to lead any outdoor or adventure-type activities. For city walking tours it's optional but recommended.",
        timestamp: new Date("2026-07-06T16:44:00"),
        status: "read",
      },
    ],
  },
  {
    id: "conv-3",
    title: "Booking #BK-2041 — Support Request",
    tag: "booking",
    participants: [CHAT_USERS.me, CHAT_USERS.sarah],
    unreadCount: 1,
    lastActivity: new Date("2026-07-07T08:55:00"),
    messages: [
      {
        id: "m1",
        senderId: "sarah",
        content:
          "Hi, I need help with booking BK-2041. The customer has requested a date change from July 14 to July 21 — same tour, same group size.",
        timestamp: new Date("2026-07-07T08:20:00"),
        status: "read",
      },
      {
        id: "m2",
        senderId: "me",
        content:
          "Let me check availability for July 21 on that tour. One moment.",
        timestamp: new Date("2026-07-07T08:25:00"),
        status: "read",
      },
      {
        id: "m3",
        senderId: "me",
        content:
          "Good news — July 21 has availability for the same time slot. I'll initiate the change request now. The customer will receive a confirmation email once approved.",
        timestamp: new Date("2026-07-07T08:38:00"),
        status: "read",
      },
      {
        id: "m4",
        senderId: "sarah",
        content:
          "Thank you! Will there be any rebooking fee charged to the customer?",
        timestamp: new Date("2026-07-07T08:42:00"),
        status: "read",
      },
      {
        id: "m5",
        senderId: "me",
        content:
          "No fee — changes requested more than 7 days before the tour date are free of charge under the current policy.",
        timestamp: new Date("2026-07-07T08:50:00"),
        status: "read",
      },
      {
        id: "m6",
        senderId: "sarah",
        content:
          "Perfect, the customer will be relieved to hear that. Thanks for the quick response!",
        timestamp: new Date("2026-07-07T08:55:00"),
        status: "delivered",
      },
    ],
  },
]
