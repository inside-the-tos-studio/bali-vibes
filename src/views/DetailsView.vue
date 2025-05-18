<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useDataInjection } from "@/composables/useDataInjection";
import type { Experience } from "@/components/ExpCard.vue";
import { useDate } from "@/composables/useDate";

const route = useRoute();
const experience = ref<Experience | null>(null);
const today = ref(new Date());

onMounted(async () => {
  const id = route.params.id;
  today.value = new Date();
  experience.value = await useDataInjection().getDetailsById(Number(id));
});
</script>

<template>
  <div class="wac-details-page page">
    <div class="start">
      <img src="/photo1.jpg" alt="" width="500" height="300" />
    </div>
    <div class="end">
      <h1>{{ experience?.name }}</h1>
      <p>Price: {{ experience?.price }}€</p>
      <div class="wac-details-page__dates" v-if="experience?.availablePeriods">
        <h2 class="wac-details-page__dates-title">Next dates</h2>
        <span
          >Start date:
          {{ useDate().nextPeriod.value(experience?.availablePeriods, today)?.startDate }}</span
        >
        <span>
          End date:
          {{ useDate().nextPeriod.value(experience?.availablePeriods, today)?.endDate }}</span
        >
        <div>
          <h3 class="wac-details-page__dates-title">Others dates</h3>
          <div
            v-for="period in useDate().nextDates(experience?.availablePeriods, today)"
            :key="period.startDate"
          >
            <span>{{ period.startDate }} - {{ period.endDate }}</span>
          </div>
        </div>
      </div>
      <div v-else>
        <span>No available period</span>
      </div>
      <div>
        <span class="tag">#{{ experience?.type }}</span>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cum atque ab. A, aliquam. Sed
        at repudiandae voluptate molestiae odio aliquid tenetur sequi autem delectus repellendus
        animi, sint architecto corporis?
      </p>
      <button>Book now</button>
    </div>
  </div>
</template>

<style lang="scss">
.wac-details-page {
  display: flex;
  margin-top: 2rem;
  gap: 2rem;
  min-height: 100vh;
  @media (max-width: 768px) {
    flex-direction: column;
  }

  .start {
    flex: 3;

    img {
      border-radius: 16px;
      @media (max-width: 768px) {
        width: 100%;
      }
    }
  }

  .end {
    flex: 4;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h1 {
      font-size: 2rem;
      margin-bottom: 0;
    }

    span {
      font-size: 1rem;
    }

    p {
      font-size: 1rem;
      margin-bottom: 0;
    }

    button {
      padding: 1rem 2rem;
      background-color: #a97807;
      color: white;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
    }
  }

  &__dates {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &-title {
      font-size: 1.5rem;
      font-weight: 300;
      margin-bottom: 0;
    }
  }
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
