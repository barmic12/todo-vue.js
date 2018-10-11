<template>
  <div>
    <button v-if="showClearCompletedButton" @click="clearCompleted">Clear completed</button>
  </div>
</template>

<script>
  export default {
    name: 'todo-clear-completed',
    props: {
      showClearCompletedButton: {
        type: Boolean,
        required: true,
      }
    },
    methods: {
      clearCompleted() {
        eventBus.$emit('clearCompletedItems')
      }
    }
  }
</script>
