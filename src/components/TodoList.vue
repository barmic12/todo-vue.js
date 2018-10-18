<template>
	<section>
		<form
			id="form-app"
			@submit.prevent="addItem"
			>
			<input type="text" placeholder="Write todo..." v-model="name" />
		</form>
		<div class="todo-list">
			<todo-item v-for="(item, index) in itemsFiltered" :key="item.id" :item="item" :index="index" class="todo-item"
			:checkAll="!anyRemaining"></todo-item>
		</div>


		<div class="block-info">
			<todo-check-all></todo-check-all>
			<todos-counter></todos-counter>
		</div>

		<div class="block-info">
			<todo-filtered></todo-filtered>
			<todo-clear-completed></todo-clear-completed>
		</div>
	</section>
</template>

<script>
	import TodoItem from './TodoItem'
	import TodosCounter from './TodosCounter'
	import TodoCheckAll from './TodoCheckAll'
	import TodoFiltered from './TodoFiltered'
	import TodoClearCompleted from './TodoClearCompleted'
export default {
  name: 'todo-list',
  components: {
  	TodoItem,
		TodosCounter,
		TodoCheckAll,
		TodoFiltered,
		TodoClearCompleted,
  },
  data() {
  	return {
  		name: '',
			idForItem: this.length,
  		beforeEditCache: '',
			visibility: 'all',
			errors: []
  	}
  },
	created() {
		this.$store.dispatch('retrieveItems')
	},
  methods: {
  	addItem() {
			this.$store.dispatch('addItem', {
  			name: this.name,
				id: this.idForItem
  		})

  		this.name = null;
			this.idForItem++;
  	},
  },
  computed: {
  	anyRemaining() {
  		return this.$store.getters.anyRemaining
  	},
  	itemsFiltered() {
  		return this.$store.getters.itemsFiltered
  	}
  }
}
</script>


<style>

	#form-app input{
		width:100%;
		padding: 10px;
		border: none;
		border-bottom: 1px solid #ededed;
		box-sizing : border-box;
		font-size: 18px;

	}

	.todo-list {
		list-style: none;
		padding-left:0px;
		margin: 0px;
	}

	.todo-list .todo-item {
		padding: 10px;
		background-color: white;
		border-bottom: 1px solid #ededed;
		font-size: 18px;
	}

	.completed {
		color: grey;
		text-decoration: line-through;
	}

	.destroy {
		display: none;
		cursor: pointer;
	}

	.destroy:hover {
		color: red;
	}

	.todo-list li:hover .destroy {
		display: inline-block;
		float: right;
	}

	.block-info {
		background-color: white;
		padding: 10px 10px;
		display:flex;
		align-items: center;
		justify-content: space-between;
	}

	.input-edit {
		padding: 10px;
		border-bottom: 1px solid #ededed;
		box-sizing : border-box;
		font-size: 18px;
	}

	button.active {
		background-color: green;
		color: white;
		border: 0px;
	}
</style>
