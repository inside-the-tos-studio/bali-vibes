<script setup lang="ts">
import { useBasketStore } from '@/stores/basket'
import { computed } from 'vue'
import { formatPrice } from '@/utils/formatPrice'

const basketStore = useBasketStore()
const basketItems = computed(() => basketStore.basket.items)
const totalPrice = computed(() => basketStore.totalPrice)

const removeFromBasket = (index: number) => {
  basketStore.removeItem(index)
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 py-8">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold text-gray-900">
        Your Basket
      </h1>
      <button 
        v-if="basketItems.length"
        @click="basketStore.clearBasket()"
        class="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
      >
        CLEAR ALL
      </button>
    </div>

    <!-- Empty State -->
    <div 
      v-if="basketItems.length === 0" 
      class="text-center py-12 bg-white rounded-xl shadow"
    >
      <p class="text-gray-500 mb-4">Your basket is empty</p>
      <router-link 
        to="/discover" 
        class="inline-block bg-[#4F46E5] text-white px-6 py-2 rounded-lg hover:bg-[#4338CA] transition-colors"
      >
        Discover experiences
      </router-link>
    </div>

    <!-- Basket Content -->
    <div v-else class="grid grid-cols-1 gap-6">
      <!-- Basket Items -->
      <div class="bg-white rounded-xl shadow overflow-hidden">
        <div class="divide-y divide-gray-200">
          <div 
            v-for="(item, index) in basketItems" 
            :key="item.id"
            class="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-center space-x-4">
              <div class="w-24 h-24 flex-shrink-0">
                <img 
                  v-if="item.img" 
                  :src="item.img" 
                  :alt="item.name"
                  class="w-full h-full object-cover rounded-lg"
                />
                <div 
                  v-else 
                  class="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center"
                >
                  <span class="text-gray-400">No image</span>
                </div>
              </div>
              
              <div class="flex-grow">
                <h3 class="text-lg font-medium text-gray-900">{{ item.name }}</h3>
                <div class="mt-1 space-y-1">
                  <p class="text-sm text-gray-500 capitalize">
                    Type: {{ item.type }}
                  </p>
                  <p class="text-[#4F46E5] font-medium">
                    {{ formatPrice(item.price) }}
                  </p>
                </div>
              </div>
              
              <button 
                @click="removeFromBasket(index)"
                class="ml-4 px-3 py-1 text-sm font-medium text-gray-500 hover:text-red-600 
                       hover:bg-red-50 rounded-md transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Card -->
      <div class="bg-white rounded-xl shadow p-6">
        <div class="space-y-4">
          <!-- Subtotal -->
          <div class="flex justify-between items-center pb-4 border-b border-gray-200">
            <span class="text-gray-600">Subtotal</span>
            <span class="text-lg font-medium text-gray-900">
              {{ formatPrice(totalPrice) }}
            </span>
          </div>
          
          <!-- Total -->
          <div class="flex justify-between items-center">
            <span class="text-lg font-medium text-gray-900">Total</span>
            <span class="text-2xl font-bold text-[#4F46E5]">
              {{ formatPrice(totalPrice) }}
            </span>
          </div>

          <!-- Checkout Button -->
          <button 
            class="w-full mt-6 bg-[#4F46E5] text-white py-3 px-4 rounded-lg 
                   hover:bg-[#4338CA] transition-colors font-medium
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4F46E5]"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.basket-enter-active,
.basket-leave-active {
  transition: all 0.3s ease;
}

.basket-enter-from,
.basket-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

button {
  @apply focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2;
}

.router-link-active {
  @apply focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2;
}

// Responsive adjustments
@media (max-width: 640px) {
  .flex-grow h3 {
    @apply text-base;
  }
  
  .w-24 {
    @apply w-16;
  }
  
  .h-24 {
    @apply h-16;
  }
  
  .space-x-4 {
    @apply space-x-2;
  }
}
</style>
