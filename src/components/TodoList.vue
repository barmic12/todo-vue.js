<template>
	<section>
		<form 
			id="form-app"
			@submit.prevent="addItem"
			>
			<input type="text" placeholder="Write todo..." v-model="title" />	
		</form>

		<ul class="todo-list">	
				<li class="todo" v-for="item in itemsFiltered"
					:class="{ completed: item.completed }">
					<div v-if="!item.editing">
					<input type="checkbox" v-model="item.completed" />
					<span @dblclick="editItem(item)">
						{{ item.title }}
					</span> 
					<div class="destroy" @click="removeItem(item)">&times</div>
					</div>
					<div v-if="item.editing">
						<input type="text" v-model="item.title" @blur="doneEdit(item)" @keyup.enter="doneEdit(item)" @keyup.esc="cancelEdit(item)" v-focus class="input-edit" />
					</div>
				</li>
		</ul>
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
export default {
  name: 'todo-list',
  data() {
  	return {
  		title: '',
  		beforeEditCache: '',
  		filter: 'all',
  		items: [
  		{
  			title: 'Create Todo',
  			completed: false,
  			editing: false
  		},
  		{
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
  			editing: false
  		})
  		this.title = null;
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
  	}
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
  },
  directives: {
  	focus: {
  		inserted: function(el) {
  			el.focus()
  		}
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

	.todo-list li {
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