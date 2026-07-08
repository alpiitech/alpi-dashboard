export type MessageSender = {
  id: string
  name: string
  avatar?: string
  role: "agent" | "support" | "partner" | "system"
}

export type MessageStatus = "sent" | "delivered" | "read" | "failed"

export type ChatMessage = {
  id: string
  senderId: string
  content: string
  timestamp: Date
  status?: MessageStatus
  attachments?: { name: string; size: string; type: string }[]
}

export type Conversation = {
  id: string
  title: string
  participants: MessageSender[]
  messages: ChatMessage[]
  lastActivity: Date
  unreadCount?: number
  tag?: "booking" | "support" | "agent" | "partner"
}
