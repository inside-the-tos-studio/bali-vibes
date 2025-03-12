<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="filter-menu-container">
        <div class="filter-menu">
            <h3>Filtrer par</h3>
            <div class="filter-category">
                <label for="category">Type:</label>
                <select id="category" v-model="selectedType">
                    <option value="">toutes</option>
                    <option value="single">single</option>
                    <option value="double">double</option>
                    <option value="suite">suite</option>
                    <option value="apartment">apartment</option>
                </select>
            </div>

            <div class="filter-price">
                <label for="price">Prix maximum: </label>
                <input type="range" id="price" v-model="selectedPrice" min="0" max="500" step="10" />
                <span>{{ selectedPrice }} €</span>
            </div>
            <div class="filter-availability">
                <label for="available">Disponible uniquement: </label>
                <input type="checkbox" id="available" v-model="isAvailable" />
            </div>
            <div class="filter-button-container">
                <button @click="applyFilters">Appliquer les filtres</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits } from 'vue';

export interface Filter {
    type: string;
    price: number;
    available: boolean;
}

const props = defineProps<{
    currentFilters: Filter;
}>();

const emit = defineEmits<{
    (e: 'updateFilters', { type, price, available }: Filter): void;
}>();

const selectedType = ref(props.currentFilters.type);
const selectedPrice = ref(props.currentFilters.price);
const isAvailable = ref(props.currentFilters.available);

const applyFilters = () => {
    emit('updateFilters', {
        type: selectedType.value,
        price: selectedPrice.value,
        available: isAvailable.value,
    });
};
</script>
<style scoped>
.filter-menu {
    padding: 1rem;
    border: 0.0625rem solid #ddd;
    border-radius: 0.5rem;
    width: 31.25rem;
}

.filter-menu-container {
    display: flex;
    justify-content: center;
}

.filter-button-container {
    display: flex;
    justify-content: flex-end;
}

.filter-availability {
    display: flex;
    flex-wrap: wrap;
}

.available {
    width: 1.875rem;
}

.filter-menu h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
}

.filter-menu label {
    margin-bottom: 0.5rem;
}

.filter-menu select,
.filter-menu input[type="range"],
.filter-menu input[type="checkbox"] {
    margin-bottom: 0.5rem;
}
</style>
