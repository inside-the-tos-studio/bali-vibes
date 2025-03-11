<script setup lang="ts">
defineProps({
  id: Number,
  availability: Boolean,
  name: String,
  price: Number,
  img: String,
  type: String,
})

</script>

<template>
  <li class="card">
    <router-link :to="`/experience/${id}`">
      <div class="card-content">
        <h3 class="card-name">{{ name }}</h3>
        <p class="card-price">Price: {{ price }}</p>
        <p class="card-type">{{ type }}</p>
        <p class="card-availability" v-if="availability">Chambre disponible</p>
        <p class="card-availability" v-else>Chambre réservée</p>
      </div>
    </router-link>
  </li>
</template>

<style scoped>
.card {
  width: 200px;
  border-radius: 8px;
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