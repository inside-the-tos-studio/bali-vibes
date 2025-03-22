<script setup lang="ts">
export interface Experience {
  id: number;
  name: string;
  img: string;
  type: string;
  price: number;
  availability: boolean;
}

defineProps<{
  experience: Experience;
}>();

</script>

<template>
    <router-link 
      :to="`/experience/${experience.id}`"
      class="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div class="relative aspect-[4/3]">
        <img 
          :src="experience.img" 
          :alt="experience.name"
          class="w-full h-full object-cover"
        />
        <div 
          v-if="experience.availability" 
          class="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-sm"
        >
          Available
        </div>
      </div>
      <div class="p-4">
        <h3 class="text-xl font-semibold text-gray-900 group-hover:text-teal-600">
          {{ experience.name }}
        </h3>
        <p class="mt-2 text-gray-600 capitalize">
          {{ experience.type }}
        </p>
        <p class="mt-4 text-lg font-bold text-teal-600">
          ${{ experience.price }}
        </p>
      </div>
    </router-link>
  </template>
