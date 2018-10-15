<template>
  <div>
    <button v-if="showClearCompletedButton" @click="clearCompleted">Clear completed</button>
  </div>
</template>

<script>
  export default {
    name: 'todo-clear-completed',
    computed: {
      showClearCompletedButton() {
        return this.$store.getters.showClearCompletedButton
      }
    },
    methods: {
      clearCompleted() {
        //eventBus.$emit('clearCompletedItems')
        this.$store.dispatch('clearCompleted')
        //this.$store.state.items = this.$store.state.items.filter(todo => !todo.completed)
      }
    }
  }
</script>
