<script setup lang="ts">
import { useForm } from "vee-validate";
import { ref, watch } from "vue";

const emit = defineEmits(["load-experiences"]);

const { values, defineField } = useForm();
const [type, typeAttrs] = defineField("type");
const [availability, availabilityAttrs] = defineField("availability");
const [priceFrom, priceFromAttrs] = defineField("priceFrom");
const [priceTo, priceToAttrs] = defineField("priceTo");

watch(values, (newValues) => {
  emit("load-experiences", newValues);
});

const types = ref(["single", "double", "suite", "family", "penthouse", "apartment"]);
const availabilityOptions = ref([
  { value: "all", label: "All" },
  { value: true, label: "Available" },
  { value: false, label: "Unavailable" },
]);
</script>

<template>
  <div class="filter-card">
    <form action="" class="filter-card__form">
      <div class="filter-card__form-group">
        <label class="filter-card__form-group-label" for="type">Type</label>
        <select name="type" id="type" v-model="type" v-bind="typeAttrs">
          <option value="all">All</option>
          <option v-for="type in types" :key="type" :value="type">
            {{ type.charAt(0).toUpperCase() + type.slice(1) }}
          </option>
        </select>
      </div>
      <div class="filter-card__form-group">
        <label class="filter-card__form-group-label" for="availability">Availability</label>
        <select
          name="availability"
          id="availability"
          v-model="availability"
          v-bind="availabilityAttrs"
        >
          <option
            v-for="option in availabilityOptions"
            :key="String(option.value)"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>
      <div class="filter-card__form-group">
        <label class="filter-card__form-group-label" for="priceFrom">Price from</label>
        <input
          type="number"
          id="priceFrom"
          placeholder="€"
          name="priceFrom"
          v-model="priceFrom"
          v-bind="priceFromAttrs"
        />
      </div>
      <div class="filter-card__form-group">
        <label class="filter-card__form-group-label" for="priceTo">Price to</label>
        <input
          type="number"
          id="priceTo"
          placeholder="€"
          name="priceTo"
          v-model="priceTo"
          v-bind="priceToAttrs"
        />
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.filter-card {
  margin-bottom: 50px;
  &__form {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  &__form-group {
    width: 25%;
  }
  &__form-group-label {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-bottom: 5px;
  }
}
</style>
