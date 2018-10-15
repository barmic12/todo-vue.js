<template>
  <div>{{ remaining }} items remains</div>
</template>

<script>
  export default {
    name: 'todos-counter',
    computed: {
      remaining() {
        return this.$store.getters.remaining
      }
    }
  }
</script>
