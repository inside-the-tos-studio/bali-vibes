<template>
  <div class="shopping-cart">
    <h1>Panier</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Prix</th>
          <th>Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="room in basket.rooms" :key="room.id">
          <td>{{ room.id }}</td>
          <td>{{ room.name }}</td>
          <td>{{ room.price }}</td>
          <td>{{ room.type }}</td>
          <td>
            <RemoveRoomButton :id="room.id" />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="total-price">
      <h3>Total du Panier</h3>
      <p>{{ totalPrice }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBasketStore } from '../stores/basket';
import { storeToRefs } from 'pinia';
import RemoveRoomButton from '../components/globals/RemoveRoomButton.vue';

const basketStore = useBasketStore();
const { basket } = storeToRefs(basketStore);
const totalPrice = basketStore.totalPrice;
</script>

<style scoped>
.shopping-cart {
  margin-top: 6rem;
  padding-inline: 2rem;
  font-family: Arial, sans-serif;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.25rem;
}

table,
th,
td {
  border: 0.0625rem solid #ddd;
}

th,
td {
  padding: 0.5rem;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

p {
  margin-top: 1.25rem;
  font-style: italic;
}

.total-price {
  margin-top: 1.25rem;
  display: flex;
  gap: 1rem;
}
</style>
