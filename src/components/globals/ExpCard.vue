<template>
  <li class="card">
    <div class="card-content">
      <router-link :to="`/experience/${id}`">
        <h3 class="card-name">{{ name }}</h3>
        <p class="card-price">Price: {{ price }}</p>
        <p class="card-type">{{ type }}</p>
        <p class="card-availability" v-if="availability">Chambre disponible</p>
        <p class="card-availability" v-else>Chambre réservée</p>
      </router-link>
      <AddRoomButton v-if="availability && !isInBasketStore(id)" :id="id" :price="price" :name="name" />
      <RemoveRoomButton v-if="isInBasketStore(id)" :id="id" />
    </div>
  </li>
</template>

<script setup lang="ts">
import { useBasketStore } from '../../stores/basket';
import AddRoomButton from './AddRoomButton.vue';
import RemoveRoomButton from './RemoveRoomButton.vue';

export interface ExpCard {
  id: number,
  name: string,
  price: number,
  availability?: boolean,
  img?: string,
  type?: string,
}

defineProps<ExpCard>()

const basketStore = useBasketStore();
const isInBasketStore = (id?: number) => id ? basketStore.isInBasket(id) : false;
</script>

<style scoped>
.card {
  width: 200px;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding-left: 16px;
  padding-top: 16px;
  padding-bottom: 16px;
}

.card-name {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.card-price {
  font-size: 1rem;
  color: #555;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}


.card-type {
  font-style: bold;
  color: #555;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.card-availability {
  font-style: italic;
  color: #555;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>