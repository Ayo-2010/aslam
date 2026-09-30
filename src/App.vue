<script setup lang="ts">
import { RouterView } from 'vue-router'
import AnnouncementBar from '@/components/layout/AnnouncementBar.vue'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
</script>

<template>
  <a
    href="#main-content"
    class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-forest-700 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
  >
    Skip to main content
  </a>

  <AnnouncementBar />
  <Header />

  <main id="main-content" class="flex min-h-[60vh] flex-col">
    <RouterView v-slot="{ Component, route }">
      <Transition name="page" mode="out-in">
        <div :key="route.path.split('/').slice(0, 2).join('/')">
          <component :is="Component" />
        </div>
      </Transition>
    </RouterView>
  </main>

  <Footer />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: none;
  }
}
</style>
