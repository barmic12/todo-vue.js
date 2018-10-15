<template>
  <div>
    <button :class="{ active: this.$store.state.filter == 'all' }" @click="changeFilter('all')">All</button>
    <button :class="{ active: this.$store.state.filter == 'active' }" @click="changeFilter('active')">Active</button>
    <button :class="{ active: this.$store.state.filter == 'completed' }" @click="changeFilter('completed')">Completed</button>
  </div>
</template>

<script>
  export default {
    name: 'todo-filtered',
    computed() {
      return this.$store.state.filter
    },
    methods: {
      changeFilter(filter) {
        this.$store.dispatch('changeFilter', filter)
      }
    }
  }
</script>
