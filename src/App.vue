<script src="http://192.168.56.1:8098"></script>
<template>
  <div id="app">
    <img src="./assets/logo.png" class="logo">
    <todo-list></todo-list>
  </div>
</template>

<script>
  import TodoItem from './components/TodoItem'
  import TodoList from './components/TodoList'
export default {
  name: 'App',
  components: {
    TodoItem,
    TodoList,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  width:500px;
  margin: 0 auto;
}

#app .logo {
  text-align: center;
  display: block;
  width:100px;
  margin: 0 auto;
}
</style>

