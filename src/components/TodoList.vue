<template>
	<section>
		<form
			id="form-app"
			@submit.prevent="addItem"
			>
			<input type="text" placeholder="Write todo..." v-model="title" />
		</form>
		<div class="todo-list">
			<todo-item v-for="(item, index) in itemsFiltered" :key="item.id" :item="item" :index="index" class="todo-item"
			:checkAll="!anyRemaining"></todo-item>
		</div>


		<div class="block-info">
			<todo-check-all :anyRemaining="anyRemaining"></todo-check-all>
			<todos-counter :remaining="remaining"></todos-counter>
		</div>

		<div class="block-info">
			<todo-filtered></todo-filtered>
			<todo-clear-completed :showClearCompletedButton="showClearCompletedButton"></todo-clear-completed>
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
  		title: '',
			idForItem: 3,
  		beforeEditCache: '',
  		filter: 'all',
  		items: [
  		{
  			id: 1,
  			title: 'Create Todo',
  			completed: false,
  			editing: false
  		},
  		{
  			id: 2,
  			title: 'Create Rails Server',
  			completed: false,
  			editing: false
  		},
  		],
		visibility: 'all',
		errors: []
  	}
  },
  methods: {
  	addItem() {
  		this.items.push({
  			title: this.title,
  			completed: false,
  			editing: false,
				id: this.idForItem
  		})
  		this.title = null;
			this.idForItem++;
  	},
  	removeItem(item) {
  		this.items.splice(this.items.indexOf(item), 1);
  	},
  	editItem(item) {
  		this.beforeEditCache = item.title
  		item.editing = true;
  	},
  	doneEdit(item) {
  		if (item.title.trim().length == 0) {
  			return;
  		}
  		item.editing = false;
  	},
  	cancelEdit(item) {
  		item.title = this.beforeEditCache;
  		item.editing = false;
  	},
  	checkAllItems() {
  		this.items.forEach((item) => item.completed = event.target.checked )
  	},
  	removeCompleted() {
  		this.items = this.items.filter(todo => !todo.completed)
  	},
  	finishEdit(data) {
			const index = this.items.findIndex((item) => item.id == data.item.id)
  		this.items.splice(index, 1, data.item)
  	}
  },
	created() {
		eventBus.$on('removedItem', (item) => this.removeItem(item))
		eventBus.$on('finishedEdit', (index) => this.finishEdit(index))
		eventBus.$on('checkAllChanged', (checked) => this.checkAllItems(checked))
		eventBus.$on('filterChanged', (filter) => this.filter = filter)
		eventBus.$on('clearCompletedItems',() => this.removeCompleted())
	},
	beforeDestroy() {
		eventBus.$off('removedItem', (item) => this.removeItem(item))
		eventBus.$off('finishedEdit', (index) => this.finishEdit(index))
		eventBus.$off('checkAllChanged', (checked) => this.checkAllItems(checked))
		eventBus.$off('filterChanged', (filter) => this.filter = filter)
		eventBus.$off('clearCompletedItems',() => this.removeCompleted())
	},
  computed: {
  	remaining() {
  		return this.items.filter(todo => !todo.completed).length
  	},
  	anyRemaining() {
  		return this.remaining != 0
  	},
  	itemsFiltered() {
  		if(this.filter == 'all') {
  			return this.items
  		}
  		else if (this.filter == 'active') {
  			return this.items.filter(todo => !todo.completed)
  		}
  		else if (this.filter == 'completed') {
  			return this.items.filter(todo => todo.completed)
  		}
  	},
  	showClearCompletedButton() {
  		return this.items.filter(todo => todo.completed).length > 0
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
