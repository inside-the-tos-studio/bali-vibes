<script setup lang="ts">
import ExpCard from '@/components/globals/ExpCard.vue';
import FilterMenu from '@/components/globals/Filters.vue';
import { filterRoom } from '@/utils/filterRoom';
import { onMounted, ref, computed } from 'vue';

export interface Room {
  id: number;
  availability: boolean;
  name: string;
  price: number;
  img: string;
  type: string;
}

const rooms = ref<Room[]>([]);
const filters = ref({
  type: '',
  price: 500,
  available: false,
});

const filteredProducts = computed(() => {
  return filterRoom(rooms.value, filters)
});

const updateFilters = (newFilters: { type: string; price: number; available: boolean }) => {
  filters.value = newFilters;
};

onMounted(async () => {
  const response = await fetch('https://www.jsonkeeper.com/b/34CU');
  const data = await response.json();
  rooms.value = data;
});
</script>

<template>
  <main class="wac-experiences-page page">
    <FilterMenu :currentFilters="filters" @updateFilters="updateFilters" />
    <ul class="room-rendering">
      <ExpCard v-bind:key="index" v-for="(room, index) in filteredProducts" :id="room.id" :type="room.type"
        :name="room.name" :price="room.price" :availability="room.availability" :img="room.img" />
    </ul>
  </main>
</template>
<style lang="scss">
.wac-experiences-page {}

.room-rendering {
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 64rem) {
  .room-rendering {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 37.5rem) {
  .room-rendering {
    grid-template-columns: 1fr;
  }
}
</style>
