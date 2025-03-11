<template>
    <div class="filter-menu">
        <h3>Filtrer par</h3>
        <div class="filter-category">
            <label for="category">Type:</label>
            <select id="category" v-model="selectedType">
                <option value="">toute</option>
                <option value="single">single</option>
                <option value="double">double</option>
                <option value="suite">suite</option>
                <option value="apartment">apartment</option>
            </select>
        </div>

        <div class="filter-price">
            <label for="price">Prix maximum:</label>
            <input type="range" id="price" v-model="selectedPrice" min="0" max="500" step="10" />
            <span>{{ selectedPrice }} €</span>
        </div>
        <div class="filter-availability">
            <label for="available">Disponible uniquement:</label>
            <input type="checkbox" id="available" v-model="isAvailable" />
        </div>

        <button @click="applyFilters">Appliquer les filtres</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue';

export default defineComponent({
    name: 'FilterMenu',
    props: {
        currentFilters: {
            type: Object as PropType<{ type: string; price: number; available: boolean }>,
            required: true,
        },
    },
    setup(props, { emit }) {
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

        return {
            selectedType,
            selectedPrice,
            isAvailable,
            applyFilters,
        };
    },
});
</script>

<style scoped>
.filter-menu {
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    width: 400px;
}

.filter-availability {
    display: flex;
    flex-wrap: wrap;
}

.available {
    width: 30px;
}

.filter-menu h3 {
    font-size: 1.2rem;
    margin-bottom: 16px;
}

.filter-menu label {
    margin-bottom: 8px;
}

.filter-menu select,
.filter-menu input[type="range"],
.filter-menu input[type="checkbox"] {
    margin-bottom: 8px;
}
</style>