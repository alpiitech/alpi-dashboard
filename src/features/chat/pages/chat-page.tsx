import { useState, useRef, useCallback } from "react"
import { Send, Paperclip, Smile } from "lucide-react"
import {
  MessageScroller,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  MessageScrollerButton,
} from "@/components/ui/message-scroller"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message"
import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/shared/utils/cn"
import { MOCK_CONVERSATIONS, CHAT_USERS } from "../chat.mock"
import type { Conversation, ChatMessage } from "../chat.types"

// Tag badge colors — scoped to chat, semantic-safe with explicit dark variants
const TAG_COLORS: Record<string, string> = {
  booking: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800",
  agent: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-800",
  partner: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
  support: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
}

// Avatar role accent colors — semantic base, small color hints only
const ROLE_AVATAR: Record<string, string> = {
  partner: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  agent: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  support: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
  system: "bg-muted text-muted-foreground",
}

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
}

function formatDate(date: Date) {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  if (date.toDateString() === today.toDateString()) return "Today"
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday"
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

function groupMessagesByDate(messages: ChatMessage[]) {
  const groups: { date: string; messages: ChatMessage[] }[] = []
  for (const msg of messages) {
    const label = formatDate(msg.timestamp)
    const last = groups[groups.length - 1]
    if (last && last.date === label) {
      last.messages.push(msg)
    } else {
      groups.push({ date: label, messages: [msg] })
    }
  }
  return groups
}

function DateSeparator({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="h-px flex-1 bg-border" />
      <span className="shrink-0 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">
        {text}
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  )
}

function SystemMessage({ text }: { text: string }) {
  return (
    <div className="flex justify-center py-2">
      <span className="rounded-full border border-border bg-muted px-3 py-1 text-[11px] text-muted-foreground">
        {text}
      </span>
    </div>
  )
}

function ConversationListItem({
  conv,
  isActive,
  onClick,
}: {
  conv: Conversation
  isActive: boolean
  onClick: () => void
}) {
  const lastMsg = conv.messages[conv.messages.length - 1]
  const other = conv.participants.find((p) => p.id !== "me")
  const hasUnread = conv.unreadCount && conv.unreadCount > 0

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full rounded-lg px-3 py-3 text-left transition-colors",
        isActive
          ? "bg-muted"
          : "hover:bg-muted/40",
      )}
    >
      <div className="flex min-w-0 items-start gap-3">
        {/* Avatar with unread dot */}
        <div className="relative mt-0.5 shrink-0">
          <Avatar className="size-9">
            <AvatarFallback className={cn("text-[11px] font-semibold", ROLE_AVATAR[other?.role ?? "support"])}>
              {other ? getInitials(other.name) : "??"}
            </AvatarFallback>
          </Avatar>
          {hasUnread && (
            <span className="absolute -right-0.5 -top-0.5 flex size-[14px] items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground ring-2 ring-surface">
              {conv.unreadCount}
            </span>
          )}
        </div>
        {/* Text */}
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-1">
            <span className={cn(
              "truncate text-[12px] leading-snug",
              hasUnread ? "font-semibold text-foreground" : "font-medium text-foreground/80",
            )}>
              {conv.title}
            </span>
            <span className="shrink-0 text-[10px] text-muted-foreground">
              {formatTime(conv.lastActivity)}
            </span>
          </div>
          <p className={cn(
            "mt-0.5 truncate text-[11px] leading-snug",
            hasUnread ? "font-medium text-foreground/70" : "text-muted-foreground",
          )}>
            {lastMsg?.content}
          </p>
          {conv.tag && (
            <span className={cn(
              "mt-1.5 inline-block rounded border px-1.5 py-px text-[10px] font-medium capitalize",
              TAG_COLORS[conv.tag] ?? "",
            )}>
              {conv.tag}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

export function ChatPage() {
  const [activeId, setActiveId] = useState<string>(MOCK_CONVERSATIONS[0].id)
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS)
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const activeConv = conversations.find((c) => c.id === activeId)!
  const dateGroups = groupMessagesByDate(activeConv.messages)
  const otherParticipant = activeConv.participants.find((p) => p.id !== "me")
  const totalUnread = conversations.reduce((n, c) => n + (c.unreadCount ?? 0), 0)

  const sendMessage = useCallback(() => {
    const text = inputValue.trim()
    if (!text) return
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: "me",
      content: text,
      timestamp: new Date(),
      status: "sent",
    }
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? { ...c, messages: [...c.messages, newMsg], lastActivity: new Date() }
          : c,
      ),
    )
    setInputValue("")
    inputRef.current?.focus()
  }, [inputValue, activeId])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    // Root: fills the full-bleed main area provided by AppLayoutFullBleed
    <div className="flex size-full min-h-0 overflow-hidden bg-surface-muted">

      {/* ── Conversation list ──────────────────────────────────── */}
      <aside className="flex w-72 shrink-0 flex-col overflow-hidden border-r border-border bg-background">
        {/* Header — does not scroll */}
        <div className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
          <span className="text-[13px] font-semibold text-foreground">Messages</span>
          {totalUnread > 0 && (
            <span className="rounded-full bg-primary px-2 py-px text-[10px] font-semibold text-primary-foreground">
              {totalUnread}
            </span>
          )}
        </div>
        {/* Scrollable list — only this div scrolls, not the page */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="flex flex-col gap-px">
            {conversations.map((conv) => (
              <ConversationListItem
                key={conv.id}
                conv={conv}
                isActive={conv.id === activeId}
                onClick={() => setActiveId(conv.id)}
              />
            ))}
          </div>
        </div>
      </aside>

      {/* ── Chat panel ────────────────────────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-surface">
        {/* Chat header — shrink-0, never scrolls */}
        <div className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-5">
          <Avatar className="size-8 shrink-0">
            <AvatarFallback className={cn("text-[11px] font-semibold", ROLE_AVATAR[otherParticipant?.role ?? "support"])}>
              {getInitials(otherParticipant?.name ?? "??")}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-foreground">{activeConv.title}</p>
            <p className="text-[11px] text-muted-foreground">
              {otherParticipant?.name}
              {otherParticipant?.role && (
                <span className="ml-1 capitalize opacity-60">· {otherParticipant.role}</span>
              )}
            </p>
          </div>
          {activeConv.tag && (
            <Badge
              className={cn("shrink-0 border text-[10px] font-medium capitalize", TAG_COLORS[activeConv.tag] ?? "")}
              variant="outline"
            >
              {activeConv.tag}
            </Badge>
          )}
        </div>

        {/* Messages — flex-1 + min-h-0 lets MessageScroller fill remaining height */}
        <MessageScrollerProvider>
          <MessageScroller className="min-h-0 flex-1">
            <MessageScrollerViewport className="bg-surface">
              <MessageScrollerContent className="px-6 py-5">
                {dateGroups.map((group) => (
                  <div key={group.date} className="flex flex-col gap-1">
                    <DateSeparator text={group.date} />
                    {group.messages.map((msg) => {
                      const isMe = msg.senderId === "me"
                      const isSystem = msg.senderId === "system"
                      const sender = CHAT_USERS[msg.senderId]

                      if (isSystem) {
                        return <SystemMessage key={msg.id} text={msg.content} />
                      }

                      return (
                        <MessageScrollerItem key={msg.id} className="py-0.5">
                          <MessageGroup>
                            <Message align={isMe ? "end" : "start"}>
                              {!isMe && (
                                <MessageAvatar>
                                  <Avatar className="size-7">
                                    <AvatarFallback className={cn("text-[10px] font-semibold", ROLE_AVATAR[sender?.role ?? "support"])}>
                                      {getInitials(sender?.name ?? "?")}
                                    </AvatarFallback>
                                  </Avatar>
                                </MessageAvatar>
                              )}
                              <MessageContent>
                                {!isMe && (
                                  <MessageHeader className="text-[11px] font-medium text-muted-foreground">
                                    {sender?.name ?? "Unknown"}
                                  </MessageHeader>
                                )}
                                <BubbleGroup>
                                  <Bubble
                                    variant={isMe ? "default" : "outline"}
                                    align={isMe ? "end" : "start"}
                                  >
                                    <BubbleContent className="text-[13px] leading-relaxed">
                                      {msg.content}
                                      {msg.attachments && msg.attachments.length > 0 && (
                                        <div className="mt-2.5 flex flex-col gap-1.5">
                                          {msg.attachments.map((att) => (
                                            <div
                                              key={att.name}
                                              className="flex items-center gap-2 rounded-md border border-current/15 bg-current/8 px-2.5 py-1.5 text-[11px]"
                                            >
                                              <span className="font-medium">{att.name}</span>
                                              <span className="opacity-50">{att.size}</span>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </BubbleContent>
                                  </Bubble>
                                </BubbleGroup>
                                <MessageFooter className="text-[10px] text-muted-foreground/70">
                                  {formatTime(msg.timestamp)}
                                </MessageFooter>
                              </MessageContent>
                            </Message>
                          </MessageGroup>
                        </MessageScrollerItem>
                      )
                    })}
                  </div>
                ))}
                {/* Live edge scroll anchor */}
                <MessageScrollerItem scrollAnchor />
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>

        {/* Input bar — shrink-0: always sticky at bottom */}
        <div className="shrink-0 border-t border-border bg-surface px-5 py-3">
          <div className="flex items-end gap-2 rounded-lg border border-border bg-surface shadow-sm transition-shadow focus-within:border-primary/40 focus-within:shadow-md">
            <textarea
              ref={inputRef}
              rows={1}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message…"
              className="min-h-[2.5rem] flex-1 resize-none bg-transparent px-4 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none"
              style={{ maxHeight: "8rem", overflowY: "auto" }}
            />
            <div className="flex shrink-0 items-center gap-0.5 px-2 pb-2">
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-muted-foreground hover:text-foreground"
                aria-label="Emoji"
              >
                <Smile size={17} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-muted-foreground hover:text-foreground"
                aria-label="Attach file"
              >
                <Paperclip size={17} />
              </Button>
              <Button
                size="icon"
                className="size-8"
                onClick={sendMessage}
                disabled={!inputValue.trim()}
                aria-label="Send message"
              >
                <Send size={15} />
              </Button>
            </div>
          </div>
          <p className="mt-1.5 text-[10px] text-muted-foreground/50">
            Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  )
}
