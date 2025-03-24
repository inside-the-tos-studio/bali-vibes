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

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

type RoomType = 'single' | 'double' | 'suite' | 'family' | 'penthouse' | 'apartment';

const defaultImages: Record<RoomType, string>  = {
  single: '/src/assets/images/single-room.jpg',
  double: '/src/assets/images/double-room.jpeg',
  suite: '/src/assets/images/suite-room.jpeg',
  family: '/src/assets/images/family-room.jpg',
  penthouse: '/src/assets/images/penthouse-room.jpg',
  apartment: '/src/assets/images/apartment-room.jpg',
}

const getImageUrl = (imgUrl: string, type: string) => {
  if (imgUrl.includes('placehold.co')) {
    return defaultImages[type.toLowerCase() as RoomType] || 'https://placehold.co/600x400'
  }
  return imgUrl
}

</script>

<template>
  <router-link 
    v-if="experience.availability"
    :to="`/experience/${experience.id}`"
    class="card bg-white h-full rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
    :aria-label="`View details for ${experience.name}, ${experience.type} experience at ${formatPrice(experience.price)} per night`"
  >
    <div class="relative aspect-[4/3]">
      <img 
        :src="getImageUrl(experience.img, experience.type)" 
        :alt="`${experience.type} room view - ${experience.name}`"
        class="w-full h-full object-cover"
      />
      <div class="status-badge available" role="status" aria-live="polite"> 
        Available
      </div>
    </div>
    <div class="p-4">
      <h3 class="text-xl font-semibold text-gray-900">
        {{ experience.name }}
      </h3>
      <p class="mt-2 text-gray-500 capitalize">
        <span class="sr-only">Experience Type:</span> {{ experience.type }}
      </p>
      <p class="mt-4 text-lg font-bold text-emerald-700">
        {{ formatPrice(experience.price) }} 
        <span class="text-gray-500 text-sm font-normal">per night</span>
      </p>
    </div>
  </router-link>

  <!-- Unavailable Experience -->
  <div 
    v-else
    class="card bg-white h-full rounded-xl overflow-hidden shadow-md grayscale opacity-70" role="article"
    aria-label="Unavailable experience"
  >
    <div class="relative aspect-[4/3]">
      <img 
        :src="experience.img" 
        :alt="`${experience.type} room view - ${experience.name} (Currently unavailable)`"
        class="w-full h-full object-cover"
      />
      <div class="status-badge not-available" role="status" aria-live="polite">
        Not available
      </div>
    </div>
    <div class="p-4">
      <h3 class="text-xl font-semibold text-gray-900">
        {{ experience.name }}
      </h3>
      <p class="mt-2 text-gray-500 capitalize">
        <span class="sr-only">Experience Type:</span> {{ experience.type }}
      </p>
      <p class="mt-4 text-lg font-bold text-emerald-700">
        {{ formatPrice(experience.price) }} 
        <span class="text-gray-500 text-sm font-normal">per night</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Pour les cartes disponibles */
.card {
  @apply w-full bg-white rounded-xl overflow-hidden shadow-md border border-gray-200;
  height: 100%; /* Assure une hauteur complète */
  display: flex;
  flex-direction: column;
}

router-link.card {
  @apply block transition-all duration-300;
}

router-link.card:hover {
  @apply shadow-lg transform translate-y-[-2px];
}

/* Badges de statut */
.status-badge {
  @apply absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium shadow-sm;
}

.status-badge.available {
  @apply bg-indigo-100 text-indigo-700;
}

.status-badge.not-available {
  @apply bg-gray-100 text-gray-700;
}

/* Ajustements responsifs */
@media (max-width: 768px) {
  .status-badge {
    @apply text-xs px-2 py-1;
  }
}

/* Styles de focus */
router-link.card:focus-visible {
  @apply outline-none ring-2 ring-emerald-500 ring-offset-2;
}

/* Mouvement réduit */
@media (prefers-reduced-motion: reduce) {
  .card {
    @apply transition-none;
  }
}
</style>