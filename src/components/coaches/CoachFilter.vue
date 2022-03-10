<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <span class="filter-option ">
      <input type="checkbox" id="frontend" checked @change="setFilter" />
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option ">
      <input type="checkbox" id="backend" checked @change="setFilter" />
      <label for="backend">Backend</label>
    </span>
    <span class="filter-option ">
      <input type="checkbox" id="freelance" checked @change="setFilter" />
      <label for="freelance">Freelance</label>
    </span>
  </base-card>
</template>

<script>
  export default {

    data() {
      return {
        filters: {
          frontend: true,
          backend: true,
          freelance: true,
        }
      }
    },

    // Register emit
    emits: ['change-filter'],

    methods: {
      setFilter(event) {

        // Looks at the id of the checkbox
        const inputId = event.target.id

        // Looks if the checkbox is checked
        const isActive = event.target.checked

        // Copy all filters properties and spread them out
        // After the copy overwrite it with the one that is selected
        const updateFilters = {
          ...this.filters,
          [inputId]: isActive
        }
        this.filters = updateFilters

        // Emit a custom event for other components
        this.$emit('change-filter', updateFilters)
      }
    }
  }
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>