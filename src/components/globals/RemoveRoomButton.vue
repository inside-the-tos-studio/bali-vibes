<template>
  <button @click="removeFromBasket(id)">Retirer du panier</button>
</template>

<script setup lang="ts">
import { useBasketStore } from '../../stores/basket';

defineProps({
  id: Number
})

const basketStore = useBasketStore();
const removeFromBasket = (id?: number) => {
  if (id) {
    return basketStore.removeItem(id)
  }
}
</script>

<style scoped>
button {
  color: red;
  cursor: pointer;
}
</style>