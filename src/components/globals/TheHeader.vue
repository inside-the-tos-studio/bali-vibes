<script setup lang="ts">
import { useBasketStore } from "@/stores/basket.ts";
import LogoBaliVibes from "../icons/LogoBaliVibes.vue";
import { onMounted, ref } from "vue";
import type { Item } from "@/stores/basket.ts";

onMounted(() => {
  if (localStorage.getItem("basket")) {
    const basketItems = JSON.parse(localStorage.getItem("basket") || "[]") as Item[];

    basketItems.forEach((item: Item) => {
      useBasketStore().addItem(item);
    });
  }
});

const showBasket = ref(false);
</script>

<template>
  <div class="wac-the-header">
    <div>
      <router-link to="/">
        <LogoBaliVibes />
      </router-link>
    </div>
    <ul>
      <li>
        <router-link to="/discover">Discover</router-link>
      </li>
      <li>
        <router-link to="/discover">Popular</router-link>
      </li>
      <li>
        <button class="btn--xs" @click="showBasket = !showBasket">
          {{ showBasket ? "Close basket" : "Open basket" }}
        </button>
      </li>
      <li>
        <div class="avatar text-gray-000 avatar--xs" data-text="AM"></div>
      </li>
    </ul>
    <div v-if="showBasket" class="wac-the-header__basket">
      <div
        class="wac-the-header__basket-item-container"
        v-for="item in useBasketStore().basket.items"
        :key="item.id"
      >
        <p>{{ item.name }} - {{ item.price }}€</p>
        <button class="btn--xs" @click="useBasketStore().removeItem(item.id)">remove</button>
      </div>
      <p v-if="useBasketStore().basket.items.length === 0">No items in basket</p>
      <p class="wac-the-header__basket-total">Total: {{ useBasketStore().totalPrice }}€</p>
    </div>
  </div>
</template>

<style lang="scss">
.wac-the-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 3rem;
  ul {
    display: flex;
    align-items: center;
    gap: 1rem;
    list-style: none;
    padding-inline-start: 0;
    button {
      margin: 0;
    }
  }
  &__basket {
    position: fixed;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    background-color: var(--vt-c-white);
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    width: 300px;
    overflow-y: auto;
    z-index: 1000;
  }
  &__basket-item-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  &__basket-total {
    text-align: right;
    margin-bottom: 0;
  }
}
</style>
