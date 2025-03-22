<script setup lang="ts">
import ExpCard from '@/components/ExpCard.component.vue'
import { useExperiences } from '@/composables/useExperiences'

const { experiences, loading, error } = useExperiences()
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-gray-900 mb-8">
      Discover Experiences
    </h1>

    <div v-if="loading" class="text-center py-12">
      Loading experiences...
    </div>

    <div v-else-if="error" class="text-center py-12 text-red-600">
      {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ExpCard
        v-for="experience in experiences"
        :key="experience.id"
        :experience="experience"
      />
    </div>
  </div>
</template>
