<template>
  <button @click="addToBasket(id, name, price)">Ajouter au panier</button>
</template>

<script setup lang="ts">
import { useBasketStore } from '../../stores/basket';
import type { ExpCard } from './ExpCard.vue';

defineProps<ExpCard>()

const basketStore = useBasketStore();
const addToBasket = (id: number = 0, name: string = '', price: number = 0, availability: boolean = true, img: string = '', type: string = 'single') => {
  basketStore.addItem({ id, name, price, availability, img, type });
};
</script>

<style scoped>
button {
  color: green;
  cursor: pointer;
}
</style>