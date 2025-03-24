<script setup lang="ts">
import ExpCard from '@/components/ExpCard.vue'
import { useExperiences } from '@/composables/useExperiences'
import Filter, { type FilterOptions } from '@/components/Filter.vue'
import { computed, ref } from 'vue';

const { experiences, loading, error } = useExperiences()

const filters = ref<FilterOptions>({
  types: [],
  dateIn: '',
  dateOut: '',
  isTicketAvailable: null,
  priceFrom: 0,
  priceTo: 1000
})

const filteredExperiences = computed(() => {
  if (!experiences.value) return []

  return experiences.value.filter(exp => {
    // Type filter
    if (filters.value.types.length > 0 && !filters.value.types.includes(exp.type)) {
      return false
    }

    // Availability filter
    if (filters.value.isTicketAvailable !== null && exp.availability !== filters.value.isTicketAvailable) {
      return false
    }

    // Price filter
    if (exp.price < filters.value.priceFrom || exp.price > filters.value.priceTo) {
      return false
    }

    return true
  })
})

const handleFiltersUpdate = (newFilters: FilterOptions) => {
  filters.value = newFilters
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 py-8">
    <h1 class="text-4xl font-bold text-gray-900 mb-8">
      Discover Experiences
    </h1>

    <div>
      <!-- Filters Sidebar -->
      <div class="lg:col-span-1 bg-white p-6 rounded-lg shadow">
        <Filter
          :initial-filters="filters"
          @update:filters="handleFiltersUpdate"
        />
      </div>

      <!-- Experiences Grid -->
      <div class="lg:col-span-3">
        <div v-if="loading" class="text-center py-12">
          Loading experiences...
        </div>

        <div v-else-if="error" class="text-center py-12 text-red-600">
          {{ error }}
        </div>

        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <ExpCard
            v-for="experience in filteredExperiences"
            :key="experience.id"
            :experience="experience"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <template>
  <div class="max-w-7xl mx-auto px-6 py-8">
    <h1 class="text-4xl font-bold text-gray-900 mb-8">
      Discover Experiences
    </h1>

    <div v-if="loading" class="text-center py-12">
      Loading experiences...
    </div>

    <div v-else-if="error" class="text-center py-12 text-red-600">
      {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" style="gap: 10px">
      <ExpCard
        v-for="experience in experiences"
        :key="experience.id"
        :experience="experience"
        class="m-4 pt-4 y-4"
      />
    </div>
  </div>
</template> -->