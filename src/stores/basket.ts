import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Room } from '@/views/ExperiencesView.vue';

export interface Basket {
  rooms: Room[];
}

export const useBasketStore = defineStore('basket', () => {
  const storedBasket = localStorage.getItem('basket');
  const basket = ref<Basket>(storedBasket ? JSON.parse(storedBasket) : { rooms: [] });

  const totalPrice = computed(() => basket.value.rooms.reduce((acc, room) => acc + room.price, 0))
  const isInBasket = (id: number) => basket.value.rooms.some(room => room.id === id)

  function addItem(item: Room) {
    basket.value.rooms.push(item);
    localStorage.setItem('basket', JSON.stringify(basket.value));
  }

  const removeItem = (id: number) => {
    basket.value.rooms = basket.value.rooms.filter(room => room.id !== id);
    localStorage.setItem('basket', JSON.stringify(basket.value));
  }

  return { basket, totalPrice, addItem, isInBasket, removeItem }
})
