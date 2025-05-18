<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { useDate } from "@/composables/useDate";

const props = defineProps<{
  experience: Experience;
}>();

const today = ref(new Date());
const nextPeriod = ref<AvailablePeriod | null>(null);

onMounted(() => {
  today.value = new Date();
  nextPeriod.value = useDate().nextPeriod.value(props.experience.availablePeriods, today.value);
});

export interface Experience {
  id: number;
  name: string;
  img: string;
  availability: boolean;
  price: number;
  type: string;
  availablePeriods: AvailablePeriod[];
}

export interface AvailablePeriod {
  startDate: string;
  endDate: string;
}
</script>

<template>
  <router-link class="exp-card" :to="`/experience/${experience.id}`">
    <div class="exp-card__image">
      <img :src="experience.img" alt="" />
      <div
        class="exp-card__dispo"
        :class="{
          'exp-card__dispo--available': experience.availability,
          'exp-card__dispo--unavailable': !experience.availability,
        }"
      >
        <p>{{ experience.availability ? "Available" : "Unavailable" }}</p>
      </div>
    </div>
    <div class="exp-card__info-container">
      <div class="exp-card__info">
        <p class="exp-card__name">{{ experience.name }}</p>
        <p class="exp-card__type">{{ experience.type }}</p>
        <p class="exp-card__price">{{ experience.price }}€</p>
      </div>
      <div>
        <p class="exp-card__date" v-if="nextPeriod">Next: {{ nextPeriod?.startDate }}</p>
        <p class="exp-card__date" v-else>No available period</p>
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
.exp-card {
  display: block;
  background-color: var(--vt-c-white);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  max-width: 350px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  &__image {
    position: relative;
    width: 100%;
    height: 200px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
  }

  &__info {
    color: var(--vt-c-text-light-2);
  }

  &__info-container {
    padding: 20px;
  }

  &__name {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--vt-c-indigo);
  }

  &__type {
    font-size: 0.9rem;
    color: var(--vt-c-text-light-2);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &__price {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-text);
    margin: 0 0 1rem;
  }

  &__dispo {
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px 10px;
    border-radius: 10px;

    &--available {
      background-color: rgba(31, 157, 85, 0.5);
      color: var(--vt-c-text-dark-1);
    }

    &--unavailable {
      background-color: rgba(231, 76, 60, 0.5);
      color: var(--vt-c-text-dark-1);
    }
  }

  &__date {
    font-size: 0.9rem;
    color: var(--vt-c-text-light-2);
    text-align: right;
  }

  p {
    margin: 0;
  }
}
</style>
