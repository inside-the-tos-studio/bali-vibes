<script setup lang="ts">
import { ref, watch } from 'vue'

export interface FilterOptions {
  types: string[];
  dateIn: string;
  dateOut: string;
  isTicketAvailable: boolean | null;
  priceFrom: number;
  priceTo: number;
}

const props = defineProps<{
  initialFilters?: Partial<FilterOptions>
}>()

const emit = defineEmits<{
  (e: 'update:filters', filters: FilterOptions): void
}>()

const filters = ref<FilterOptions>({
  types: props.initialFilters?.types || [],
  dateIn: props.initialFilters?.dateIn || '',
  dateOut: props.initialFilters?.dateOut || '',
  isTicketAvailable: props.initialFilters?.isTicketAvailable || null,
  priceFrom: props.initialFilters?.priceFrom || 0,
  priceTo: props.initialFilters?.priceTo || 1000
})

const experienceTypes = ['single', 'double', 'suite', 'family', 'penthouse', 'apartment']

watch(filters, (newFilters) => {
  emit('update:filters', newFilters)
}, { deep: true })

const toggleType = (type: string) => {
  const index = filters.value.types.indexOf(type)
  if (index === -1) {
    filters.value.types.push(type)
  } else {
    filters.value.types.splice(index, 1)
  }
}
</script>

<template>
  <div class="filter">
    <div class="filter__section">
      <h3 class="filter__title">Experience Type</h3>
      <div class="filter__types">
        <button
          v-for="type in experienceTypes"
          :key="type"
          :class="['filter__type-btn', { 'filter__type-btn--active': filters.types.includes(type) }]"
          @click="toggleType(type)"
        >
          {{ type }}
        </button>
      </div>
    </div>

    <div class="filter__section">
      <h3 class="filter__title">Dates</h3>
      <div class="filter__dates">
        <div class="filter__date-input">
          <label for="dateIn">Check-in</label>
          <input
            id="dateIn"
            v-model="filters.dateIn"
            type="date"
            class="filter__input"
          >
        </div>
        <div class="filter__date-input">
          <label for="dateOut">Check-out</label>
          <input
            id="dateOut"
            v-model="filters.dateOut"
            type="date"
            class="filter__input"
          >
        </div>
      </div>
    </div>

    <div class="filter__section">
      <h3 class="filter__title">Availability</h3>
      <select
        v-model="filters.isTicketAvailable"
        class="filter__select"
      >
        <option :value="null">All</option>
        <option :value="true">Available</option>
        <option :value="false">Not Available</option>
      </select>
    </div>

    <div class="filter__section">
      <h3 class="filter__title">Price Range</h3>
      <div class="filter__price">
        <div class="filter__price-input">
          <label for="priceFrom">From</label>
          <input
            id="priceFrom"
            v-model.number="filters.priceFrom"
            type="number"
            min="0"
            class="filter__input"
          >
        </div>
        <div class="filter__price-input">
          <label for="priceTo">To</label>
          <input
            id="priceTo"
            v-model.number="filters.priceTo"
            type="number"
            min="0"
            class="filter__input"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.filter {
  &__section {
    margin-bottom: 1.5rem;
  }

  &__title {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  &__types {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  &__type-btn {
    padding: 0.5rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    background: white;
    cursor: pointer;
    
    &--active {
      background: #4f46e5;
      color: white;
    }
  }

  &__dates {
  display: flex;
  gap: 1rem;
  
  // Add media query for mobile
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
  }
}

  &__date-input {
    flex: 1;
  }

  &__input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
  }

  &__select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
  }

  &__price {
    display: flex;
    gap: 1rem;
  }

  &__price-input {
    flex: 1;
  }
}
</style>
