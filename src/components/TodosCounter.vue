<template>
  <div>{{ remaining }} items remains</div>
</template>

<script>
  export default {
    name: 'todos-counter',
    props: {
      remaining: {
        type: Number,
        required: true,
      }
    }
  }
</script>
