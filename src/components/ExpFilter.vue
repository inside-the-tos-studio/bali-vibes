<script setup lang="ts">
import { useForm } from "vee-validate";
import { watch } from "vue";
import { useDataInjection } from "@/composables/useDataInjection";

const emit = defineEmits(["load-experiences"]);

const { values, defineField } = useForm();
const [type, typeAttrs] = defineField("type");
const [availability, availabilityAttrs] = defineField("availability");
const [priceFrom, priceFromAttrs] = defineField("priceFrom");
const [priceTo, priceToAttrs] = defineField("priceTo");
const [startDate, startDateAttrs] = defineField("dateStart");
const [endDate, endDateAttrs] = defineField("dateEnd");

watch(values, (newValues) => {
  const filters = { ...newValues };
  if (filters.priceFrom === "" || filters.priceFrom === undefined) {
    delete filters.priceFrom;
  }
  if (filters.priceTo === "" || filters.priceTo === undefined) {
    delete filters.priceTo;
  }
  if (filters.dateStart === "" || filters.dateStart === undefined) {
    delete filters.dateStart;
  }
  if (filters.dateEnd === "" || filters.dateEnd === undefined) {
    delete filters.dateEnd;
  }
  emit("load-experiences", filters);
});
</script>

<template>
  <div class="filter-card">
    <h3 class="filter-card__title">Filter your experience</h3>
    <form action="" class="filter-card__form">
      <div class="filter-card__form-datepicker-container">
        <label class="filter-card__form-group-label" for="date">Start date</label>
        <input type="date" id="date" v-model="startDate" v-bind="startDateAttrs" />
      </div>
      <div class="filter-card__form-datepicker-container">
        <label class="filter-card__form-group-label" for="date">End date</label>
        <input type="date" id="date" v-model="endDate" v-bind="endDateAttrs" />
      </div>
      <div class="filter-card__form-group">
        <label class="filter-card__form-group-label" for="type">Type</label>
        <select name="type" id="type" v-model="type" v-bind="typeAttrs">
          <option value="all">All</option>
          <option v-for="type in useDataInjection().types" :key="type" :value="type">
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
            v-for="option in useDataInjection().availabilityOptions"
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
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 50px;
  &__title {
    font-size: 24px;
    font-weight: 200;
    color: #333;
    margin-bottom: 40px;
  }
  &__form {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1rem;
    @media screen and (max-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 480px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  &__form-datepicker {
    width: 100%;
    margin-bottom: 0;
  }
  &__form-group-label {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-bottom: 5px;
  }
}
</style>
