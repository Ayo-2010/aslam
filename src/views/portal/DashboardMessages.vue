<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { Send, Search } from 'lucide-vue-next'
import { conversations } from '@/data/portal'
import { sendMessage } from '@/services/api'
import type { Message } from '@/types'
import SmartImage from '@/components/ui/SmartImage.vue'
import Badge from '@/components/ui/Badge.vue'

const activeId = ref(conversations[0]!.id)
const draft = ref('')
const sending = ref(false)
const query = ref('')
const thread = ref<HTMLElement | null>(null)

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return conversations
  return conversations.filter((item) =>
    `${item.teacher} ${item.subject} ${item.role}`.toLowerCase().includes(q),
  )
})

const active = computed(() => conversations.find((item) => item.id === activeId.value) ?? conversations[0]!)

const scrollToLatest = async (): Promise<void> => {
  await nextTick()
  if (thread.value) thread.value.scrollTop = thread.value.scrollHeight
}

const selectConversation = (id: string): void => {
  activeId.value = id
  void scrollToLatest()
}

const submit = async (): Promise<void> => {
  const body = draft.value.trim()
  if (!body || sending.value) return
  sending.value = true
  const optimistic: Message = {
    id: `local-${Date.now()}`,
    from: 'parent',
    body,
    time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
  }
  active.value.messages.push(optimistic)
  draft.value = ''
  await scrollToLatest()
  try {
    await sendMessage(active.value.id, body)
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <section
    class="overflow-hidden rounded-2xl border border-forest-700/10 bg-white shadow-card"
    aria-labelledby="messages-title"
  >
    <h2 id="messages-title" class="sr-only">Messages with teachers</h2>

    <div class="grid lg:grid-cols-12">
      <!-- Teacher list -->
      <div class="border-b border-forest-700/10 lg:col-span-4 lg:border-b-0 lg:border-r">
        <div class="border-b border-forest-700/10 p-4">
          <div class="relative">
            <label for="teacher-search" class="sr-only">Search teachers</label>
            <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              id="teacher-search"
              v-model="query"
              type="search"
              placeholder="Search teachers…"
              class="min-h-[2.6rem] w-full rounded-full border border-forest-700/15 bg-canvas pl-9 pr-4 text-sm placeholder:text-muted/70 focus:border-forest-600 focus:ring-4 focus:ring-forest-600/10"
            />
          </div>
        </div>

        <ul class="max-h-80 overflow-y-auto lg:max-h-[30rem]">
          <li v-for="item in filtered" :key="item.id">
            <button
              type="button"
              class="flex w-full items-center gap-3 border-b border-forest-700/5 px-4 py-3.5 text-left transition-colors hover:bg-forest-50/70"
              :class="item.id === activeId ? 'bg-forest-50' : ''"
              :aria-current="item.id === activeId ? 'true' : undefined"
              @click="selectConversation(item.id)"
            >
              <SmartImage
                :src="item.avatar"
                :alt="item.avatarAlt"
                ratio="1 / 1"
                rounded="rounded-full"
                sizes="40px"
                class="h-10 w-10 shrink-0"
              />
              <span class="min-w-0 flex-1">
                <span class="flex items-center justify-between gap-2">
                  <span class="truncate text-sm font-semibold text-ink">{{ item.teacher }}</span>
                  <span class="shrink-0 text-[0.65rem] text-muted">{{ item.lastTime }}</span>
                </span>
                <span class="mt-0.5 block truncate text-xs text-muted">{{ item.lastMessage }}</span>
              </span>
              <Badge v-if="item.unread > 0" tone="gold">{{ item.unread }}</Badge>
            </button>
          </li>
        </ul>
      </div>

      <!-- Conversation -->
      <div class="flex flex-col lg:col-span-8">
        <header class="flex items-center gap-3 border-b border-forest-700/10 px-4 py-3.5 sm:px-6">
          <SmartImage
            :src="active.avatar"
            :alt="active.avatarAlt"
            ratio="1 / 1"
            rounded="rounded-full"
            sizes="40px"
            class="h-10 w-10 shrink-0"
          />
          <div>
            <p class="text-sm font-semibold text-ink">{{ active.teacher }}</p>
            <p class="text-xs text-muted">{{ active.role }} · {{ active.subject }}</p>
          </div>
        </header>

        <div ref="thread" class="flex-1 space-y-4 overflow-y-auto bg-canvas/60 px-4 py-5 sm:px-6" style="max-height: 26rem">
          <div
            v-for="message in active.messages"
            :key="message.id"
            class="flex"
            :class="message.from === 'parent' ? 'justify-end' : 'justify-start'"
          >
            <div
              class="max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[70%]"
              :class="
                message.from === 'parent'
                  ? 'rounded-br-sm bg-forest-700 text-white'
                  : 'rounded-bl-sm border border-forest-700/10 bg-white text-ink'
              "
            >
              <p>{{ message.body }}</p>
              <p
                class="mt-1.5 text-right text-[0.65rem]"
                :class="message.from === 'parent' ? 'text-white/60' : 'text-muted'"
              >
                {{ message.time }}
                <span v-if="message.from === 'parent'" class="sr-only"> · Sent</span>
              </p>
            </div>
          </div>
        </div>

        <form class="border-t border-forest-700/10 p-4 sm:p-5" @submit.prevent="submit">
          <label for="message-input" class="sr-only">Write a message to {{ active.teacher }}</label>
          <div class="flex items-end gap-3">
            <textarea
              id="message-input"
              v-model="draft"
              rows="1"
              placeholder="Write a message…"
              class="min-h-[2.9rem] flex-1 resize-y rounded-xl border border-forest-700/15 bg-white px-4 py-2.5 text-[0.95rem] text-ink placeholder:text-muted/60 focus:border-forest-600 focus:ring-4 focus:ring-forest-600/10"
              @keydown.enter.exact.prevent="submit"
            />
            <button
              type="submit"
              :disabled="!draft.trim() || sending"
              class="grid h-[2.9rem] w-[2.9rem] shrink-0 place-items-center rounded-full bg-forest-700 text-white transition-colors hover:bg-forest-600 disabled:opacity-50"
              aria-label="Send message"
            >
              <Send :size="17" aria-hidden="true" />
            </button>
          </div>
          <p class="mt-2 text-[0.7rem] text-muted">
            Messages are visible to the teacher and recorded in the school log. Delivery is simulated in this build.
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
