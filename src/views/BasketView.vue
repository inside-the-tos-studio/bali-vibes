<!-- src/views/BasketView.vue -->
<script setup lang="ts">
import { useBasketStore } from '@/stores/basket'
import { computed } from 'vue'

const basketStore = useBasketStore()
const basketItems = computed(() => basketStore.basket.items)
const totalPrice = computed(() => basketStore.totalPrice)

const removeFromBasket = (index: number) => {
  basketStore.removeItem(index)
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold text-gray-900">
        Your Basket
      </h1>
      <button 
        v-if="basketItems.length"
        @click="basketStore.clearBasket()"
        class="text-sm text-gray-500 hover:text-gray-700"
      >
        CLEAR ALL
      </button>
    </div>

    <!-- Empty State -->
    <div 
      v-if="basketItems.length === 0" 
      class="text-center py-12 bg-white rounded-xl shadow"
    >
      <p class="text-gray-500 mb-4 text-center">Your basket is empty</p>
    </div>

    <!-- Basket Content -->
    <div v-else class="grid grid-cols-1 gap-6">
      <!-- Basket Items -->
      <div class="bg-white rounded-xl shadow overflow-hidden">
        <div class="divide-y divide-gray-200">
          <div 
            v-for="(item, index) in basketItems" 
            :key="`${item.name}-${index}`"
            class="p-6 flex items-center justify-between"
          >
            <div>
              <h3 class="text-lg font-medium text-gray-900">{{ item.name }}</h3>
              <p class="mt-1 text-[#4F46E5] font-medium">
                {{ new Intl.NumberFormat('en-US', { 
                  style: 'currency', 
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0 
                }).format(item.price) }}
              </p>
            </div>
            <button 
              @click="removeFromBasket(index)"
              class="text-sm text-gray-500 hover:text-gray-700"
            >
              REMOVE
            </button>
          </div>
        </div>
      </div>

      <!-- Summary Card -->
      <div class="bg-white rounded-xl shadow p-6">
        <div class="flex justify-between items-center mb-6">
          <span class="text-lg text-gray-900">Total</span>
          <span class="text-2xl font-bold text-[#4F46E5]">
            {{ new Intl.NumberFormat('en-US', { 
              style: 'currency', 
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0 
            }).format(totalPrice) }}
          </span>
        </div>
        <button 
          class="w-full bg-[#4F46E5] text-white py-3 px-4 rounded-lg hover:bg-[#4338CA] transition-colors font-medium"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
button {
  @apply focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2;
}

.router-link-active {
  @apply focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2;
}
</style>
