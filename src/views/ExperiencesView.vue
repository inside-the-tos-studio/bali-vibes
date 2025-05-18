<script setup lang="ts">
import ExpCard from "@/components/ExpCard.vue";
import { onMounted, ref } from "vue";
import { useDataInjection } from "@/composables/useDataInjection";
import { useExperiencesStore } from "@/stores/experiences";
import type { Experience } from "@/components/ExpCard.vue";
import IconLoader from "@/components/icons/IconLoader.vue";
import FilterCard from "@/components/FilterCard.vue";
const experiences = ref<Experience[] | null>(null);

onMounted(async () => {
  experiences.value = await useDataInjection().experiences();
});

const loadExperiences = (filters: {
  type?: string;
  availability?: boolean;
  priceFrom?: number;
  priceTo?: number;
}) => {
  experiences.value = useExperiencesStore().getFilteredExperiences(filters);
};
</script>

<template>
  <main class="wac-experiences-page page">
    <h1 class="wac-experiences-page__title">List of experiences</h1>
    <FilterCard @load-experiences="loadExperiences" />
    <div v-if="!experiences">
      <div class="wac-experiences-page__loading">
        <IconLoader />
      </div>
    </div>
    <div v-else>
      <div class="wac-experiences-page__header" v-if="experiences && experiences.length === 0">
        <p class="wac-experiences-page__header-text">No results found for your search</p>
      </div>
      <div v-else>
        <div class="wac-experiences-page__exp-cards">
          <ExpCard
            :experience="experience"
            v-for="experience in experiences"
            :key="experience.id"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.wac-experiences-page {
  &__title {
    margin-top: 30px;
    margin-bottom: 30px;
  }
  &__exp-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  &__loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  &__header {
    text-align: center;
  }
}
</style>
