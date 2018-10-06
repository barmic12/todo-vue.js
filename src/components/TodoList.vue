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
			<div> <label><input type="checkbox" :checked="!anyRemaining" @change="checkAllItems"> Check All </label> </div>
			<div>{{ remaining }} items remains</div>
		</div>

		<div class="block-info">
			<div>
				<button :class="{ active: filter == 'all' }" @click="filter = 'all'">All</button>
				<button :class="{ active: filter == 'active' }" @click="filter = 'active'">Active</button>
				<button :class="{ active: filter == 'completed' }" @click="filter = 'completed'">Completed</button>
			</div>
			<div>
				<button v-if="anyActive" @click="removeCompleted">Clear completed</button>
			</div>
		</div>
	</section>
</template>

<script>
	import TodoItem from './TodoItem'
export default {
  name: 'todo-list',
  components: {
  	TodoItem,
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
  	anyActive() {
  		return this.items.filter(todo => todo.completed).length
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
